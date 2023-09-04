<?php

namespace App\Http\Controllers\Api;

use Lyra\Client;
use App\Http\Controllers\Controller;
use App\Models\banner;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

require_once __DIR__ . './../../../../vendor/autoload.php';
require_once __DIR__ . './keys.php';
// require_once __DIR__ . '/helpers.php';

class bannerController extends Controller
{

    public function enviarSolicitudPago()
    {
        $client = new Client();

        if (isset($_GET['requestObject'])) {
            $store = json_decode($_GET['requestObject']);
        } else {
            $store = array(
                "amount" => 250,
                "currency" => "PEN",
                "orderId" => uniqid("MyOrderId"),
                "customer" => array(
                    "email" => "sample@example.com"
                )
            );
        }

        $response = $client->post("V4/Charge/CreatePayment", $store);
            return ['data' => $response];

    }

    // public function enviarSolicitudPago()
    // {
    //     $client = new Client();  
    //     // Datos de usuario y contraseña
    //     $username = '42067562';
    //     $password = 'testpassword_uQEqlBajHnI1dC8fhbovh2AHKtKUc31waFBS71qYN71mr';

    //     // URL de la solicitud
    //     $url = 'https://api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment';

    //     $requestData = [
    //         "amount" => 180,
    //         "currency" => "PEN",
    //         "paymentForms" => [
    //             "paymentMethodType" => "CARD",
    //             "pan" => "4970100000000055",
    //             "expiryMonth" => "11",
    //             "expiryYear" => "21",
    //             "securityCode" => "123"
    //         ]
    //     ];

    //     // Codificar la cadena de autenticación en base64
    //     $authHeader = "Authorization: Basic " . base64_encode($username . ':' . $password);

    //     // Configuración de la solicitud cURL
    //     $ch = curl_init($url);
    //     curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    //     curl_setopt($ch, CURLOPT_HTTPHEADER, [
    //         'Content-Type: application/json',
    //         $authHeader, // Agregar el encabezado de autorización
    //     ]);
    //     curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestData));
    //     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    //     // Ejecutar la solicitud cURL
    //     $response = curl_exec($ch);
    //     // Manejar la respuesta o los errores aquí
    //     if ($response === false) {
    //         return ['error' => 'Error de cURL: ' . curl_error($ch)];
    //     } else {
    //         // Procesa la respuesta aquí si es necesario
    //         $responseData = json_decode($response, true); // Convierte la respuesta JSON en un arreglo
    //         return ['data' => $responseData];
    //     }
    //     curl_close($ch);
    // }

    public function index()
    {
        $categorias = banner::orderBy('banners.id', 'asc')->get();
        return $categorias;
    }

    public function buscar(Request $request)
    {
        $resultados = banner::where('imagen1', 'LIKE', '%' . $request->buscar . '%')
            ->orderBy('id', 'desc')
            ->get();
        return response()->json($resultados);
    }

    public function show($id)
    {
        $verProducto = banner::find($id);
        return $verProducto;
    }

    public function store(Request $request)
    {
        $saveproducto = new banner();

        $request->validate([
            'imagen1' => 'required',
        ]);

        if ($request->hasFile('imagen1')) {
            $file = $request->file('imagen1');
            $filename = $file->getClientOriginalName();
            $name_File = str_replace(" ", "_", $filename);

            $pictureImagen1 = date('His') . '-' . $name_File;
            $file->move(public_path('banner/'), $pictureImagen1);
        }

        $saveproducto->imagen1 = $pictureImagen1;
        $result = $saveproducto->save();

        if ($result) {
            return response()->json(['status' => "success"]);
        } else {
            return response()->json(['status' => "error"]);
        }
    }

    public function update(Request $request, $id)
    {
        $updateProducto = banner::findOrFail($id);

        if ($request->hasFile('imagen1')) {
            $file = $request->file('imagen1');
            $filename = $file->getClientOriginalName();
            $name_File = str_replace(" ", "_", $filename);

            $picture1 = date('His') . '-' . $name_File;
            $file->move(public_path('banner/'), $picture1);
            $updateProducto->imagen1 = $picture1;

            $producto = banner::find($id);
            if ($producto->imagen1 && file_exists(public_path('banner/' . $producto->imagen1))) {
                unlink(public_path('banner/' . $producto->imagen1));
            }
        } else {
            $verProducto = banner::find($id);
            $picture1 = $verProducto['imagen1'];
        }

        $updateProducto->imagen1 = $picture1;

        $result = $updateProducto->save();

        if ($result) {
            return response()->json(['status' => "success"]);
        } else {
            return response()->json(['status' => "error"]);
        }
    }

    public function destroy($id)
    {
        $producto =  banner::find($id);

        if ($producto->imagen1 && file_exists(public_path('banner/' . $producto->imagen1))) {
            unlink(public_path('banner/' . $producto->imagen1));
        }

        $result = banner::destroy($id);

        if ($result) {
            return response()->json(['status' => "success"]);
        } else {
            return response()->json(['status' => "error"]);
        }
    }
}
