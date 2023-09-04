<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\coberturas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class coberturaController extends Controller
{
    public function index(){
        $productos = coberturas::join('departamentos', 'coberturas.departamentos_id', '=', 'departamentos.id')
        ->join('provincias', 'coberturas.provincias_id', '=', 'provincias.id_provincia')
        ->join('distritos', 'coberturas.distritos_id', '=', 'distritos.id')
        ->select(
            'coberturas.*', 
            'departamentos.nombre as departamento',
            'provincias.nombre as provincia',
            'distritos.nombre as distrito'
        )
        ->orderBy('coberturas.id', 'asc')
        ->get();

    return $productos;
    }

    public function index2(){
        $productos = coberturas::join('departamentos', 'coberturas.departamentos_id', '=', 'departamentos.id')
        ->join('provincias', 'coberturas.provincias_id', '=', 'provincias.id_provincia')
        ->join('distritos', 'coberturas.distritos_id', '=', 'distritos.id')
        ->select(
            'coberturas.*', 
            'departamentos.nombre as departamento',
            'provincias.nombre as provincia',
            'distritos.nombre as distrito'
        )
        ->orderBy('coberturas.id', 'asc')
        ->get();
    
        return $productos; // Convertir a JSON para visualización
    }

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

    public function show($id){

        $productos = coberturas::join('departamentos', 'coberturas.departamentos_id', '=', 'departamentos.id')
        ->join('provincias', 'coberturas.provincias_id', '=', 'provincias.id_provincia')
        ->join('distritos', 'coberturas.distritos_id', '=', 'distritos.id')
        ->select(
            'coberturas.*', 
            'departamentos.nombre as departamento',
            'provincias.nombre as provincia',
            'distritos.nombre as distrito'
        )
            ->where('coberturas.id', '=', $id)
        ->orderBy('coberturas.id', 'asc')->get();
        return $productos;
    }

    public function cober($id) {
        $productos = coberturas::select(
                'coberturas.*', 
                DB::raw('(SELECT nombre FROM departamentos WHERE id = coberturas.departamentos_id) as departamento'),
                'provincias.nombre as provincia',
                'distritos.nombre as distrito'
            )
            ->join('provincias', 'coberturas.provincias_id', '=', 'provincias.id_provincia')
            ->join('distritos', 'coberturas.distritos_id', '=', 'distritos.id')
            ->where('coberturas.distritos_id', '=', $id)
            ->orderBy('coberturas.id', 'asc')
            ->get();
    
        return $productos;
    }

    public function buscar() {
        $categorias = coberturas::orderBy('id', 'desc')->get();
        return $categorias;
    }


    public function store(Request $request){
        $saveproducto = new coberturas();


       $request->validate([
            'departamentos_id'=>'required',
            'provincias_id'=>'required',
            'distritos_id'=>'required',
            'imagen1'=>'required'
        ]);

        $saveproducto->departamentos_id = $request->departamentos_id;
        $saveproducto->provincias_id = $request->provincias_id;
        $saveproducto->distritos_id = $request->distritos_id;

        if($request->hasFile('imagen1')){
            $file = $request->file('imagen1');
            $filename = $file->getClientOriginalName(); 
            $name_File=str_replace(" ","_", $filename);
            
            $pictureImagen1 = date('His').'-'.$name_File;
            $file->move(public_path('coberturas/'),$pictureImagen1);
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
        $saveCategorias= coberturas::findOrFail($id);

        $validatedData =    $request->validate([
            'departamentos_id'=>'required',
            'provincias_id'=>'required',
            'id_distrito'=>'required',
        ]);

        $validatedData = array_map(function ($value) {
            return $value === 'null' ? null : $value;
        }, $validatedData);

        $saveCategorias->celular = $validatedData['celular'];
        $saveCategorias->nombre = $validatedData['nombre'];
        $saveCategorias->lat = $validatedData['lat'];
        $saveCategorias->lng = $validatedData['lng'];
        $saveCategorias->correo = $validatedData['correo'];
        $saveCategorias->direccion = $validatedData['direccion'];
        $saveCategorias->horario = $validatedData['horario'];

        if($request->hasFile('imagen1')){
            $file = $request->file('imagen1');
            $filename = $file->getClientOriginalName(); 
            $name_File=str_replace(" ","_", $filename);
            
            $picture1 = date('His').'-'.$name_File;
            $file->move(public_path('coberturas/'),$picture1);
            $saveCategorias->imagen1 = $picture1;

            $producto = coberturas::find($id);
            if ($producto->imagen1 && file_exists(public_path('coberturas/' . $producto->imagen1))) {
                unlink(public_path('coberturas/'.$producto -> imagen1));
            }

        }else {
            $verProducto = coberturas::find($id);
            $picture1 = $verProducto['imagen1'];
        }

        $result = $saveCategorias->save();

        if ($result) {
            return response()->json(['status' => "success"]);
        } else {
            return response()->json(['status' => "error"]);
        }
    }

    public function destroy($id){
        $producto =  coberturas::find($id);
        
        if ($producto->imagen1 && file_exists(public_path('coberturas/' . $producto->imagen1))) {
            unlink(public_path('coberturas/' . $producto->imagen1));
        }

        $result = coberturas::destroy($id);

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }
    }
}
