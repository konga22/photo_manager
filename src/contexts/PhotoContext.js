import React, { createContext, useState } from 'react';

export const PhotoContext = createContext();

export function PhotoProvider({ children }) {
  const [photos, setPhotos] = useState([]);
  return (
    <PhotoContext.Provider value={{ photos, setPhotos }}>
      {children}
    </PhotoContext.Provider>
  );
} 