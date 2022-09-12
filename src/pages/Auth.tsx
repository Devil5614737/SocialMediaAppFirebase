import { Box, Container,Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import React from 'react'
import Login from '../components/Login';
import { Signup } from '../components/Signup';

function Auth() {
  return (
    <Container display='grid' placeContent='center' width='100vw' minHeight='100vh' >
        <Box width={500} borderWidth='1px' padding={4}>
        <Tabs>
  <TabList display={'flex'} justifyContent='center' marginBottom={6}>
    <Tab fontSize={18}>Login</Tab>
    <Tab fontSize={18}>Signup</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
      <Login/>
    </TabPanel>
    <TabPanel>
      <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>
        </Box>
    </Container>
  )
}

export default Auth;