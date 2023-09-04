<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\show_productos;
use Illuminate\Http\Request;

class showProductosController extends Controller
{
    public function index(){
        $productos = show_productos::join('productos', 'show_productos.id_productos', '=', 'productos.id')
                            ->select(
                                'show_productos.*', 
                                'productos.nombre as producto')
                            ->orderBy('show_productos.id', 'asc')->get();
        return $productos;
    }

    public function show($id){
        $verProducto = show_productos::find($id);
        return $verProducto;
    }

    public function update(Request $request, $id)
    {
        $updateProducto= show_productos::findOrFail($id);

        $request->validate([
            'id_productos'=>'required',
        ]);

        $updateProducto->id_productos = $request->id_productos;

        $result =$updateProducto->save();

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }
    }
}
