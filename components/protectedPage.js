import React, { useState } from 'react'
import { Container, Button, Input, Stack } from '@chakra-ui/react'
import Header from './header'
import { useAuth } from '../hooks'

export default function ProtectedPage({children}){
    const {token, setToken} = useAuth('')
    const [appId, setAppId] = useState('');
    const [appSecret, setAppSecret] = useState('')

    const isLoggedin = token;

    async function loginToSymbl(){
        const response = await fetch('https://api.symbl.ai/oauth2/token:generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({
                type: 'application',
                appId,
                appSecret
            })
            
        })
        const json = await response.json()
            setToken(json.accessToken)
            console.log('token', json)
    }

    return(
        <>
        <Header/>
        { !isLoggedin ? (
            <Container>
                <Stack spacing={3} marginBottom="1rem">
                    <Input value={appId} placeholder="appId" size="md" onChange={(e)=> setAppId(e.target.value)}/>
                    <Input value={appSecret} placeholder="appSecret" size="md" onChange={(e)=> setAppSecret(e.target.value)}/>
                </Stack>
                <Button onClick={()=> loginToSymbl()}>Login</Button>
            </Container>
        ) : children }
        </>
    )
}