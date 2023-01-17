import { Suspense } from 'react';
import './App.css';
import { LayoutDefault } from 'layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from 'routes';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback="Loading...">
        <LayoutDefault>
          <Routes>
            {publicRoutes.map((publicRoute, index) => {
              return <Route key={index} path={publicRoute.path} element={publicRoute.component} />;
            })}
          </Routes>
        </LayoutDefault>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
