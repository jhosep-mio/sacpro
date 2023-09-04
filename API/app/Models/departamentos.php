<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class departamentos extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre', 
    ];

    public function distribuidores()
    {
        return $this->hasMany(distribuidores::class);
    }

    public function coberturas()
    {
        return $this->hasMany(coberturas::class);
    }
}
