import { createPortal } from 'react-dom'
import { CharacterDetails } from './CharacterDetails'
import { Loader } from './Loader'
import styled from 'styled-components'
import noPicture from '../assets/no-picture.jpg'
import { useThemeContext } from '../hooks/useThemeContext'
import { useGetData } from '../hooks/useGetData'
import { API_BASE_URL } from '../App'

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
   object-fit: fill;
   margin: 0 auto;
`

const StyledHeader = styled.h2`
   font-family: 'Walt Disney Script', sans-serif;
   margin: 10px 0;
   color: ${props => props.theme.palette.primary.text};
   text-align: center;
   font-size: 64px;
`

const CenteredErrorMessage = styled.p`
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: #8a1e13;
   color: #f0ff00;
   padding: 12px 24px;
   border-radius: 8px;
   border: solid 2px #fffffe;
`

export const CharacterModal = ({ characterId, onClose }) => {
   const { theme } = useThemeContext()
   const { data: character, isLoading, error } = useGetData(API_BASE_URL, '/character', characterId)

   // let characterInfo = null
   // if (character && Array.isArray(character.data)) {
   //    characterInfo = character.data.length === 0 ? null : character.data[0]
   // } else {
   //    characterInfo = character?.data || null
   // }

   const characterInfo = Array.isArray(character?.data)
      ? character.data.length > 0
         ? character.data[0]
         : null
      : character?.data || null

   const handleCloseClick = e => {
      if (e.target === e.currentTarget) {
         onClose()
      }
   }

   return createPortal(
      <ModalOverlay onClick={handleCloseClick}>
         <ModalContent theme={theme}>
            <StyledCloseButton theme={theme} onClick={onClose}>
               X
            </StyledCloseButton>
            {isLoading && <Loader />}
            {!isLoading && (error || !characterInfo) ? (
               <CenteredErrorMessage>
                  {error ? error.message : `Postać o id: ${characterId} nie znaleziona.`}
               </CenteredErrorMessage>
            ) : (
               !isLoading &&
               characterInfo && (
                  <>
                     <StyledHeader theme={theme}>{characterInfo.name}</StyledHeader>
                     <StyledImage src={characterInfo.imageUrl || noPicture} alt={characterInfo.name} />
                     <CharacterDetails title="Films" items={characterInfo.films} />
                     <CharacterDetails title="Short Films" items={characterInfo.shortFilms} />
                     <CharacterDetails title="Video Games" items={characterInfo.videoGames} />
                     <CharacterDetails title="TV Shows" items={characterInfo.tvShows} />
                  </>
               )
            )}
         </ModalContent>
      </ModalOverlay>,
      document.body,
   )
}
