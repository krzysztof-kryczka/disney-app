import { useGetData } from './hooks/useGetData'
import { ErrorMessage } from './components/ErrorMessage'
import { Loader } from './components/Loader'
import { ImageGallery } from './components/ImageGallery'
import './App.css'

export const API_BASE_URL = 'https://api.disneyapi.dev'

export const App = () => {
   const { data: images, isLoading, error } = useGetData(API_BASE_URL, '/character')

   return (
      <>
         {isLoading && <Loader>Loading...</Loader>}
         {error && <ErrorMessage>{error.message}</ErrorMessage>}
         {images && <ImageGallery cards={images} />}
      </>
   )
}
