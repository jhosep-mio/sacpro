<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class configuracions extends Model
{
    use HasFactory;
    protected $fillable = [
        'celular1',
        'celular2',
        'correo1',
        'correo2',
        'direccion',
        'facebook',
        'instagram',
        'twiter',
        'linkedin',
        'youtube',
        'whatsapp',
    ];
}
