import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider'
import { Login } from '../components/public/Login'
import { PrivateLayout } from '../components/private/PrivateLayout'
import Home from '../components/private/tables/Home'
import { ListaBanner} from '../components/private/tables/banners/ListaBanner'
import { ListaOfertas} from '../components/private/tables/ofertas/ListaOfertas'
import { CrearBanner } from '../components/private/tables/banners/CrearBanner'
import { EditarBanner } from '../components/private/tables/banners/EditarBanner'
import { ListaMarcas } from '../components/private/tables/marcas/ListaMarcas'
import { CrearMarca } from '../components/private/tables/marcas/CrearMarca'
import { EditarMarca } from '../components/private/tables/marcas/EditarMarca'
import { ListaCategorias } from '../components/private/tables/categorias/ListaCategorias'
import { CrearCategoria } from '../components/private/tables/categorias/CrearCategoria'
import { EditarCategoria } from '../components/private/tables/categorias/EditarCategoria'
import { ListaProductos } from '../components/private/tables/productos/ListaProductos'
import { CrearProducto } from '../components/private/tables/productos/CrearProducto'
import { EditarProducto } from '../components/private/tables/productos/EditarProducto'
import { EditarContacto } from '../components/private/tables/contacto/EditarContacto'
import { ListaTransacciones } from '../components/private/tables/transacciones/ListaTransacciones'
import { EditarTransaccion } from '../components/private/tables/transacciones/EditarTransaccion'
import CrearOferta from '../components/private/tables/ofertas/CrearOferta'
import EditarOferta from '../components/private/tables/ofertas/EditarOferta'
import { ListarSubcategorias } from '../components/private/tables/subcategorias/ListarSubcategorias'
import { CrearSubcategorias } from '../components/private/tables/subcategorias/CrearSubcategorias'
import { EditarSubcategorias } from '../components/private/tables/subcategorias/EditarSubcategorias'
import ListarShowcategory from '../components/private/tables/mostrar/ListarShowcategory'
import { EditarShowcategory } from '../components/private/tables/mostrar/EditarShowcategory'
import { CrearBlog } from '../components/private/tables/blog/CrearBlog'
import { ListarBlog } from '../components/private/tables/blog/ListarBlog'
import { EditarBlog } from '../components/private/tables/blog/EditarBlog'
import AgregarColor from '../components/private/tables/colores/AgregarColor'
import ListaColor from '../components/private/tables/colores/ListarColor'
import EditarColor from '../components/private/tables/colores/EditarColor'
import ListarDistribuidor from '../components/private/tables/distribuidores/ListarDistribuidor'
import AgregarDistribuidor from '../components/private/tables/distribuidores/AgregarDistribuidor'
import EditarDistribuidor from '../components/private/tables/distribuidores/EditarDistribuidor'
import ListaUsos from '../components/private/tables/usos/ListarUsos'
import AgregarUso from '../components/private/tables/usos/AgregarUso'
import EditarUso from '../components/private/tables/usos/EditarUso'
import ListarCoberturas from '../components/private/tables/cobertura/ListarCoberturas'
import AgregarCobertura from '../components/private/tables/cobertura/AgregarCobertura'
import EditarCobertura from '../components/private/tables/cobertura/EditarCobertura'
import AgregarUbicacion from '../components/private/tables/ubicacion/AgregarUbicacion'

export const Routing = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<PrivateLayout />}>
            <Route index element={<Home />} />
            {/* BANNERS
            <Route path="banners" element={<ListaBanners />} />
            <Route path="banners/agregar" element={<CrearBanner />} />
            <Route path="banners/editar/:id" element={<EditarBanner />} /> */}
            {/* SECCIONUNO */}

            {/* CATEGORIAS */}
            <Route path="categorias" element={<ListaCategorias />} />
            <Route path="categorias/agregar" element={<CrearCategoria />} />
            <Route path="categorias/editar/:id" element={<EditarCategoria />} />

            {/* SUBCATEGORIAS */}
            <Route path="subcategorias" element={<ListarSubcategorias />} />
            <Route path="subcategorias/agregar" element={<CrearSubcategorias />} />
            <Route path="subcategorias/editar/:id" element={<EditarSubcategorias />} />

            {/* SHOW CATEGORY */}
            <Route path="showcategory" element={<ListarShowcategory />} />
            <Route path="showcategory/editar/:id" element={<EditarShowcategory/>} />

            {/* BANNERS */}
            <Route path="banners" element={<ListaBanner />} />
            <Route path="banners/agregar" element={<CrearBanner />} />
            <Route path="banners/editar/:id" element={<EditarBanner />} />

            {/* BANNERS */}
            <Route path="distribuidores" element={<ListarDistribuidor />} />
            <Route path="distribuidores/agregar" element={<AgregarDistribuidor />} />
            <Route path="distribuidores/editar/:id" element={<EditarDistribuidor />} />

            {/* COBERTURA */}
            <Route path="coberturas" element={<ListarCoberturas />} />
            <Route path="coberturas/agregar" element={<AgregarCobertura />} />
            <Route path="coberturas/editar/:id" element={<EditarCobertura />} />

            {/* OFERTAS */}
            <Route path='ofertas' element={<ListaOfertas/>}/>
            <Route path='ofertas/agregar' element={<CrearOferta/>}/>
            <Route path='ofertas/editar/:id' element={<EditarOferta/>}/>

            {/* MARCAS */}
            <Route path="marcas" element={<ListaMarcas />} />
            <Route path="marcas/agregar" element={<CrearMarca />} />
            <Route path="marcas/editar/:id" element={<EditarMarca />} />

            {/* PRODUCTOS */}
            <Route path="productos" element={<ListaProductos />} />
            <Route path="productos/agregar" element={<CrearProducto />} />
            <Route path="productos/editar/:id" element={<EditarProducto />} />

            {/* COLORES */}
            <Route path="colores" element={<ListaColor/>}/>
            <Route path='colores/agregar' element={<AgregarColor/>}/>
            <Route path='colores/editar/:id' element={<EditarColor/>}/>

            {/* USOS */}
            <Route path="usos" element={<ListaUsos/>}/>
            <Route path='usos/agregar' element={<AgregarUso/>}/>
            <Route path='usos/editar/:id' element={<EditarUso/>}/>

            <Route path='ubicaciones' element={<AgregarUbicacion/>}/>
            

            {/* BLOG */}
            <Route path="blog" element={<ListarBlog />} />
            <Route path="blog/agregar" element={<CrearBlog />} />
            <Route path="blog/editar/:id" element={<EditarBlog />} />

            {/* CONFIGURACION */}
            <Route path="contacto/:id" element={<EditarContacto />} />
            <Route path="transacciones" element={<ListaTransacciones />} />
            <Route path="transacciones/viewTransaccion/:id" element={<EditarTransaccion />} />

          </Route>
          <Route path="*" element={<>Error 404</>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
