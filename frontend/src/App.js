import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import Navbar from './components/Navbar';
import PrescriptionList from './components/PrescriptionList';
import PrescriptionFilter from './components/PrescriptionFilter'; // Import the PrescriptionFilter component


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prescriptions" element={<PrescriptionList />} />
            <Route path="/filter-prescriptions" element={<PrescriptionFilter />} /> {/* Add this route */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
