import { BrowserRouter as Router } from 'react-router-dom';
import AgeGroups from './components/AgeGroups';
import styled from 'styled-components';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

function App() {
  return (
    <Router basename="/eka_consult">
      <AppContainer>
        <AgeGroups />
      </AppContainer>
    </Router>
  );
}

export default App; 