import { useState, useEffect } from 'react';

import { getData } from '../shared/FechData'
import Loading from '../shared/Loading'
import {
  type categoriasValues,
} from '../shared/Interfaces'

import { Global } from '../../helper/Global';

const Categorias = () => {

  const [loadingComponents, setLoadingComponents] = useState(false)

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

  return (
    <>
      {loadingComponents && <Loading />} 

      <div className="categorias2">
        <div className="categorias2__title">
          <h1>Nuestras <span>categorías</span></h1>
        </div>
        <div className="categorias2__main">

          {categorias.map((categoria: categoriasValues) => 
          
            <div className="categorias2__main__item">
              <div className="categorias2__main__item__img">
                <img src={`${Global.urlImages}/categorias/${categoria.imagen1}`} alt={`${categoria.nombre} - Sacpro`} title={`${categoria.nombre}`} loading='lazy' decoding='async'/>
              </div>
              <div className="categorias2__main__item__title">
                <h5>{categoria.nombre}</h5>
              </div>
            </div>
          
          )} 
          

        </div>
      </div>
    </>
  )
}

export default Categorias