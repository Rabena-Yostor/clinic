import { BrowserRouter,  Route, Routes} from 'react-router-dom'
import React from 'react';
import Navbar from './components/navbar'
import Addfamily  from './pages/addfam';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
          <Route
          path="/"
          element={ <Addfamily />}

           />

          </Routes>



      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;


