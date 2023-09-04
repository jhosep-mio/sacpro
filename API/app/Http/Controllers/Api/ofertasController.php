<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ofertas;
use Illuminate\Http\Request;

class ofertasController extends Controller
{
    public function index(){
        $categorias = ofertas::orderBy('id', 'asc')->get();
        return $categorias;
    }

    public function buscar(Request $request) {
        $resultados = ofertas::where('imagen1', 'LIKE', '%' . $request->buscar . '%')
                                ->orderBy('id', 'desc')
                                ->get();
        return response()->json($resultados);
    }

    public function show($id){
        $verProducto = ofertas::find($id);
        return $verProducto;
    }

    public function store(Request $request)
    {
        $saveproducto = new ofertas();

        $request->validate([
            'imagen1' =>'required',
        ]);

        if($request->hasFile('imagen1')){
            $file = $request->file('imagen1');
            $filename = $file->getClientOriginalName(); 
            $name_File=str_replace(" ","_", $filename);
            
            $pictureImagen1 = date('His').'-'.$name_File;
            $file->move(public_path('ofertas/'),$pictureImagen1);
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
        $updateProducto= ofertas::findOrFail($id);

        if($request->hasFile('imagen1')){
            $file = $request->file('imagen1');
            $filename = $file->getClientOriginalName(); 
            $name_File=str_replace(" ","_", $filename);
            
            $picture1 = date('His').'-'.$name_File;
            $file->move(public_path('ofertas/'),$picture1);
            $updateProducto->imagen1 = $picture1;

            $producto = ofertas::find($id);
            if ($producto->imagen1 && file_exists(public_path('ofertas/' . $producto->imagen1))) {
                unlink(public_path('ofertas/'.$producto -> imagen1));
            }

        }else {
            $verProducto = ofertas::find($id);
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
        $producto =  ofertas::find($id);

        if ($producto->imagen1 && file_exists(public_path('ofertas/' . $producto->imagen1))) {
            unlink(public_path('ofertas/' . $producto->imagen1));
        }

        $result = ofertas::destroy($id);

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }
    }
}
