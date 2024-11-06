import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { CharacterDetails } from './CharacterDetails'
import { Loader } from './Loader'
import styled from 'styled-components'

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

export const CharacterModal = ({ character, onClose }) => {
   const [characterDetails, setCharacterDetails] = useState(null)

   useEffect(() => {
      setTimeout(() => {
         setCharacterDetails({
            films: character.films || [],
            shortFilms: character.shortFilms || [],
            videoGames: character.videoGames || [],
            tvShows: character.tvShows || [],
         })
      }, 1000)
   }, [character])

   const handleCloseClick = e => {
      if (e.target === e.currentTarget) {
         onClose()
      }
   }

   return createPortal(
      <ModalOverlay onClick={handleCloseClick}>
         <ModalContent>
            <StyledCloseButton onClick={onClose}>X</StyledCloseButton>
            <StyledImage src={character.imageUrl} alt={character.name} />
            <StyledHeader>{character.name}</StyledHeader>
            {characterDetails ? (
               <>
                  <CharacterDetails title="Films" items={characterDetails.films} />
                  <CharacterDetails title="Short Films" items={characterDetails.shortFilms} />
                  <CharacterDetails title="Video Games" items={characterDetails.videoGames} />
                  <CharacterDetails title="TV Shows" items={characterDetails.tvShows} />
               </>
            ) : (
               <Loader>Loading details...</Loader>
            )}
         </ModalContent>
      </ModalOverlay>,
      document.body,
   )
}
