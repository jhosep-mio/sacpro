import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
// Icons
import {
  RiLogoutCircleRLine,
  RiMenu3Line,
  RiCloseLine,
  RiStackFill,
  RiArrowRightSLine,
  RiHomeWifiFill
} from 'react-icons/ri'

import axios from 'axios'
import { Global } from '../../../helper/Global'
import logo from './../../../assets/logo/logo.png'

import { logo_white } from '../../shared/Images'

const SideBar = (): JSX.Element => {
  const { setAuth, setLoading } = useAuth()
  const token = localStorage.getItem('token')
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()
  const [showSubmenu2, setShowSubmenu2] = useState(false)
  const [showSubmenu3, setShowSubmenu3] = useState(false)
  const [activeItem, setActiveItem] = useState(0)

  const cerrarSession = async (): Promise<void> => {
    setLoading(true)
    const data = new FormData()
    data.append('_method', 'POST')

    await axios.post(`${Global.url}/logout`, data, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
      }
    })
    localStorage.clear()
    setAuth({
      id: '',
      name: '',
      email: '',
      idRol: null
    })
    navigate('/login')
    setLoading(false)
  }

  const handleItemClick = (itemId: number): void => {
    setActiveItem(itemId)
  }

  return (
    <>
      <div
        className={`fixed xl:static w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0 bg-primary shadow-xl p-4 flex flex-col justify-between z-50 ${
          showMenu ? 'left-0' : '-left-full'
        } transition-all`}
      >
        <div>
          <h1 className="text-center text-2xl font-bold text-black mb-5 mt-5">
            <img src={logo_white} alt="" className="m-auto w-32" />
          </h1>
          <hr className="mb-5" />
          <ul className="ml-0 p-0">
            <li>
              <Link
                to="/admin"
                className="flex items-center gap-4 py-2 px-4 rounded-lg text-white hover:bg-secondary-900 transition-colors"
              >
                <RiStackFill className="text-main" /> Dashboard
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  setShowSubmenu2(!showSubmenu2)
                }}
                className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <span className="flex items-center gap-4">
                  <RiHomeWifiFill className="text-main" /> Home
                </span>
                <RiArrowRightSLine
                  className={`mt-1 ${
                    showSubmenu2 ? 'rotate-90' : ''
                  } transition-all`}
                />
              </button>
              <ul
                className={` ${
                  showSubmenu2 ? 'h-[50px]' : 'h-0'
                } overflow-y-hidden transition-all`}
              >
                <li>
                  <Link
                    to="ofertas"
                    className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${
                      activeItem == 4 ? 'before:bg-main' : 'before:bg-gray-500'
                    } before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors`}
                    onClick={() => {
                      handleItemClick(4)
                    }}
                  >
                    Anuncios
                  </Link>
                </li>
                
              </ul>
              <ul
                className={` ${
                  showSubmenu2 ? 'h-[50px]' : 'h-0'
                } overflow-y-hidden transition-all`}
              >
                <li>
                  <Link
                    to="banners"
                    className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${
                      activeItem == 4 ? 'before:bg-main' : 'before:bg-gray-500'
                    } before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors`}
                    onClick={() => {
                      handleItemClick(4)
                    }}
                  >
                    Banners
                  </Link>
                </li>
                
              </ul>
              
              <ul
                className={` ${
                  showSubmenu2 ? 'h-[50px]' : 'h-0'
                } overflow-y-hidden transition-all`}
              >
                <li>
                  <Link
                    to="showcategory"
                    className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${
                      activeItem == 4 ? 'before:bg-main' : 'before:bg-gray-500'
                    } before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors`}
                    onClick={() => {
                      handleItemClick(4)
                    }}
                  >
                    Mostrar categorías
                  </Link>
                </li>
                
              </ul>
            </li>
            <li>

                  <button
                    onClick={() => {
                      setShowSubmenu3(!showSubmenu3)
                    }}
                    className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
                  >
                    <span className="flex items-center gap-4">
                      <RiStackFill className="text-main" /> Productos
                    </span>
                    <RiArrowRightSLine
                      className={`mt-1 ${
                        showSubmenu3 ? 'rotate-90' : ''
                      } transition-all`}
                    />
                  </button>

                  <ul
                    className={` ${
                      showSubmenu3 ? 'h-[50px]' : 'h-0'
                    } overflow-y-hidden transition-all`}
                  >
                    <li>
                      <Link
                        to="colores"
                        className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${
                          activeItem == 4 ? 'before:bg-main' : 'before:bg-gray-500'
                        } before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors`}
                        onClick={() => {
                          handleItemClick(4)
                        }}
                      >
                        Colores
                      </Link>
                    </li>
                    
                  </ul>

                  <ul
                    className={` ${
                      showSubmenu3 ? 'h-[50px]' : 'h-0'
                    } overflow-y-hidden transition-all`}
                  >
                    <li>
                      <Link
                        to="usos"
                        className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${
                          activeItem == 4 ? 'before:bg-main' : 'before:bg-gray-500'
                        } before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors`}
                        onClick={() => {
                          handleItemClick(4)
                        }}
                      >
                        Usos
                      </Link>
                    </li>
                    
                  </ul>

                  <ul
                    className={` ${
                      showSubmenu3 ? 'h-[50px]' : 'h-0'
                    } overflow-y-hidden transition-all`}
                  >
                    <li>
                      <Link
                        to="productos"
                        className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${
                          activeItem == 4 ? 'before:bg-main' : 'before:bg-gray-500'
                        } before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors`}
                        onClick={() => {
                          handleItemClick(4)
                        }}
                      >
                        Productos
                      </Link>
                    </li>
                    
                  </ul>
                  
            </li>
            
            <li>
              <Link
                to="categorias"
                className="flex items-center gap-4 py-2 px-4 rounded-lg text-white hover:bg-secondary-900 transition-colors"
              >
                <RiStackFill className="text-main" /> Categorías
              </Link>
            </li>
            <li>
              <Link
                to="subcategorias"
                className="flex items-center gap-4 py-2 px-4 rounded-lg text-white hover:bg-secondary-900 transition-colors"
              >
                <RiStackFill className="text-main" /> Sub Categorías
              </Link>
            </li>
            <li>
              <Link
                to="marcas"
                className="flex items-center gap-4 py-2 px-4 rounded-lg text-white hover:bg-secondary-900 transition-colors"
              >
                <RiStackFill className="text-main" /> Clientes
              </Link>
            </li>
            <li>
              <Link
                to="distribuidores"
                className="flex items-center gap-4 py-2 px-4 rounded-lg text-white hover:bg-secondary-900 transition-colors"
              >
                <RiStackFill className="text-main" /> Distribuidores
              </Link>
            </li>

            <li>
              <Link
                to="coberturas"
                className="flex items-center gap-4 py-2 px-4 rounded-lg text-white hover:bg-secondary-900 transition-colors"
              >
                <RiStackFill className="text-main" /> Coberturas
              </Link>
            </li>
            
            <li>
              <Link
                to="contacto/1"
                className="flex items-center gap-4 py-2 px-4 rounded-lg text-white hover:bg-secondary-900 transition-colors"
              >
                <RiStackFill className="text-main" /> Contacto
              </Link>
            </li>

            <li>
              <Link
                to="ubicaciones"
                className="flex items-center gap-4 py-2 px-4 rounded-lg text-white hover:bg-secondary-900 transition-colors"
              >
                <RiStackFill className="text-main" /> Ubicaciones
              </Link>
            </li>
            
                
              
            
          </ul>
        </div>
        <nav>
          <Link
            to={''}
            onClick={() => {
              void cerrarSession()
            }}
            className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-main_2-100 text-main transition-colors hover:text-main"
          >
            <RiLogoutCircleRLine className="text-main " /> Cerrar sesión
          </Link>
        </nav>
      </div>
      <button
        onClick={() => {
          setShowMenu(!showMenu)
        }}
        className="xl:hidden fixed bottom-4 right-4 bg-main text-white p-3 rounded-full z-50"
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Line />}
      </button>
    </>
  )
}

export default SideBar
