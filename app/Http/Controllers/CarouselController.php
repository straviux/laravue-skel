<?php

namespace App\Http\Controllers;

use App\Http\Resources\CarouselResource;
use App\Http\Requests\StoreCarouselRequest;
use App\Http\Requests\UpdateCarouselRequest;
use App\Models\Carousel;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class CarouselController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return CarouselResource::collection(Carousel::orderBy('created_at', 'DESC')->paginate());
    }


    /**
     * Display a public listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showPublic()
    {
        //
        return CarouselResource::collection(Carousel::where('status', 1)->orderBy('created_at', 'DESC')->paginate());
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCarouselRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCarouselRequest $request)
    {
        //
        $data = $request->validated();

        if (isset($data['slide'])) {
            $relativePath = $this->saveImage($data['slide']);
            $data['slide'] = $relativePath;
        }

        $carousel = Carousel::create($data);

        return new CarouselResource($carousel);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Carousel  $carousel
     * @return \Illuminate\Http\Response
     */
    public function show(Carousel $carousel)
    {
        //
        //

        return new CarouselResource($carousel);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCaroouselRequest  $request
     * @param  \App\Models\Carousel  $carousel
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCarouselRequest $request, Carousel $carousel)
    {
        //
        $data = $request->validated();

        // Check if image was given and save on local file system
        if (isset($data['slide'])) {
            $relativePath = $this->saveImage($data['slide']);
            $data['slide'] = $relativePath;

            // If there is an old image, delete it
            if ($carousel->slide) {
                $absolutePath = public_path($carousel->slide);
                File::delete($absolutePath);
            }
        }

        // Update article in the database
        $carousel->update($data);
        return new CarouselResource($carousel);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Carousel  $carousel
     * @return \Illuminate\Http\Response
     */
    public function destroy(Carousel $carousel)
    {

        $carousel->delete();
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

        $dir = 'images/carousel/';
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
