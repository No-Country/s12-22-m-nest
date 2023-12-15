'use client'
import { type ShippingFormProps, type Result, type Root } from '@/interfaces'
import { geoApiKey } from '@/utils/constants/env.const'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import axios from 'axios'
import { debounce } from 'lodash'
import { type FunctionComponent, useMemo, useState, type Dispatch, type SetStateAction } from 'react'
import { type FieldErrors, type RegisterOptions, type UseFormRegister } from 'react-hook-form'

interface PropsGeo {
  address: string
  setAddress: Dispatch<SetStateAction<string>>
  errors: FieldErrors<ShippingFormProps>
  name: keyof ShippingFormProps
  hookForm?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<ShippingFormProps>
    validations: RegisterOptions
  }
}

const GeoAutocomplete: FunctionComponent<PropsGeo> = ({ address, errors, name, setAddress, hookForm }) => {
  const [results, setResults] = useState<Result[]>()
  const HookForm = hookForm?.register(name, hookForm?.validations)
  const fetchAddress = async (address: string): Promise<Root | undefined> => {
    try {
      const { data } = await axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&limit=5&type=amenity&format=json&apiKey=${geoApiKey}`
      )
      console.log(data)
      return data as Root
    } catch (error) {
      console.error(error)
    }
  }

  const formatAddress = (data: Result): string => {
    const { street, city, country, housenumber, state } = data
    return `${street} ${housenumber}, ${city}, ${state}, ${country}`
  }

  const debouncedSearchHandler = useMemo(
    () =>
      debounce(async (add: string): Promise<void> => {
        if (add.length <= 0) return
        const data = await fetchAddress(add)
        setResults(data?.results)
      }, 500),
    []
  )

  return (
    <Autocomplete
      {...HookForm}
      className='w-full'
      items={Array.isArray(results) ? results : []}
      label='Ingresa tu direccion'
      allowsEmptyCollection
      labelPlacement='outside'
      placeholder='Debe ser en formato: Calle 123, Ciudad, Estado, Pais'
      onInputChange={debouncedSearchHandler}
      onSelectionChange={(item) => {
        setAddress(item.toString())
      }}
    >
      {(res) => <AutocompleteItem key={res?.place_id}>{formatAddress(res)}</AutocompleteItem>}
    </Autocomplete>
  )
}

export default GeoAutocomplete
