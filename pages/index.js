import Head from 'next/head'
import {useEffect, useRef, useState} from 'react'
import Header from '../components/header'
import { Container, Box, AspectRatio, SimpleGrid, Divider, InputGroup, Input, Button, Heading, useToken } from '@chakra-ui/react'
import ProtectedPage from '../components/protectedPage'
import { useAuth } from '../hooks'

export default function Home() {
  const [file, setFile] = useState('')
  const [videoSrc, setVideoSrc] = useState('')

  const videoRef = useRef(null)
  const {token} = useAuth('')

  useEffect(()=>{
    const src = URL.createObjectURL(new Blob([file], {
      type: 'video/mp4'
    }))
    setVideoSrc(src)
  }, [file])

  const submitFileForProcessing = (file)=> {
    fetch('https://api.symbl.ai/v1/process/video', {
      method: 'POST',
      headers: {
        'x-api-key': token,
        'Content-Type': 'video/mp4'
      },
      body: file,
      json: true
    })
    .then((rawResult)=> rawResult.json())
    .then((result)=> {
      console.log(file)
      console.log(result)
    })
  }

  return (
    <ProtectedPage>
      <Container maxWidth="1200px">
        <Box marginBottom="1rem">
          <InputGroup marginBottom="2rem">
            <Input type="file" id="input" accept="video/" ref={videoRef}
            onChange={(e)=> setFile(e.target.files[0])}/>
          </InputGroup>
          <Box bg="lightgray" marginBottom="1rem">
          <AspectRatio maxH="100%" ratio={16/9}>
            <video id="video-summary" controls src={videoSrc}/>
          </AspectRatio>
        </Box>
        <Button colorScheme="teal" size="md" onClick={()=>submitFileForProcessing()}>Send for processing</Button>
        </Box>
        <Divider orientation="horizontal"/>
        <Heading>Processing Data</Heading>
        <SimpleGrid columns={2} spacingX="40px" spacingY="20px" marginTop="1rem">
          <Box boxShadow="dark-lg" p="6" rounded="md" bg="white">
            <Container margin="1rem">
              <Heading as="h4" size="md">
                Transcript from API
              </Heading>
            </Container>
          </Box>
        </SimpleGrid>
      </Container>
    </ProtectedPage>
  )
}
