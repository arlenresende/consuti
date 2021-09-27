import React from 'react'
import { SidebarNav } from './SideBarNav'
import { Flex, Heading, Image } from '@chakra-ui/react'

export default function Sidebar() {
  return (
    <Flex
      w={['100%', '100%', '100%', '50%', '20%']}
      flexDir="column"
      alignItems="center"
      backgroundColor="green.500"
      color="#fff"
    >
      <Flex
        flexDir="column"
        h={[null, null, null, '100vh']}
        justifyContent="space-between"
        pb={10}
      >
        <Flex flexDir="column" as="nav">
          <Heading
            mt={(50, 5)}
            mb={[5, 50, 100]}
            fontSize={['4xl', '4xl', '2xl', '3xl', '4xl']}
            alignSelf="center"
            letterSpacing="tight"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            Projeto <br />
            Prático
          </Heading>

          <Flex
            flexDir={['row', 'row', 'column', 'column', 'column']}
            align={['center', 'center', 'center', 'flex-start', 'flex-start']}
            wrap={['wrap', 'wrap', 'nowrap', 'nowrap', 'nowrap']}
            justifyContent="center"
          >
            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
              <SidebarNav />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
