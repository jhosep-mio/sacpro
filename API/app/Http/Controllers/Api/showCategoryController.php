<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\show_category;
use Illuminate\Http\Request;

class showCategoryController extends Controller
{
    public function index(){
        $productos = show_category::join('categorias', 'show_categories.id_categoria', '=', 'categorias.id')
                            ->select(
                                'show_categories.*', 
                                'categorias.nombre as categoria')
                            ->orderBy('show_categories.id', 'asc')->get();
        return $productos;
    }

    public function show($id){
        $verProducto = show_category::find($id);
        return $verProducto;
    }

    public function update(Request $request, $id)
    {
        $updateProducto= show_category::findOrFail($id);

        $request->validate([
            'id_categoria'=>'required',
        ]);

        $updateProducto->id_categoria = $request->id_categoria;

        $result =$updateProducto->save();

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }
    }
}
