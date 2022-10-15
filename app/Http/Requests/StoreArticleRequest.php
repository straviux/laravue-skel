<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'user_id' => $this->user()->id
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'headline' => 'required|string|max:1000',
            'user_id' => 'exists:users,id',
            'type' => 'exists:articletypes,id',
            'cover_photo' => 'nullable|string',
            'status' => 'required|boolean',
            'featured' => 'required|boolean',
            'excerpt' => 'required|string|max:1000',
            'article_type_id' => 'exists:article_types,id',
            // 'slug' => 'required|string|max:1000',
            'content' => 'required|string',
            'posted_at' => 'nullable|date',
        ];
    }
}
