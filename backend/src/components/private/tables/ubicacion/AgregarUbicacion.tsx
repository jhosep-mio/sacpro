import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import Swal from 'sweetalert2'
import { Loading } from '../../../shared/Loading'
import { useFormik } from 'formik'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { InputsBriefs } from '../../../shared/InputsBriefs'
import { Errors } from '../../../shared/Errors'
import {
  provinciasValues,
  departamentosValues,
  distritosValuesModificate
} from '../../../shared/Interfaces'
import {  SchemaDistrito } from '../../../shared/Schemas'

const AgregarUbicacion = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [departamentos, setDepartamentos] = useState([])
  const [provincias, setProvincias] = useState([])

  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()

  useEffect(() => {
    setTitle('Agregar distribuidor')
    getDepartamentos()
    getProvincias()
    // getDistritos()
  }, [])



  const saveCategoria = async (
    values: distritosValuesModificate
  ): Promise<void> => {
      setLoadingComponents(true)
      const token = localStorage.getItem('token')
      const data = new FormData()
      data.append('id_provincia', values.id_provincia)
      data.append('nombre', values.nombre)


      try {
        const respuesta = await axios.post(`${Global.url}/saveDistrito`, data, {
          headers: {
            Authorization: `Bearer ${
              token !== null && token !== '' ? token : ''
            }`
          }
        })

        if (respuesta.data.status == 'success') {
          Swal.fire('Agregado correctamente', '', 'success')
          navigate('/admin/ubicaciones')
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
    const request = await axios.get(`${Global.url}/indexDepartamentosConDistribuidores`, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
      }
    })
    setDepartamentos(request.data)
    setLoadingComponents(false)
  }

  const getProvincias = async(): Promise<void> =>{
    const request = await axios.get(`${Global.url}/allProvincias`, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
      }
    })
    setProvincias(request.data)
  }




  const { handleSubmit, handleChange, errors, values, touched, handleBlur } =
    useFormik({
      initialValues: {
        nombre: '',
        id_provincia: '',
      },
      validationSchema: SchemaDistrito,
      onSubmit: saveCategoria
    })

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
              
            </div>
            {departamentos &&
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

            <div className="w-1/3 lg:relative mb-5">
                <TitleBriefs titulo="Distrito" />
                <InputsBriefs
                  name="nombre"
                  type="text"
                  value={values.nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Errors errors={errors.nombre} touched={touched.nombre} />
              </div>
           
            
            
          </div>

          <div className="flex gap-2 w-full justify-end">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/ubicaciones"
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

export default AgregarUbicacion