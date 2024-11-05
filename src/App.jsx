import { useGetData } from './hooks/useGetData'
import { ErrorMessage } from './components/ErrorMessage'
import { Loader } from './components/Loader'
import './App.css'

export const API_BASE_URL = 'https://api.disneyapi.dev'

export const App = () => {
   const { data, isLoading, error } = useGetData(API_BASE_URL, '/character')

   if (isLoading) {
      return <Loader>Loading...</Loader>
   }

   return (
      <>
         {error && <ErrorMessage>Error: {error.message}</ErrorMessage>}
         <div>
            {data.data.map(character => (
               <div key={character._id}>
                  <h3>{character.name}</h3>
                  <img src={character.imageUrl} alt={character.name} />
               </div>
            ))}
         </div>
      </>
   )
}
