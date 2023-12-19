import { catchError, firstValueFrom } from 'rxjs'
import { type HttpService } from '@nestjs/axios'
import { type AxiosError } from 'axios'
import { ServiceUnavailableException } from '@nestjs/common'

export const findCoordinates = async (
  httpService: HttpService,
  address: string
): Promise<Coordinates> => {
  const url = new URL(
    `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=${process.env.GEO_API_KEY}`
  ).toString()
  const { data } = await firstValueFrom(
    httpService.get(url).pipe(
      catchError((error: AxiosError) => {
        console.error('findCoordinates error:', error.response.data)
        throw new ServiceUnavailableException("Couldn't find coordinates")
      })
    )
  )
  return {
    lat: data.features[0].properties.lat,
    lon: data.features[0].properties.lon
  }
}
