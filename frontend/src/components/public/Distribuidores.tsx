import { CiShop } from "react-icons/ci";
import { BsLayers, BsGeoAlt, BsPhone, BsEnvelopeAt, BsClock } from "react-icons/bs";
import { useState, useEffect } from 'react';
// Import Swiper React components
import { getData } from '../shared/FechData'
import Loading from '../shared/Loading';
import { categoriasValues, departamentosValues, distribuidorValues, distritosValues, provinciasValues } from "../shared/Interfaces";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ico from '../../assets/logo/mapa.png'

const Distribuidores = () => {
    const [loadingComponents, setLoadingComponents] = useState(false)
    const [distribuidores, setDistribuidores] = useState<never[]>([])
    const [departamentos, setDepartamentos] = useState([])
    const [provincias, setProvincias] = useState([])
    const [distritos, setDistritos] = useState([])

    const [selectedDistributorCoordinates, setSelectedDistributorCoordinates] = useState({ lat: -11.994456944657415, lng: -77.07145407244334 });
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedDepartamento, setSelectedDepartamento] = useState<string>('');
    const [selectedProvincia, setSelectedProvincia] = useState<string>('');
    const [selectedDistrito, setSelectedDistrito] = useState<string>('');



    const handleViewOnMapClick = (lat: number, lng: number) => {
        setSelectedDistributorCoordinates({ lat, lng });
        handleScrollToMap();
    };

    useEffect(() => {
      setLoadingComponents(true)
      Promise.all([
        getData('allDistribuidores', setDistribuidores),
      ]).then(() => {
        setLoadingComponents(false)
      })
    }, [])

    const mapStyles = {
        height: '500px',
        width: '100%',
    };

    const handleScrollToMap = () => {
        const mapaElement = document.getElementById('mapa');
        if (mapaElement) {
          mapaElement.scrollIntoView({ behavior: 'smooth' });
        }
    };



    useEffect(() => {
      setLoadingComponents(true)
      Promise.all([
        getData('indexDepartamentosConDistribuidores', setDepartamentos),
      ]).then(() => {
        setLoadingComponents(false)
        window.scrollTo(0, 0)
      })
    }, [])

    useEffect(() => {
      setLoadingComponents(true)
      Promise.all([
        getData('allProvincias', setProvincias),
      ]).then(() => {
        setLoadingComponents(false)
        window.scrollTo(0, 0)
      })
    }, [])


    useEffect(() => {
      setLoadingComponents(true)
      Promise.all([
        getData('allDistritos', setDistritos),
      ]).then(() => {
        setLoadingComponents(false)
        window.scrollTo(0, 0)
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
    
    const filteredDistribuidores = distribuidores.filter((distribuidor: distribuidorValues) => {

      if (
          (selectedCategory === '' || selectedCategory === 'Todos') &&
          (selectedDepartamento === '' || selectedDepartamento === 'Todos') &&
          (selectedProvincia === '' || selectedProvincia === 'Todos') &&
          (selectedDistrito === '' || selectedDistrito === 'Todos')
      ) {
          return true; // Mostrar todos los distribuidores si no se selecciona ninguna opción
      }
  
      if (selectedCategory === '' || selectedCategory === 'Todos') {
          if (selectedDistrito === '' || selectedDistrito === 'Todos') {
              if (selectedProvincia === '' || selectedProvincia === 'Todos') {
                  return distribuidor.departamentos_id == selectedDepartamento; // Filtrar solo por departamento
              }
              return (
                  distribuidor.departamentos_id == selectedDepartamento &&
                  distribuidor.provincias_id == selectedProvincia
              ); // Filtrar por departamento y provincia
          }
          return (
              distribuidor.departamentos_id == selectedDepartamento &&
              distribuidor.provincias_id == selectedProvincia &&
              distribuidor.id_distrito== selectedDistrito
          ); // Filtrar por departamento, provincia y distrito
      }
  
      if (selectedDepartamento === '' || selectedDepartamento === 'Todos') {
          return distribuidor.categoria === selectedCategory; // Filtrar solo por categoría
      }
  
      if (selectedProvincia === '' || selectedProvincia === 'Todos') {
          return (
              distribuidor.categoria === selectedCategory &&
              distribuidor.departamentos_id == selectedDepartamento
          ); // Filtrar por categoría y departamento
      }
  
      if (selectedDistrito === '' || selectedDistrito === 'Todos') {
          return (
              distribuidor.categoria === selectedCategory &&
              distribuidor.departamentos_id == selectedDepartamento &&
              distribuidor.provincias_id == selectedProvincia
          ); // Filtrar por categoría, departamento y provincia
      }
  
      // Filtrar por categoría, departamento, provincia y distrito
      return (
          distribuidor.categoria === selectedCategory &&
          distribuidor.departamentos_id == selectedDepartamento &&
          distribuidor.provincias_id == selectedProvincia &&
          distribuidor.id_distrito == selectedDistrito
      );
  });
  return (
    <>
      {loadingComponents && <Loading />} 

        <section className="distribuidores">
            <div className="distribuidores__seleccion">
                <p>Elige por categoría:</p>
                <div className="distribuidores__seleccion__options">
                    <select name="" id="" placeholder="Categoría" value={selectedCategory}
                        onChange={(e) => {setSelectedCategory(e.target.value); if(e.target.value== "Todos"){setSelectedDepartamento('Todos'); setSelectedProvincia('Todos'); setSelectedDistrito('Todos')}}}
                    >
                        <option value="Todos">Todos</option>        
                        {categorias.map((categoria: categoriasValues)=> 
                            <option value={`${categoria.nombre}`} key={categoria.id}>{categoria.nombre}</option>
                        )}
                    </select>
                    
                </div>

                <p>Elige por ubicación:</p>
                <div className="distribuidores__seleccion__options">
                    <select name="" id="" placeholder="Departamento"
                      value={selectedDepartamento}
                      onChange={(e) => {setSelectedDepartamento(e.target.value); if(e.target.value== "Todos"){setSelectedProvincia('Todos'); setSelectedDistrito('Todos')}}}
                    >
                        <option value="Todos">Todos</option>
                        {departamentos.map((departamento: departamentosValues)=>
                          <option value={`${departamento.id}`}>{departamento.nombre}</option>           
                        )}
                    </select>
                    

                    <select name="" id="" placeholder="Provincias"
                      value={selectedProvincia}
                      onChange={(e) => {setSelectedProvincia(e.target.value); if(e.target.value== "Todos"){setSelectedDepartamento('Todos'); setSelectedDistrito('Todos')}}}
                    > 
                        <option value="Todos">Todos</option>

                        {provincias
                        .filter((provincia: provinciasValues) =>
                          provincia.id_departamento == selectedDepartamento
                        )
                        .map((provincia: provinciasValues) => (
                          <option value={`${provincia.id_provincia}`} key={provincia.id_provincia}>
                            {provincia.nombre}
                          </option>
                        ))}
                    </select>

                    
                    <select name="" id="" placeholder="Distritos"
                      value={selectedDistrito}
                      onChange={(e) => {setSelectedDistrito(e.target.value); if(e.target.value== "Todos"){setSelectedDepartamento('Todos'); setSelectedProvincia('Todos')}}}
                    >
                      <option value="Todos">Todos</option>

                      {distritos
                        .filter((distritos: distritosValues) =>
                          distritos.id_provincia == selectedProvincia
                        )
                        .map((distritos: distritosValues) => (
                          <option value={`${distritos.id}`} key={distritos.id}>
                            {distritos.nombre}
                          </option>
                        ))}

                    </select>
                </div>
            </div>  
            <div className="distribuidores__main">

            {filteredDistribuidores.length === 0 ? ( // Verifica si no hay distribuidores filtrados
                <p>No hay distribuidores con esta categoría.</p>
            ) : (
                filteredDistribuidores.map((distribuidor: distribuidorValues) => (
                
                    <div className="distribuidores__main__item" key={distribuidor.id}>
                        <div className="distribuidores__main__item__title">
                            <CiShop/>
                            <h6>{distribuidor.nombre}</h6>
                        </div>
                        <div className="distribuidores__main__item__info">
                            <ul>
                                <li><BsLayers/>{distribuidor.categoria}</li>
                                <li><BsGeoAlt/>{distribuidor.direccion}</li>
                                <li><BsPhone/>{distribuidor.celular}</li>
                                <li><BsEnvelopeAt/>{distribuidor.correo}</li>
                                <li><BsClock/>{distribuidor.horario}</li>
                            </ul>
                        </div>

                        <button id="verEnMapaButton" onClick={() => handleViewOnMapClick(distribuidor.lat, distribuidor.lng)}>Ver en el mapa</button>
                    </div>
                
                )))}

            </div>
        </section>

        <section className="mapa" id="mapa">
          <LoadScript googleMapsApiKey="AIzaSyCnURlOXZMHX5yPBdb8_Rn-m_Y8McBHEjw">
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={16} // Nivel de zoom inicial
                center={selectedDistributorCoordinates} // Coordenadas de la ubicación inicial del mapa
              >
                  
                    <Marker
                      position={selectedDistributorCoordinates}
                      icon={ico}
                    />
                  
              </GoogleMap>
            </LoadScript>
        </section>
    </>
  )
}

export default Distribuidores