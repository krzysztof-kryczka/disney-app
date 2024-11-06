import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
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
`

const CloseButton = styled.button`
   background-color: #fff;
   cursor: pointer;
   padding: 10px 16px;
   font-size: 20px;
   font-weight: 700;
   text-decoration: none;
   color: #e51b36;
   border: 2px solid #e51b36;
   border-radius: 4px;
   transform: translate(180%, 0%);
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
            <StyledImage src={character.imageUrl} alt={character.name} />
            <StyledHeader>{character.name}</StyledHeader>
            {characterDetails ? (
               <>
                  {characterDetails.films.length > 0 && (
                     <div>
                        <h3>Films</h3>
                        <ul>
                           {characterDetails.films.map((film, index) => (
                              <li key={index}>{film}</li>
                           ))}
                        </ul>
                     </div>
                  )}
                  {characterDetails.shortFilms.length > 0 && (
                     <div>
                        <h3>Short Films</h3>
                        <ul>
                           {characterDetails.shortFilms.map((shortFilm, index) => (
                              <li key={index}>{shortFilm}</li>
                           ))}
                        </ul>
                     </div>
                  )}
                  {characterDetails.videoGames.length > 0 && (
                     <div>
                        <h3>Video Games</h3>
                        <ul>
                           {characterDetails.videoGames.map((videoGame, index) => (
                              <li key={index}>{videoGame}</li>
                           ))}
                        </ul>
                     </div>
                  )}
                  {characterDetails.tvShows.length > 0 && (
                     <div>
                        <h3>TV Shows</h3>
                        <ul>
                           {characterDetails.tvShows.map((tvShow, index) => (
                              <li key={index}>{tvShow}</li>
                           ))}
                        </ul>
                     </div>
                  )}
                  <CloseButton onClick={onClose}>Zamknij</CloseButton>
               </>
            ) : (
               <p>Loading details...</p>
            )}
         </ModalContent>
      </ModalOverlay>,
      document.body,
   )
}
