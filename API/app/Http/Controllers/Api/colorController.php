<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\colores;
use Illuminate\Http\Request;

class colorController extends Controller
{
   
    public function index(){
        $categorias = colores::orderBy('colores.id', 'asc')->get();
        return $categorias;
    }

    public function buscar(Request $request) {
        $resultados = colores::where('imagen1', 'LIKE', '%' . $request->buscar . '%')
                                ->orderBy('id', 'desc')
                                ->get();
        return response()->json($resultados);
    }

    public function show($id){
        $verProducto = colores::find($id);
        return $verProducto;
    }

    public function store(Request $request)
    {
        $saveproducto = new colores();

        $request->validate([
            'imagen1' =>'required',
        ]);

        if($request->hasFile('imagen1')){
            $file = $request->file('imagen1');
            $filename = $file->getClientOriginalName(); 
            $name_File=str_replace(" ","_", $filename);
            
            $pictureImagen1 = date('His').'-'.$name_File;
            $file->move(public_path('colores/'),$pictureImagen1);
        }  

        $saveproducto->imagen1 = $pictureImagen1;
        $result = $saveproducto->save();

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }
    }

    public function update(Request $request, $id)
    {
        $updateProducto= colores::findOrFail($id);

        if($request->hasFile('imagen1')){
            $file = $request->file('imagen1');
            $filename = $file->getClientOriginalName(); 
            $name_File=str_replace(" ","_", $filename);
            
            $picture1 = date('His').'-'.$name_File;
            $file->move(public_path('colores/'),$picture1);
            $updateProducto->imagen1 = $picture1;

            $producto = colores::find($id);
            if ($producto->imagen1 && file_exists(public_path('colores/' . $producto->imagen1))) {
                unlink(public_path('colores/'.$producto -> imagen1));
            }

        }else {
            $verProducto = colores::find($id);
            $picture1 = $verProducto['imagen1'];
        }
        
        $updateProducto->imagen1 = $picture1;

        $result =$updateProducto->save();

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }
    }

    public function destroy($id){
        $producto =  colores::find($id);

        if ($producto->imagen1 && file_exists(public_path('colores/' . $producto->imagen1))) {
            unlink(public_path('colores/' . $producto->imagen1));
        }

        $result = colores::destroy($id);

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }
    }
}
