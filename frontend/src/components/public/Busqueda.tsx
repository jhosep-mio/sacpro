import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { type productosValues } from '../shared/Interfaces'
import { getData2 } from '../shared/FechData'
import { Global } from '../../helper/Global'
import { Paginacion } from '../shared/Paginacion'
const Busqueda = (): JSX.Element => {
  const [productos, setProductos] = useState([])
  const [loadingComponents, setLoadingComponents] = useState(true)
  const [paginaActual, setpaginaActual] = useState(1)
  const [cantidadRegistros] = useState(9)
  const { search } = useAuth()
  const [totalRegistros, setTotalRegistros] = useState(0)
  const indexOfLastPost = paginaActual * cantidadRegistros
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros
  let totalPosts = productos.length

  function formatearURL (nombre: string): string {
    // Eliminar espacios al principio y al final del nombre
    let url = nombre.trim()

    // Convertir todo el string a minúsculas
    url = url.toLowerCase()

    // Reemplazar los espacios por guiones
    url = url.replace(/ /g, '-')

    // Eliminar el caracter "/"
    url = url.replace(/\//g, '')

    // Eliminar paréntesis y caracteres especiales
    url = url.replace(/[^\w-]/g, '')

    // Retornar la URL formateada
    return url
  }
  useEffect(() => {
    Promise.all([getData2('allProductos', setProductos, setTotalRegistros)]).then(() => {
      window.scrollTo(0, 0)
      setLoadingComponents(false)
    })
  }, [])

  type Acentos = Record<string, string>

  function quitarAcentos (cadena: string): string {
    const acentos: Acentos = {
      á: 'a',
      é: 'e',
      í: 'i',
      ó: 'o',
      ú: 'u',
      Á: 'A',
      É: 'E',
      Í: 'I',
      Ó: 'O',
      Ú: 'U'
    }
    return cadena
      .split('')
      .map((letra) => acentos[letra] || letra)
      .join('')
      .toString()
  }

  const filterDate = (): productosValues[] => {
    if (typeof search !== 'string' || search.length === 0) {
      const producto = productos.slice(indexOfFirstPost, indexOfLastPost)
      return producto
    }

    const filter = productos.filter((pro: productosValues) => {
      return quitarAcentos(pro.nombre.toLowerCase()).includes(
        quitarAcentos(search.toLowerCase())
      )
    })

    totalPosts = filter.length
    return filter.slice(indexOfFirstPost, indexOfLastPost)
  }

  useEffect(() => {
    setTotalRegistros(totalPosts)
  }, [search])

  return (
    <>
      <div className="busqueda">
        <div className="busqueda__title">
          {loadingComponents
            ? (
            <h5>Buscando ....</h5>
              )
            : (
            <h5>{totalRegistros} producto(s) encontrados en total</h5>
              )}
        </div>
        <div className="busqueda__main">
          {filterDate().map((producto: productosValues) => (
            <div className="busqueda__main__item" key={producto.id}>
              <Link
                to={`/view/${producto.id}-${formatearURL(producto.nombre)}`}
              >
                <div className="novedades__main__productos__grid__item__img">
                  <img
                    src={`${Global.urlImages}/productos/${producto.imagen1}`}
                    alt={`${producto.nombre} - Dioselyna`}
                  />
                </div>
                <div className="novedades__main__productos__grid__item__title">
                  <h1>{producto.nombre}</h1>
                  <p>S/. {producto.precio}</p>
                </div>
                {producto.imagen2 && (
                  <div className="novedades__main__productos__grid__item__content">
                    <img
                      src={`${Global.urlImages}/productos/${producto.imagen2}`}
                      alt=""
                    />
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>

        <div className="col-md-12 flex justify-center">
          <Paginacion
            totalPosts={totalPosts}
            cantidadRegistros={cantidadRegistros}
            paginaActual={paginaActual}
            setpaginaActual={setpaginaActual}
          />
        </div>
      </div>
    </>
  )
}

export default Busqueda
