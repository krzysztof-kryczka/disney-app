import { useEffect, useState } from 'react'

export const useGetData = (API_BASE_URL, path, characterId = null) => {
   const [data, setData] = useState(null)
   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState(null)
   const [page, setPage] = useState(1)
   const [limit, setLimit] = useState(50)

   useEffect(() => {
      const fetchData = async () => {
         setIsLoading(true)
         setData(null)
         try {
            // const endpoint = characterId
            //    ? new URL(`${path}/${characterId}`, API_BASE_URL).href
            //    : new URL(path, API_BASE_URL).href + `?page=${page}&pageSize=${limit}`

            const baseUrl = new URL(path, API_BASE_URL).href
            const endpoint = characterId ? `${baseUrl}/${characterId}` : `${baseUrl}?page=${page}&pageSize=${limit}`

            const response = await fetch(endpoint)
            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`)
            }
            const data = await response.json()
            setData(data)
         } catch (err) {
            setError(err)
         } finally {
            setIsLoading(false)
         }
      }
      fetchData()
   }, [path, page, limit, characterId])

   return { data, isLoading, error, page, setPage, limit, setLimit }
}
