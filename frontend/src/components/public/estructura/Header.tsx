import { RiMenuLine } from 'react-icons/ri'
import logo from '../../../assets/logo/logo.png'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router-dom'

import { AiOutlineSearch } from 'react-icons/ai'
// import {
//   type ConfiguracionValues,
import { useState } from 'react'
// } from '../../shared/Interfaces'
// import axios from 'axios'
// import { Global } from '../../../helper/Global'
// import Loading from '../../shared/Loading'
// import { type ChangeEvent, useEffect, useState } from 'react'
// import { getData } from '../../shared/FechData'
import { BsCart2 } from 'react-icons/bs'
import anuncio from '../../../assets/varios/anuncio.webp'
import 'swiper/css'
// @ts-expect-error: Type 'any' has no properties in common with type 'PaginationOptions'
import { Autoplay } from 'swiper'
import useAuth from '../../../hooks/useAuth'

// import useAuth from '../../../hooks/useAuth'

export const Header = (): JSX.Element => {
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const { cart } = useAuth()

  const toggleMenu = (): void => {
    setIsMenuVisible(!isMenuVisible)
  }

  const toggleSearch = (): void => {
    setIsSearchVisible(!isSearchVisible)
  }

  // const [categorias, setCategorias] = useState([])
  // const { search, setSearch } = useAuth()
  // const navigate = useNavigate()

  // const onSearchChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
  //   navigate('/busqueda')
  //   setSearch(target.value)
  // }
  // const [loadingComponents, setLoadingComponents] = useState(false)
  // const [data, setData] = useState<ConfiguracionValues>({
  //   id: null,
  //   celular1: '',
  //   celular2: '',
  //   correo1: '',
  //   correo2: '',
  //   direccion: '',
  //   facebook: '',
  //   instagram: '',
  //   twitter: '',
  //   linkedin: '',
  //   youtube: '',
  //   whatsapp: ''
  // })

  // const getDatos = async (): Promise<void> => {
  //   setLoadingComponents(true)
  //   try {
  //     const request = await axios.get(`${Global.url}/oneConfi/1`)
  //     setData(request.data)
  //   } catch (error) {
  //     setLoadingComponents(false)
  //     console.log(error)
  //   }
  //   setLoadingComponents(false)
  // }

  // useEffect(() => {
  //   getDatos()
  //   window.scrollTo(0, 0)
  //   setLoadingComponents(true)
  //   Promise.all([
  //     getData('allCategorias', setCategorias)
  //   ]).then(() => {
  //     setLoadingComponents(false)
  //     window.scrollTo(0, 0)
  //   })
  // }, [])

  // function formatearURL(nombre: string): string {
  //   // Eliminar espacios al principio y al final del nombre
  //   let url = nombre.trim()

  //   // Convertir todo el string a minúsculas
  //   url = url.toLowerCase()

  //   // Reemplazar los espacios por guiones
  //   url = url.replace(/ /g, '-')

  //   // Retornar la URL formateada
  //   return url
  // }

  return (
    <>
      {/* {loadingComponents && <Loading />} */}

      <header className='header'>
        <div className='header__bar'>
          <img src={anuncio} alt="" />
        </div>
        <nav className={`header__menu__nav ${isMenuVisible ? 'showMenu' : ''}`} id="menu">
            <ul>
              <li><Link to="/" >Inicio</Link></li>
              <li><Link to="/nosotros" >Nosotros</Link></li>
              <li><Link to="/categorias" >Categorías</Link></li>
              <li><Link to="/cobertura" >Cobertura</Link></li>
              <li><Link to="/distribuidores" >Distribuidores</Link></li>
              <li><Link to="/contacto" >Contáctanos</Link></li>
              <li>

              </li>
            </ul>
        </nav>
        <div className="header__menu">
          <div className="header__menu__logo">
            <Link to="/"><img src={logo} alt="" /></Link>
          </div>

          <div className={`header__menu__busqueda ${isSearchVisible ? 'showSearch' : ''}`}>
            <form action="">
              <div className="search">
                <input placeholder="Ingresa un producto..." className="input" type="search" />
                <div className="icon" >
                  <svg viewBox="0 0 512 512" className="ionicon" xmlns="http://www.w3.org/2000/svg">
                    <title>Search</title>
                    <path strokeWidth="32" strokeMiterlimit="10" stroke="currentColor" fill="none" d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"></path>
                    <path d="M338.29 338.29L448 448" strokeWidth="32" strokeMiterlimit="10" strokeLinecap="round" stroke="currentColor" fill="none"></path>
                  </svg>
                </div>
              </div>

            </form>
          </div>
          <div className="header__menu__search">
            <button onClick={toggleSearch}>
              <AiOutlineSearch/>
            </button>
          </div>

          <div className="header__menu__car">
            <Link to="/cart">
              <BsCart2/>
              <span>{cart.length}</span>
            </Link>
          </div>

          <div className="header__menu__mobile">
            <button id="mobileMenu" onClick={toggleMenu}><RiMenuLine/></button>
          </div>
        </div>

        <div className="header__categorias">
          <Swiper
          slidesPerView={5}
          spaceBetween={0}
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false
          }}
          breakpoints={{
            0: {
              slidesPerView: 1
            },
            576: {
              slidesPerView: 2
            },
            768: {
              slidesPerView: 3
            },
            992: {
              slidesPerView: 4
            },
            1200: {
              slidesPerView: 5
            }
          }}
          className='swp_categorias'
          >
            {/* {categorias.map((categoria: categoriasValues) => ( */}
              <SwiperSlide >
                {/* <Link to={`/productos/${categoria.id}-${formatearURL(categoria.nombre)}`}>{categoria.nombre}</Link> */}
                <Link to="#">Arpilleras</Link>
              </SwiperSlide>
              <SwiperSlide >
                <Link to="#">Sacos</Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="#">Laminados</Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="#">Mallas polietileno</Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="#">Productos impermeables</Link>
              </SwiperSlide>
              <SwiperSlide >
                <Link to="#">Arpilleras</Link>
              </SwiperSlide>
            {/* ))} */}

          </Swiper>

        </div>

      </header>
    </>
  )
}
