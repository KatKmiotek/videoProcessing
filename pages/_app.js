import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { AuthProvider } from '../hooks'

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
}

const theme = extendTheme({colors})

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
    <ChakraProvider resetCss theme={theme}>
  <Component {...pageProps} />
  </ChakraProvider>
  </AuthProvider>
  )
}

export default MyApp
