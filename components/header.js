import React from 'react'
import {
  Flex,
  Heading,
  Image,
  Link
} from '@chakra-ui/react'

export default function Header() {
  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg="#1F74BF"
        color="white"
        marginBottom="2rem"
      >
        <Flex align="center" mr={5}>
        <Link href="/"><Image alt = "logo" src="logo.png" width="200" height="200"/></Link>
          <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
                Video Processing App
          </Heading>
        </Flex>
      </Flex>
    </>
  )
}