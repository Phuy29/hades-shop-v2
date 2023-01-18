import { Suspense } from 'react';
import './App.css';
import { LayoutDefault } from 'layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from 'routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SlideContextProvider } from 'providers/SlideContext';
import { SlideCart } from 'components/Slide';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <SlideContextProvider>
          <LayoutDefault>
            <Suspense fallback="Loading...">
              <Routes>
                {publicRoutes.map((publicRoute, index) => {
                  return (
                    <Route key={index} path={publicRoute.path} element={publicRoute.component} />
                  );
                })}
              </Routes>
              <SlideCart />
            </Suspense>
          </LayoutDefault>
        </SlideContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
