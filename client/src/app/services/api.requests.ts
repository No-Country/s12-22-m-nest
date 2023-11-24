/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosResponse, type AxiosError } from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com'
})

type HttpMethod = 'get' | 'post' | 'put' | 'delete'

const handleAxiosError = (error: AxiosError): void => {
  if (error.response) {
    console.error('Respuesta del servidor con error:', error.response.data)
    console.error('Código de estado:', error.response.status)
  } else if (error.request) {
    console.error('No se recibió respuesta del servidor')
  } else {
    console.error('Error al realizar la solicitud:', error.message)
  }
}

export const request = async <T>(method: HttpMethod, url: string, data?: any): Promise<T> => {
  try {
    if (method === 'get') {
      const response = await fetch(`${axiosInstance.defaults.baseURL}/${url}`)
      if (!response.ok) {
        throw new Error(`Error en la solicitud GET a ${url}`)
      }
      return await (response.json() as Promise<T>)
    } else {
      const axiosResponse: AxiosResponse<T> = await axiosInstance[method](url, data)
      return axiosResponse.data
    }
  } catch (error) {
    handleAxiosError(error as AxiosError)
    throw error
  }
}
