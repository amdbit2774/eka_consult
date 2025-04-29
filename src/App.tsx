import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import styled from 'styled-components';
import AgeGroups from './components/AgeGroups';
import Lessons from './components/Lessons';
import LessonDetails from './components/LessonDetails';

const AppContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 16px;
  background-color: #ffffff;
  min-height: 100vh;
`;

function App() {
  WebApp.ready();

  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<AgeGroups />} />
          <Route path="/age-group/:ageGroup" element={<Lessons />} />
          <Route path="/lesson/:lessonId" element={<LessonDetails />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App; 