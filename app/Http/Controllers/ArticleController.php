<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleView;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Http\Resources\ArticleResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        // $user = $request->user();
        // $status = $request['status'];
        // $featured = $request['featured'];
        // $numrows = $request['numrows'] ? $request['numrows'] : 5;

        // if (empty($status) && empty($featured)) {
        //     return ArticleResource::collection(Article::paginate($numrows));
        // } else {
        //     return ArticleResource::collection(Article::paginate($numrows));
        // }
        $article_type_id = $request['article_type_id'];
        $page_count = $request['pageCount'] > 0 ? $request['pageCount'] : 5;
        $is_featured =
            filter_var($request['featured'], FILTER_VALIDATE_BOOLEAN);

        $status = $request['status'];

        $search_headline = $request['search'];

        return ArticleResource::collection(Article::where('article_type_id', $article_type_id)
            ->where('featured', $is_featured)->when($status, function ($query, $status) {
                if ($status !== "all") {
                    $is_active = $status === "active" ? 1 : 0;
                    return $query->where('status', $is_active);
                }
            })->when($search_headline, function ($query, $search_headline) {
                return $query->where('headline', 'like', '%' . $search_headline . '%');
            })->orderBy('created_at', 'DESC')->paginate($page_count));



        // return ArticleResource::collection(Article::where('article_type_id', $article_type_id)->orderBy('created_at', 'DESC')->paginate($page_count));
    }


    public function showForPublic(Article $article)
    {
        if (!$article->status) {
            return response("", 404);
        } else {
            ArticleView::where('article_id', $article->id)->first()->update([
                'view_count' => DB::raw('view_count+1'),
                'updated_at' => Carbon::now()
            ]);
        }

        // $article_view_counter = ArticleViewCounter();

        return new ArticleResource($article);
    }

    public function showPublicList(Request $request)
    {
        $article_type_id = $request['article_type_id'];
        $featured = $request['featured'];
        $pageCount = $request['pageCount'];
        return ArticleResource::collection(Article::where('status', 1)->where('featured', $featured)->when($article_type_id, function ($query, $article_type_id) {
            return $query->where('article_type_id', $article_type_id);
        })->orderBy('created_at', 'DESC')->paginate($pageCount));
    }

    public function showFeaturedList(Request $request)
    {
        $article_type_id = $request['article_type_id'];
        return ArticleResource::collection(Article::where('status', 1)->where('featured', 1)
            ->when($article_type_id, function ($query, $article_type_id) {
                return $query->where('article_type_id', $article_type_id);
            })->orderBy('created_at', 'DESC')->paginate(5));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreArticleRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreArticleRequest $request)
    {
        //
        $data = $request->validated();

        if (isset($data['cover_photo'])) {
            $relativePath = $this->saveImage($data['cover_photo']);
            $data['cover_photo'] = $relativePath;
        }

        $article = Article::create($data);
        ArticleView::create(['article_id' => $article->id, 'view_count' => 0]);

        return new ArticleResource($article);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function show(Article $article, Request $request)
    {
        //
        $user = $request->user();
        if ($user->id != $article->user_id) {
            return abort(403, 'Unauthorized action');
        }
        return new ArticleResource($article);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateArticleRequest  $request
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateArticleRequest $request, Article $article)
    {
        //
        $data = $request->validated();

        // Check if image was given and save on local file system
        if (isset($data['cover_photo'])) {
            $relativePath = $this->saveImage($data['cover_photo']);
            $data['cover_photo'] = $relativePath;

            // If there is an old image, delete it
            if ($article->cover_photo) {
                $absolutePath = public_path($article->cover_photo);
                File::delete($absolutePath);
            }
        }

        // Update article in the database
        $article->update($data);
        return new ArticleResource($article);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article $article, Request $request)
    {
        //
        $user = $request->user();
        if ($user->id !== $article->user_id) {
            return abort(403, 'Unauthorized action');
        }

        $article->delete();
        return response('', 204);
    }

    private function saveImage($image)
    {
        //Check if valid base64 string
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            //take base64 encoded text without mime type
            $image = substr($image, strpos($image, ',') + 1);

            //get file extension
            $type = strtolower($type[1]); // jpg, png, gif

            if (!in_array($type, ['jpg', 'png', 'gif', 'jpeg'])) {
                throw new \Exception('invalid image type');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if ($image === false) {
                throw new \Exception('base64_decode failed');
            }
        } else {
            throw new  \Exception('did not match data URI with image data');
        }

        $dir = 'images/coverphotos/';
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;

        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }

        file_put_contents($relativePath, $image);

        return $relativePath;
    }
}
