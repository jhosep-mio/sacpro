import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
  distribuidorValuesModificate,
} from '../../../shared/Interfaces'
import {  SchemaDistribuidores } from '../../../shared/Schemas'

const EditarDistribuidor = () => { const { id } = useParams()
const token = localStorage.getItem('token')
const navigate = useNavigate()
const [categorias, setCategorias] = useState([])
const { setTitle, loadingComponents, setLoadingComponents } = useAuth()


useEffect(() => {
  setLoadingComponents(true)
  setTitle('Editar distribuidor')
  Promise.all([getCategorias(), getProducto()]).then(() => {
    setLoadingComponents(false)
  })
}, [])

const updateProducto = async (
  values: distribuidorValuesModificate
): Promise<void> => {
  setLoadingComponents(true)
  const token = localStorage.getItem('token')
  const data = new FormData()
  data.append('idCategoria', values.idCategoria)
  data.append('nombre', values.nombre)
  data.append('direccion', values.direccion)
  data.append('correo', values.correo)
  data.append('celular', values.celular)
  data.append('horario', values.horario)
  data.append('lat', values.lat)
  data.append('lng', values.lng)

  data.append('_method', 'PUT')

  try {
    const respuesta = await axios.post(
      `${Global.url}/updateDistribuidor/${id ?? ''}}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${
            token !== null && token !== '' ? token : ''
          }`
        }
      }
    )

    if (respuesta.data.status == 'success') {
      Swal.fire('Actualizado correctamente', '', 'success')
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

const getCategorias = async (): Promise<void> => {
  const request = await axios.get(`${Global.url}/allCategorias`, {
    headers: {
      Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
    }
  })
  setCategorias(request.data)
}


const getProducto = async (): Promise<void> => {
  const request = await axios.get(`${Global.url}/oneDistribuidor/${id ?? ''}`, {
    headers: {
      Authorization: `Bearer ${
        token !== null && token !== '' ? `Bearer ${token}` : ''
      }`
    }
  })
  console.log(request)
  setValues({
    ...values,
    idCategoria: request.data[0].idCategoria,
    nombre: request.data[0].nombre,
    celular: request.data[0].celular,
    horario: request.data[0].horario,
    correo: request.data[0].correo,
    direccion: request.data[0].direccion,
    lat: request.data[0].lat,
    lng: request.data[0].lng
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
        nombre: '',
        idCategoria: '',
        correo: '',
        celular: '',
        horario: '',
        direccion: '',
        lat: '',
        lng: '',
        id_departamento: '',
        id_distrito: '',
        id_provincia: ''
  },
  validationSchema: SchemaDistribuidores,
  onSubmit: updateProducto
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
              <TitleBriefs titulo="Nombre del distribuidor" />
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

          <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-5">
            <div className="w-full lg:w-full">
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

          <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-5">
          </div>

          <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-5">
            <section className="w-1/2 flex gap-2">
              <div className="w-full lg:relative mb-5">
                <TitleBriefs titulo="Dirección" />
                <InputsBriefs
                  name="direccion"
                  type="text"
                  value={values.direccion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Errors errors={errors.direccion} touched={touched.direccion} />
              </div>
            </section>

            <section className="w-1/2 flex gap-2">
              <div className="w-full lg:relative mb-5">
                <TitleBriefs titulo="Celular" />
                <InputsBriefs
                  name="celular"
                  type="text"
                  value={values.celular}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Errors errors={errors.celular} touched={touched.celular} />
              </div>
            </section>
          </div>

          <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-5">
            <section className="w-1/2 flex gap-2">
              <div className="w-full lg:relative mb-5">
                <TitleBriefs titulo="Correo" />
                <InputsBriefs
                  name="correo"
                  type="text"
                  value={values.correo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Errors errors={errors.correo} touched={touched.correo} />
              </div>
            </section>

            <section className="w-1/2 flex gap-2">
              <div className="w-full lg:relative mb-5">
                <TitleBriefs titulo="Horario" />
                <InputsBriefs
                  name="horario"
                  type="text"
                  value={values.horario}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Errors errors={errors.horario} touched={touched.horario} />
              </div>
            </section>
          </div>

          <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-5">
            <section className="w-1/2 flex gap-2">
              <div className="w-full lg:relative mb-5">
                <TitleBriefs titulo="Latitud" />
                <InputsBriefs
                  name="lat"
                  type="text"
                  value={values.lat}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Errors errors={errors.lat} touched={touched.lat} />
              </div>
            </section>

            <section className="w-1/2 flex gap-2">
              <div className="w-full lg:relative mb-5">
                <TitleBriefs titulo="lng" />
                <InputsBriefs
                  name="lng"
                  type="text"
                  value={values.lng}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Errors errors={errors.lng} touched={touched.lng} />
              </div>
            </section>
          </div>

          

          <div className="flex gap-2 w-full justify-end">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/distribuidores"
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

export default EditarDistribuidor