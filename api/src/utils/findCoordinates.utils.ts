import { firstValueFrom } from 'rxjs'
import { type HttpService } from '@nestjs/axios'

export const findCoordinates = async (
  httpService: HttpService,
  address: string
): Promise<Coordinates> => {
  const url = `https://geocode.maps.co/search?q=${address}`
  const { data } = await firstValueFrom(
    httpService.get(url)
    // .pipe(
    //   catchError((error: AxiosError) => {
    //     console.error('findCoordinates error:', error.response.data)
    //     throw new InternalServerErrorException("Couldn't find coordinates")
    //   })
    // )
  )
  // Todo: handle errors
  return {
    lat: data[0].lat ?? -34.5661,
    lon: data[0].lon ?? -58.5806
  }
}
