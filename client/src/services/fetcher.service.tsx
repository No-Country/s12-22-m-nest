type FetchResponseType = string

const fetcher = async (url: string): Promise<FetchResponseType> => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.')
  }

  return await response.json()
}

export default fetcher
