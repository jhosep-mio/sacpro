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

import { getData, getDataCategories } from '../shared/FechData'
import { Global } from '../../helper/Global'
import Loading from '../shared/Loading'

import { useParams } from 'react-router-dom';

const ProductosFrom = () => {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [loadingComponents, setLoadingComponents] = useState(false)

    const [subcategorias, setSubcategorias] = useState([])
    const [categoria, setCategoria] = useState<{ nombre: string; descripcion: string }>({
        nombre: "",
        descripcion: "",
      });

    const handleChange =
        (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

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

    const [categorias, setCategorias] = useState([])
    useEffect(() => {
        setLoadingComponents(true)
        Promise.all([
            getData('allCategorias', setCategorias),
            getDataCategories(`oneCategoria/${id}`, setCategoria)

        ]).then(() => {
            setLoadingComponents(false)
            window.scrollTo(0, 0)
        })
    }, [])

    const { id } = useParams()

    const [productosFrom, setProductosFrom] = useState([])
    useEffect(() => {
        setLoadingComponents(true)
        Promise.all([getData(`allProductosGroup/${id ?? ''}`, setProductosFrom)]).then(
            () => {
                setLoadingComponents(false)
                window.scrollTo(0, 0)
            }
        )
    }, [id])


    useEffect(() => {
        setLoadingComponents(true)
        Promise.all([
            getData('getSubcategorias', setSubcategorias),
            getData(`allProductosGroup/${id ?? ''}`, setProductosFrom)
        ]).then(() => {
            setLoadingComponents(false)
            window.scrollTo(0, 0)
        })
    }, [])
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
                                            <Accordion expanded={expanded === `panel${categoria.id}`} onChange={handleChange(`panel${categoria.id}`)}>
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
                                                                if (subcategoria.id_categoria == String(categoria.id)) {
                                                                    return <li><Link to={`/productos/${categoria.id}-${formatearURL(categoria.nombre)}`}>{subcategoria.nombre}</Link></li>
                                                                } else {
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
                                <>
                                    <h2>{categoria.nombre}</h2>
                                    <p>{categoria.descripcion}</p>

                                </>
                            </div>

                            <div className="novedades__main__productos__grid">
                                {productosFrom.length > 0
                                    ? (
                                        productosFrom.map((productofrom: productosValues) => (
                                            <div className="novedades__main__productos__grid__item">
                                                <Link to={`/view/${productofrom.id}-${formatearURL(productofrom.nombre)}`}>
                                                    <div className="novedades__main__productos__grid__item__img">
                                                        <img src={`${Global.urlImages}/productos/${productofrom.imagen1}`} alt={`${productofrom.nombre} - Dioselyna`} />
                                                    </div>
                                                    <div className="novedades__main__productos__grid__item__title">
                                                        <h1>{productofrom.nombre}</h1>
                                                        {/* <p>S/. {productofrom.precio}</p> */}
                                                    </div>
                                                    {productofrom.imagen2 &&
                                                        <div className="novedades__main__productos__grid__item__content">
                                                            <img src={`${Global.urlImages}/productos/${productofrom.imagen2}`} alt="" />
                                                        </div>
                                                    }
                                                </Link>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="novedades__main__productos__grid__item">
                                            <p className='noProductos'>No hay productos para esta categoría 😔</p>

                                        </div>

                                    )}
                            </div>

                        </div>

                    </div>
                </section>
            </main>
        </>
    )
}

export default ProductosFrom