import { Suspense } from 'react';
import './App.css';
import { LayoutDefault } from 'layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from 'routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SlideCartContextProvider } from 'contexts/SlideCartContext/SlideCartContext';
import { SlideCart } from 'components/Slide';
import { SlideSearchContextProvider } from 'contexts/SlideSearchContext/SlideSearchContext';
import { SlideSearch } from 'components/Slide/SlideSearch';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <SlideCartContextProvider>
          <SlideSearchContextProvider>
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
                <SlideSearch />
              </Suspense>
            </LayoutDefault>
          </SlideSearchContextProvider>
        </SlideCartContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
