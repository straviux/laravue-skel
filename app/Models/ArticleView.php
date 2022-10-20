<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArticleView extends Model
{
    use HasFactory;
    protected $fillable = [
        'view_count', 'updated_at', 'created_at'
    ];
}
