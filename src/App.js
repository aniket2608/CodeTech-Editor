import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import SplashScreen from './screens/SplashScreen';
import Homescreen from './screens/Homescreen';
import Codebookscreen from './screens/Codebookscreen';
import CodebookProvider from './Providers/CodebookProvider';
import { ModalProvider } from './Providers/ModalProvider';
import Error404 from './screens/Error404';

// App Component
function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [location.pathname]);

  return (
    <div>
      {loading && location.pathname === '/' ? (
        <SplashScreen />
      ) : (
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/codebook/:fileId/:folderId" element={<Codebookscreen />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      )}
    </div>
  );
}

// AppWrapper Component
export default function AppWrapper() {
  return (
    <CodebookProvider>
      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </CodebookProvider>
  );
}
