<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\blogs;
use Illuminate\Http\Request;

class blogsController extends Controller
{
    public function index()
    {
        $categorias = blogs::orderBy('id', 'desc')->get();
        return $categorias;
    }

    public function store(Request $request)
    {
        $saveCategorias = new blogs();
        $request->validate([
            'titulo'=>'required|string',
            'resumen'=>'required',
            'imagen1' => 'required',
            'descripcion' => 'nullable',

        ]);

        $saveCategorias->titulo = $request->titulo;
        $saveCategorias->resumen = $request->resumen;
        $saveCategorias->descripcion = $request->descripcion;

        if ($request->hasFile('imagen1')) {
            $file = $request->file('imagen1');
            $filename = $file->getClientOriginalName();
            $name_File = str_replace(" ", "_", $filename);

            $pictureImagen1 = date('His') . '-' . $name_File;
            $file->move(public_path('blog/'), $pictureImagen1);
        }

        $saveCategorias->imagen1 = $pictureImagen1;

        $result = $saveCategorias->save();

        if ($result) {
            return response()->json(['status' => "success"]);
        } else {
            return response()->json(['status' => "error"]);
        }
    }

    public function update(Request $request, $id){
        $updateCategoria= blogs::findOrFail($id);

        $request->validate([
           'titulo'=>'required|string',
           'resumen'=>'required',
           'imagen1'=>'required',
           'descripcion'=>'nullable'
       ]);

       if($request->hasFile('imagen1')){
        $file = $request->file('imagen1');
        $filename = $file->getClientOriginalName(); 
        $name_File=str_replace(" ","_", $filename);
        
        $picture1 = date('His').'-'.$name_File;
        $file->move(public_path('blog/'),$picture1);
        $updateCategoria->imagen1 = $picture1;

        $producto = blogs::find($id);
        if ($producto->imagen1 && file_exists(public_path('blog/' . $producto->imagen1))) {
            unlink(public_path('blog/'.$producto -> imagen1));
        }

        }else {
            $verProducto = blogs::find($id);
            $picture1 = $verProducto['imagen1'];
        }

        $updateCategoria->titulo = $request->titulo;
        $updateCategoria->resumen = $request->resumen;
        $updateCategoria->descripcion = $request->descripcion;
        $result =$updateCategoria->save();

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }
    }

    public function destroy($id){
        $producto =  blogs::find($id);
        
        if ($producto->imagen1 && file_exists(public_path('blog/' . $producto->imagen1))) {
            unlink(public_path('blog/' . $producto->imagen1));
        }

        $result = blogs::destroy($id);

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }

    }

    public function show($id){
        $verCategoria = blogs::find($id);
        return $verCategoria;
    }
}
