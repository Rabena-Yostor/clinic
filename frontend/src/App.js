import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'

import Home from './pages/HomePage'
import Navbar from './components/Navbar'
import CheckPerscriptionsPage from './pages/Perscriptions'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/"element={<Home /> }/>
            <Route path = "/check-perscriptions" element = {<CheckPerscriptionsPage />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
