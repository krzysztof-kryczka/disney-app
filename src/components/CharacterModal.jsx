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
   background: ${props => props.theme.palette.background.paper};
   overflow-y: auto;

   /* Stylizacja paska przewijania */
   &::-webkit-scrollbar {
      width: 15px; /* Szerokość paska przewijania */
   }

   &::-webkit-scrollbar-thumb {
      background-color: ${props => props.theme.palette.primary.main}; /* Kolor paska przewijania */
      border-radius: 6px; /* Zaokrąglenie paska przewijania */
   }

   &::-webkit-scrollbar-track {
      background: ${props =>
         props.theme.palette.mode === 'light' ? '#f1f1f1' : '#424242'}; /* Kolor tła paska przewijania */
      border-radius: 6px; /* Zaokrąglenie tła paska przewijania */
   }
`

const StyledCloseButton = styled.button`
   position: sticky;
   top: 0;
   right: 0;
   background-color: ${props => props.theme.palette.background.paper};
   cursor: pointer;
   padding: 10px 16px;
   font-size: 20px;
   font-weight: 700;
   text-decoration: none;
   color: ${props => props.theme.palette.primary.main};
   border: 2px solid ${props => props.theme.palette.primary.main};
   border-radius: 4px;
   transform: translate(800%, 0%);
   &:hover {
      background-color: ${props => props.theme.palette.primary.main};
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
   font-family: 'Walt Disney Script', sans-serif;
   margin: 10px 0;
   color: ${props => (props.theme.palette.mode === 'light' ? '#000' : '#fff')};
   text-align: center;
   font-size: 64px;
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
                  <StyledHeader>{characterInfo.name}</StyledHeader>
                  <StyledImage src={characterInfo.imageUrl || noPicture} alt={characterInfo.name} />
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
