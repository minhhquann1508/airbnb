import { BrowserRouter,Routes } from 'react-router-dom';
import './App.css';
import {Suspense} from 'react'
import { renderRoutes } from './routes';
function App() {
  return (
    <Suspense>
      <BrowserRouter>
        <Routes>
          {renderRoutes()}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
export default App;
