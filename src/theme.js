import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { orange, pink } from '@mui/material/colors'

const theme = extendTheme({
  trello: {
    appBarHeight: '58px',
    boardBarHeight: '58px'
  },
  colorSchemes: {
    light: {
      palette: {
        // primary: {
        //   main: orange[200]
        // }
      }
    },
    dark: {
      palette: {
        // primary: {
        //   main: orange[500]
        // }
      }
    }
  }
})

export default theme
