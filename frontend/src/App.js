import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePatients from './pages/HomePatients';
import Navbar from './components/Navbar';
import HomePage from './pages/Landing';
import HomeDoctors from './pages/HomeDoctors';
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
import AppointmentFilter from './components/DoctorFilter';
import ViewHealthRecordsPage from './pages/ViewHealthRecordsPage';
import Login from './pages/Login'; // Import your login page component
import PatientHealthRecord from './pages/PatientHealthRecord';
import ChangePassword from './pages/ChangePassword';
import ResetPassword from './pages/ResetPassword';
import WalletPage from './pages/WalletPage';
import AdminHome from './pages/AdminHome';
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
import AddHealthRecord from './pages/AddHealthRecord';
import DoctorHomePage from'./pages/DoctorHomePage'
import WalletDoc from './pages/WalletDoc';
import PatientHome from './pages/PatientHome';
import DoctorDash from './components/DoctorDash';
import PatientDash from './components/PatientDash'
import PatientDocuments from './pages/PatientDocuments';
import AddPrescription from './pages/AddPrescription';
import PrescriptionListDoctor from './components/PrescriptionListDoctor';
import PrescriptionDetails from './components/PrescriptionDetails';
import Payment from './pages/Payment';
import Completion from './components/Completion';
import LinkFamilyMember from './pages/LinkFamilyMember';
import DoctorForm from "./components/DoctorForm";
import NotificationsPageDoctor from './pages/DoctorNotifications';
import NotificationsPagePatient from './pages/PatientNotifcations';
import ConversationPagePatient from './pages/PatientConversation';
import ConversationPageDoctor from './pages/DoctorConversation';
import AppointmentFollowUp from './pages/AppointmentFollowUp';
import DoctorFollowUpRequests from './pages/DoctorFollowUpRequests';
import VideoCallComponent from './components/VideoCallComponent';
import RegisterAsPatient from './pages/RegisterAsPatient';
import ViewEmploymentContractInfo from './pages/viewcontract';

function App() {
  const isLoggedIn = true; // You need to implement the logic to check if the user is logged in
  
  return (
    <div className="container">
    <div className="content">
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
            <Route path="/signup" element={<Register />} />
            <Route path="/patients" element={<HomePatients />} />
            <Route path="/doctors" element={<HomeDoctors />} />
            <Route path="/AdminHome" element={<AdminHome />} />
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
            <Route path="/filterAppointment" element={<AppointmentFilter />} />
            <Route path="/view-health-records" element={<ViewHealthRecordsPage />} />
            <Route path="/view-patient-records" element={<PatientHealthRecord />} />
            <Route path = "/change-password" element = {<ChangePassword />} />
            <Route path = "/reset-password" element = {<ResetPassword />} />
            <Route path = "/wallet-info" element = {<WalletPage />} />
            <Route path = "/wallet-doc" element = {<WalletDoc />} />
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
            <Route path="/AddHealthRecord" element={<AddHealthRecord/>} />
            <Route path="/DoctorHomePage" element={<DoctorHomePage/>} />
            <Route path="/PatientHome" element={<PatientHome/>} />
            <Route path="/doctorPeter" element={<DoctorDash/>} />
            <Route path="/patientPeter" element={<PatientDash/>} />
            <Route path = "/patientDocuments" element = {<PatientDocuments />} />
            <Route path = "/AddPrescription" element = {<AddPrescription />} />
            <Route path="/doctorPrescription" element={<PrescriptionListDoctor />} />
            <Route path="/view-prescription/:id" element={<PrescriptionDetails />} />
            <Route path = "/completion/:id" element = {<Completion />} />
            <Route path = "/payment/:id" element = {<Payment />} />
            <Route path = "/linkFamilyMember" element = {<LinkFamilyMember/>} />
            <Route path = "/doctorForm" element = {<DoctorForm />} />
            <Route path = "/doctorNotifications" element = {<NotificationsPageDoctor />} />
            <Route path = "/patientNotifications" element = {<NotificationsPagePatient />} />
            <Route path = "/patientConversation" element = {<ConversationPagePatient />} />
            <Route path = "/doctorConversation" element = {<ConversationPageDoctor />} />
            <Route path = "/AppointmentFollowUp" element = {<AppointmentFollowUp />} />
            <Route path = "/doctorFollowUpRequests" element = {<DoctorFollowUpRequests />} />
            <Route path = "/VideoCallComponent" element = {<VideoCallComponent/>} />
            <Route path = "/RegisterAsPatient" element = {<RegisterAsPatient/>} />
            <Route path = "/viewcontract" element = {<ViewEmploymentContractInfo/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  </div>
  );
}

export default App;
