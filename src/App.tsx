import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import MainComponent from './components/MainComponent';
import NotFound from './pages/NotFound';
import FavoritesPage from './pages/FavoritesPage';

const App = () => {
  return (
    <Router basename="/searchApp">
      <Routes>
        <Route path="/" element={<Navigate to="/search?page=1" replace />} />
        <Route path="/search" element={<MainComponent />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
