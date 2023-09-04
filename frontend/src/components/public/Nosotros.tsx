import icon1 from '../../assets/nosotros/icon1.png'
import icon2 from '../../assets/nosotros/icon2.png'
import icon3 from '../../assets/nosotros/icon3.png'
import icon4 from '../../assets/nosotros/icon4.png'
import icon5 from '../../assets/nosotros/icon5.png'
import icon6 from '../../assets/nosotros/icon6.png'

import nosotros from '../../assets/nosotros/nosotros.avif'
import nosotros1 from '../../assets/nosotros/nosotros1.png'
import nosotros2 from '../../assets/nosotros/nosotros2.jpg'


const Nosotros = () => {
  return (
    <>
        <section className="nosotros">
            <div className="nosotros__title">
                <h1>Sobre nosotros</h1>
            </div>
            <div className="nosotros__info">
                <p>
                    Somos una empresa peruana con más de ocho años en el mercado nacional
                    dedicada a la fabricación de productos elaborados con tejidos en fibra
                    polipropileno y polietileno. Nos destacamos por nuestra calidad y
                    compromiso con la mejora continua, brindando soluciones inmediatas,
                    contando con el respaldo de las normas ISO 9001 e ISO 14001, siendo así los
                    principales distribuidores en el rubro ferretero, construcción, agroindustria,
                    pesquera, minería, entre otros.
                </p>
            </div>

            <div className="nosotros__bg1">
                <img src={nosotros} alt="" />

            </div>


            <div className="nosotros__sostenibilidad2">
                    <div className="nosotros__sostenibilidad2__right">
                        <div className="nosotros__sostenibilidad__right__item">
                            <div>
                                <h2>Misión</h2>
                            </div>
                            <p>
                                Ofrecer productos de óptima calidad y servicios innovadores que brinden
                                soluciones inmmediatas y adaptadas a requerimientos específicos,
                                asegurando un alto nivel de satisfacción y fidelidad en nuestros clientes.
                            </p>
                        </div>
                        <div className="nosotros__sostenibilidad__right__item">
                            <div>
                                <h2>Visión</h2>
                            </div>
                            <p>
                                Nuestro objetivo es permanecer posicionados como un referente en el
                                mercado peruano y tomar presencia a nivel Sudamericano, diferenciándonos
                                con nuestra propia línea de productos, innovación en los procesos y
                                excelencia en la atención al cliente.
                            </p>
                        </div>
                    </div>
                <div className="nosotros__sostenibilidad2__left">
                    {/* <h2>Sostenibilidad</h2>
                    <p>
                        Tenemos un firme compromiso con el desarrollo sostenible, con prácticas
                        éticas que fomenten el bienestar de nuestras comunidades y del medio
                        ambiente. 
                    </p><br/>
                    <p>
                        En el proceso de fabricación, se utilizan residuos sólidos que se
                        producen en la elaboración de los productos (residuos scrap) para la
                        fabricación de nuevas cintas que son empleadas en el uso del empaquetado
                        de sacos, telas arpilleras y en algunos productos terminados, generando
                        menor porcentaje de desechos sólidos y contaminación en la industria.
                    </p> */}

                    <img src={nosotros1} alt="" />
                </div>
            </div>

            <div className="nosotros__sostenibilidad">
                    <div className="nosotros__sostenibilidad__right">
                        <img src={nosotros2} alt="" />
                    </div>
                <div className="nosotros__sostenibilidad__left">
                    <h2>Sostenibilidad</h2>
                    <p>
                        Tenemos un firme compromiso con el desarrollo sostenible, con prácticas
                        éticas que fomenten el bienestar de nuestras comunidades y del medio
                        ambiente. 
                    </p><br/>
                    <p>
                        En el proceso de fabricación, se utilizan residuos sólidos que se
                        producen en la elaboración de los productos (residuos scrap) para la
                        fabricación de nuevas cintas que son empleadas en el uso del empaquetado
                        de sacos, telas arpilleras y en algunos productos terminados, generando
                        menor porcentaje de desechos sólidos y contaminación en la industria.
                    </p>

                </div>
            </div>
            <div className="nosotros__valores">
                <div className="nosotros__valores__title">
                    <h2>Nuestros valores</h2>
                </div>
                <div className="nosotros__valores__main">
                    <div className="nosotros__valores__main__item">
                        <div className="nosotros__valores__main__item__icon">
                            <img src={icon1} alt="" />
                        </div>
                        <div className="nosotros__valores__main__item__title">
                            <h5>Orientación al cliente</h5>
                        </div>
                        <div className="nosotros__valores__main__item__info">
                            <p>
                                Buscamos detectar las prioridades y satisfacer las
                                necesidades de nuestros clientes, poniendo nuestro
                                esfuerzo hacia el interés del consumidor.
                            </p>
                        </div>
                    </div>
                    <div className="nosotros__valores__main__item">
                        <div className="nosotros__valores__main__item__icon">
                            <img src={icon2} alt="" />
                        </div>
                        <div className="nosotros__valores__main__item__title">
                            <h5>Responsabilidad</h5>
                        </div>
                        <div className="nosotros__valores__main__item__info">
                            <p>
                                Tenemos claro que nuestras decisiones y los actos
                                que estas generarán tendrán consecuencias y
                                estamos listos para enfrentarlas.
                            </p>
                        </div>
                    </div>
                    <div className="nosotros__valores__main__item">
                        <div className="nosotros__valores__main__item__icon">
                            <img src={icon3} alt="" />
                        </div>
                        <div className="nosotros__valores__main__item__title">
                            <h5>Sostenibilidad</h5>
                        </div>
                        <div className="nosotros__valores__main__item__info">
                            <p>
                                Sabemos que no solo debemos satisfacer a nuestro
                                cliente de hoy, sino al de la próxima generación, así
                                que creceremos cuidando el medio ambiente e
                                incentivando el bienestar social.
                            </p>
                        </div>
                    </div>
                    <div className="nosotros__valores__main__item">
                        <div className="nosotros__valores__main__item__icon">
                            <img src={icon4} alt="" />
                        </div>
                        <div className="nosotros__valores__main__item__title">
                            <h5>Puntualidad</h5>
                        </div>
                        <div className="nosotros__valores__main__item__info">
                            <p>
                                Orientados para cumplir con el calendario previsto y
                                no retrasar la culminación de los proyectos, así
                                nuestros clientes lograrán ganar tiempo.
                            </p>
                        </div>
                    </div>
                    <div className="nosotros__valores__main__item">
                        <div className="nosotros__valores__main__item__icon">
                            <img src={icon5} alt="" />
                        </div>
                        <div className="nosotros__valores__main__item__title">
                            <h5>Lealtad</h5>
                        </div>
                        <div className="nosotros__valores__main__item__info">
                            <p>
                                Apoyaremos constantemente a nuestros
                                colaboradores, del mismo modo que estos lo hagan
                                con nosotros.
                            </p>
                        </div>
                    </div>
                    <div className="nosotros__valores__main__item">
                        <div className="nosotros__valores__main__item__icon">
                            <img src={icon6} alt="" />
                        </div>
                        <div className="nosotros__valores__main__item__title">
                            <h5>Calidad</h5>
                        </div>
                        <div className="nosotros__valores__main__item__info">
                            <p>
                                Nos alineamos a la excelencia tanto en el servicio
                                como en el producto y eso siempre será así.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Nosotros