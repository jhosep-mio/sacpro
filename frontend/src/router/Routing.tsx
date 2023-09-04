import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { PublicLayout } from '../components/public/PublicLayout'
import { Index } from '../components/public/Index'
import Nosotros from '../components/public/Nosotros'
import Blog from '../components/public/Blog'
import Categorias from '../components/public/Categorias'
import Contacto from '../components/public/Contacto'
import Novedades from '../components/public/Novedades'
import ViewProducto from '../components/public/ViewProducto'
import ProductosFrom from '../components/public/ProductosFrom'
import Busqueda from '../components/public/Busqueda'
import { AuthProvider } from '../context/AuthProvider'
import Cobertura from '../components/public/Cobertura'
import Tienda from '../components/public/Tienda'
import Cart from '../components/public/Cart'
import Distribuidores from '../components/public/Distribuidores'
import { Payment } from '../components/public/Payment'
import { Success } from '../components/public/Success'

export const Routing = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Index/>}/>
            <Route path='nosotros' element={<Nosotros/>}/>
            <Route path='categorias' element={<Categorias/>}/>
            <Route path='cobertura' element={<Cobertura/>}/>
            <Route path='tiendas' element={<Tienda/>}/>
            <Route path='blog' element={<Blog/>}/>
            <Route path='contacto' element={<Contacto/>}/>
            <Route path='novedades' element={<Novedades/>}/>
            <Route path='productos/:id' element={<ProductosFrom/>}/>
            <Route path='view/:id' element={<ViewProducto/>}/>
            <Route path='distribuidores' element={<Distribuidores/>}/>
            <Route path='cart' element={<Cart/>}/>
            <Route path='payment/:token' element={<Payment/>}/>
            <Route path='sucess-payment' element={<Success/>}/>
            <Route path='busqueda' element={<Busqueda/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
