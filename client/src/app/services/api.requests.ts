import axios, { type AxiosResponse } from 'axios'
import { type HttpMethod, type Response } from '@/interfaces'

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com'
})

export const getRequest = async <T>(url: string): Promise<Response<T>> => {
  try {
    const response = await fetch(`${axiosInstance.defaults.baseURL}/${url}`)
    const responseData = await response.json()
    if (!response.ok) {
      const errorResponse: Response<T> = { data: null, error: { message: `Error en la solicitud GET a ${url}`, code: response.status } }
      return errorResponse
    }
    return { data: responseData, error: null }
  } catch (error: any) {
    return { data: null, error: { message: error.message, code: error.code || 500 } }
  }
}

export const mutationRequest = async <T>(method: HttpMethod, url: string, body?: any): Promise<Response<T>> => {
  try {
    const axiosResponse: AxiosResponse<T> = await axiosInstance[method](url, body)
    return { data: axiosResponse.data, error: null }
  } catch (error: any) {
    return { data: null, error: { message: error.message, code: error.response?.status || 500 } }
  }
}
