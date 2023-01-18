import { Container } from '@chakra-ui/react'

import MainTable from './components/Table/Table';

function App() {
  return (
    <Container maxW='container.lg' py="8">
      <MainTable /> 
    </Container>
  );
}

export default App;