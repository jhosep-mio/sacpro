<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\marcas;
use Illuminate\Http\Request;

class marcasController extends Controller
{
    public function index()
    {
        $categorias = marcas::orderBy('id', 'desc')->get();
        return $categorias;
    }

    public function store(Request $request)
    {
        $saveproducto = new marcas();

        $request->validate([
            'nombre'=>'required',
            'imagen1' =>'required',
        ]);

        $saveproducto->nombre = $request->nombre;


        if($request->hasFile('imagen1')){
            $file = $request->file('imagen1');
            $filename = $file->getClientOriginalName(); 
            $name_File=str_replace(" ","_", $filename);
            
            $pictureImagen1 = date('His').'-'.$name_File;
            $file->move(public_path('marcas/'),$pictureImagen1);
        }  
       
        $saveproducto->imagen1 = $pictureImagen1;

        $result = $saveproducto->save();

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }
    }

    public function show($id)
    {
        $verCategoria = marcas::find($id);
        return $verCategoria;
    }

    public function update(Request $request, $id)
    {
        $updateCategoria = marcas::findOrFail($id);

        $request->validate([
            'nombre'=>'required|string',
        ]);

        if ($request->hasFile('imagen1')) {
            $file = $request->file('imagen1');
            $filename = $file->getClientOriginalName();
            $name_File = str_replace(" ", "_", $filename);

            $picture1 = date('His') . '-' . $name_File;
            $file->move(public_path('marcas/'), $picture1);
            $updateCategoria->imagen1 = $picture1;

            $producto = marcas::find($id);
            if ($producto->imagen1 && file_exists(public_path('marcas/' . $producto->imagen1))) {
                unlink(public_path('marcas/' . $producto->imagen1));
            }
        } else {
            $verProducto = marcas::find($id);
            $picture1 = $verProducto['imagen1'];
        }

        $updateCategoria->nombre = $request->nombre;
        $updateCategoria->imagen1 = $picture1;

        $result = $updateCategoria->save();

        if ($result) {
            return response()->json(['status' => "success"]);
        } else {
            return response()->json(['status' => "error"]);
        }
    }

    public function destroy($id)
    {
        $producto =  marcas::find($id);

        if ($producto->imagen1 && file_exists(public_path('marcas/' . $producto->imagen1))) {
            unlink(public_path('marcas/' . $producto->imagen1));
        }

        $result = marcas::destroy($id);

        if ($result) {
            return response()->json(['status' => "success"]);
        } else {
            return response()->json(['status' => "error"]);
        }
    }
}
