<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\distribuidores;
use Illuminate\Http\Request;

class distribuidoresController extends Controller
{
    public function index(){
        $productos = distribuidores::join('categorias', 'distribuidores.idCategoria', '=', 'categorias.id')
                            ->select(
                                'distribuidores.*', 
                                'categorias.nombre as categoria')
                            ->orderBy('distribuidores.id', 'asc')->get();
        return $productos;
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

        $productos = distribuidores::join('categorias', 'distribuidores.idCategoria', '=', 'categorias.id')
        ->select(
            'distribuidores.*', 
            'categorias.nombre as categoria',
            )
            ->where('distribuidores.id', '=', $id)
        ->orderBy('distribuidores.id', 'asc')->get();
        return $productos;
    }

    public function buscar(Request $request) {
        $search = '%' . $this->quitarAcentos($request->buscar) . '%';
        $resultados = distribuidores::where('distribuidores.nombre', 'LIKE', $search)
                                ->orderBy('id', 'desc')
                                ->get();
        return response()->json($resultados);
    }


    public function store(Request $request){
        $saveproducto = new distribuidores();


       $request->validate([
            'nombre' => 'required',
            'celular' => 'required',
            'correo' => 'required',
            'idCategoria' => 'required',
            'direccion' => 'required',
            'horario' => 'required',
            'lat'=> 'required',
            'lng' => 'required',
            'departamentos_id'=>'required',
            'provincias_id'=>'required',
            'id_distrito'=>'required'
        ]);

        $saveproducto->idCategoria = $request->idCategoria;
        $saveproducto->celular = $request->celular;
        $saveproducto->nombre = $request ->nombre;
        $saveproducto->lat = $request ->lat;
        $saveproducto->lng = $request ->lng;
        $saveproducto->correo = $request ->correo;
        $saveproducto->direccion = $request ->direccion;
        $saveproducto->horario = $request ->horario;
        $saveproducto->departamentos_id = $request->departamentos_id;
        $saveproducto->provincias_id = $request->provincias_id;
        $saveproducto->id_distrito = $request->id_distrito;

        $result = $saveproducto->save();

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }
    }

    public function update(Request $request, $id)
    {
        $saveCategorias= distribuidores::findOrFail($id);

        $validatedData =    $request->validate([
            'nombre' => 'required',
            'celular' => 'required',
            'correo' => 'required',
            'idCategoria' => 'required',
            'direccion' => 'required',
            'horario' => 'required',
            'lat'=> 'required',
            'lng' => 'required',
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

        $result = $saveCategorias->save();

        if ($result) {
            return response()->json(['status' => "success"]);
        } else {
            return response()->json(['status' => "error"]);
        }
    }

    public function destroy($id){
        $producto =  distribuidores::find($id);

       
        $result = distribuidores::destroy($id);

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }
    }
}
