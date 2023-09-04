export interface valuesTransaccion {
  id: number
  id_transaccion: number
  nombres: string
  apellidos: string
  status: string
  tipo: string
  order_id: string
  email: string
  celular: string
  comentario: string | null
  delivery: string
  total_pago: string
  array_productos: string
  estado: number
}

export interface distribuidorValues{
  id: number
  nombre: string
  direccion: string
  correo: string
  celular: string
  horario: string
  lat: string 
  lng: string
  id_departamento: string
  id_provincia: string
  id_distrito: string

}

export interface coberturaValues{
  id: number
  imagen1: string
  id_departamento: string
  departamento: string
  id_provincia: string
  provincia: string
  id_distrito: string
  distrito: string
}

export interface coberturaValuesModificate{
  id_departamento: string
  id_provincia: string
  id_distrito: string
}

export interface distribuidorValuesModificate{
  nombre: string
  idCategoria: string
  direccion: string
  correo: string
  celular: string
  horario: string
  lat: string 
  lng: string
  id_departamento: string
  id_provincia: string
  id_distrito: string

}

export interface departamentosValues{
  id: number
  nombre: string
}

export interface provinciasValues{
  id: number
  nombre: string
  id_provincia: string
  id_departamento: string
}

export interface distritosValues{
  id: number
  nombre: string
  id_provincia: string
}


export interface distritosValuesModificate{
  nombre: string
  id_provincia: string
}


export interface configuracionValues {
  telefono: string
  celular1: string
  celular2: string
  correo1: string
  correo2: string
  horario1: string
  horario2: string
  direccion1: string
  direccion2: string
  direccion3: string
  facebook: string
  instagram: string
  twiter: string
  linkedin: string
  youtube: string
  whatsapp: string
}

export interface Values {
  nombres: string
  celular: string
  email: string
  base_proyecto: string
  nombre_empresa: string
  historia_empresa: string
  principales_servicios: string
  colores: string
  referencias: string
  transmitir: string
}

export interface ImagenState {
  archivo: File | null
  archivoName: string
}

export interface ImagePreviewProps {
  url: string
  setUrl: React.Dispatch<React.SetStateAction<string>>
  boton: boolean
  setBoton: React.Dispatch<React.SetStateAction<boolean>>
  setImagen: React.Dispatch<React.SetStateAction<ImagenState>>
  clase: string
}

export interface ImagePreviewPropsUdpdate {
  globalUrl: string
  url: string
  setUrl: React.Dispatch<React.SetStateAction<string>>
  boton: boolean
  setBoton: React.Dispatch<React.SetStateAction<boolean>>
  imagen: string
  setImagen: React.Dispatch<React.SetStateAction<ImagenState>>
  clase: string
}

export interface interfaceListaDiseño {
  id: number
  nombres: string
  celular: number
  email: string
  nombre_empresa: string
  created_at: string
  uptated_at: string
}

// PAGINACION
export interface paginacionValues {
  totalPosts: number
  cantidadRegistros: number
  paginaActual: number
  setpaginaActual: (pagina: number) => void
}

// DELETE
export interface deleteValues {
  ruta: string
  id: number
  token: string | null
  getData: () => Promise<void>
  totalPosts: number
  cantidadRegistros: number
  paginaActual: number
  setpaginaActual: (pagina: number) => void
}

// BANNERS
export interface bannersValues {
  id: number
  nombre: string
  imagen1: string
  created_at: string | null
  updated_at: string | null
}

// BANNERS
export interface coloresValues {
  id: number
  nombre: string
  imagen1: string
  created_at: string | null
  updated_at: string | null
}

export interface usosValues {
  id: number
  nombre: string
  imagen1: string
  created_at: string | null
  updated_at: string | null
}

export interface bannersValuesModificate{
  nombre: string
}

// OFERTAS
export interface ofertasValues {
  id: number
  imagen1: string
  created_at: string | null
  updated_at: string | null
}

// MARCAS
export interface marcasValue {
  id: number
  imagen1: string
  imagen2: string
  created_at: string | null
  updated_at: string | null
}

// CATEGORIAS
// LISTA
export interface categoriasValues {
  id: number
  nombre: string
  imagen1: string
  descripcion: string
  created_at: string | null
  updated_at: string | null
}
// CREACION - UPDATE
export interface categoriasValuesMoficate {
  nombre: string
  descripcion: string
}

export interface subcategoriasValues {
  id: number
  id_categoria: string
  nombre: string
  created_at: string | null
  updated_at: string | null
}
// CREACION - UPDATE
export interface subcategoriasValuesMoficate {
  nombre: string
  idCategoria: string
}

export interface showcategoryValues{
  id: number
  id_productos: string
  producto: string
}

// CREACION - UPDATE
export interface showcategoryValuesMoficate {
  id_categoria: string
}

// PRODUCTOS
export interface productosValuesModificate {
  nombre: string
  codigo: string
  idCategoria: string
  stock: string
  idSubcategoria: string
  id_marca: string
  precio1: string
  precio2: string
  cantidadMayor: string
  colores: []
  usos: []
  tipoprecio: string
  favoritos: string
}

export interface blogValues{
  id: number
  titulo: string
  resumen: string
  imagen1: string
  descripcion: string
}

export interface blogValuesModificate{
  titulo: string
  resumen: string
  descripcion: string
}

// UPDATE-CREATE
export interface segundaSeccionValuesModificate {
  titulo: string
  descripcion: string
}

export interface valoresValues {
  titulo: string
}

export interface mapaValues {
  mapa: string
  mapa2: string
}

export interface editorValues {
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
}

export interface arrayValues {
  id: number | null
  medida: string
  precio: string
  cantidad: string
  oferta: string
}

// PRODUCTOS
export interface productosValues {
  id: number
  codigo: string
  id_categoria: string
  categoria: string
  id_subcategoria: string
  id_marca: string
  nombre: string
  stock: string
  imagen1: string
  imagen2: string
  imagen3: string
  precio1: string
  precio2: string
  created_at: string | null
  updated_at: string | null
}
