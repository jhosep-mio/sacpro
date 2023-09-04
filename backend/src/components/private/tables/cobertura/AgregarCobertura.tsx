import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import Swal from 'sweetalert2'
import { Loading } from '../../../shared/Loading'
import { useFormik } from 'formik'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { Errors } from '../../../shared/Errors'
import {
  provinciasValues,
  departamentosValues,
  distritosValues,
  ImagenState,
  coberturaValuesModificate
} from '../../../shared/Interfaces'
import {  SchemaCoberturas} from '../../../shared/Schemas'
import { ImageUploader } from '../../../shared/ImageUploader'

const AgregarCobertura = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [departamentos, setDepartamentos] = useState([])
  const [provincias, setProvincias] = useState([])
  const [distritos, setDistritos] = useState([])

  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()
  const [imagen1, setImagen1] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton1, setBoton1] = useState(false)
  const [url1, setUrl1] = useState('')

  useEffect(() => {
    setTitle('Agregar cobertura')
    getDepartamentos()
    // getProvincias()
    // getDistritos()
  }, [])



  const saveCategoria = async (
    values: coberturaValuesModificate
  ): Promise<void> => {
      setLoadingComponents(true)
      const token = localStorage.getItem('token')
      const data = new FormData()
      data.append('departamentos_id', values.id_departamento)
      data.append('provincias_id', values.id_provincia)
      data.append('distritos_id', values.id_distrito)
      if (imagen1.archivo != null && imagen1.archivo !== undefined) {
        data.append('imagen1', imagen1.archivo)
      }

      try {
        const respuesta = await axios.post(`${Global.url}/saveCobertura`, data, {
          headers: {
            Authorization: `Bearer ${
              token !== null && token !== '' ? token : ''
            }`
          }
        })

        if (respuesta.data.status == 'success') {
          Swal.fire('Agregado correctamente', '', 'success')
          navigate('/admin/distribuidores')
        } else {
          Swal.fire('Error ', '', 'error')
        }
      } catch (error) {
        console.log(error)
        Swal.fire('Error', '', 'error')
      }
      setLoadingComponents(false)
    
    
  }

  const getDepartamentos = async(): Promise<void> =>{
    setLoadingComponents(true)
    const request = await axios.get(`${Global.url}/allDepartamentos`, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
      }
    })
    setDepartamentos(request.data)
    setLoadingComponents(false)
  }

  const getProvincias = async(): Promise<void> =>{
    const request = await axios.get(`${Global.url}/proviciasToDepartamento/${values.id_departamento}`, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
      }
    })
    setProvincias(request.data)
  }

  const getDistritos = async(): Promise<void> =>{
    const request = await axios.get(`${Global.url}/indexDistritos/${values.id_provincia}`, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
      }
    })
    setDistritos(request.data)
  }


  const { handleSubmit, handleChange, errors, values, touched, handleBlur } =
    useFormik({
      initialValues: {
        id_departamento: '',
        id_provincia: '',
        id_distrito: '',
      },
      validationSchema: SchemaCoberturas,
      onSubmit: saveCategoria
    })

    useEffect(() => {
      getProvincias()
    }, [values.id_departamento])

    useEffect(() => {
      getDistritos()
    }, [values.id_provincia])
  return (
    <>
      {loadingComponents
        ? (
        <Loading />
          )
        : (
        <form
          className="bg-secondary-100 p-8 rounded-xl"
          onSubmit={handleSubmit}
        >

          <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row gap-5">
            
            <div className="w-full md:w-1/3">
              <TitleBriefs titulo="Asignar Departamento" />
              <select
                className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                name="id_departamento"
                value={values.id_departamento}
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Seleccionar</option>
                {departamentos.map((departamento: departamentosValues) => (
                  <option value={departamento.id} key={departamento.id}>
                    {departamento.nombre}
                  </option>
                ))}
              </select>
              <Errors
                errors={errors.id_departamento}
                touched={touched.id_departamento}
              />
            </div>
            {values.id_departamento &&
              <div className="w-full md:w-1/3">
                <TitleBriefs titulo="Asignar provincia" />
                <select
                  className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                        focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                        rounded-md transition-all"
                  name="id_provincia"
                  value={values.id_provincia}
                  autoComplete="off"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Seleccionar</option>
                  {provincias.map((provincia: provinciasValues) =>
                      <option value={provincia.id_provincia} key={provincia.id_provincia}>
                        {provincia.nombre}
                      </option>
                  )}
                </select>
                <Errors
                  errors={errors.id_provincia}
                  touched={touched.id_provincia}
                />
              </div>
            }

            {values.id_provincia &&
              <div className="w-full md:w-1/3">
                <TitleBriefs titulo="Asignar distrito" />
                <select
                  className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                        focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                        rounded-md transition-all"
                  name="id_distrito"
                  value={values.id_distrito}
                  autoComplete="off"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Seleccionar</option>
                  {distritos.map((distrito: distritosValues) =>
                    distrito.id_provincia == values.id_provincia && (
                      <option value={distrito.id} key={distrito.id}>
                        {distrito.nombre}
                      </option>
                    )
                  )}
                </select>
                <Errors
                  errors={errors.id_distrito}
                  touched={touched.id_distrito}
                />
              </div>
            }
           
            
            
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Imagen<span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1 flex  items-center gap-4">
              <ImageUploader
                url={url1}
                setUrl={setUrl1}
                boton={boton1}
                setBoton={setBoton1}
                setImagen={setImagen1}
                clase="1"
              />
            </div>
          </div>

          <div className="flex gap-2 w-full justify-end">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/coberturas"
              className="bg-red-500 px-4 py-2 rounded-md text-white"
            >
              Cancelar
            </Link>
            <input
              type="submit"
              className="bg-green-500 text-black hover:bg-green-600 flex items-center gap-2 py-2 px-4 rounded-lg transition-colors cursor-pointer"
              value="Registrar"
            />
          </div>
        </form>
          )}
    </>
  )
}

export default AgregarCobertura