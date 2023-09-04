<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\configuracions;
use Illuminate\Http\Request;

class configuracionsController extends Controller
{
    public function index($id){
        $verCategoria = configuracions::find($id);
        return $verCategoria;
    }

    public function update(Request $request, $id)
    {
        $saveCategorias= configuracions::findOrFail($id);

        $validatedData =    $request->validate([
            'celular1' => 'required',
            'celular2' => 'nullable',
            'correo1' => 'required',
            'correo2' => 'nullable',
            'direccion1' => 'required',
            'direccion2' => 'required',
            'direccion3' => 'required',
            'horario' => 'required',
            'facebook' => 'nullable',
            'instagram' => 'nullable',
            'twiter' => 'nullable',
            'linkedin' => 'nullable',
            'youtube' => 'nullable',
            'whatsapp' => 'nullable',
        ]);

        $validatedData = array_map(function ($value) {
            return $value === 'null' ? null : $value;
        }, $validatedData);

        $saveCategorias->celular1 = $validatedData['celular1'];
        $saveCategorias->celular2 = $validatedData['celular2'];
        $saveCategorias->correo1 = $validatedData['correo1'];
        $saveCategorias->correo2 = $validatedData['correo2'];
        $saveCategorias->direccion1 = $validatedData['direccion1'];
        $saveCategorias->direccion2 = $validatedData['direccion2'];
        $saveCategorias->direccion3 = $validatedData['direccion3'];
        $saveCategorias->horario = $validatedData['horario'];
        $saveCategorias->facebook = $validatedData['facebook'];
        $saveCategorias->instagram = $validatedData['instagram'];
        $saveCategorias->twiter = $validatedData['twiter'];
        $saveCategorias->linkedin = $validatedData['linkedin'];
        $saveCategorias->youtube = $validatedData['youtube'];
        $saveCategorias->whatsapp = $validatedData['whatsapp'];

        $result = $saveCategorias->save();

        if ($result) {
            return response()->json(['status' => "success"]);
        } else {
            return response()->json(['status' => "error"]);
        }
    }
}
