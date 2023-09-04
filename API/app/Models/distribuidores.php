<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class distribuidores extends Model
{
    public function departamento()
    {
        return $this->belongsTo(departamentos::class);
    }

    public function provincia()
    {
        return $this->belongsTo(provincias::class);
    }

    use HasFactory;
    protected $fillable = [
        'nombre',
        'idCategoria',
        'direccion',
        'celular',
        'correo',
        'horario',
        'lat',
        'lng',
    ];
}
