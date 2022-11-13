<?php

namespace App\Http\Controllers;

use App\Models\GalleryImage;
use App\Http\Requests\StoreGalleryImageRequest;
use App\Http\Requests\UpdateGalleryImageRequest;
use App\Http\Resources\GalleryImageResource;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class GalleryImageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return GalleryImageResource::collection(GalleryImage::orderBy('created_at', 'DESC')->paginate());
    }

    /**
     * Display a public listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showPublic()
    {
        //
        return GalleryImageResource::collection(GalleryImage::where('status', 1)->orderBy('created_at', 'DESC')->paginate());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreGalleryImageRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreGalleryImageRequest $request)
    {
        //
        $data = $request->validated();

        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;
        }

        $gallery = GalleryImage::create($data);

        return new GalleryImageResource($gallery);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GalleryImage  $galleryImage
     * @return \Illuminate\Http\Response
     */
    public function show(GalleryImage $galleryImage)
    {
        //
        return new GalleryImageResource($galleryImage);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateGalleryImageRequest  $request
     * @param  \App\Models\GalleryImage  $galleryImage
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateGalleryImageRequest $request, GalleryImage $galleryImage)
    {
        //
        $data = $request->validated();

        // Check if image was given and save on local file system
        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;

            // If there is an old image, delete it
            if ($galleryImage->image) {
                $absolutePath = public_path($galleryImage->image);
                File::delete($absolutePath);
            }
        }

        // Update article in the database
        $galleryImage->update($data);
        return new GalleryImageResource($galleryImage);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GalleryImage  $galleryImage
     * @return \Illuminate\Http\Response
     */
    public function destroy(GalleryImage $galleryImage)
    {
        //
        $galleryImage->delete();
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

        $dir = 'images/gallery/';
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
