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
  type productosValuesModificate,
  type ImagenState,
  type categoriasValues,
  subcategoriasValues,
  bannersValues,
} from '../../../shared/Interfaces'
import { ScheamaProductos } from '../../../shared/Schemas'
import Editor from '../../../shared/Editar'
import { ImageUpdate } from '../../../shared/ImageUpdate'
import Items from '../../../shared/Modals/Items'

export const EditarProducto = (): JSX.Element => {
  const { id } = useParams()
  const token = localStorage.getItem('token')
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedValues2, setSelectedValues2] = useState<string[]>([]);

  const [colores, setColores] = useState([])
  const [usos, setUsos] = useState([])

  const navigate = useNavigate()
  const [categorias, setCategorias] = useState([])
  const [subcategorias, setSubcategorias] = useState([])
  const [marcas, setMarcas] = useState([])
  const [content, setContent] = useState('')
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()
  const [imagen1, setImagen1] = useState('')
  const [imagenNueva1, setImagenNueva1] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })

  const [boton1, setBoton1] = useState(false)
  const [url1, setUrl1] = useState('')
  const [imagen2, setImagen2] = useState('')
  const [imagenNueva2, setImagenNueva2] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton2, setBoton2] = useState(false)
  const [url2, setUrl2] = useState('')
  const [imagen3, setImagen3] = useState('')
  const [imagenNueva3, setImagenNueva3] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton3, setBoton3] = useState(false)
  const [url3, setUrl3] = useState('')

  useEffect(() => {
    setLoadingComponents(true)
    setTitle('Editar Producto')
    Promise.all([getCategorias(), getProducto(), getSubcategorias(), getMarcas(), getColores(), getUsos()]).then(() => {
      setLoadingComponents(false)
    })
  }, [])

  const updateProducto = async (
    values: productosValuesModificate
  ): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    const data = new FormData()
    data.append('id_categoria', values.idCategoria)
    data.append('id_subcategoria', values.idSubcategoria)
    data.append('id_marca', values.id_marca)
    data.append('nombre', values.nombre)
    data.append('caracteristicas', content)
    data.append('stock', values.stock)
    data.append('codigo', values.codigo)
    data.append('cantidadMayor', values.cantidadMayor)
    
    if (imagenNueva1.archivo != null) {
      data.append('imagen1', imagenNueva1.archivo)
    }
    if (imagenNueva2.archivo != null) {
      data.append('imagen2', imagenNueva2.archivo)
    }
    if (imagenNueva3.archivo != null) {
      data.append('imagen3', imagenNueva3.archivo)
    }
    data.append('precio1', values.precio1)
    data.append('colores', JSON.stringify(selectedValues))
    data.append('usos', JSON.stringify(selectedValues2))
    data.append('precio2', values.precio2)
    data.append('favoritos', values.favoritos)
    data.append('_method', 'PUT')

    try {
      const respuesta = await axios.post(
        `${Global.url}/updateProducto/${id ?? ''}}`,
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
        navigate('/admin/productos')
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

  const getSubcategorias = async (): Promise<void> => {
    const request = await axios.get(`${Global.url}/getSubcategorias`, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
      }
    })
    setSubcategorias(request.data)
  }

  const getMarcas = async (): Promise<void> => {
    setLoadingComponents(true)
    const request = await axios.get(`${Global.url}/getMarcas`, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
      }
    })
    setMarcas(request.data)
    setLoadingComponents(false)
  }

  const getColores = async (): Promise<void> => {
    setLoadingComponents(true)
    const request = await axios.get(`${Global.url}/allColores`, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
      }
    })
    setColores(request.data)
    setLoadingComponents(false)
  }

  const getUsos = async (): Promise<void> => {
    setLoadingComponents(true)
    const request = await axios.get(`${Global.url}/allUsos`, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
      }
    })
    setUsos(request.data)
    setLoadingComponents(false)
  }

  const getProducto = async (): Promise<void> => {
    const request = await axios.get(`${Global.url}/oneProducto/${id ?? ''}`, {
      headers: {
        Authorization: `Bearer ${
          token !== null && token !== '' ? `Bearer ${token}` : ''
        }`
      }
    })
    console.log(request)
    setValues({
      ...values,
      idCategoria: request.data[0].id_categoria,
      idSubcategoria: request.data[0].id_subcategoria,
      codigo: request.data[0].codigo,
      id_marca: request.data[0].id_marca,
      nombre: request.data[0].nombre,
      stock: request.data[0].stock,
      favoritos: request.data[0].favoritos,
      precio1: request.data[0].precio1,
      precio2: request.data[0].precio2,
      cantidadMayor: request.data[0].cantidadMayor
    })
    setSelectedValues(JSON.parse(request.data[0].colores))
    setSelectedValues2(JSON.parse(request.data[0].usos))
    setImagen1(request.data[0].imagen1)
    setImagen2(request.data[0].imagen2)
    setImagen3(request.data[0].imagen3)
    setContent(request.data[0].caracteristicas)
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
      codigo: '',
      stock: '',
      idCategoria: '',
      idSubcategoria: '',
      id_marca: '',
      precio1: '',
      precio2: '',
      colores: [],
      usos: [],
      cantidadMayor: '',
      favoritos: '',
    },
    validationSchema: ScheamaProductos,
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
            <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-5">
            <div className="w-full lg:w-1/3">
              <TitleBriefs titulo="Código del producto" />
              <InputsBriefs
                name="codigo"
                type="text"
                value={values.codigo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.codigo} touched={touched.codigo} />
            </div>
            <div className="w-full md:w-1/3">
              <TitleBriefs titulo="Asignar Marca" />
              <select
                className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                name="id_marca"
                value={values.id_marca}
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Seleccionar</option>
                {marcas.map((marca: bannersValues) => (
                  <option value={marca.id} key={marca.id}>
                    {marca.nombre}
                  </option>
                ))}
              </select>
              <Errors
                errors={errors.id_marca}
                touched={touched.id_marca}
              />
            </div>
            <div className="w-full lg:w-1/3">
              <TitleBriefs titulo="Destacados" />
              <select
                className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                        focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                        rounded-md transition-all"
                name="favoritos"
                value={values.favoritos}
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Seleccionar</option>
                <option value="true">Si</option>
                <option value="false">No</option>
              </select>
              <Errors errors={errors.favoritos} touched={touched.favoritos} />
            </div>
          </div>
          <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-2">
            <div className="w-full lg:w-2/3">
              <TitleBriefs titulo="Nombre del producto" />
              <InputsBriefs
                name="nombre"
                type="text"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.nombre} touched={touched.nombre} />
            </div>
            <div className="w-full lg:w-1/3">
              <TitleBriefs titulo="Stock" />
              <select
                className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                        focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                        rounded-md transition-all"
                name="stock"
                value={values.stock}
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Seleccionar</option>
                <option value="Disponible">Disponible</option>
                <option value="No Disponible">No Disponible</option>
              </select>
              <Errors errors={errors.stock} touched={touched.stock} />
            </div>
            
          </div>

          <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-5">
            <div className="w-full lg:w-1/2">
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
            {values.idCategoria &&
            <div className="w-full lg:w-1/2">
              <TitleBriefs titulo="Asignar subcategoria" />
              <select
                className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                name="idSubcategoria"
                value={values.idSubcategoria}
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Seleccionar</option>
                {subcategorias.map((subcategoria: subcategoriasValues) =>
                    subcategoria.id_categoria == values.idCategoria && (
                      <option value={subcategoria.id} key={subcategoria.id}>
                        {subcategoria.nombre}
                      </option>
                    )
                )}
              </select>
              <Errors
                errors={errors.idSubcategoria}
                touched={touched.idSubcategoria}
              />
            </div>
            }
            
            
          </div>

          <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-5">
            <div className="w-full lg:w-1/2">
              <TitleBriefs titulo="Precio por metro" />
              <InputsBriefs
                name="precio1"
                type="number"
                value={values.precio1}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.precio1} touched={touched.precio1} />
            </div>
            <div className="w-full lg:w-1/4">
              <TitleBriefs titulo="Precio por rollo" />
              <InputsBriefs
                name="precio2"
                type="number"
                value={values.precio2}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.precio2} touched={touched.precio2} />
            </div>
            <div className="w-full lg:w-1/4">
              <TitleBriefs titulo="A partir de" />
              <InputsBriefs
                name="cantidadMayor"
                type="number"
                value={values.cantidadMayor}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.cantidadMayor} touched={touched.cantidadMayor} />
            </div>
          </div>

          <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-5">
            <Items titulo={'Colores'} setSelectedValues={setSelectedValues} selectedValues={selectedValues} urls={colores} carpeta={"colores"}/>
          </div>

          <div className="w-full lg:relative mb-5 flex flex-col lg:flex-row justify-between gap-5">
            <Items titulo={'Usos'} setSelectedValues={setSelectedValues2} selectedValues={selectedValues2} urls={usos} carpeta={"usos"}/>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-10 relative">
            <p className="bg-secondary-100 pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-10px]">
              Imagenes del producto<span className="text-red-500">*</span>
            </p>
            <div className="flex-1 flex flex-col lg:flex-row items-center gap-4">
              <ImageUpdate
                globalUrl="productos"
                url={url1}
                setUrl={setUrl1}
                boton={boton1}
                setBoton={setBoton1}
                imagen={imagen1}
                setImagen={setImagenNueva1}
                clase="1"
              />
              <ImageUpdate
                globalUrl="productos"
                url={url2}
                setUrl={setUrl2}
                boton={boton2}
                setBoton={setBoton2}
                imagen={imagen2}
                setImagen={setImagenNueva2}
                clase="2"
              />
              <ImageUpdate
                globalUrl="productos"
                url={url3}
                setUrl={setUrl3}
                boton={boton3}
                imagen={imagen3}
                setBoton={setBoton3}
                setImagen={setImagenNueva3}
                clase="3"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-10 relative">
            <p className="bg-transparent pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-25px]">
              Detalle del producto
            </p>
            <div className="flex-1 w-full md:w-3/4">
              <Editor content={content} setContent={setContent} />
            </div>
          </div>

          <div className="flex gap-2 w-full justify-end">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/productos"
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
