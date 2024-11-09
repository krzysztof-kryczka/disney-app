import styled from 'styled-components'
import { useThemeContext } from '../hooks/useThemeContext'

const StyledHeader = styled.h3`
   margin: 10px 0;
   color: ${props => props.theme.palette.primary.main};
   text-align: center;
   font-family: 'Walt Disney Script', sans-serif;
   font-size: 48px;
`

const StyledListItem = styled.li`
   color: ${props => props.theme.palette.primary.text};
   font-size: 1rem;
   margin: 5px 0;
   font-family: 'Walt Disney Script', sans-serif;
   font-size: 32px;
`

export const CharacterDetails = ({ title, items }) => {
   const { theme } = useThemeContext()
   return (
      items.length > 0 && (
         <>
            <StyledHeader theme={theme}>{title}</StyledHeader>
            <ul>
               {items.map((item, index) => (
                  <StyledListItem theme={theme} key={index}>
                     {item}
                  </StyledListItem>
               ))}
            </ul>
         </>
      )
   )
}
