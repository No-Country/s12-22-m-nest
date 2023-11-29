'use client'
import { type Coordinates } from '@/interfaces'

export const getLocation = async (): Promise<Coordinates> =>
  await new Promise<Coordinates>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        resolve({ lat: latitude.toString(), lon: longitude.toString() })
      },
      (error) => {
        console.error(error.message)
        reject(error)
      }
    )
  })
