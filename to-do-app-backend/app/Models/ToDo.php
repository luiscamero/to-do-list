<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToDo extends Model
{
    use HasFactory;
     /**
     * Get the user that owns the ToDo.
     */
    public function toDos()
    {
        return $this->belongsTo('App\User');
    }
    
    protected $casts = [
        'checked' => 'boolean',
    ];

    protected $fillable = [
        'user_id',
        'description',
        'checked'
    ];
}
