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
import { AuthContextProvider } from './contexts/AuthContext/AuthContext';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Spinner } from 'components/Loading';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  const LoadingComponent = (
    <div className={'flex justify-center items-center h-screen'}>
      <Spinner size={'lg'} />
    </div>
  );

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <SlideCartContextProvider>
            <SlideSearchContextProvider>
              <LayoutDefault>
                <Suspense fallback={LoadingComponent}>
                  <Routes>
                    {publicRoutes.map((publicRoute, index) => {
                      return (
                        <Route
                          key={index}
                          path={publicRoute.path}
                          element={publicRoute.component}
                        />
                      );
                    })}
                  </Routes>
                  <SlideCart />
                  <SlideSearch />
                </Suspense>
              </LayoutDefault>
            </SlideSearchContextProvider>
          </SlideCartContextProvider>
        </AuthContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
