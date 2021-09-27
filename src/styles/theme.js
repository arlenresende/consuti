import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    gray: {
      900: '#181B23',
      800: '#212A3C',
      700: '#353646',
      650: '#2e3747',
      600: '#4B4D63',
      500: 'rgb(109, 111, 113)',
      400: '#797D9A',
      300: '#9699BO',
      200: '#B5B5C6',
      100: '#D1D2DC',
      50: '#A7A9AC',
    },
    green: {
      500: '#2b3f29',
      200: '#85a880',
      100: '#ebefec',
    },
    red: {
      200: 'rgba(255, 76, 76,1)',
    },
    yellow: {
      200: 'rgb(246, 167, 33)',
    },
  },
  fonts: {
    heading: 'Open Sans',
  },
  styles: {
    global: {
      body: {
        bg: 'green.100',
        color: 'gray.50',
      },
    },
  },
})
