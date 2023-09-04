import { logo } from "../shared/images"

const Tienda = () => {
  return (
    <>
        <section className="tiendas">
            <div className="tiendas__title">
                <h1>Nuestras tiendas</h1>
            </div>
            <div className="tiendas__main">
                <div className="tiendas__main__item">
                    <a href="http://logosperu.com" target="_blank" rel="noopener noreferrer">
                        <img src={logo} alt="" />
                        <h5>Arpimax</h5>
                    </a>
                </div>
                <div className="tiendas__main__item">
                    <a href="http://logosperu.com" target="_blank" rel="noopener noreferrer">
                        <img src={logo} alt="" />
                        <h5>Raschel max</h5>
                    </a>
                </div>
                <div className="tiendas__main__item">
                    <a href="http://logosperu.com" target="_blank" rel="noopener noreferrer">
                        <img src={logo} alt="" />
                        <h5>Saqui</h5>
                    </a>
                </div>
                <div className="tiendas__main__item">
                    <a href="http://logosperu.com" target="_blank" rel="noopener noreferrer">
                        <img src={logo} alt="" />
                        <h5>Arpimax</h5>
                    </a>
                </div>
                
            </div>
        </section>
    </>
  )
}

export default Tienda