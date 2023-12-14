import { type Socket } from 'socket.io'
import { type FormatedSockDealer } from 'src/socket/interfaces/dealer.interface'

export const formatDealerSock = (
  clientsArray: Socket[]
): FormatedSockDealer[] => {
  const dealers = clientsArray
    .filter((client) => {
      return (
        client.handshake.query.type === 'dealer' &&
        client.data.active &&
        client.data.taken === false &&
        client.data.asking === false
      )
    })
    .map((dealer) => {
      return {
        sockId: dealer.id,
        clientId: dealer.handshake.query.userId.toString(),
        coordinates: dealer.data.coordinates as Coordinates,
        active: dealer.data.active as boolean,
        taken: dealer.data.taken as boolean,
        asking: dealer.data.asking as boolean
      }
    })

  return dealers
}
