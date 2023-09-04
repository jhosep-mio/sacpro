<?php

use App\Http\Controllers\Api\bannerController;
use App\Http\Controllers\Api\colorController;
use App\Http\Controllers\Api\blogsController;
use App\Http\Controllers\Api\categoriasController;
use App\Http\Controllers\Api\categoriasOtherController;
use App\Http\Controllers\Api\coberturaController;
use App\Http\Controllers\Api\configuracionsController;
use App\Http\Controllers\Api\distribuidoresController;
use App\Http\Controllers\Api\mailController;
use App\Http\Controllers\Api\marcasController;
use App\Http\Controllers\Api\ofertasController;
use App\Http\Controllers\Api\subcategoriasController;
use App\Http\Controllers\Api\productosController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\showCategoryController;
use App\Http\Controllers\Api\showProductosController;
use App\Http\Controllers\Api\ubicacionController;
use App\Http\Controllers\Api\userController;
use App\Http\Controllers\Api\usosController;
use App\Models\distribuidores;

Route::post('/login', [userController::class, 'login']);
Route::get('/enviarSolicitudPago', [bannerController::class, 'enviarSolicitudPago']);

Route::middleware('auth:sanctum')->post('logout', [userController::class, 'logout']);

// CATEGORIAS
Route::get('/allCategorias', [categoriasController::class, 'index']);
Route::get('/oneCategoria/{id}', [categoriasController::class, 'show']);

// UBICACION
Route::get('/allDepartamentos', [ubicacionController::class, 'indexDepartamentos']);
Route::get('/allProvincias', [ubicacionController::class, 'indexProvincias']);
Route::get('/allDistritos', [ubicacionController::class, 'indexDistritos']);


Route::get('/indexDepartamentosConDistribuidores', [ubicacionController::class, 'indexDepartamentosConDistribuidores']);
Route::get('/indexDepartamentosConCoberturas', [ubicacionController::class, 'indexDepartamentosConCoberturas']);

Route::get('/indexProvinciasConDistribuidores', [ubicacionController::class, 'indexProvinciasConDistribuidores']);

Route::get('/proviciasToDepartamento/{id}', [ubicacionController::class, 'indexProvincias']);
Route::get('/indexDistritos/{id}', [ubicacionController::class, 'indexDistritos']);


Route::get('/getSubcategorias', [subcategoriasController::class, 'index']);
Route::get('/oneSubcategorias/{id}', [subcategoriasController::class, 'show']);

// PRODUCTOS
Route::get('/allProductos', [productosController::class, 'index']);
Route::get('/allProductosGroup/{id}', [productosController::class, 'indexWhere']);
Route::get('/oneProducto/{id}', [productosController::class, 'show']);
Route::get('/productosWhereFavorites', [productosController::class, 'whereFavoritos']);
Route::get('/productosNuevos', [productosController::class, 'whereNuevos']);

Route::get('/oneConfi/{id}', [configuracionsController::class, 'index']);

// BANNER
Route::get('/allBanners', [bannerController::class, 'index']);
Route::get('/oneBanner/{id}', [bannerController::class, 'show']);

//COLORES
Route::get('/allColores', [colorController::class, 'index']);
Route::get('/oneColor/{id}', [colorController::class, 'show']);

//USOS
Route::get('/allUsos', [usosController::class, 'index']);
Route::get('/oneUso/{id}', [usosController::class, 'show']);

// BANNER
Route::get('/allOfertas', [ofertasController::class, 'index']);
Route::get('/oneOferta/{id}', [ofertasController::class, 'show']);


// MARCAS
Route::get('/getMarcas', [marcasController::class, 'index']);

Route::get('/getBlogs', [blogsController::class, 'index']);
Route::get('/oneBlog/{id}', [blogsController::class, 'show']);

//DISTRIBUIDOR
Route::get('/oneDistribuidor/{id}', [distribuidoresController::class, 'show']);
Route::get('/allDistribuidores', [distribuidoresController::class, 'index']);

//COBERTURA
Route::get('/oneCobertura/{id}', [coberturaController::class, 'show']);
Route::get('/allCoberturas', [coberturaController::class, 'index2']);


Route::get('/getShowcategory', [showCategoryController::class, 'index']);
Route::get('/getShowproductos', [showProductosController::class, 'index']);
Route::get('/fromCategory/{id}', [productosController::class, 'fromCategory']);

Route::post('/handleSuccessTransaction', [mailController::class, 'handleSuccessTransaction']);
Route::post('/oneTransaccion', [mailController::class, 'show']);
Route::get('/oneTransa/{id}', [mailController::class, 'show2']);

Route::get('/getTransaction', [mailController::class, 'show2']);

Route::post('/webhook', [mailController::class, 'handleMercadoPagoWebhook']);


Route::group(['middleware' => ["auth:sanctum", 'role: 99']], function () {
    Route::post('/registerUsersAdmins', [userController::class, 'register']);
    Route::middleware('auth:sanctum')->get('user-profile', [userController::class, 'userProfile']);

    Route::controller(bannerController::class)->group(function(){
        Route::post('/getBanners','buscar');
        Route::post('/saveBanner','store');
        Route::put('/updateBanner/{id}','update');
        Route::delete('/deleteBanner/{id}','destroy');
    });

    Route::controller(colorController::class)->group(function(){
        Route::post('/getColores','buscar');
        Route::post('/saveColor','store');
        Route::put('/updateColor/{id}','update');
        Route::delete('/deleteColor/{id}','destroy');
    });

    Route::controller(usosController::class)->group(function(){
        Route::post('/getUsos','buscar');
        Route::post('/saveUso','store');
        Route::put('/updateUso/{id}','update');
        Route::delete('/deleteUso/{id}','destroy');
    });

    Route::controller(distribuidoresController::class)->group(function(){
        Route::post('/getDistribuidores','buscar');
        Route::post('/saveDistribuidor','store');
        Route::put('/updateDistribuidor/{id}','update');
        Route::delete('/deleteDistribuidor/{id}','destroy');
    });

    Route::controller(coberturaController::class)->group(function(){
        Route::post('/getCoberturas','index');
        Route::post('/saveCobertura','store');
        Route::put('/updateCobertura/{id}','update');
        Route::delete('/deleteCobertura/{id}','destroy');
    });

    
    Route::controller(ofertasController::class)->group(function(){
        Route::post('/getOfertas','buscar');
        Route::post('/saveOfertas','store');
        Route::put('/updateOfertas/{id}','update');
        Route::delete('/deleteOfertas/{id}','destroy');
    });

    Route::controller(marcasController::class)->group(function(){
        Route::post('/saveMarca','store');
        Route::put('/updateMarca/{id}','update');
        Route::get('/oneMarca/{id}','show');
        Route::delete('/deleteMarca/{id}','destroy');
    });

    Route::controller(categoriasController::class)->group(function(){
        Route::post('/getCategorias','buscar');
        Route::post('/saveCategoria','store');
        Route::put('/updateCategoria/{id}','update');
        Route::delete('/deleteCategoria/{id}','destroy');
    });

    Route::controller(subcategoriasController::class)->group(function(){
        Route::post('/saveSubcategorias','store');
        Route::put('/updateSubcategorias/{id}','update');
        Route::delete('/deleteSubcategorias/{id}','destroy');
    });

    Route::controller(mailController::class)->group(function(){
        Route::post('/enviarCorreo','enviarCorreo');
        Route::post('/getTransaccion','buscar');
        Route::get('/getTransacciones','index');
        Route::put('/updateTransaccion/{id}','update');
    });

    Route::controller(blogsController::class)->group(function(){
        Route::post('/saveBlog','store');
        Route::put('/updateBlog/{id}','update');
        Route::delete('/deleteBlog/{id}','destroy');

    });

    Route::controller(showCategoryController::class)->group(function(){
        Route::put('/updateShowcategory/{id}','update');
        Route::get('/oneShowcategory/{id}','show');
    });

    Route::controller(showProductosController::class)->group(function(){
        Route::put('/updateShowproductos/{id}','update');
        Route::get('/oneShowproductos/{id}','show');
    });

    Route::controller(productosController::class)->group(function(){
        Route::post('/saveProducto','store');
        Route::delete('/deleteProducto/{id}','destroy');
        Route::put('/updateProducto/{id}','update');
        Route::post('/getProductos','buscar');
    });

    Route::controller(configuracionsController::class)->group(function(){
        Route::put('/updateConfiguracion/{id}','update');
    });

    Route::controller(ubicacionController::class)->group(function(){
        Route::post('/saveDistrito', 'saveDistrito');
    });
});
