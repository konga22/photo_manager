import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PhotoProvider } from './contexts/PhotoContext';
import Editor from './pages/Editor';
import Login from './pages/Login';

function App() {
  return (
    <PhotoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/editor" 
            element={
              localStorage.getItem('naver_blog_id') 
                ? <Editor /> 
                : <Navigate to="/login" replace />
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </PhotoProvider>
  );
}

export default App;