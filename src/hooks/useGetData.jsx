import { useEffect, useState } from 'react'

export const useGetData = (API_BASE_URL, path) => {
   const [data, setData] = useState(null)
   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState(null)

   useEffect(() => {
      const fetchData = async () => {
         try {
            const endpoint = new URL(path, API_BASE_URL).href
            console.log('endpoint: ', endpoint)
            const response = await fetch(endpoint)
            console.log('response: ', response)
            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`)
            }
            const data = await response.json()
            console.log('data: ', data)
            setData(data)
            setIsLoading(false)
         } catch (err) {
            setError(err)
         } finally {
            setIsLoading(false)
         }
      }
      fetchData()
   }, [path])

   return { data, isLoading, error }
}
