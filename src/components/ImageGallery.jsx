import { useState } from 'react'
import { CharacterModal } from './CharacterModal'
import { styled } from 'styled-components'
import { useTheme } from '@mui/material/styles'
import noPicture from '../assets/no-picture.jpg'

const StyledImageList = styled.ul`
   grid-gap: 30px;
   display: grid;
   grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
   list-style: none;
   margin: 40px;
`

const StyledImageItem = styled.li`
   box-sizing: border-box;
   text-align: center;
   border: 2px solid ${props => props.theme.palette.primary.main};
   border-radius: 8px;
   padding-bottom: 15px;
   display: flex;
   flex-direction: column;
   align-items: center;
   background-color: ${props => props.theme.palette.background.paper};
   box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.2);
   color: ${props => (props.theme.palette.mode === 'light' ? '#000' : '#fff')};
   position: relative;
   height: 300px;
`

const StyledImage = styled.img`
   width: 100%;
   height: 80%;
   max-height: 135px;
   object-fit: cover;
`

const StyledHeader = styled.h2`
   margin: 10px 0;
   color: ${props => (props.theme.palette.mode === 'light' ? '#000' : '#fff')};
   font-size: 32px;
`

const StyledButton = styled.button`
   position: absolute;
   bottom: 15px;
   width: 90%;
   cursor: pointer;
   padding: 10px 16px;
   font-size: 20px;
   font-weight: 700;
   text-decoration: none;
   color: ${props => props.theme.palette.primary.main};
   border: 2px solid ${props => props.theme.palette.primary.main};
   border-radius: 4px;
   background-color: ${props => (props.theme.palette.mode === 'light' ? '#fff' : props.theme.palette.background.paper)};
   &:hover {
      background-color: ${props => props.theme.palette.primary.main};
      color: #fff;
   }
`

export const ImageGallery = ({ images }) => {
   const [selectedCharacterId, setSelectedCharacterId] = useState(null)
   const theme = useTheme()

   const handleButtonClick = character => {
      setSelectedCharacterId(character._id)
   }

   return (
      <>
         <StyledImageList>
            {images.map(character => (
               <StyledImageItem key={character._id}>
                  <StyledImage src={character.imageUrl || noPicture} alt={character.name} />
                  <StyledHeader>{character.name}</StyledHeader>
                  <StyledButton onClick={() => handleButtonClick(character)}>Więcej informacji</StyledButton>
               </StyledImageItem>
            ))}
         </StyledImageList>
         {selectedCharacterId && (
            <CharacterModal characterId={selectedCharacterId} onClose={() => setSelectedCharacterId(null)} />
         )}
      </>
   )
}
