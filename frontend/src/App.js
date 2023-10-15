import { BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react';


// pages & components 
import Home from './pages/Home';
import Navbar from'./components/Navbar';
import Register from './pages/Register'
import Header from './components/Header'
import SubmitRequest from './pages/SubmitRequest'
import Admin from './pages/Admin'
import AddAdminForm from './pages/AddAdminForm'
import RemoveUser from './pages/RemoveUser'
import ViewPatientInfo from './pages/ViewPatientInfo'









function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Header />
        <div className="pages">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/SubmitRequest' element={<SubmitRequest />} />
            <Route path='/Admin' element={<Admin />} />
            <Route path='/AddAdminForm' element={<AddAdminForm />} />
            <Route path='/RemoveUser' element={<RemoveUser/>} />
            <Route path='/ViewPatientInfo' element={<ViewPatientInfo/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;






