import { catchError, firstValueFrom } from 'rxjs'
import { type HttpService } from '@nestjs/axios'
import { type AxiosError } from 'axios'
import { ServiceUnavailableException } from '@nestjs/common'

export const findCoordinates = async (
  httpService: HttpService,
  address: string
): Promise<Coordinates> => {
  const url = `https://geocode.maps.co/search?q=${address}`
  const { data } = await firstValueFrom(
    httpService.get(url).pipe(
      catchError((error: AxiosError) => {
        console.error('findCoordinates error:', error.response.data)
        throw new ServiceUnavailableException("Couldn't find coordinates")
      })
    )
  )

  return {
    lat: data[0].lat ?? -34.5661,
    lon: data[0].lon ?? -58.5806
  }
}
