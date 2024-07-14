import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"
import { MainPage, NotFoundPage } from "../pages";
import ErrorBoundary from '../components/ErrorBoundary';
import CharacterDetail from '../components/CharacterDetail';

const App: React.FC = () => {
  const navigate = useNavigate();

  const searchTerm = localStorage.getItem('searchTerm');
  useEffect(() => {
    if (searchTerm && searchTerm !== " ") {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    }
  }, [searchTerm]);

  return (
    <ErrorBoundary>
      <div className="app">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/not-found" element={<NotFoundPage />} />
        </Routes>
      </div>
    </ErrorBoundary>
  )
}

export default App;
