import { useEffect, useState } from 'react'
import { useGetData } from './useGetData'
import { API_BASE_URL } from '../App'

export const useCharacterInfo = characterId => {
   const { data: character, isLoading, error } = useGetData(API_BASE_URL, '/character', null, null, characterId)
   const [characterInfo, setCharacterInfo] = useState(null)

   useEffect(() => {
      if (character) {
         let characterData = character.data
         // Sprawdzenie, czy dane są z tablicy i jeśli tak, czy jest niepusta
         if (Array.isArray(characterData)) {
            //    if (characterData.length === 0) {
            //       characterData = null
            //    } else {
            //       characterData = characterData[0]
            //    }
            characterData = characterData.length === 0 ? null : characterData[0]
         }
         if (characterData) {
            const { name, imageUrl, films, shortFilms, videoGames, tvShows } = characterData
            setCharacterInfo({
               name: name,
               imageUrl: imageUrl,
               films: films || [],
               shortFilms: shortFilms || [],
               videoGames: videoGames || [],
               tvShows: tvShows || [],
            })
         } else {
            setCharacterInfo(null)
         }
      }
   }, [character])

   return {characterInfo, isLoading, error }
}
