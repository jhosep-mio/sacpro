import axios from 'axios'
import { Global } from '../../helper/Global'
import type React from 'react'
import { type productosValues } from './Interfaces'
// import { type bannersValues } from './Interfaces'

export const getData = async (ruta: string, setDatos: React.Dispatch<React.SetStateAction<never[]>>): Promise<void> => {
  try {
    const request = await axios.get(`${Global.url}/${ruta}`)
    setDatos(request.data)
  } catch (error) {
    console.log(error)
  }
}

export const getData2 = async (ruta: string, setDatos: React.Dispatch<React.SetStateAction<never[]>>, setTotal: React.Dispatch<React.SetStateAction<number>>): Promise<void> => {
  try {
    const request = await axios.get(`${Global.url}/${ruta}`)
    setDatos(request.data)
    setTotal(request.data.length)
  } catch (error) {
    console.log(error)
  }
}

export const getDataCategories = async (ruta: string, setDatos: React.Dispatch<React.SetStateAction<{ nombre: string, descripcion: string }>>): Promise<void> => {
  try {
    const request = await axios.get(`${Global.url}/${ruta}`)
    setDatos(request.data)
  } catch (error) {
    console.log(error)
  }
}

export const getOneData = async (ruta: string, setDatos: React.Dispatch<React.SetStateAction<[productosValues]>>, id: string): Promise<void> => {
  const request = await axios.get(`${Global.url}/${ruta}/${id}`)
  setDatos(request.data)
}
