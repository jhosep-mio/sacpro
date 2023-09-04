import {
  RiWhatsappLine,
} from 'react-icons/ri'
import { Link } from "react-router-dom";


import { BsFillGeoAltFill, BsFillTelephoneFill, BsEnvelopeFill} from 'react-icons/bs'

import { useEffect, useState } from 'react'
import { type ConfiguracionValues } from '../../shared/Interfaces'
import axios from 'axios'
import { Global } from '../../../helper/Global'
import Loading from '../../shared/Loading'
import visa from '../../../assets/varios/visa.png'
import master from '../../../assets/varios/master.png'
import american from '../../../assets/varios/american.png'
import pago from '../../../assets/varios/pago.png'
import diners from '../../../assets/varios/diners.png'




export const Footer = (): JSX.Element => {
  const [ loadingComponents, setLoadingComponents ] = useState(false)
  const [data, setData] = useState<ConfiguracionValues>({
    id:  null,
    celular1: '',
    celular2: '',
    correo1: '',
    correo2: '',
    direccion1: '',
    direccion2: '',
    direccion3: '',
    facebook: '',
    instagram: '',
    whatsapp: '',
    horario: ''
  })
  const getData = async (): Promise<void> => {
    setLoadingComponents(true)
    try {
      const request = await axios.get(`${Global.url}/oneConfi/1`)
      setData(request.data)
    } catch (error) {
      setLoadingComponents(false)
    }
    setLoadingComponents(false)
  }

  useEffect(() => {
    getData()
    window.scrollTo(0, 0)
  }, [])


  return (
    <>
      {loadingComponents && <Loading />}
      <footer className="w-full py-20 md:py-28 h-full px-10 md:px-20">
        {/* <section className="grid grid-cols-1 gap-20 lg:gap-0 h-full w-full md:w-[90%]mx-auto lg:h-96 md:grid-cols-2 lg:grid-cols-4">
          <div className="w-full px-10 flex flex-col gap-10 lg:gap-0 items-center">
            <h3 className="font-bold text-4xl text-primary text-left mb-10 w-full">
              INFORMACIÓN
            </h3>
            <ul className="flex flex-col gap-3 text-3xl text-left md:text-left w-full">
              <li className="text-left"><Link to="">Inicio</Link></li>
              <li className="text-left"><Link to="">Nosotros</Link></li>
              <li className="text-left"><Link to="">Categorías</Link></li>
              <li className="text-left"><Link to="">Novedades</Link></li>
              <li className="text-left"><Link to="">Blog</Link></li>
              <li className="text-left"><Link to="">Contacto</Link></li>

              
            </ul>
           
          </div>
          <div className="w-full px-10">
            <h2 className="font-bold text-4xl text-primary text-center md:text-left mb-10">
              MEDIOS DE PAGO
            </h2>
            <img src={medios} alt="" />
            <p className='text-2xl mt-5'>
              <strong className=' flex items-center gap-5'>CTA: CORRIENTE SOLES <img src={bbva} style={{width: "85px"}}/></strong> 0011-0103-0100081636</p>
            <p className='text-2xl mt-5'><strong>CCI:</strong> 011-103-000100081636-91</p>
          </div>
          <div className="w-full px-10 flex flex-col gap-10 lg:gap-0 items-center" >
            <h2 className="font-bold text-4xl text-primary text-center md:text-left mb-10">
              DIOSELYNA
            </h2>
            <ul className="flex flex-col gap-3 text-3xl text-center md:text-left">
              <li>Luminarias de Alumbrado Publico</li>
              <li>Reflectores Led</li>
              <li>Paneles Led</li>
              <li>Luces para piscina y pisos</li>
              <li>Lamparas de emergencia LED</li>
            </ul>
          </div>
          
          <div className="w-full px-10 flex flex-col gap-10 lg:gap-0 items-center">
            <h3 className="font-bold text-4xl text-primary text-center md:text-left mb-10">
              CONTACTO
            </h3>
            <ul className="flex flex-col gap-3 w-full mx-auto md:w-full" key={data.id}>
              <li className="flex gap-3 ">
                <RiMapPinLine className=" text-primary w-auto text-4xl" />
                <p className="text-3xl text-justify flex-grow w-full">
                 {data.direccion}
                </p>
              </li>
              <li className="flex gap-3 items-center">
                <RiMailSendLine className=" text-primary w-auto text-4xl" />
                <p className="text-3xl text-justify flex-grow w-full">
                  <a href={`mailto:${data.correo1}`}>{data.correo1}</a>
                </p>
              </li>
              <li className="flex gap-3 items-center">
                <RiPhoneLine className=" text-primary w-auto text-4xl" />
                <p className="text-3xl text-justify flex-grow w-full">
                  <a href={`tel:+${data.celular1}`}>{data.celular1}</a>  
                </p>
              </li>
              <li>
                  <p className="text-3xl">Atención: Vía Online las 24 horas</p>
              </li>
            </ul>
            <div className="flex justify-center md:justify-start lg:justify-center gap-5 py-4">
              <Link to="/"><RiHome4Line className="text-white bg-blue-700 text-5xl rounded-full w-16 h-16 p-3"/></Link>
              <RiFacebookCircleFill className="text-white bg-blue-700 text-5xl rounded-full w-16 h-16 p-3" />
              <RiInstagramLine className="text-white bg-pink-600 text-5xl rounded-full w-16 h-16 p-3" />
              <RiWhatsappLine className="text-white bg-green-400 text-5xl rounded-full w-16 h-16 p-3" />
            </div>

          </div>
          
        </section> */}

        <section className='footer'>
          <div className="footer__main">
            <div className="footer__main__item">
              <div className="footer__main__item__title">
                <h5>Categorías</h5>
              </div>
              <div className="footer__main__item__content">
                <ul>
                  <li><Link to="/">Arpilleras</Link></li>
                  <li><Link to="/">Laminados</Link></li>
                  <li><Link to="/">Sacos</Link></li>
                  <li><Link to="/">Mallas polietileno</Link></li>
                  <li><Link to="/">Productos impermeables</Link></li>

                </ul>
                <ul className='metodos'>
                  <li><img src={visa} alt="" /></li>
                  <li><img src={master} alt="" /></li>
                  <li><img src={american} alt="" /></li>
                  <li><img src={pago} alt="" /></li>
                  <li><img src={diners} alt="" /></li>

                </ul>
              </div>
            </div>

            <div className="footer__main__item">
              <div className="footer__main__item__title">
                <h5>Atención al cliente</h5>
              </div>
              <div className="footer__main__item__content">
                <ul>
                  <li>
                    <Link to="">Comprobante electrónico</Link>
                  </li>
                  <li>
                    <Link to="">Políticas de privacidad</Link>
                  </li>
                  <li>
                    <Link to="">Términos y condiciones</Link>
                  </li>
                  <li>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer__main__item">
              <div className="footer__main__item__title">
                <h5>Ubicaciones</h5>
              </div>
              <div className="footer__main__item__content">
                <ul>
                  <li>
                    <h5><BsFillGeoAltFill/>La Molina:</h5>
                    <p>{data.direccion2}</p>
                  </li>
                  <li>
                    <h5><BsFillGeoAltFill/>La Victoria:</h5>
                    <p>{data.direccion3}</p>
                  </li>
                  <li>
                    <h5><BsFillGeoAltFill/>Las Malvinas:</h5>
                    <p>{data.direccion1}</p>
                  </li>
                  

                </ul>
              </div>
            </div>
            <div className="footer__main__item">
              <div className="footer__main__item__title">
                <h5>Contacto</h5>
              </div>
              <div className="footer__main__item__content">
                <ul>
                  <li>
                    <h5><BsFillTelephoneFill/>TELEFONOS:</h5>
                    <a href={`tel:+51${data.celular1}`}>+51 {data.celular1}</a><br/>
                    <a href={`tel:+51${data.celular2}`}>+51 {data.celular2}</a>

                  </li>
                  <li>
                    <h5><BsEnvelopeFill/>CORREO:</h5>
                    <a href={`mailto:ventas@sacproperu.com`}>ventas@sacproperu.com</a><br/>

                  </li>

                </ul>
               
              </div>
            </div>
          </div>
        </section>
      

        <div className="wsp">
          <a href={`https://wa.me//+51${data.whatsapp}`}  target='_blank' aria-label="Contactar a Sacpro por WhatsApp">
            <RiWhatsappLine/>
          </a>
          </div>

        
        {/* <div className="call">
          <a href="tel:+51 959075511" aria-label="Llamar a Dioselyna">
            <RiPhoneFill/>
          </a>
        </div> */}
      </footer>
    </>
    
  )
}
