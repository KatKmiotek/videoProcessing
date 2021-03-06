import React, {useState} from 'react'
import {Container, Button, Input, Stack, Box, Heading, Link,} from '@chakra-ui/react'
import Header from './header'
import {useAuth} from '../hooks/'

export default function ProtectedPage({children}) {
  const {token, setToken} = useAuth()
  const [appId, setAppId] = useState('')
  const [appSecret, setAppSecret] = useState('')

  const isLoggedIn = token

  async function loginToSymbl() {
    const response = await fetch('https://api.symbl.ai/oauth2/token:generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({
        type: 'application',
        appId,
        appSecret,
      }),
    })
    const json = await response.json()
    // console.log(json)
    setToken(json.accessToken)
  }

  return (
    <>
      <Header />
      {!isLoggedIn ? (
        <Container>
          <Stack spacing={3} marginBottom="1rem">
            <Input
              placeholder="appId"
              size="md"
              border="1px"
              borderColor="#1F74BF"
              onChange={(e) => setAppId(e.target.value)}
            />
            <Input
              type="password"
              placeholder="appSecret"
              size="md"
              border="1px"
              borderColor="#1F74BF"
              onChange={(e) => setAppSecret(e.target.value)}
            />
          </Stack>
          <Button onClick={() => loginToSymbl()} bg="#5BD9AB">Login</Button>
          <Box boxShadow="dark-lg" p="6" marginTop="20" rounded="md" bg="white">
            <Container margin="1rem">
            <Box fontSize="6x1">
              <Heading size="sm" marginBottom="5">
                Login Instructions:
              </Heading>
              ⋆ Please create a free account on <Link href="https://symbl.ai/" isExternal>
               <strong>Symbl.ai</strong></Link> website. <br/>

              ⋆ To login use API credentials provided in the HOME tab<br/>
              
              ⋆ This app has been made as part of <Link href="https://egghead.io/courses/create-contextual-video-analysis-app-with-nextjs-and-symbl-ai-4efb" is isExternal>
              <strong> EggHead.io </strong></Link> course 
               </Box>
              
              
            </Container>
          </Box>
        </Container>
      ) : (
        children
      )}
    </>
  )
}