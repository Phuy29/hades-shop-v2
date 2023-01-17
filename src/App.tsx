import { Suspense } from 'react';
import './App.css';
import { LayoutDefault } from 'layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from 'routes';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LayoutDefault>
          <Suspense fallback="Loading...">
            <Routes>
              {publicRoutes.map((publicRoute, index) => {
                return (
                  <Route key={index} path={publicRoute.path} element={publicRoute.component} />
                );
              })}
            </Routes>
          </Suspense>
        </LayoutDefault>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
