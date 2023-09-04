import { useEffect, useState } from 'react'
import { getData } from '../shared/FechData'

import mapa from '../../assets/varios/mapa.jpg'
import { coberturasValuesModificate, departamentosValues, distritosValues, provinciasValues } from '../shared/Interfaces'
import Loading from '../shared/Loading'
import { Global } from '../../helper/Global'
const Cobertura = () => {
    const [loadingComponents, setLoadingComponents] = useState(false)
    const [coberturas, setCoberturas] = useState<never[]>([])
    const [departamentos, setDepartamentos] = useState([])
    const [provincias, setProvincias] = useState([])
    const [distritos, setDistritos] = useState([])

    const [selectedDepartamento, setSelectedDepartamento] = useState<string>('');
    const [selectedProvincia, setSelectedProvincia] = useState<string>('');
    const [selectedDistrito, setSelectedDistrito] = useState<string>('');



    
    useEffect(() => {
        setLoadingComponents(true)
        Promise.all([
          getData('indexDepartamentosConCoberturas', setDepartamentos),
        ]).then(() => {
          setLoadingComponents(false)
          window.scrollTo(0, 0)
        })
      }, [])

      useEffect(() => {
        setLoadingComponents(true)
        Promise.all([
          getData('allCoberturas', setCoberturas),
        ]).then(() => {
            console.log(coberturas);
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

      const filteredCoberturas = coberturas.filter((cobertura: coberturasValuesModificate) => {
        if (
            (selectedDepartamento === 'Todos' || cobertura.departamentos_id === selectedDepartamento) &&
            (selectedProvincia === 'Todos' || cobertura.provincias_id === selectedProvincia) &&
            (selectedDistrito === 'Todos' || cobertura.distritos_id === selectedDistrito)
        ) {
            return true;
        }
        return selectedDistrito == cobertura.distritos_id;
    });


  return (
    <>
      {loadingComponents && <Loading/>} 

        <section className="cobertura">
            <div className="cobertura__title">
                <h1>Nuestras zonas de cobertura</h1>
                <p>Selecciona en qué distrito te encuentras y te mostraremos si estás dentro de nuestra zona de cobertura.</p>

            </div>
            <div className="cobertura__main">
                <div className="cobertura__main__item">

                    <div className="cobertura__main__item__options">


                        <select name="" id="" placeholder="Departamento"
                            value={selectedDepartamento}
                             onChange={(e) => {setSelectedDepartamento(e.target.value); if(e.target.value== "Todos"){setSelectedProvincia('Todos'); setSelectedDistrito('Todos')}}}
                        >
                             <option value="Todos">Todos</option>
                            {departamentos.map((departamento: departamentosValues)=>
                                <option key={departamento.id} value={`${departamento.id}`}>{departamento.nombre}</option>           
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
                            
                            onChange={(e) => {
                                setSelectedDistrito(e.target.value);
                                
                                if (e.target.value === 'Todos') {
                                    setSelectedDepartamento('Todos');
                                    setSelectedProvincia('Todos');
                                }
                            }}
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
                <div className="cobertura__main__item">
                    {filteredCoberturas.length === 0 ? ( // Verifica si no hay distribuidores filtrados
                        <div>
                            <h3>No hay cobertura para este distrito</h3>
                            <img src={mapa} alt="" />
                        </div>
                    ) : (
                    filteredCoberturas.map((cobertura: coberturasValuesModificate) => (
                    
                        <div key={cobertura.id}>
                            <h3>{cobertura.distrito}</h3>
                            <p>{cobertura.provincia}, {cobertura.departamento}</p>
                            <img src={`${Global.urlImages}/coberturas/${cobertura.imagen1}`} alt="" />
                        </div>
                    
                    )))}
                </div>
            </div>
        </section>
    </>
  )
}

export default Cobertura