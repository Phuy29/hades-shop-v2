import React from 'react';
import './App.css';
import { LayoutDefault } from 'layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from 'routes';

function App() {
  return (
    <BrowserRouter>
      <LayoutDefault>
        <Routes>
          {publicRoutes.map((publicRoute, index) => {
            return <Route key={index} path={publicRoute.path} element={publicRoute.component} />;
          })}
        </Routes>
      </LayoutDefault>
    </BrowserRouter>
  );
}

export default App;
