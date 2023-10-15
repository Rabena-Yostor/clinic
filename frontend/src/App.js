
import { BrowserRouter ,  Routes, Route } from 'react-router-dom';  
import Home from './pages/Home'
//pages and components
import AddAdmin from './pages/addAdmin';
//import RegiesteAsPatient from './pages/regiesteAsPatient';
import Navbar from './components/Navbar';
//import AddPharmacist from './pages/addPharmacist';
import AddDoctor from './pages/addDoctor';



function App() {
 //return addAdmin
  return (
    
    <div className="App">
      <BrowserRouter>
      <Navbar />
      
      
      <div className="pages">
        <Routes>
          <Route
           path="/"
           element={< Home/>} 
           /> 
        </Routes>
      </div>
      </BrowserRouter>
    </div>

    
  );

}

export default App;