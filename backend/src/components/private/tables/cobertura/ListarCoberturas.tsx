import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import { Loading } from '../../../shared/Loading'
import { Paginacion } from '../../../shared/Paginacion'
import { coberturaValues} from '../../../shared/Interfaces'
import { DeleteItems } from '../../../shared/DeleteItems'
const ListarCoberturas = () => {
    const token = localStorage.getItem('token')
    const [productos, setProductos] = useState([])
    const { setTitle, loadingComponents, setLoadingComponents } = useAuth()
    const [totalRegistros, setTotalRegistros] = useState(0)
    const [paginaActual, setpaginaActual] = useState(1)
    const [cantidadRegistros] = useState(4)
    const navigate = useNavigate()

    const getAllProductos = async (): Promise<void> => {
      setLoadingComponents(true)
      const data = new FormData()
      const request = await axios.post(`${Global.url}/getCoberturas`, data, {
        headers: {
          Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
        }
      })
      setProductos(request.data)
      setTotalRegistros(request.data.length)
      setLoadingComponents(false)

      console.log(request.data);
    }

    const indexOfLastPost = paginaActual * cantidadRegistros
    const indexOfFirstPost = indexOfLastPost - cantidadRegistros
    const totalPosts = productos.length

    const filterDate = (): never[] => {
      return productos.slice(indexOfFirstPost, indexOfLastPost)
    }

    const preguntar = (id: number): void => {
      DeleteItems({
        ruta: 'deleteCobertura',
        id,
        token,
        getData: getAllProductos,
        totalPosts,
        cantidadRegistros,
        paginaActual,
        setpaginaActual
      })
    }

    useEffect(() => {
      setTitle('Listado de coberturas')
      getAllProductos()
    }, [])
  return (
    <>
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-4 mb-5 ">
      <div>
        {/* <h1 className="font-bold text-gray-100 text-xl">Lista de Productos</h1> */}
      </div>

    </div>
    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4">
          
          <button
            className="bg-main text-white hover:bg-main w-full lg:w-fit flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors"
            onClick={() => {
              navigate('agregar')
            }}
          >
            Crear
          </button>
        </div>
    {loadingComponents
      ? (
      <Loading />
        )
      : (
      <div className="bg-secondary-100 p-8 rounded-xl">
        <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-4 mb-10 p-4">
          <h5 className="md:text-center">ID</h5>
          <h5 className="md:text-center">Departamento</h5>
          <h5 className="md:text-center">Provincia</h5>
          <h5 className="md:text-center">Distrito</h5>
          <h5 className="md:text-center">Acciones</h5>
        </div>
        {filterDate().map((pro: coberturaValues) => (
          <div
            className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl"
            key={pro.id}
          >
            <div className="md:text-center">
              <h5 className="md:hidden text-white font-bold mb-2">ID</h5>
              <span>#{pro.id}</span>
            </div>
            <div className="md:text-center">
              <h5 className="md:hidden text-white font-bold mb-2">Departamento</h5>
              <span>{pro.departamento}</span>
            </div>

            <div className="md:text-center md:flex md:justify-center">
              <h5 className="md:hidden text-white font-bold mb-2">Provincia</h5>
              <span>{pro.provincia}</span>
            </div>
            <div className="md:text-center">
              <h5 className="md:hidden text-white font-bold mb-2">
                Distrito
              </h5>
              <span>{pro.distrito}</span>
            </div>
            <div className="md:text-center md:flex md:justify-center">
              <h5 className="md:hidden text-white font-bold mb-2">
                Acciones
              </h5>
              <Menu
                menuButton={
                  <MenuButton className="flex items-center gap-x-2 bg-secondary-100 p-2 rounded-lg transition-colors">
                    Acciones
                  </MenuButton>
                }
                align="end"
                arrow
                transition
                menuClassName="bg-secondary-100 p-4"
              >
                <MenuItem className="p-0 hover:bg-transparent">
                  <Link
                    to={`editar/${pro.id}`}
                    className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1"
                  >
                    Editar
                  </Link>
                </MenuItem>
                <MenuItem className="p-0 hover:bg-transparent">
                  <Link
                    to=""
                    onClick={() => {
                      preguntar(pro.id)
                    }}
                    className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1"
                  >
                    Eliminar
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          </div>
        ))}

        <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between content_buttons ">
          <p className="text-md ml-1"> {totalRegistros} Registros </p>
          <Paginacion
            totalPosts={totalPosts}
            cantidadRegistros={cantidadRegistros}
            paginaActual={paginaActual}
            setpaginaActual={setpaginaActual}
          />
        </div>
      </div>
        )}
  </>
  )
}

export default ListarCoberturas