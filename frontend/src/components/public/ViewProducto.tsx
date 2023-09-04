// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

import { Link, useParams } from 'react-router-dom'
import producto1 from '../../assets/productos/producto.png'

import { BsHouse, BsChevronRight, BsCart2 } from 'react-icons/bs'

import { GiWeight } from 'react-icons/gi'
import { CiDeliveryTruck } from 'react-icons/ci'

import { FaRulerHorizontal } from 'react-icons/fa'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

// import color1 from '../../assets/iconos/color1.png'
// import color2 from '../../assets/iconos/color2.png'
// import color3 from '../../assets/iconos/color3.png'
// import color4 from '../../assets/iconos/color4.png'

import { getData } from '../shared/FechData'

import { TbSquareHalf } from 'react-icons/tb'

// @ts-expect-error: Type 'any' has no properties in common with type 'PaginationOptions'
import { type SwiperOptions, type CSSProperties } from 'swiper'

// @ts-expect-error: Type 'any' has no properties in common with type 'PaginationOptions'
import { FreeMode, Thumbs, Autoplay } from 'swiper'

import { useEffect, useState } from 'react'
import { type productosValues } from '../shared/Interfaces'
import axios from 'axios'
import { Global } from '../../helper/Global'
import Loading from '../shared/Loading'
import { AddProducto } from '../shared/carrito/AddProducto'

const ViewProducto = (): JSX.Element => {
  const [quantity, setQuantity] = useState(1)
  const [botonClicado, setBotonClicado] = useState(false)

  const [, setContador] = useState(1)

  const handleIncrement = (): void => {
    setQuantity(quantity + 1)
  }
  const handleDecrement = (): void => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperOptions | null>(null)
  const swiperStyles: CSSProperties = {
    '--swiper-navigation-color': '#fff',
    '--swiper-pagination-color': '#fff'
  }

  const [loadingComponents, setLoadingComponents] = useState(false)
  const [producto, setProducto] = useState<productosValues>({
    id: 0,
    nombre: '',
    codigo: '',
    id_categoria: '',
    id_marca: '',
    categoria: '',
    caracteristicas: '',
    precio1: 0,
    precio2: 0,
    cantidad: 0,
    cantidadMayor: 0,
    tipoprecio: '',
    oferta: 0,
    colores: '',
    usos: '',
    imagen1: '',
    imagen2: '',
    imagen3: '',
    created_at: null,
    updated_at: null
  })
  const [, setProductosCategories] = useState<never[]>([])

  const { id } = useParams()

  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [selectedValues2, setSelectedValues2] = useState<string[]>([])

  const [precioFinal, setPrecioFinal] = useState(0)
  const handleClick = (): void => {
    setBotonClicado(!botonClicado) // Cambiar el estado del botón al contrario del valor actual
    setPrecioFinal(producto.precio2)
  }

  const handleClick2 = (): void => {
    setBotonClicado(false) // Cambiar el estado del botón al contrario del valor actual
    setPrecioFinal(producto.precio1)
  }

  // function formatearURL (nombre: string): string {
  //   // Eliminar espacios al principio y al final del nombre
  //   let url = nombre.trim()

  //   // Convertir todo el string a minúsculas
  //   url = url.toLowerCase()

  //   // Reemplazar los espacios por guiones
  //   url = url.replace(/ /g, '-')

  //   // Eliminar el caracter "/"
  //   url = url.replace(/\//g, '')

  //   // Eliminar paréntesis y caracteres especiales
  //   url = url.replace(/[^\w-]/g, '')

  //   // Retornar la URL formateada
  //   return url
  // }

  const isEligibleForDiscount = quantity >= producto.cantidadMayor
  const getOneData = async (): Promise<void> => {
    const request = await axios.get(`${Global.url}/oneProducto/${id ?? ''}`)
    const responseData: productosValues = request.data[0] // Replace "YourResponseType" with the actual type of the response data
    setProducto(responseData)

    if (responseData.id_categoria) {
      getData(
        `allProductosGroup/${responseData.id_categoria}`,
        setProductosCategories
      )

      setSelectedValues(JSON.parse(request.data[0].colores))

      setSelectedValues2(JSON.parse(request.data[0].usos))
      setPrecioFinal(request.data[0].precio1)
      console.log(JSON.parse(request.data[0].colores))
    }
  }

  const [, setProductos] = useState([])

  useEffect(() => {
    setLoadingComponents(true)
    Promise.all([getData('allProductos', setProductos)]).then(() => {
      setLoadingComponents(false)
      window.scrollTo(0, 0)
    })
  }, [])

  useEffect(() => {
    setLoadingComponents(true)

    Promise.all([getOneData()]).then(() => {
      setLoadingComponents(false)
      window.scrollTo(0, 0)
    })
  }, [])

  useEffect(() => {
    setLoadingComponents(true)

    Promise.all([getOneData()]).then(() => {
      setLoadingComponents(false)
      window.scrollTo(0, 0)
    })
  }, [id])

  return (
    <>
      {loadingComponents && <Loading />}

      <main>
        <p className="breadcrumbs">
          <BsHouse />
          INICIO <BsChevronRight /> <span>{producto.categoria}</span>
          <BsChevronRight />
          <span> {producto.nombre}</span>
        </p>
        <section className="galeria">
          <div className="galeria__gal">
            <Swiper
              style={swiperStyles}
              loop={true}
              spaceBetween={10}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Thumbs, Autoplay]}
              className="gallery"
            >
              <SwiperSlide>
                <button type="button" style={{ width: '100%', height: '100%' }}>
                  <img
                    src={`${Global.urlImages}/productos/${producto.imagen1}`}
                    alt={`${producto.nombre} - Sacpro`}
                    title={`${producto.nombre}`}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              </SwiperSlide>

              {producto.imagen2 && (
                <SwiperSlide>
                  <button
                    type="button"
                    style={{ width: '100%', height: '100%' }}
                  >
                    <img
                      src={`${Global.urlImages}/productos/${producto.imagen2}`}
                      alt={`${producto.nombre} - Sacpro`}
                      title={`${producto.nombre}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                </SwiperSlide>
              )}

              {producto.imagen3 && (
                <SwiperSlide>
                  <button
                    type="button"
                    style={{ width: '100%', height: '100%' }}
                  >
                    <img
                      src={`${Global.urlImages}/productos/${producto.imagen3}`}
                      alt={`${producto.nombre} - Sacpro`}
                      title={`${producto.nombre}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                </SwiperSlide>
              )}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={3}
              freeMode={true}
              direction="vertical"
              watchSlidesProgress={true}
              modules={[FreeMode, Thumbs]}
              className="gallery_items"
              breakpoints={{
                0: {
                  direction: 'horizontal'
                },
                576: {
                  direction: 'horizontal'
                },
                768: {
                  direction: 'horizontal'
                },
                992: {
                  direction: 'vertical'
                },
                1200: {}
              }}
            >
              <SwiperSlide>
                <img
                  src={`${Global.urlImages}/productos/${producto.imagen1}`}
                  alt={`${producto.nombre} - Sacpro`}
                  title={`${producto.nombre}`}
                  loading="lazy"
                  decoding="async"
                />
              </SwiperSlide>

              {producto.imagen2 && (
                <SwiperSlide>
                  <img
                    src={`${Global.urlImages}/productos/${producto.imagen2}`}
                    alt={`${producto.nombre} - Sacpro`}
                    title={`${producto.nombre}`}
                    loading="lazy"
                    decoding="async"
                  />
                </SwiperSlide>
              )}

              {producto.imagen3 && (
                <SwiperSlide>
                  <img
                    src={`${Global.urlImages}/productos/${producto.imagen3}`}
                    alt={`${producto.nombre} - Sacpro`}
                    title={`${producto.nombre}`}
                    loading="lazy"
                    decoding="async"
                  />
                </SwiperSlide>
              )}
            </Swiper>
          </div>
          <div className="galeria__descrip">
            <div className="galeria__descrip__title">
              <div className="galeria__descrip__title__main">
                <div className="galeria__descrip__title__main__item">
                  <span>{producto.categoria}</span>
                  <h1>{producto.nombre}</h1>
                  <div className="galeria__descrip__stock">
                    <p className="galeria__descrip__stock__cod">
                      SKU: {producto.codigo}
                    </p>
                  </div>
                </div>
                {producto.tipoprecio == 'false' && (
                  <div
                    className={`galeria__descrip__title__main__item ${
                      isEligibleForDiscount ? 'selectPrecioMayor' : ''
                    } `}
                  >
                    <button>
                      <p>Precio por menor</p>
                      <p>s/. {producto.precio1}</p>
                    </button>
                    <button>
                      <p>Precio por mayor</p>
                      <p>s/. {producto.precio2}</p>
                      <p>A partir de {producto.cantidadMayor}</p>
                    </button>
                  </div>
                )}
                {producto.tipoprecio == 'true' && (
                  <div
                    className={`galeria__descrip__title__main__item ${
                      botonClicado ? 'selectPrecioMayor' : ''
                    }`}
                  >
                    <button onClick={handleClick2}>
                      <p>Precio por metro</p>
                      <p>s/. {producto.precio1}</p>
                    </button>
                    <button onClick={handleClick}>
                      <p>Precio por rollo</p>
                      <p>s/. {producto.precio2}</p>
                    </button>
                  </div>
                )}
              </div>

              {producto.tipoprecio == 'false' && (
                <div className="galeria__descrip__title__cantidad">
                  <button onClick={handleDecrement}>-</button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(parseInt(e.target.value))
                    }}
                  />
                  <button onClick={handleIncrement}>+</button>
                </div>
              )}
            </div>

            <AddProducto
              producto={producto}
              contador={quantity}
              precioFinal={precioFinal}
              setContador={setContador}
            />

            <div className="galeria__descrip__espe">
              <p className="title_detalle">Especificaciones</p>
              <div className="galeria__descrip__espe__main">
                <Swiper
                  slidesPerView={3}
                  loop={true}
                  breakpoints={{
                    0: {
                      slidesPerView: 2
                    },
                    576: {
                      slidesPerView: 2
                    },
                    768: {
                      slidesPerView: 2
                    },
                    992: {
                      slidesPerView: 3
                    }
                  }}
                >
                  <SwiperSlide>
                    <div className="galeria__descrip__espe__main__item">
                      <TbSquareHalf />
                      <p>Presentación en pliego 120 gr. aprox.</p>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="galeria__descrip__espe__main__item">
                      <FaRulerHorizontal />
                      <p>Medida de 31.5 x 47.5 (80 x 121 cm).</p>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="galeria__descrip__espe__main__item">
                      <GiWeight />
                      <p>Capacidad de 120 Kg.</p>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>

            <div className="galeria__descrip__espe">
              <p className="title_detalle">Principales usos</p>
              <div className="galeria__descrip__espe__main">
                <Swiper
                  slidesPerView={3}
                  loop={true}
                  breakpoints={{
                    0: {
                      slidesPerView: 2
                    },
                    576: {
                      slidesPerView: 2
                    },
                    768: {
                      slidesPerView: 2
                    },
                    992: {
                      slidesPerView: 3
                    }
                  }}
                >
                  {selectedValues2.map((usos, index) => (
                    <SwiperSlide key={index}>
                      <div className="galeria__descrip__espe__main__item">
                        <img src={`${Global.urlImages}/usos/${usos}`} alt="" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <div className="colores">
              <p className="title_detalle">Colores</p>
              <div className="colores__main">
                <Swiper
                  slidesPerView={3}
                  loop={true}
                  breakpoints={{
                    0: {
                      slidesPerView: 2
                    },
                    576: {
                      slidesPerView: 2
                    },
                    768: {
                      slidesPerView: 3
                    },
                    992: {
                      slidesPerView: 4
                    }
                  }}
                >
                  {selectedValues.map((color, index) => (
                    <SwiperSlide key={index}>
                      <div className="colores__main__item">
                        <img
                          src={`${Global.urlImages}/colores/${color}`}
                          alt=""
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <div className="galeria__descrip__envio">
              <div className="galeria__descrip__envio__item">
                <div className="galeria__descrip__envio__item__icon">
                  <CiDeliveryTruck />
                </div>
                <div className="galeria__descrip__envio__item__info">
                  <p>Envío a domicilio</p>
                  <a href="">Calcular costo de envío</a>
                  <p>
                    Lima, Los Olivos - <span>s/. 14.00</span>
                  </p>
                </div>
              </div>
              <div className="galeria__descrip__envio__item">
                <div className="galeria__descrip__envio__item__icon">
                  <CiDeliveryTruck />
                </div>
                <div className="galeria__descrip__envio__item__info">
                  <p>Retiro en tienda (Gratis)</p>
                  <a href="">Ver tiendas</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="productos">
          <div className="productos__title">
            <h2>Productos relacionados</h2>
          </div>
          <Swiper
            className="swp_productos"
            slidesPerView={4}
            spaceBetween={20}
            modules={[Autoplay]}
            loop={true}
            speed={5000}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false
            }}
            breakpoints={{
              0: {
                slidesPerView: 1
              },
              576: {
                slidesPerView: 1
              },
              768: {
                slidesPerView: 2
              },
              992: {
                slidesPerView: 3
              },
              1200: {
                slidesPerView: 4
              }
            }}
          >
            <SwiperSlide>
              <Link to="" className="cardProd">
                <span className="cardProd__desc">-30% dscto</span>
                <div className="cardProd__img">
                  <img src={producto1} alt="" />
                </div>
                <div className="cardProd__info">
                  <p className="cardProd__info__cat">Categoría</p>
                  <h3>
                    Saco Payaso
                    <button>
                      <BsCart2 />
                    </button>
                  </h3>
                  <div className="cardProd__info__descrip">
                    <div className="cardProd__info__descrip__texto">
                      <p>
                        Por metro desde <span>S/. 162.00</span>
                      </p>
                      <p>
                        Por rollo desde <span>S/. 220.00</span>
                      </p>
                    </div>
                    <div className="cardProd__info__descrip__button"></div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="" className="cardProd">
                <span className="cardProd__desc">-30% dscto</span>
                <div className="cardProd__img">
                  <img src={producto1} alt="" />
                </div>
                <div className="cardProd__info">
                  <p className="cardProd__info__cat">Categoría</p>
                  <h3>
                    Saco Payaso
                    <button>
                      <BsCart2 />
                    </button>
                  </h3>
                  <div className="cardProd__info__descrip">
                    <div className="cardProd__info__descrip__texto">
                      <p>
                        Por metro desde <span>S/. 162.00</span>
                      </p>
                      <p>
                        Por rollo desde <span>S/. 220.00</span>
                      </p>
                    </div>
                    <div className="cardProd__info__descrip__button"></div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="" className="cardProd">
                <span className="cardProd__desc">-30% dscto</span>
                <div className="cardProd__img">
                  <img src={producto1} alt="" />
                </div>
                <div className="cardProd__info">
                  <p className="cardProd__info__cat">Categoría</p>
                  <h3>
                    Saco Payaso
                    <button>
                      <BsCart2 />
                    </button>
                  </h3>
                  <div className="cardProd__info__descrip">
                    <div className="cardProd__info__descrip__texto">
                      <p>
                        Por metro desde <span>S/. 162.00</span>
                      </p>
                      <p>
                        Por rollo desde <span>S/. 220.00</span>
                      </p>
                    </div>
                    <div className="cardProd__info__descrip__button"></div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="" className="cardProd">
                <span className="cardProd__desc">-30% dscto</span>
                <div className="cardProd__img">
                  <img src={producto1} alt="" />
                </div>
                <div className="cardProd__info">
                  <p className="cardProd__info__cat">Categoría</p>
                  <h3>
                    Saco Payaso
                    <button>
                      <BsCart2 />
                    </button>
                  </h3>
                  <div className="cardProd__info__descrip">
                    <div className="cardProd__info__descrip__texto">
                      <p>
                        Por metro desde <span>S/. 162.00</span>
                      </p>
                      <p>
                        Por rollo desde <span>S/. 220.00</span>
                      </p>
                    </div>
                    <div className="cardProd__info__descrip__button"></div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="" className="cardProd">
                <span className="cardProd__desc">-30% dscto</span>
                <div className="cardProd__img">
                  <img src={producto1} alt="" />
                </div>
                <div className="cardProd__info">
                  <p className="cardProd__info__cat">Categoría</p>
                  <h3>
                    Saco Payaso
                    <button>
                      <BsCart2 />
                    </button>
                  </h3>
                  <div className="cardProd__info__descrip">
                    <div className="cardProd__info__descrip__texto">
                      <p>
                        Por metro desde <span>S/. 162.00</span>
                      </p>
                      <p>
                        Por rollo desde <span>S/. 220.00</span>
                      </p>
                    </div>
                    <div className="cardProd__info__descrip__button"></div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          </Swiper>
        </section>
      </main>
    </>
  )
}

export default ViewProducto
