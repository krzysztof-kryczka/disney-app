import styled from 'styled-components'

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
   border: 2px solid #ccc;
   border-radius: 8px;
   padding-bottom: 15px;
   display: flex;
   flex-direction: column;
   align-items: center;
   background-color: #f9f9f9;
   box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.2);
   color: red;
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
   color: #000;
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
   color: #e51b36;
   border: 2px solid #e51b36;
   border-radius: 4px;
   background-color: #fff;
   &:hover {
      background-color: #e51b36;
      color: #fff;
   }
`

export const ImageGallery = ({ cards }) => {
   console.log('images: ', cards)

   return (
      <>
         <StyledImageList>
            {cards.data.map(character => (
               <StyledImageItem key={character._id}>
                  <StyledImage src={character.imageUrl} alt={character.name} />
                  <StyledHeader>{character.name}</StyledHeader>
                  <StyledButton>Więcej informacji</StyledButton>
               </StyledImageItem>
            ))}
         </StyledImageList>
      </>
   )
}
