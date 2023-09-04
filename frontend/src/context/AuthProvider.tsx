import {
  useState,
  useEffect,
  createContext,
  type ReactNode,
  type Dispatch,
  type SetStateAction
} from 'react'
import { type UserSchema } from './UserSchema'
import { type carrito } from '../components/shared/Interfaces'
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Global } from '../helper/Global'

export interface AuthContextValue {
  auth: typeof UserSchema
  setAuth: Dispatch<SetStateAction<typeof UserSchema>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  loadingComponents: boolean
  setLoadingComponents: Dispatch<SetStateAction<boolean>>
  cart: carrito[]
  setCart: Dispatch<SetStateAction<carrito[]>>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = ({
  children
}: {
  children: ReactNode
}): JSX.Element => {
  const [auth, setAuth] = useState<typeof UserSchema>({
    id: '',
    name: '',
    email: '',
    idRol: null
  })
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [loadingComponents, setLoadingComponents] = useState(true)
  const [cart, setCart] = useState<carrito[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    // Recuperar el carrito del almacenamiento local cuando la página se cargue
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart)
      setCart(parsedCart)
    }

    const encryptionKey = 'qwerasd159'
    const encryptedData = localStorage.getItem('data')

    if (encryptedData && encryptedData != null) {
      const guardarData = async (): Promise<void> => {
        const decryptedData = CryptoJS.AES.decrypt(
          encryptedData,
          encryptionKey
        ).toString(CryptoJS.enc.Utf8)

        const values = JSON.parse(decryptedData)
        const paymentId: string = values[0].id_unique

        const request = await axios.post(
            `${Global.url}/oneTransaccion/${paymentId}`
        )
        if (request.data.length > 0 && request.data[0].status != 'rejected') {
          localStorage.removeItem('cart')
          localStorage.removeItem('data')
          setCart([])
          navigate(`/success-pago/${paymentId}`)
        }
      }
      guardarData()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        setLoading,
        title,
        setTitle,
        loadingComponents,
        setLoadingComponents,
        cart,
        setCart
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
