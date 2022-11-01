<?php

namespace App\Http\Resources;

use App\Models\ArticleView;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'headline' => $this->headline,
            'slug' => $this->slug,
            'cover_photo_url' => $this->cover_photo ? URL::to($this->cover_photo) : null,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'status' => !!$this->status,
            'featured' => !!$this->featured,
            'article_type_id' => $this->article_type_id,
            'created_at' => (new \DateTime($this->created_at))->format('Y-m-d H:i:s'),
            'updated_at' => (new \DateTime($this->updated_at))->format('Y-m-d H:i:s'),
            'posted_at' => (new \DateTime($this->posted_at))->format('Y-m-d H:i:s'),
            'views' => ArticleView::where('article_id', $this->id)->select('view_count')->first(),
            'tags' => []
        ];
    }
}
