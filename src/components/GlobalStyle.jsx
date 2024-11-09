import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        line-height: 1.5;
        font-weight: 400;
    }
    #root {
        margin: 0 auto;
        background-color: ${props => props.theme.palette.background.default};
        color: ${props => props.theme.palette.primary.main};
    }
`
