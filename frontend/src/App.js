import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePatients from './pages/HomePatients';
import Navbar from './components/Navbar';
import HomePage from './pages/Landing';
import HomeDoctors from './pages/HomeDoctors';
import Header from './components/Header';
import Register from './pages/Register';
import SubmitRequest from './pages/SubmitRequest';
import Admin from './pages/Admin';
import AddAdminForm from './pages/AddAdminForm';
import RemoveUser from './pages/RemoveUser';
import ViewPatientInfo from './pages/ViewPatientInfo';
import DoctorUpdateEdit from './pages/DoctorUpdateEdit';
import PrescriptionList from './components/PrescriptionList';
import PrescriptionFilter from './components/PrescriptionFilter';
import FamilyForm from './components/FamilyForm';
import DoctorDashboard from './components/DoctorDash';
import AppointmentFilter from './components/DoctorFilter';
import ViewHealthRecordsPage from './pages/ViewHealthRecordsPage';
import Login from './pages/Login'; // Import your login page component
import PatientHealthRecord from './pages/PatientHealthRecord';

function App() {
  const isLoggedIn = true; // You need to implement the logic to check if the user is logged in

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            {/* Redirect to the login page if not logged in */}
            {!isLoggedIn && <Route path="/" element={<Navigate to="/login" />} />}
            {/* Login route */}
            <Route path="/" element={<Login />} />
            <Route path="/landing" element={<HomePage />} />
            {/* Continue with other routes */}
            <Route path="/patients" element={<HomePatients />} />
            <Route path="/doctors" element={<HomeDoctors />} />
            <Route path="/malak" element={<Header />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/SubmitRequest" element={<SubmitRequest />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/AddAdminForm" element={<AddAdminForm />} />
            <Route path="/RemoveUser" element={<RemoveUser />} />
            <Route path="/ViewPatientInfo" element={<ViewPatientInfo />} />
            <Route path="/khaled" element={<DoctorUpdateEdit />} />
            <Route path="/hamouda" element={<PrescriptionList />} />
            <Route path="/filter-prescriptions" element={<PrescriptionFilter />} />
            <Route path="/safina" element={<FamilyForm />} />
            <Route path="/hana" element={<DoctorDashboard />} />
            <Route path="/filterAppointment" element={<AppointmentFilter />} />
            <Route path="/view-health-records" element={<ViewHealthRecordsPage />} />
            <Route path="/view-patient-records" element={<PatientHealthRecord />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
