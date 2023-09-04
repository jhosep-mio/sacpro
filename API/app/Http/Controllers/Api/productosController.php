<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\productos;
use Illuminate\Http\Request;

class productosController extends Controller
{
    private function quitarAcentos($cadena)
    {
        $acentos = array(
            'á', 'é', 'í', 'ó', 'ú', 'Á', 'É', 'Í', 'Ó', 'Ú',
            'à', 'è', 'ì', 'ò', 'ù', 'À', 'È', 'Ì', 'Ò', 'Ù',
            'ä', 'ë', 'ï', 'ö', 'ü', 'Ä', 'Ë', 'Ï', 'Ö', 'Ü',
            'â', 'ê', 'î', 'ô', 'û', 'Â', 'Ê', 'Î', 'Ô', 'Û',
            'ã', 'õ', 'ñ', 'ç', 'Ã', 'Õ', 'Ñ', 'Ç'
        );

        $sinAcentos = array(
            'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U',
            'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U',
            'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U',
            'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U',
            'a', 'o', 'n', 'c', 'A', 'O', 'N', 'C'
        );

        $cadenaSinAcentos = str_replace($acentos, $sinAcentos, $cadena);

        return $cadenaSinAcentos;
    }

    public function index(){
        $productos = productos::join('categorias', 'productos.id_categoria', '=', 'categorias.id')
                            ->select(
                                'productos.*', 
                                'categorias.nombre as categoria')
                            ->orderBy('productos.id', 'asc')->get();
        return $productos;
    }

    public function buscar(Request $request) {
        $search = '%' . $this->quitarAcentos($request->buscar) . '%';
        $resultados = productos::join('categorias', 'productos.id_categoria', '=', 'categorias.id')
                                ->select(
                                    'productos.*', 
                                    'categorias.nombre as categoria')
                                ->where('productos.imagen1', 'LIKE', $search)
                                ->orWhere('productos.nombre', 'LIKE', $search)
                                ->orWhere('categorias.nombre', 'LIKE', $search)
                                ->orderBy('id', 'desc')
                                ->get();
        return response()->json($resultados);
    }

    public function indexWhere($id){
        $productos = productos::join('categorias', 'productos.id_categoria', '=', 'categorias.id')
                            ->select(
                                'productos.*', 
                                'categorias.nombre as categoria')
                            ->where('productos.id_categoria', '=' , $id)    
                            ->orderBy('productos.id', 'asc')->get();
        return $productos;
    }

    public function whereFavoritos(){
        $productos = productos::join('categorias', 'productos.id_categoria', '=', 'categorias.id')
                            ->select(
                                'productos.*', 
                                'categorias.nombre as categoria')
                            ->where('productos.favoritos', '=' , "true")    
                            ->orderBy('productos.id', 'asc')->get();
        return $productos;
    }

    public function fromCategory($id){
        $productos = productos::join('categorias', 'productos.id_categoria', '=', 'categorias.id')
                            ->select(
                                'productos.*', 
                                'categorias.nombre as categoria')
                            ->where('productos.id_categoria', '=' , $id)    
                            ->orderBy('productos.id', 'asc')->get();
        return $productos;
    }

    public function whereNuevos(){
        $productos = productos::join('categorias', 'productos.id_categoria', '=', 'categorias.id')
                            ->select(
                                'productos.*', 
                                'categorias.nombre as categoria')
                            ->LIMIT(10)   
                            ->orderBy('productos.id', 'asc')->get();
        return $productos;
    }

    public function show($id){

        $productos = productos::join('categorias', 'productos.id_categoria', '=', 'categorias.id')
        ->join('marcas', 'productos.id_marca', '=', 'marcas.id')
        ->select(
            'productos.*', 
            'categorias.nombre as categoria',
            'marcas.nombre as marcas'
            )
            ->where('productos.id', '=', $id)
        ->orderBy('productos.id', 'asc')->get();
        return $productos;
    }


    public function store(Request $request)
    {
        $saveproducto = new productos();

        $request->validate([
            'id_categoria'=>'required',
            'id_subcategoria'=>'required',
            'id_marca' => 'required',
            'codigo'=>'required',
            'stock'=>'required',
            'nombre'=>'required',
            'imagen1' =>'required',
            'imagen2' =>'nullable',
            'imagen3' =>'nullable',
            'caracteristicas'=>'nullable',
            'colores'=>'required',
            'usos'=>'required',
            'precio1'=>'required',
            'precio2'=>'required',
            'tipoprecio'=>'required',
            'cantidadMayor'=>'nullable',
            'favoritos'=>'required',
        ]);

        if($request->cantidadMayor == 'null' || $request->cantidadMayor == null){
            $saveproducto->cantidadMayor = 0;
        }

        else{
            $saveproducto->cantidadMayor = $request->cantidadMayor;
        }
        
        $saveproducto->id_categoria = $request->id_categoria;

        $saveproducto->id_subcategoria = $request->id_subcategoria;
        $saveproducto->id_marca = $request->id_marca;
        $saveproducto->codigo = $request->codigo;
        $saveproducto->stock = $request->stock;
        $saveproducto->nombre = $request->nombre;
        $saveproducto->precio1 = $request->precio1;
        $saveproducto->precio2 = $request->precio2;
        $saveproducto->tipoprecio = $request->tipoprecio;
        $saveproducto->favoritos = $request->favoritos;
        $saveproducto->colores = $request->colores;
        $saveproducto->usos = $request->usos;

        if($request->caracteristicas === "null"){
            $saveproducto->caracteristicas = null;
        }else{
            $saveproducto->caracteristicas = $request->caracteristicas;
        }


        if($request->hasFile('imagen1')){
            $file = $request->file('imagen1');
            $filename = $file->getClientOriginalName(); 
            $name_File=str_replace(" ","_", $filename);
            
            $pictureImagen1 = date('His').'-'.$name_File;
            $file->move(public_path('productos/'),$pictureImagen1);
        }  

        if($request->hasFile('imagen2')){
            $file = $request->file('imagen2');
            $filename = $file->getClientOriginalName(); 
            $name_File=str_replace(" ","_", $filename);
            
            $pictureImagen2 = date('His').'-'.$name_File;
            $file->move(public_path('productos/'),$pictureImagen2);
        }  

        if($request->hasFile('imagen3')){
            $file = $request->file('imagen3');
            $filename = $file->getClientOriginalName(); 
            $name_File=str_replace(" ","_", $filename);
            
            $pictureImagen3 = date('His').'-'.$name_File;
            $file->move(public_path('productos/'),$pictureImagen3);
        }  
       
        $saveproducto->imagen1 = $pictureImagen1;

        if(isset($pictureImagen2)){
            $saveproducto->imagen2 = $pictureImagen2;
        }else{
            $saveproducto->imagen2 = null;
        }

        if(isset($pictureImagen3)){
            $saveproducto->imagen3 = $pictureImagen3;
        }else{
            $saveproducto->imagen3  = null;
        }


        $result = $saveproducto->save();

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }
    }

    public function update(Request $request, $id)
    {
        $updateProducto= productos::findOrFail($id);

        $request->validate([
            'id_categoria'=>'required',
            'id_subcategoria'=>'required',
            'id_marca' => 'required',
            'nombre'=>'required',
            'codigo'=>'required',
            'stock'=>'required',
            'caracteristicas'=>'nullable',
            'precio1'=>'required',
            'precio2'=>'required',
            'cantidadMayor'=>'required',
            'colores'=>'required',
            'usos'=>'required',
            'favoritos'=>'required',
        ]);

        $updateProducto->id_categoria = $request->id_categoria;
        $updateProducto->id_marca = $request->id_marca;
        $updateProducto->codigo = $request->codigo;
        $updateProducto->nombre = $request->nombre;
        $updateProducto->stock = $request->stock;
        $updateProducto->precio1 = $request->precio1;
        $updateProducto->precio2 = $request->precio2;
        $updateProducto->cantidadMayor = $request->cantidadMayor;
        $updateProducto->favoritos = $request->favoritos;
        $updateProducto->colores = $request->colores;
        $updateProducto->usos = $request->usos;


        if($request->caracteristicas === "null"){
            $updateProducto->caracteristicas = null;
        }else{
            $updateProducto->caracteristicas = $request->caracteristicas;
        }

        if($request->hasFile('imagen1')){
            $file = $request->file('imagen1');
            $filename = $file->getClientOriginalName(); 
            $name_File=str_replace(" ","_", $filename);
            
            $picture1 = date('His').'-'.$name_File;
            $file->move(public_path('productos/'),$picture1);

            $producto = productos::find($id);
            if ($producto->imagen1 && file_exists(public_path('productos/' . $producto->imagen1))) {
                unlink(public_path('productos/'.$producto -> imagen1));
            }

        }else {
            $verProducto = productos::find($id);
            $picture1 = $verProducto['imagen1'];
        }

        if($request->hasFile('imagen2')){
            $file = $request->file('imagen2');
            $filename = $file->getClientOriginalName(); 
            $name_File=str_replace(" ","_", $filename);
            
            $picture2 = date('His').'-'.$name_File;
            $file->move(public_path('productos/'),$picture2);

            $producto =  productos::find($id);
            if ($producto->imagen2 && file_exists(public_path('productos/' . $producto->imagen2))) {
                unlink(public_path('productos/'.$producto -> imagen2));
            }

        }else {
            $verProducto = productos::find($id);
            $picture2 = $verProducto['imagen2'];
        }

        if($request->hasFile('imagen3')){
            $file = $request->file('imagen3');
            $filename = $file->getClientOriginalName(); 
            $name_File=str_replace(" ","_", $filename);
            
            $picture3 = date('His').'-'.$name_File;
            $file->move(public_path('productos/'),$picture3);

            $producto =  productos::find($id);
            if ($producto->imagen3 && file_exists(public_path('productos/' . $producto->imagen3))) {
                unlink(public_path('productos/'.$producto -> imagen3));
            }

        }else {
            $verProducto = productos::find($id);
            $picture3 = $verProducto['imagen3'];
        }


        $updateProducto->imagen1 = $picture1;

        if(isset($picture2)){
            $updateProducto->imagen2 = $picture2;
        }else{
            $updateProducto->imagen2  = null;
        }

        if(isset($picture3)){
            $updateProducto->imagen3 = $picture3;
        }else{
            $updateProducto->imagen3 = null;
        }


        $result =$updateProducto->save();

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }
    }

    public function destroy($id){
        $producto =  productos::find($id);

        if ($producto->imagen1 && file_exists(public_path('productos/' . $producto->imagen1))) {
            unlink(public_path('productos/' . $producto->imagen1));
        }
        if ($producto->imagen2 && file_exists(public_path('productos/' . $producto->imagen2))) {
            unlink(public_path('productos/' . $producto->imagen2));
        }
        if ($producto->imagen3 && file_exists(public_path('productos/' . $producto->imagen3))) {
            unlink(public_path('productos/' . $producto->imagen3));
        }

        $result = productos::destroy($id);

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }
    }

}
