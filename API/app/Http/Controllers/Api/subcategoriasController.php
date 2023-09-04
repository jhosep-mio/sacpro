<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\subcategorias;
use Illuminate\Http\Request;

class subcategoriasController extends Controller
{
    public function index(){
        $productos = subcategorias::join('categorias', 'subcategorias.id_categoria', '=', 'categorias.id')
                            ->select(
                                'subcategorias.*', 
                                'categorias.nombre as categoria')
                            ->orderBy('subcategorias.id', 'asc')->get();
        return $productos;
    }

    
    public function show($id){
        $verProducto = subcategorias::find($id);
        return $verProducto;
    }

    public function store(Request $request)
    {
        $saveproducto = new subcategorias();

        $request->validate([
            'id_categoria'=>'required',
            'nombre'=>'required',
            
        ]);

        $saveproducto->id_categoria = $request->id_categoria;
        $saveproducto->nombre = $request->nombre;
        $result = $saveproducto->save();

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }
    }

    public function update(Request $request, $id)
    {
        $updateProducto= subcategorias::findOrFail($id);

        $request->validate([
            'id_categoria'=>'required',
            'nombre'=>'required',

        ]);

        $updateProducto->id_categoria = $request->id_categoria;
        $updateProducto->nombre = $request->nombre;

        $result =$updateProducto->save();

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }
    }

        
    public function destroy($id){
        $producto =  subcategorias::find($id);


        $result = subcategorias::destroy($id);

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }
    }

}
