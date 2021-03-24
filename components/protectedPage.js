import React, {useState} from 'react'
import {Container, Button, Input, Stack} from '@chakra-ui/react'
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
    console.log(json)
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
              placeholder="appSecret"
              size="md"
              border="1px"
              borderColor="#1F74BF"
              onChange={(e) => setAppSecret(e.target.value)}
            />
          </Stack>
          <Button onClick={() => loginToSymbl()} bg="#5BD9AB">Login</Button>
        </Container>
      ) : (
        children
      )}
    </>
  )
}