import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePatients from './pages/HomePatients'
import Navbar from './components/Navbar';
import HomePage from './pages/Landing';
import HomeDoctors from './pages/HomeDoctors';
import Header from './components/Header';
import Register from './pages/Register'
import SubmitRequest from './pages/SubmitRequest'
import Admin from './components/Admin'
import AddAdminForm from './pages/AddAdminForm'
import RemoveUser from './pages/RemoveUser'
import ViewPatientInfo from './pages/ViewPatientInfo'
import DoctorUpdateEdit from './pages/DoctorUpdateEdit';
import PrescriptionList from './components/PrescriptionList';
import PrescriptionFilter from './components/PrescriptionFilter'
import FamilyForm from './components/FamilyForm';
import DoctorDashboard from './components/DoctorDash';
import AppointmentFilter from './components/DoctorFilter';
import ApproveDoctorRequest from './components/ApproveDoctorRequest';
import RejectDoctorRequest from './components/RejectDoctorRequest';
import CreateHealthPackage from './components/CreateHealthPackage'; 
import UpdateHealthPackage from './components/UpdateHealthPackage'; 
import DeleteHealthPackage from './components/DeleteHealthPackage'; 
import ViewHealthPackages from './components/ViewHealthPackages';
import SubscribeToHealthPackage from './components/SubscribeToHealthPackage'; 
import SubscribedHealthPackages from './components/SubscribedHealthPackages';
import SubscriptionStatus from './components/SubscriptionStatus';
import CancelSubscription from './components/CancelSubscription'; 


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/patients" element={<HomePatients />}/>
            <Route path="/doctors" element={<HomeDoctors />}/>
            <Route path="/malak" element={<Header />}/>
            <Route path='/Register' element={<Register />} />
            <Route path='/SubmitRequest' element={<SubmitRequest />} />
            <Route path='/Admin' element={<Admin />} />
            <Route path='/AddAdminForm' element={<AddAdminForm />} />
            <Route path='/RemoveUser' element={<RemoveUser/>} />
            <Route path='/ViewPatientInfo' element={<ViewPatientInfo/>} />
            <Route path='/khaled' element={<DoctorUpdateEdit/>} />
            <Route path="/hamouda" element={<PrescriptionList />} />
            <Route path="/filter-prescriptions" element={<PrescriptionFilter />} /> {/* Add this route */}
            <Route path="/safina" element={<FamilyForm />} />
            <Route path="/hana" element={<DoctorDashboard />} />
            <Route path = "/filterAppointment" element = {<AppointmentFilter />} />
            <Route path="/ApproveDoctorRequest" element={<ApproveDoctorRequest />} />
            <Route path="/RejectDoctorRequest" element={<RejectDoctorRequest />} />
            <Route path="/CreateHealthPackage" element={<CreateHealthPackage/>} />
            <Route path="/UpdateHealthPackage" element={<UpdateHealthPackage/>} />
            <Route path="/DeleteHealthPackage" element={<DeleteHealthPackage/>} />
            <Route path="/viewHealthPackages" element={<ViewHealthPackages />} />
            <Route path='/SubscribeToHealthPackage' element={<SubscribeToHealthPackage />} />
            <Route path="/SubscribedHealthPackages" element={<SubscribedHealthPackages />} />
            <Route path="/SubscriptionStatus" element={<SubscriptionStatus />} />
            <Route path="/cancelSubscription" element={<CancelSubscription/>} />
           

            

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
