export const buildMapsUrl = (address: string): URL => {
  const url = new URL(
    `https://www.google.com/maps/search/?api=1&query=${address}`
  )
  return url
}
