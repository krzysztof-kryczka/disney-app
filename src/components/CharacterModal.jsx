import { createPortal } from 'react-dom'
import { CharacterDetails } from './CharacterDetails'
import { Loader } from './Loader'
import { ErrorMessage } from './ErrorMessage'
import styled from 'styled-components'
import { useCharacterInfo } from '../hooks/useCharacterInfo'
import noPicture from '../assets/no-picture.jpg'

const ModalOverlay = styled.div`
   position: fixed;
   left: 0;
   right: 0;
   top: 0;
   bottom: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   background: rgba(0, 0, 0, 0.8);
   z-index: 1000;
`

const ModalContent = styled.div`
   position: relative;
   width: 100%;
   max-width: 500px;
   max-height: 80vh;
   padding: 20px;
   border-radius: 12px;
   background: #fff;
   overflow-y: auto;

   /* Stylizacja paska przewijania */
   &::-webkit-scrollbar {
      width: 15px; /* Szerokość paska przewijania */
   }

   &::-webkit-scrollbar-thumb {
      background-color: #e51b36; /* Kolor paska przewijania */
      border-radius: 6px; /* Zaokrąglenie paska przewijania */
   }

   &::-webkit-scrollbar-track {
      background: #f1f1f1; /* Kolor tła paska przewijania */
      border-radius: 6px; /* Zaokrąglenie tła paska przewijania */
   }
`

const StyledCloseButton = styled.button`
   position: sticky;
   top: 0;
   right: 0;
   background-color: #fff;
   cursor: pointer;
   padding: 10px 16px;
   font-size: 20px;
   font-weight: 700;
   text-decoration: none;
   color: #e51b36;
   border: 2px solid #e51b36;
   border-radius: 4px;
   transform: translate(900%, 0%);
   &:hover {
      background-color: #e51b36;
      color: #fff;
   }
`

const StyledImage = styled.img`
   display: block;
   border-radius: 50%;
   width: 200px;
   height: 200px;
   object-fit: cover;
   margin: 0 auto;
`

const StyledHeader = styled.h2`
   margin: 10px 0;
   color: #000;
   text-align: center;
`

export const CharacterModal = ({ characterId, onClose }) => {
   // characterId = 1111111111111111111  // testy
   const { characterInfo, isLoading, error } = useCharacterInfo(characterId)

   const handleCloseClick = e => {
      if (e.target === e.currentTarget) {
         onClose()
      }
   }

   return createPortal(
      <ModalOverlay onClick={handleCloseClick}>
         <ModalContent>
            <StyledCloseButton onClick={onClose}>X</StyledCloseButton>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            {characterInfo ? (
               <>
                  <StyledImage src={characterInfo.imageUrl || noPicture} alt={characterInfo.name} />
                  <StyledHeader>{characterInfo.name}</StyledHeader>
                  <CharacterDetails title="Films" items={characterInfo.films} />
                  <CharacterDetails title="Short Films" items={characterInfo.shortFilms} />
                  <CharacterDetails title="Video Games" items={characterInfo.videoGames} />
                  <CharacterDetails title="TV Shows" items={characterInfo.tvShows} />
               </>
            ) : (
               <>
                  {isLoading && <Loader>Ładowanie szczegółów, proszę czekać...</Loader>}
                  {!isLoading && !characterInfo && (
                     <ErrorMessage>Postać o id: {characterId} nie znaleziona.</ErrorMessage>
                  )}
               </>
            )}
         </ModalContent>
      </ModalOverlay>,
      document.body,
   )
}
