import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { BsChevronDown } from "react-icons/bs";
import {
    type productosValues,
    type categoriasValues,
    subcategoriasValues,
} from '../shared/Interfaces'
import { getData } from '../shared/FechData'
import { Global } from '../../helper/Global'
import Loading from '../shared/Loading'
import { Paginacion } from '../shared/Paginacion'
import mark from '../../assets/varios/mark.jpeg'
// import watermark from 'watermarkjs';
const Novedades = () => {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
  
    const [loadingComponents, setLoadingComponents] = useState(false);
    const [paginaActual, setpaginaActual] = useState(1);
    const [cantidadRegistros] = useState(9);
  
    const indexOfLastPost = paginaActual * cantidadRegistros;
    const indexOfFirstPost = indexOfLastPost - cantidadRegistros;
    const totalPosts = productos.length;

    const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };


  
    useEffect(() => {
      setLoadingComponents(true);
      Promise.all([getData('allProductos', setProductos)]).then(() => {
        setLoadingComponents(false);
        window.scrollTo(0, 0);
      });
    }, []);
  
    function formatearURL(nombre: string): string {
      // Eliminar espacios al principio y al final del nombre
      let url = nombre.trim();
  
      // Convertir todo el string a minúsculas
      url = url.toLowerCase();
  
      // Reemplazar los espacios por guiones
      url = url.replace(/ /g, '-');
  
      // Eliminar el caracter "/"
      url = url.replace(/\//g, '');
  
      // Eliminar paréntesis y caracteres especiales
      url = url.replace(/[^\w-]/g, '');
  
      // Retornar la URL formateada
      return url;
    }
  
    useEffect(() => {
      setLoadingComponents(true);
      Promise.all([getData('allCategorias', setCategorias)]).then(() => {
        setLoadingComponents(false);
        window.scrollTo(0, 0);
      });
    }, []);
  
    const filterDate = (): never[] => {
      return productos.slice(indexOfFirstPost, indexOfLastPost);
    };
  
    const [subcategorias, setSubcategorias] = useState([]);
    useEffect(() => {
      setLoadingComponents(true);
      Promise.all([getData('getSubcategorias', setSubcategorias)]).then(() => {
        setLoadingComponents(false);
        window.scrollTo(0, 0);
      });
    }, []);
    return (
        <>
            {loadingComponents && <Loading />}

            <main>
                <section className="banner bannerNovedades">
                    <div className="banner__content">
                        <h1>NOVEDADES</h1>
                    </div>
                </section>
                <section className="novedades">

                    <div className="novedades__main">
                        <div className="novedades__main__aside">
                            <aside>
                                <ul>
                                    <li>
                                        {categorias.map((categoria: categoriasValues) => (
                                            <Accordion expanded={expanded === `panel${categoria.id}`} onChange={handleChange(`panel${categoria.id}`)} key={categoria.id}>
                                                <AccordionSummary
                                                    expandIcon={<BsChevronDown />}
                                                    aria-controls="panel1bh-content"
                                                    id="panel1bh-header"
                                                >
                                                    <p>{categoria.nombre}</p>

                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <ul>
                                                        {
                                                            subcategorias.map((subcategoria: subcategoriasValues) => {
                                                                if(subcategoria.id_categoria == String(categoria.id)){
                                                                    return <li><Link to={`/productos/${categoria.id}-${formatearURL(categoria.nombre)}`}>{subcategoria.nombre}</Link></li>
                                                                }else{
                                                                    return null
                                                                }
                                                            })
                                                        }
                                                    </ul>
                                                </AccordionDetails>
                                            </Accordion>
                                        ))}



                                    </li>



                                </ul>
                            </aside>
                        </div>

                        <div className="novedades__main__productos">
                            <div className="novedades__main__productos__title">
                                {categorias.map((categoria:categoriasValues, index: number) => (
                                    <>  
                                        {index < 1 &&
                                        <>
                                            <h2 key={categoria.id}>{categoria.nombre}</h2>
                                            <p>{categoria.descripcion}</p>
                                        </>
                                        }
                                    </>
                                ))}
                                

                            </div>

                            <div className="novedades__main__productos__grid">

                                {filterDate().map((producto: productosValues) => (
                                    <div className="novedades__main__productos__grid__item" key={producto.id}>
                                        <Link to={`/view/${producto.id}-${formatearURL(producto.nombre)}`} >
                                            <div className="novedades__main__productos__grid__item__img">
                                                <a href={`{{ route('download.image', ['imageId' => producto.id]) }}`} download>
                                                    {/* Imagen con marca de agua */}
                                                    <img src={`${Global.urlImages}/productos/${producto.imagen1}`} alt={`${producto.nombre} - Dioselyna`} />
                                                    {/* Imagen de la marca de agua */}
                                                    <img src={mark} alt="Dioselyna" className="mark" />
                                                </a>
                                            </div>
                                            <div className="novedades__main__productos__grid__item__title">
                                                <h1>{producto.nombre}</h1>
                                                {/* <p>S/. {producto.precio}</p> */}
                                            </div>
                                            {producto.imagen2 &&
                                            <div className="novedades__main__productos__grid__item__content">
                                                <img src={`${Global.urlImages}/productos/${producto.imagen2}`} alt="" />
                                            </div>
                                            }
                                        </Link>
                                    </div>
                                ))}

                            </div>

                            <div className="col-md-12 flex justify-center py-10">
                            <Paginacion
                                totalPosts={totalPosts}
                                cantidadRegistros={cantidadRegistros}
                                paginaActual={paginaActual}
                                setpaginaActual={setpaginaActual}
                            />
                            </div>

                        </div>

                    </div>
                </section>
            </main>
        </>
    )
}

export default Novedades