<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\departamentos;
use App\Models\provincias;
use App\Models\distritos;
use Illuminate\Http\Request;

class ubicacionController extends Controller
{
    public function indexDepartamentos()
    {
        $productos = departamentos::select(
            'departamentos.*'
        )
            ->orderBy('departamentos.id', 'asc')->get();
        return $productos;
    }

    public function indexProvincias()
    {
        $productos = provincias::select(
            'provincias.*'
        )
            ->orderBy('provincias.id_provincia', 'asc')->get();
        return $productos;
    }

    public function indexDistritos()
    {
        $productos = distritos::select(
            'distritos.*'
        )
            ->orderBy('distritos.id_provincia', 'asc')->get();
        return $productos;
    }

    public function indexDepartamentosConDistribuidores()
    {
        $departamentosConDistribuidores = departamentos::whereHas('distribuidores', function ($query) {
            $query->whereRaw('departamentos.id = distribuidores.departamentos_id');
        })
        ->orderBy('id', 'asc')
        ->get();
        return $departamentosConDistribuidores;
    }

    public function indexDepartamentosConCoberturas()
    {
        $departamentosConDistribuidores = departamentos::whereHas('coberturas', function ($query) {
            $query->whereRaw('departamentos.id = coberturas.departamentos_id');
        })
        ->orderBy('id', 'asc')
        ->get();
        return $departamentosConDistribuidores;
    }

    public function indexProvinciasConDistribuidores()
    {
        $departamentosConDistribuidores = provincias::whereHas('distribuidores', function ($query2) {
            $query2->whereRaw('provincias.id_provincia = distribuidores.provincia_id');
        })
        ->orderBy('id', 'asc')
        ->get();
        return $departamentosConDistribuidores;
    }


    public function saveDistrito(Request $request){
        $saveDistrito = new distritos();

        $request->validate([
            'nombre' => 'required',
            'id_provincia'=>'required',
        ]);

        $saveDistrito->nombre = $request ->nombre;
        $saveDistrito->id_provincia = $request ->id_provincia;

        $result = $saveDistrito->save();

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }
    }

    // public function indexProvincias($id)
    // {
    //     $productos = provincias::join('departamentos', 'provincias.id_departamento', '=', 'departamentos.id')
    //         ->select(
    //             'provincias.*',
    //             'departamentos.nombre as departamentos'
    //         )
    //         ->where('departamentos.id', '=', $id)
    //         ->orderBy('provincias.id_provincia', 'asc')->get();
    //     return $productos;
    // }

    // public function indexDistritos($id)
    // {
    //     $productos = distritos::join('provincias', 'distritos.id_provincia', '=', 'provincias.id_provincia')
    //         ->select(
    //             'distritos.*',
    //             'provincias.nombre as provincias'
    //         )
    //         ->where('provincias.id_provincia', '=', $id)
    //         ->orderBy('distritos.id', 'asc')->get();
    //     return $productos;
    // }
}
