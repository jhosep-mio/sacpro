import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import Swal from 'sweetalert2'
import { Loading } from '../../../shared/Loading'
import { useFormik } from 'formik'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { Errors } from '../../../shared/Errors'
import {
  type categoriasValues,
  showcategoryValuesMoficate
} from '../../../shared/Interfaces'
import { SchemaShowcategory } from '../../../shared/Schemas'


export const EditarShowcategory = (): JSX.Element => {
  const { id } = useParams()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [categorias, setCategorias] = useState([])
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()
  

  
  
  useEffect(() => {
    setLoadingComponents(true)
    setTitle('Editar producto a mostrar')
    Promise.all([getCategorias(), getSubcategorias()]).then(() => {
      setLoadingComponents(false)
    })
  }, [])

  const updateSubcategorias = async (
    values: showcategoryValuesMoficate
  ): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    const data = new FormData()
    data.append('id_categoria', values.id_categoria)
    data.append('_method', 'PUT')

    try {
      const respuesta = await axios.post(
        `${Global.url}/updateShowcategory/${id ?? ''}}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              token !== null && token !== '' ? token : ''
            }`
          }
        }
      )
console.log(respuesta)
      if (respuesta.data.status == 'success') {
        Swal.fire('Actualizado correctamente', '', 'success')
        navigate('/admin/showcategory')
      } else {
        Swal.fire('Error ', '', 'error')
      }
    } catch (error) {
      console.log(error)
      Swal.fire('Error', '', 'error')
    }
    setLoadingComponents(false)
  }

  const getCategorias = async (): Promise<void> => {
    const request = await axios.get(`${Global.url}/allProductos`, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
      }
    })
    setCategorias(request.data)
  }

  const getSubcategorias = async (): Promise<void> => {
    const request = await axios.get(`${Global.url}/oneShowproductos/${id ?? ''}`, {
      headers: {
        Authorization: `Bearer ${
          token !== null && token !== '' ? `Bearer ${token}` : ''
        }`
      }
    })
    setValues({
      ...values,
      id_categoria: request.data.id_categoria,
    })
   

  }

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
    setValues
  } = useFormik({
    initialValues: {
      id_categoria: ''
    },
    validationSchema:SchemaShowcategory,
    onSubmit: updateSubcategorias
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
          <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-2">
        
            <div className="w-full lg:w-full">
              <TitleBriefs titulo="Asignar producto" />
              <select
                className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                name="id_categoria"
                value={values.id_categoria}
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Seleccionar</option>
                {categorias.map((categoria: categoriasValues) => (
                  <option value={categoria.id} key={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
              <Errors
                errors={errors.id_categoria}
                touched={touched.id_categoria}
              />
            </div>
          </div>


          <div className="flex gap-2 w-full justify-end">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/showcategory"
              className="bg-red-500 px-4 py-2 rounded-md text-white"
            >
              Cancelar
            </Link>
            <input
              type="submit"
              className="bg-green-500 text-black hover:bg-green-600 flex items-center gap-2 py-2 px-4 rounded-lg transition-colors cursor-pointer"
              value="Editar"
            />
          </div>
        </form>
          )}
    </>
  )
}
