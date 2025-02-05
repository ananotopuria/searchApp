import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import MainComponent from './components/MainComponent';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router basename="/search-app">
      <Routes>
        <Route path="/" element={<Navigate to="/search?page=1" replace />} />
        <Route path="/search" element={<MainComponent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
