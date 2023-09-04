import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { getData } from '../shared/FechData'
import Loading from '../shared/Loading'
import {
  type marcasValues,
  type categoriasValues,
  productosValues,
} from '../shared/Interfaces'
import { TbShieldStar } from "react-icons/tb"
import "swiper/css";
import 'swiper/css/effect-fade';
import "swiper/css/grid";
import 'swiper/css/free-mode';
import "swiper/css/pagination";
import 'swiper/css/navigation';
import producto from '../../assets/productos/producto.png'
// @ts-expect-error: Type 'any' has no properties in common with type 'PaginationOptions'
import { Pagination, Autoplay, Navigation, Grid, FreeMode, EffectFade } from "swiper";
import { CiCreditCard1, CiDeliveryTruck, CiHeadphones, CiShop } from "react-icons/ci";
import { BsCart2, BsCurrencyDollar } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Global } from '../../helper/Global';
import axios from 'axios';
import Alert from '../shared/Alert';

export const Index = (): JSX.Element => {

  const [loadingComponents, setLoadingComponents] = useState(false)
  const [fromCategory1, setFromCategory1] = useState([])

  const [banners, setBanners] = useState<never[]>([])
  useEffect(() => {
    setLoadingComponents(true)
    Promise.all([
      getData('allBanners', setBanners),
    ]).then(() => {
      setLoadingComponents(false)
    })
  }, [])

  const [categorias, setCategorias] = useState([])
  useEffect(() => {
    setLoadingComponents(true)
    Promise.all([
      getData('allCategorias', setCategorias),
    ]).then(() => {
      setLoadingComponents(false)
      window.scrollTo(0, 0)
    })
  }, [])

  // const [contador, setContador] = useState(1)
  // const navigate = useNavigate()
  // const addContador = (): void => {
  //   setContador(contador + 1)
  // }

  // const ressContador = (): void => {
  //   if (contador > 1) {
  //     setContador(contador - 1)
  //   }
  // }
  const [marcas, setMarcas] = useState<never[]>([])
  useEffect(() => {
    setLoadingComponents(true)
    Promise.all([
      getData('getMarcas', setMarcas),
    ]).then(() => {
      setLoadingComponents(false)
    })
  }, [])

  const [favProductos, setFavProductos] = useState([])


  function formatearURL(nombre: string): string {
    // Eliminar espacios al principio y al final del nombre
    let url = nombre.trim();

    // Convertir todo el string a minúsculas
    url = url.toLowerCase();

    // Reemplazar los espacios por guiones
    url = url.replace(/ /g, '-');

    // Eliminar el caracter "/"
    url = url.replace(/\//g, '');

    // Eliminar paréntesis y caracteres especiales
    url = url.replace(/[^\w-]/g, '');

    // Retornar la URL formateada
    return url;
}

  useEffect(() => {
    setLoadingComponents(true)
    Promise.all([
      getData('productosWhereFavorites', setFavProductos),
      getDatos()

    ]).then(() => {
      console.log(favProductos);
      setLoadingComponents(false)
      window.scrollTo(0, 0)
    })
  }, [])

  const getDatos = async (): Promise<void> => {
    try {
      const request = await axios.get(`${Global.url}/getShowcategory`)
      if(request.data){
        const request2 = await axios.get(`${Global.url}/fromCategory/${request.data[0].id_categoria}`)
        setFromCategory1(request2.data)
      }
    } catch (error) {
      console.log(error)
    }

  }

 


  return (
    <>
      {loadingComponents && <Loading />} 

      <Alert/>

      <section className="slider">

        <div className="slider__main">
          <Swiper
            pagination={{ dynamicBullets: true, clickable: true, }}
            modules={[Pagination, Autoplay, EffectFade]}
            effect={'fade'}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="swp_slider">
            {banners.map((banner: marcasValues) => 
              <SwiperSlide key={banner.id}>
                <img src={`${Global.urlImages}/banner/${banner.imagen1}`} alt="" />
              </SwiperSlide>

             )} 


          </Swiper>
        </div>


      </section>
      <section className="options">
        <div className="options__main">
          
          <div className="options__main__item">
            <ul>
              <li>
                <span><CiHeadphones /></span>
                <div>
                  <h5>Soporte</h5>
                  <p>Te ayudamos en tu compra</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="options__main__item">
            <ul>
              <li>
                <span><CiShop /></span>
                <div>
                  <h5>Garantía</h5>
                  <p>Productos certificados y con garantía</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="options__main__item">
            <ul>
              <li>
                <span><CiCreditCard1 /></span>
                <div>
                  <h5>Pago Seguro</h5>
                  <p>Pagos online con alta seguridad</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="options__main__item">
            <ul>
              <li>
                <span><CiDeliveryTruck /></span>
                <div>
                  <h5>Envíos Nacional</h5>
                  <p>Hacemos envío a nivel nacional</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="categorias">
        <Swiper slidesPerView={7} spaceBetween={30}
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
        breakpoints={{
          0:{
            slidesPerView: 2
          },
          576:{
            slidesPerView: 2
          },
          768:{
            slidesPerView: 3
          },
          992:{
            slidesPerView: 5
          },
          1200:{
            slidesPerView: 7
          },
        }}
        >
            {categorias.map((categoria: categoriasValues) => 
            
              <SwiperSlide key={categoria.id}>

                <div className="categoria">
                  <div className="categoria__img">
                    <img src={`${Global.urlImages}/categorias/${categoria.imagen1}`} alt={`${categoria.nombre} - Sacpro`} title={`${categoria.nombre}`} loading='lazy' decoding='async'/>
                  </div>
                  <div className="categoria__title">
                    <h5>{categoria.nombre}</h5>
                  </div>
                </div>
                
              </SwiperSlide>
            
            )}
                  
        </Swiper>
      </section>
      <section className="productos">
        <div className="productos__title">
          <h2>Productos en oferta</h2>
        </div>
        <Swiper className="swp_productos" slidesPerView={4} spaceBetween={20}
         modules={[Autoplay]}
         loop={true}
         speed={5000}
         autoplay={{
           delay: 1000,
           disableOnInteraction: false,
         }}
         breakpoints={{
          0:{
            slidesPerView: 1
          },
          576:{
            slidesPerView: 1
          },
          768:{
            slidesPerView: 2
          },
          992:{
            slidesPerView: 3
          },
          1200:{
            slidesPerView: 4
          },
         }}
        >

          {favProductos.map((favProduct: productosValues)=>
            <SwiperSlide key={favProduct.id}>
              <Link to={`/view/${favProduct.id}-${formatearURL(favProduct.nombre)}`} className="cardProd">
                  {/* <span className="cardProd__desc">
                    -30% dscto
                  </span> */}
                  <div className="cardProd__img">
                    <img src={`${Global.urlImages}/productos/${favProduct.imagen1}`} alt="" />
                  </div>
                  <div className="cardProd__info">
                    <p className="cardProd__info__cat">{favProduct.categoria}</p>
                    <h3>
                        {favProduct.nombre}
                        {/* <AddProducto
                          producto={favProduct}
                          contador={1}
                          precioFinal={450}
                          setContador={setContador}
                        /> */}
                        <Link to={`/view/${favProduct.id}-${formatearURL(favProduct.nombre)}`}><BsCart2/></Link>
                    </h3>
                    <div className="cardProd__info__descrip">
                      <div className="cardProd__info__descrip__texto">
                        {favProduct.tipoprecio == "true" && (
                          <>
                            <p>Por metro desde <span>S/. {favProduct.precio1}</span></p>
                            <p>Por rollo desde <span>S/. {favProduct.precio2}</span></p>
                          </>
                        )}

                        {favProduct.tipoprecio == "false" && (
                          <>
                            <p>Por menor desde <span>S/. {favProduct.precio1}</span></p>
                            <p>Por mayor desde <span>S/. {favProduct.precio2}</span></p>
                          </>
                        )}
                        
                      </div>
                      <div className="cardProd__info__descrip__button"></div>
                    </div>
                  </div>
              </Link>
            </SwiperSlide>
          
          )}

          

        </Swiper>
        <Swiper className="swp_productos2" slidesPerView={4} spaceBetween={20}
          modules={[Autoplay]}
          loop={true}
          speed={5000}
          autoplay={{
            delay: 1000,
            reverseDirection: true,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0:{
              slidesPerView: 1
            },
            576:{
              slidesPerView: 1
            },
            768:{
              slidesPerView: 2
            },
            992:{
              slidesPerView: 3
            },
            1200:{
              slidesPerView: 4
            },
           }}
        >
          <SwiperSlide>
            <Link to="" className="cardProd">
                <span className="cardProd__desc">
                  -30% dscto
                </span>
                <div className="cardProd__img">
                  <img src={producto} alt="" />
                </div>
                <div className="cardProd__info">
                  <p className="cardProd__info__cat">Categoría</p>
                  <h3>
                    Saco Payaso 
                      <button>
                        <BsCart2/>
                      </button>
                  </h3>
                  <div className="cardProd__info__descrip">
                    <div className="cardProd__info__descrip__texto">
                      <p>Por metro desde <span>S/. 162.00</span></p>
                      <p>Por rollo desde <span>S/. 220.00</span></p>
                    </div>
                    <div className="cardProd__info__descrip__button"></div>
                  </div>
                </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="" className="cardProd">
                <span className="cardProd__desc">
                  -30% dscto
                </span>
                <div className="cardProd__img">
                  <img src={producto} alt="" />
                </div>
                <div className="cardProd__info">
                  <p className="cardProd__info__cat">Categoría</p>
                  <h3>
                    Saco Payaso 
                      <button>
                        <BsCart2/>
                      </button>
                  </h3>
                  <div className="cardProd__info__descrip">
                    <div className="cardProd__info__descrip__texto">
                      <p>Por metro desde <span>S/. 162.00</span></p>
                      <p>Por rollo desde <span>S/. 220.00</span></p>
                    </div>
                    <div className="cardProd__info__descrip__button"></div>
                  </div>
                </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="" className="cardProd">
                <span className="cardProd__desc">
                  -30% dscto
                </span>
                <div className="cardProd__img">
                  <img src={producto} alt="" />
                </div>
                <div className="cardProd__info">
                  <p className="cardProd__info__cat">Categoría</p>
                  <h3>
                    Saco Payaso 
                      <button>
                        <BsCart2/>
                      </button>
                  </h3>
                  <div className="cardProd__info__descrip">
                    <div className="cardProd__info__descrip__texto">
                      <p>Por metro desde <span>S/. 162.00</span></p>
                      <p>Por rollo desde <span>S/. 220.00</span></p>
                    </div>
                    <div className="cardProd__info__descrip__button"></div>
                  </div>
                </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="" className="cardProd">
                <span className="cardProd__desc">
                  -30% dscto
                </span>
                <div className="cardProd__img">
                  <img src={producto} alt="" />
                </div>
                <div className="cardProd__info">
                  <p className="cardProd__info__cat">Categoría</p>
                  <h3>
                    Saco Payaso 
                      <button>
                        <BsCart2/>
                      </button>
                  </h3>
                  <div className="cardProd__info__descrip">
                    <div className="cardProd__info__descrip__texto">
                      <p>Por metro desde <span>S/. 162.00</span></p>
                      <p>Por rollo desde <span>S/. 220.00</span></p>
                    </div>
                    <div className="cardProd__info__descrip__button"></div>
                  </div>
                </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="" className="cardProd">
                <span className="cardProd__desc">
                  -30% dscto
                </span>
                <div className="cardProd__img">
                  <img src={producto} alt="" />
                </div>
                <div className="cardProd__info">
                  <p className="cardProd__info__cat">Categoría</p>
                  <h3>
                    Saco Payaso 
                      <button>
                        <BsCart2/>
                      </button>
                  </h3>
                  <div className="cardProd__info__descrip">
                    <div className="cardProd__info__descrip__texto">
                      <p>Por metro desde <span>S/. 162.00</span></p>
                      <p>Por rollo desde <span>S/. 220.00</span></p>
                    </div>
                    <div className="cardProd__info__descrip__button"></div>
                  </div>
                </div>
            </Link>
          </SwiperSlide>
          

        </Swiper>
      </section>

      <div className="oferMain">
        <Swiper loop={true}>

          {fromCategory1.map((producto: productosValues) => 
            <SwiperSlide>

              <section className="ofertas">
                <div className="ofertas__first">
                  <h4>{producto.nombre}</h4>
                  <div
                    className="descripcion-producto"
                    dangerouslySetInnerHTML={{ __html: producto.caracteristicas }}
                  ></div>

                  <div className="ofertas__first__usos">
                    <h5>PRINCIPALES USOS: </h5>
                    <div className="ofertas__first__usos__main">
                    {JSON.parse(producto.usos).map((color: string, index: number) => (

                      <div className="ofertas__first__usos__main__item" key={index}>
                        <img src={`${Global.urlImages}/usos/${color}`} alt="" />
                      </div>

                    ))}
                      
                    </div>
                  </div>
                </div>

                <div className="ofertas__second">
                  <img src={`${Global.urlImages}/productos/${producto.imagen1}`} alt={`${producto.nombre} - Sacpro`} title={`${producto.nombre}`} loading='lazy' decoding='async' />
                </div>

              </section>
            </SwiperSlide>
          
          )}
         
        </Swiper>
      </div>

      <section className="productos">
        <div className="productos__title">
          <h2>Productos más vendidos</h2>
        </div>
        <Swiper className="swp_productos" slidesPerView={4} spaceBetween={20}
            modules={[Autoplay]}
            loop={true}
            speed={5000}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
           breakpoints={{
            0:{
              slidesPerView: 1
            },
            576:{
              slidesPerView: 1
            },
            768:{
              slidesPerView: 2
            },
            992:{
              slidesPerView: 3
            },
            1200:{
              slidesPerView: 4
            },
           }}
        >

          {favProductos.map((favProduct: productosValues)=>
            <SwiperSlide>
              <Link to="" className="cardProd">

                  <div className="cardProd__img">
                    <img src={`${Global.urlImages}/productos/${favProduct.imagen1}`} alt={`${favProduct.nombre} - Sacpro Perú`} title={`${favProduct.nombre}`} loading='lazy' decoding='async'/>
                  </div>
                  <div className="cardProd__info">
                    <p className="cardProd__info__cat">{favProduct.categoria}</p>
                    <h3>
                        {favProduct.nombre}
                        <button>
                          <BsCart2/>
                        </button>
                    </h3>
                    <div className="cardProd__info__descrip">
                      <div className="cardProd__info__descrip__texto">
                        <p>Por metro desde <span>S/. {favProduct.precio1}</span></p>
                        <p>Por rollo desde <span>S/. {favProduct.precio2}</span></p>
                      </div>
                      <div className="cardProd__info__descrip__button"></div>
                    </div>
                  </div>
              </Link>
            </SwiperSlide>
          
          )}


        </Swiper>
      </section>

      <section className="banner">
          <div className="banner__item">
            <TbShieldStar/>
            <h5>ISOS 9011 - 14001</h5>
            <p>Nuestros productos cuentan con certificaciones de calidad.</p>
          </div>
          <div className="banner__item">
            <BsCurrencyDollar/>
            <h5>Cotiza con nosotros</h5>
            <p>Déjanos tus datos y te cotizaremos al mejor precio.</p>
          </div>
      </section>

      <section className="marcas">
        <div className="marcas__title">
          <h2>Nuestros clientes</h2>
        </div>
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 6,
            },
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}

          modules={[Autoplay]}
          className="sectCategorias__slide sectCategorias2__slide"
        >
          {marcas.map((marca: marcasValues) => 
            <SwiperSlide>
                <img src={`${Global.urlImages}/marcas/${marca.imagen1}`} alt="" />
            </SwiperSlide>


          )} 

        </Swiper>
      </section>
    </>
  )
}
