// import React from 'react'
import { useEffect, useState } from 'react'
import { type ConfiguracionValues } from '../shared/Interfaces'
import axios from 'axios'
import { Global } from '../../helper/Global'
import Loading from '../shared/Loading'
import { useFormik } from 'formik'
import { SchemaContacto } from '../shared/Schemas'
import Swal from 'sweetalert2'
import { Errors } from '../shared/Errors'

import { BsClock, BsShop, BsTelephone, BsEnvelope } from 'react-icons/bs'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import ico from '../../assets/logo/mapa.png'

const Contacto = () => {
  const mapStyles = {
    height: '500px',
    width: '100%'
  }

  const markerPositions = [
    { lat: -12.066228052151246, lng: -76.94376885194742 },
    { lat: -12.061840091550305, lng: -77.0094415189596 },
    { lat: -12.044141624178108, lng: -77.04647947544356 }
    // Agrega más objetos de coordenadas para más marcadores
  ]

  const [loadingComponents, setLoadingComponents] = useState(false)
  const [data, setData] = useState<ConfiguracionValues>({
    id: null,
    celular1: '',
    celular2: '',
    correo1: '',
    correo2: '',
    direccion1: '',
    direccion3: '',
    direccion2: '',
    horario: '',
    facebook: '',
    instagram: '',
    whatsapp: ''
  })

  const getData = async (): Promise<void> => {
    setLoadingComponents(true)
    try {
      const request = await axios.get(`${Global.url}/oneConfi/1`)
      setData(request.data)
    } catch (error) {
      setLoadingComponents(false)
      console.log(error)
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

        <section className="contacto">
          <div className="contacto__main">
            <div className="contacto__main__item">

              <h1>Contáctanos</h1>
              <p className="descrip">Si tienes algunas dudas te ayudaremos en tu proceso de compra</p>
              <div className="contacto__main__item__content">
                <p><BsClock/>Horario de atención:</p>
                <ul>
                  <li>{data.horario}</li>
                </ul>
              </div>
              <div className="contacto__main__item__content">
                <p><BsShop/>Tiendas:</p>
                <ul>
                  <li>{data.direccion1}</li>
                  <li>{data.direccion2}</li>
                  <li>{data.direccion3}</li>
                </ul>
              </div>
              <div className="contacto__main__item__content">
                <p><BsTelephone/>Teléfonos:</p>
                <ul>
                  <li><a href={`tel:${data.celular1}`}>{data.celular1}</a></li>
                  <li><a href={`tel:${data.celular2}`}>{data.celular2}</a></li>
                </ul>
              </div>
              <div className="contacto__main__item__content">
                <p><BsEnvelope/>Email:</p>
                <ul>
                  <li><a href={`mailto:${data.correo1}`}>{data.correo1}</a></li>
                  <li><a href={`mailto:${data.correo2}`}>{data.correo2}</a></li>
                </ul>
              </div>

            </div>
            <div className="contacto__main__item">
                <form action="">
                  <div className="data">
                    <label htmlFor="">Nombre</label>
                    <input type="text" placeholder="Ingresa tu nombre" className="data__input"/>
                  </div>
                  <div className="data data_flex">

                    <div className="data__item">
                      <label htmlFor="">Asunto</label>
                      <input type="text" placeholder="Ingresa el asunto" className="data__input"/>
                    </div>
                    <div className="data__item">
                      <label htmlFor="">Celular</label>
                      <input type="text" placeholder="Ingresa tu número de celular" className="data__input"/>
                    </div>
                  </div>
                  <div className="data">
                    <label htmlFor="">Email</label>
                    <input type="mail" placeholder="Ingresa tu correo electrónico" className="data__input"/>
                  </div>
                  <div className="data">
                    <label htmlFor="">Mensaje</label>
                    <textarea name="" id="" cols={30} rows={5} className="data__input area" placeholder="Estoy interesado en el producto..."></textarea>
                  </div>
                  <input type="submit" value="Contactar" className="enviar"/>
                </form>
            </div>
          </div>
        </section>
        <section className="mapa">
          <LoadScript googleMapsApiKey="AIzaSyCnURlOXZMHX5yPBdb8_Rn-m_Y8McBHEjw">
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13} // Nivel de zoom inicial
                center={{ lat: -12.052723186346006, lng: -77.00983374499648 }} // Coordenadas de la ubicación inicial del mapa
              >
                  {markerPositions.map((marker, index) => (
                    <Marker
                      key={index}
                      position={{ lat: marker.lat, lng: marker.lng }}
                      icon={ico}
                    />
                  ))}
              </GoogleMap>
            </LoadScript>
        </section>
      </>
  )
}

export default Contacto
