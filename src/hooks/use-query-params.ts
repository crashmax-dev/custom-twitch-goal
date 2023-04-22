import { useState } from 'react'
import { useCallbackRef } from 'zero-dependency'
import { isFunction } from '../utils'

function getSearchParam(search: string, param: string) {
  const searchParams = new URLSearchParams(search)
  return searchParams.get(param)
}

function setSearchParam(search: string, param: string, value: string) {
  const searchParams = new URLSearchParams(search)
  searchParams.set(param, value)
  return searchParams.toString()
}

const defaultDeserialize = <Value>(v: string | null) => v as Value
const defaultSerialize = String

interface SearchParamsOptions<T> {
  name: string
  serialize?: (value: T) => string
  deserialize?: (value: string | null) => T
}

// ???
export function useQueryParams<T>({
  name,
  serialize = defaultSerialize,
  deserialize = defaultDeserialize
}: SearchParamsOptions<T>) {
  const [value, setValue] = useState(() => {
    return deserialize(getSearchParam(location.search, name))
  })

  const updateValue = useCallbackRef((newValue: React.SetStateAction<T>) => {
    const search = window.location.search
    const actualNewValue = isFunction(newValue) ? newValue(value) : newValue
    setValue(actualNewValue)

    const newSearch = setSearchParam(search, name, serialize(actualNewValue))
    history.pushState(null, '', `?${newSearch}`)
  })

  return [value, updateValue] as const
}
