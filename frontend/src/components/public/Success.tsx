import { icono } from '../shared/images'
import draw1 from './../../assets/sucess/animate1.gif'
import draw2 from './../../assets/sucess/undraw_completed_03xt.gif'
import draw3 from './../../assets/sucess/undraw_happy_announcement_re_tsm0.svg'
import draw4 from './../../assets/sucess/undraw_online_party_re_7t6g.svg'
import draw5 from './../../assets/sucess/undraw_super_thank_you_re_f8bo.svg'
import draw6 from './../../assets/sucess/undraw_well_done_re_3hpo.svg'
import { BsWhatsapp } from 'react-icons/bs'

export const Success = (): JSX.Element => {
  const images = ['draw1', 'draw2', 'draw3', 'draw4', 'draw5', 'draw6']
  const randomIndex = Math.floor(Math.random() * images.length)
  const randomImage = images[randomIndex]

  return (
    <div className="h-fit w-[99wv] flex items-center justify-center p-0 m-0 mt-20">
    <section
      className="window px-20 pb-20"
      style={{ overflow: 'hidden' }}
    >
      <div className="window__wrapper">
        <div className="window__wrapper__head">
          <h2>
            <span>
              <img src={icono} alt="" className='w-20 h-20 object-contain'/>
            </span>
            Compra realizada exitosamente
          </h2>
        </div>
        <div
          className="window__wrapper__body"
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          <h3>
            Gracias{' '}
            <strong className="text-4xl md:text-5xl font-bold"></strong>{' '}
          </h3>
          <p>Nos podremos en contacto con usted</p>
          <picture>
            <img
              src={
                (randomImage == 'draw1' ? draw1 : '') ||
                (randomImage == 'draw2' ? draw2 : '') ||
                (randomImage == 'draw3' ? draw3 : '') ||
                (randomImage == 'draw4' ? draw4 : '') ||
                (randomImage == 'draw5' ? draw5 : '') ||
                (randomImage == 'draw6' ? draw6 : '')
              }
              alt=""
            />
          </picture>
        </div>
        <div className="window__wrapper__footer">
          <a
            className="window__wrapper__footer__what cursor-pointer"
            target="_blank"
            href="https://api.whatsapp.com/send/?phone=%2B51994181726&text&type=phone_number&app_absent=0"
            rel="noreferrer"
          >
            <BsWhatsapp></BsWhatsapp>Compartir
          </a>
          <p className="text-lg w-full text-center font-semibold mt-2">
            Si desea agilizar el proceso puede comunicarse a traves de
            Whatsapp
          </p>
        </div>
      </div>
    </section>

  </div>
  )
}
