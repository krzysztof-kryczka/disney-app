import { useEffect, useState } from 'react'

let endpoint = null

export const useGetData = (API_BASE_URL, path, page, limit, characterId = null) => {
   const [data, setData] = useState(null)
   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState(null)

   useEffect(() => {
      const fetchData = async () => {
         try {
            if (characterId) {
               // getOneCharacter: 'https://api.disneyapi.dev/character/:id'
               endpoint = new URL(`${path}/${characterId}`, API_BASE_URL).href
            } else {
               // getAllCharacters: 'https://api.disneyapi.dev/character/?page=1&pageSize=50
               endpoint = new URL(path, API_BASE_URL).href + `?page=${page}&pageSize=${limit}`
               // endpoint = `${new URL(path, API_BASE_URL).href}?page=${page}&pageSize=${limit}`
            }
            const response = await fetch(endpoint)
            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`)
            }
            const data = await response.json()
            setData(data)
            setIsLoading(false)
         } catch (err) {
            setError(err)
         } finally {
            setIsLoading(false)
         }
      }
      fetchData()
   }, [path, page, limit, characterId])

   return { data, isLoading, error }
}
