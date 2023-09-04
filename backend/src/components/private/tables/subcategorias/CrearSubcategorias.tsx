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
  type categoriasValues,
  type subcategoriasValuesMoficate
} from '../../../shared/Interfaces'
import { SchemaSubcategorias } from '../../../shared/Schemas'

export const CrearSubcategorias = (): JSX.Element => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [categorias, setCategorias] = useState([])
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()
  
  useEffect(() => {
    setTitle('Registrar Sub Categoría')
    getCategorias()
  }, [])

  const saveCategoria = async (
    values: subcategoriasValuesMoficate
  ): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    const data = new FormData()
    data.append('id_categoria', values.idCategoria)
    data.append('nombre', values.nombre)

    try {
      const respuesta = await axios.post(`${Global.url}/saveSubcategorias`, data, {
        headers: {
          Authorization: `Bearer ${
            token !== null && token !== '' ? token : ''
          }`
        }
      })

      if (respuesta.data.status == 'success') {
        Swal.fire('Agregado correctamente', '', 'success')
        navigate('/admin/subcategorias')
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
    setLoadingComponents(true)
    const request = await axios.get(`${Global.url}/allCategorias`, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
      }
    })
    setCategorias(request.data)
    setLoadingComponents(false)
  }

  const { handleSubmit, handleChange, errors, values, touched, handleBlur } =
    useFormik({
      initialValues: {
        nombre: '',
        idCategoria: ''
      },
      validationSchema: SchemaSubcategorias,
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
          <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-2">
            <div className="w-full lg:w-1/2">
              <TitleBriefs titulo="Nombre de la subcategoria" />
              <InputsBriefs
                name="nombre"
                type="text"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.nombre} touched={touched.nombre} />
            </div>
            <div className="w-full md:w-1/2">
              <TitleBriefs titulo="Asignar categoria" />
              <select
                className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                name="idCategoria"
                value={values.idCategoria}
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
                errors={errors.idCategoria}
                touched={touched.idCategoria}
              />
            </div>
            
          </div>



          <div className="flex gap-2 w-full justify-end">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/subcategorias"
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
