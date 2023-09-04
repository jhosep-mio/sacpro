/* eslint-disable @typescript-eslint/no-misused-promises */
import { BsXLg } from 'react-icons/bs'
import useAuth from '../../hooks/useAuth'
import { RemoveItemCart } from '../shared/carrito/RemoveItemCart'
import { Total } from '../shared/carrito/Total'
import { Global } from '../../helper/Global'
import { useFormik } from 'formik'
import { SchemaPayment } from '../shared/Schemas'
import { useEffect } from 'react'
import { Errors2 } from '../shared/Errors2'
import Swal from 'sweetalert2'
import axios from 'axios'

const Cart = (): JSX.Element => {
  const { cart, setCart } = useAuth()
  // const navigate = useNavigate()
  const LimpiarCarrito = (): void => {
    setCart([])
    localStorage.setItem('cart', '')
  }

  const redireccion = (): void => {
    handleRealizarPagoClick()
  }

  const handleRealizarPagoClick = async (): Promise<void> => {
    try {
      const request = await axios.get(`${Global.url}/enviarSolicitudPago`)
      if (request.data.data.status == 'SUCCESS') {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        window.location.href = `payment/${request.data.data.answer.formToken}`
      }
    } catch (error) {
      console.log(error)
      Swal.fire('Error', '', 'error')
    }
  }

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
    isSubmitting
  } = useFormik({
    initialValues: {
      nombres: '',
      email: '',
      celular: '',
      direccion: ''
    },
    validationSchema: SchemaPayment,
    onSubmit: redireccion
  })

  useEffect(() => {
    if (errors && isSubmitting) {
      const firstErrorKey = Object.keys(errors)[0]
      const firstErrorElement = document.getElementsByName(firstErrorKey)[0]
      if (firstErrorElement) {
        firstErrorElement.focus()
      }
    }
  }, [touched, errors, isSubmitting])

  return (
    <>
      <section className="cart">
        <div className="cart__main">
          <div className="cart__main__items">
            <div className="cart__main__items__content">
              <div className="cart__main__items__content__title">
                <h2>
                  Carrito <span>({cart.length} productos)</span>
                </h2>
                <button
                  onClick={() => {
                    LimpiarCarrito()
                  }}
                >
                  <BsXLg />
                  Limpiar
                </button>
              </div>
              <div className="cart__main__items__content__info">
                <table>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((producto) => (
                      <tr key={producto.id}>
                        <td>
                          <div className="cartProd">
                            <div className="cartProd__img">
                              <img
                                src={`${Global.urlImages}/productos/${producto.imagen1}`}
                                alt={`${producto.nombre} - Sacpro`}
                                title={`${producto.nombre}`}
                                loading="lazy"
                                decoding="async"
                              />
                            </div>

                            <div className="cartProd__title">
                              <h6>{producto.nombre}</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <h6>{producto.cantidad}</h6>
                        </td>
                        <td>
                          <p>S/. {producto.precio}</p>
                        </td>
                        <td>
                          <button>
                            <RemoveItemCart producto={producto} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="cart__main__price">
            <div className="cart__main__price__content">
              {/* <div className="cart__main__price__content__item">
              <p>Subtotal: </p>

            </div>
            <div className="cart__main__price__content__item">
              <p>Descuento: </p>
              <p>S/. 0.00</p>
            </div> */}
              <div className="cart__main__price__content__item flex flex-col">
                <form action="" onSubmit={handleSubmit}>
                  <div className="flex flex-col mb-6 gap-4">
                    <div className="inputs_pago ">
                      <input
                        type="text"
                        placeholder="Ingresa tus nombres"
                        className=""
                        name="nombres"
                        value={values.nombres}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <Errors2
                      errors={errors.nombres}
                      touched={touched.nombres}
                    />
                  </div>
                  <div className="flex flex-col mb-6 gap-4">
                    <div className="inputs_pago relative">
                      <input
                        type="email"
                        placeholder="Ingresa tu correo"
                        className=""
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <Errors2 errors={errors.email} touched={touched.email} />
                  </div>
                  <div className="flex flex-col mb-6 gap-4">
                    <div className="inputs_pago relative">
                      <input
                        type="number"
                        placeholder="Numero de celular/telefono"
                        className=""
                        name="celular"
                        value={values.celular}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <Errors2
                      errors={errors.celular}
                      touched={touched.celular}
                    />
                  </div>
                  <div className="flex flex-col mb-6 gap-4">
                    <div className="inputs_pago relative">
                      <textarea
                        cols={30}
                        rows={10}
                        placeholder="Dirección"
                        className=""
                        name="direccion"
                        value={values.direccion}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      ></textarea>
                    </div>

                    <Errors2
                      errors={errors.direccion}
                      touched={touched.direccion}
                    />
                  </div>
                  <p>Total a Pagar: </p>
                  <p>
                    <Total />
                  </p>
                  <button type="submit">Continuar con el pago</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Cart
