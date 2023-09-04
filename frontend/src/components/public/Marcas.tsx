// import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { getData } from '../shared/FechData'
import { Global } from '../../helper/Global'
import Loading from '../shared/Loading'
import {
  type marcasValues,
} from '../shared/Interfaces'


const Marcas = () => {
    const [ loadingComponents, setLoadingComponents ] = useState(false)
    const [banners, setBanners] = useState<never[]>([])

    useEffect(() => {
      setLoadingComponents(true)
      Promise.all([
        getData('getMarcas', setBanners),
      ]).then(() => {
        setLoadingComponents(false)
      })
    }, [])
  return (
    <>
      {loadingComponents && <Loading />}

        <section className="banner bannerMarcas">
            <div className="banner__content">
                <h1>MARCAS</h1>
            </div>
        </section>
        <div className="marcas">
            <div className="marcas__main">
              {banners.map((banner: marcasValues) => 
                <div className="marcas__main__item" key={banner.id}><Link to='/novedades'><img src={`${Global.urlImages}/marcas/${banner.imagen1}`} alt="Dioselyna" /></Link></div>
              
              )}



            </div>
        </div>
    </>
  )
}

export default Marcas