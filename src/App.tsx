import { Container, Center } from '@chakra-ui/react'

import MainTable from './components/Table/Table';

function App() {
  return (
    <Container maxW='container.lg' py="8">
      <Center>
        <MainTable /> 
      </Center>
    </Container>
  );
}

export default App;