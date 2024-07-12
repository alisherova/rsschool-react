import { BrowserRouter, Routes, Route } from "react-router-dom"
import ErrorBoundary from '../components/ErrorBoundary';
import { MainPage, NotFoundPage } from "../pages";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App;
