***EL7A2NY PROJECT***
# The project was conceived with the following motivation:
--Streamlining Healthcare Interactions

In the current landscape, interactions between patients and medical professionals can be fragmented and time-consuming. The project aims to create a cohesive virtual clinic system that simplifies and automates various aspects of healthcare interactions and to enhance Patient Experience.

# The Tech used: (MERN STACK)
The MERN stack is a popular stack for building web applications and consists of the following technologies:

- **M**ongoDB: A NoSQL database used for storing data in the form of JSON-like documents.
- **E**xpress: A minimalist web framework for Node.js used for building the backend of web applications.
- **R**eact: A JavaScript library for building user interfaces.
- **N**ode.js: A JavaScript runtime used for building the backend of web applications.

Together, these technologies form a full-stack solution for building web applications. In a MERN stack web application, MongoDB is used to store data, Express is used to build the backend, React is used to build the frontend, and Node.js is used to run the application.









# Installation: 
- Clone the link of repository from github.

create .env file and add the following: ( PORT=4000;

MONGO\_URI = 'mongodb+srv://ahmedhamouda776:ACL123@rabenayostor.5zgv8bz.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'

STRIPE_PUBLISHABLE_KEY="pk_test_51O4R2WJ6reglJIMrbT7RTKyuwYmIFnSp0hbD9CKUiQJp7uw0ZoV6ClIimQ1CnkIXxf8mxYEHE4ouO2vWRCTcnw7t00p5tUfsb3"
STRIPE_SECRET_KEY="sk_test_51O4R2WJ6reglJIMrC5OBVfvk5frEdn3RLdV51Z9HrEFMyY9jJPIaSw4yrGX1XZMwu2FP5Dl9AZ5ep5gP9TYBi0oP00zMiFnOTc"
)

- Open new terminal.
- Cd backend
- Npm i, then node server.js
- Open new terminal.
- Cd frontend
- Npm i
- Npm start “wait until your browser open automatically”.


# How to Use:
--LOGIN   type your username/password then login. There is option to reset your password and otp will be sent to your mail. If you want to register as a new doctor, you will submit a request and the admin will approve/reject the request. You can also submit a request after filling username and password , and once the admin approves it you can login.

--LOGOUT there is a log out button, press it and you will get redirected to the login screen

--Doctor if you logged in as a doctor you can: 

- Add health Record: typing the details for the patient then press “Add Health Record”
- View Health Record: type patient username and press “Fetch Health Record”
- View Wallet Amount: makes you see the amount in your wallet.
- View Doctor Appointment: (you can type a date/time then press “Add Doctor Appointment” to add appointment, Schedule a follow up, view/filter appointments by typing date/time and press the corresponding button


--Patient you can:

- Subscribe to health package (type details then press subscribe)
- View subscribed health packages/status/ cancel subscription 
- View wallet amount/ health record/appointments
- View all doctors and select a doctor to get appointment with (press on doctor name and scroll down)




# To Contribute

We welcome contributions from the community to enhance the project. Whether you want to report a bug, propose a new feature, or submit a pull request, here's how you can contribute:

Any Contributions are welcomed to improve the website.
1\.Clone the repository.
2\.Install dependencies.
3\.Create branch and do your work.
4\.Provide messages for the creators to view.
5\.commit and push your work.
6\.wait for the creator to view your work and to be merged if master approved upon.

Feedback is valuable! If you have suggestions or questions, feel free to reach out .Thank you for contributing!
# Credits:
We used online YouTube video channel: Net Ninja (MERN stack crash course)

**These 2 channels on YouTube have playlists for : Node, Express, React, Mongo and MERN stack in beginner level.**

[**https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA**](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA)

[**https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg](https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg)**    

**Node.js**

[**https://www.youtube.com/playlist?list=PLZlA0Gpn_vH_uZs4vJMIhcinABSTUH2bY**](https://www.youtube.com/playlist?list=PLZlA0Gpn_vH_uZs4vJMIhcinABSTUH2bY)

**Express.js**

**https://www.youtube.com/watch?v=fgTGADljAeg**

**React introduction:**

[**https://www.youtube.com/playlist?list=PLZlA0Gpn_vH_NT5zPVp18nGe_W9LqBDQK**](https://www.youtube.com/playlist?list=PLZlA0Gpn_vH_NT5zPVp18nGe_W9LqBDQK)

**React Hooks -- functional components**

[**https://www.youtube.com/playlist?list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h**](https://www.youtube.com/playlist?list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h)

<https://youtu.be/hQAHSlTtcmY>



**useState VS useEffect:**

<https://codedamn.com/news/reactjs/usestate-and-useeffect-hooks>


We would like to extend our thanks to the following individuals for their contributions to this project:


- [***Hana] ***Elmoatasem***
- [***Peter] ***Ashraf***

- ***Khaled Magdy***

- ***Malak Wael***
- ***Ahmed Hamouda***
- [***Peter] ***Youssef***

- [***Mohamed] ***Ahmed***
- ***Hazem Nasser***

Without the help of these individuals, this project would not have been possible. Thank you for your support














# ScreenShots: 



https://drive.google.com/drive/folders/1WCwIifgBuUDab2-Rp5BxutSCsp6CmUFl?usp=drive_link




















# Build Status:
--The project is currently under development.
--Design for error should be improved.
--Need to enhance the UI.
=============================================
# --All user requirements are met and fulfilled, but more testing is needed to ensure the best service and UX.

#
#
# Code Style:
**Async/Await**: using **async/await**, which is good. Make sure to handle errors with a try-catch block.

**Consistent Naming**: Your variable names like **user**, **otp**, **salt**, and **hashedPassword** are clear and descriptive.

**Comments**: having comments for everything in the code (creating methods or handling errors)


-Standard Code style that is easy for anyone to understand .


#
#
# Features:
\## 1. User Authentication

\- Secure user registration and login.

\## 2. Appointment Management

\- Schedule appointments with doctors.

\- View upcoming and past appointments.

\- Filter appointments by date and status.

\## 3. Family Management

\- Add family members to your account.

\- Link accounts as family members.

\## 4. Health Records and Prescriptions

\- Upload and view medical documents.

\- Access and filter prescription records.

\- Download prescriptions in PDF format.

\## 5. Health Packages Subscription

\- Choose from different health packages.

\- Subscribe to packages for discounts on appointments and medications.

\## 6. Doctor-Patient Interaction

\- Real-time video calls between doctors and patients.

\- Secure chat functionality for communication.

\## 7. Wallet and Payment

\- Wallet system for refunds and payments.

\- Secure payment processing with Stripe integration.

\## 8. Admin Features

\- Admin panel for managing users, doctors, and appointments.

\- Accept or reject doctor registration requests.

\- Manage health packages and pricing.

\## 9. Search and Discovery

\- Search for doctors by name and specialty.

\- Filter doctors based on availability and specializations.

Feel free to explore our application and make the most out of these features!
#
#
# API References: (All method names are the same as their Functionality)
Endpoint: /api/admin/”Method name”

*This is for admin routes:*

router.get('/viewRequests',viewRequests)

router.post('/approveRequests',approveRequests)

router.delete('/rejectRequests',rejectRequests)

router.post('/addAdmin', addAdmin)

router.delete('/removeUser',removeUser)

router.get('/viewPatientInfo',viewPatientInfo)

//sign up

router.post('/signup',signUp)

//login

router.post('/login',login)

//logout

router.get('/logout',logout)

//update password

router.post('/updateAdminPassword',updateAdminPassword)

//send otp and set password

router.post('/sendOtpAndSetPassword',sendOtpAndSetPassword)

router.post('/createHP',createHealthPackage)

router.put('/updateHP',updateHealthPackage)

router.delete('/deleteHP',deleteHealthPackage)






*This is for patient routes:*

Endpoint: /api/patient/”Method name”

router.post('/createAppointment' ,createAppointment);

router.post("/followUpRequest/:username", submitFollowUpRequest);	

router.get('/getAllPatients',getAllPatients)

router.get('/getPatient/:id', getPatient)

router.post('/createPatient', createPatient)

router.delete('/deletePatient/:id',deletePatient)

router.patch('/updatePatient/:id', updatePatient)

router.get('/filterAppointment/:id',filterAppointment)

router.post('/registerPatient',registerPatient)

router.post('/loginPatient',loginPatient)

router.get('/getFamilyMembers/:username',getFamilyMembers)

router.post('/addFamilyMember',addFamilyMember)

router.get('/filterAppointmentPatient',filterAllApps)

router.get('/viewHealthRecords/:username', getHealthRecord);

router.get('/wallet-amount/:username', getWalletAmount);

router.get('/viewHealthPackage',getHealthPackages) 

router.post('/subscribeHealthPackage',subscribeToHealthPackage)

router.get('/getSubscribedHealthPackages/:username',getSubscribedHealthPackages)

router.get('/getSubscriptionStatus/:username',getSubscriptionStatus)

router.post('/cancelSubscription',cancelSubscription)

//sign up

router.post('/signup',signUp)

//login

router.post('/login',login)

//logout

router.get('/logout',logout)

//update password

router.post('/updatePatientPassword',updatePatientPassword)

//send otp and set password

router.post('/sendOtpAndSetPassword',sendOtpAndSetPassword)

// New route to handle updating patient appointments

router.post("/updatePatientAppointments", updatePatientAppointments);

router.get("/getPatientAppointments/:username"

router.get('/getWallet/:username', getWallet);

router.put('/pay-with-wallet/:prescriptionId/:username', payWithWallet);

router.put('/filledYes/:prescriptionId', filledYes);

router.delete('/removeDocument/:username/:documentId', removeDocument);

router.get('/medicalHistoryFiles/:username', async (req, res) => {

try {

const {username} = req.params // Replace with your authentication logic

console.log(username)

const loggedinPatient = await patient.findOne({ username });

if (!loggedinPatient) {

return res.status(404).json({ error: 'Patient not found' });

}

const medicalHistoryFiles = loggedinPatient.medicalHistoryFiles || [];

res.status(200).json(medicalHistoryFiles);

} catch (error) {

console.error('Error fetching medical history files:', error);

res.status(500).json({ error: 'Internal Server Error' });

}})

// Create a new notification for a patient

router.post('/createNotificationPatient', createNotificationPatient);

// Delete a notification for a patient

router.delete('/deleteNotification/:notificationId', deleteNotification);

// Get all notifications for a patient

router.post('/getAllNotificationsPatient', getAllNotificationsPatient);

//Conversation

router.post('/getConversationPatient', getConversationPatient);

router.post('/sendMessagePatient', sendMessagePatient);

/Peter Youssef

router.get('/getWallet/:username', getWallet);

// Reschedule appointment by ID

router.put('/pay-with-wallet/:prescriptionId/:username', payWithWallet);

router.patch("/rescheduleAppointment", async (req, res) => {

router.put('/filledYes/:prescriptionId', filledYes);

const { appointmentId, newDate } = req.body;

if (!appointmentId || !newDate) {

return res.status(404).json({ message: "hihihi" });

}

try {

const updatedAppointment = await patient.updateOne(

{ "appointments.\_id": appointmentId },

{

$set: {

"appointments.$.date": newDate,

"appointments.$.status": "rescheduled",

},

}

);

updatedAppointment.nModified;

if (updatedAppointment.nModified === 0) {

return res.status(404).json({ message: "Appointment not found" });

}

// Fetch the updated doctor data

const PatientR = await patient.findOne({

"appointments.\_id": appointmentId,

});

*This is for doctor routes:*
#
Endpoint: /api/doctor/”Method name”

router.delete('/doctor/removeAppointment/:id/:appointmentDate', removeAppointment);


router.post('/acceptFollowUpRequest/:requestId/:username', acceptFollowUpRequest)

router.delete('/rejectFollowUpRequest/:requestId', rejectFollowUpRequest)

router.get("/doctorFollowUpRequests/:doctorUsername", DoctorFollowUpRequests)

// get all doctors

router.get('/getAllDoctors', getDoctors)

// get a single Doctor

router.get('/getDoctor/:id', getDoctor)

// post a new Doctor

router.post('/createDoctor', createDoctor)

// delete a Doctor

router.delete('/deleteDoctor/:id', deleteDoctor)

// update a Doctor

router.patch('/updateDoctor/:id',updateDoctor)

//MALAK

router.post ('/submitRequest',uploadMiddleware, submitRequest)

//KHALED

router.put('/updateDoctorEmail', updateDoctorEmail)

router.put('/updateDoctorHourlyRate', updateDoctorHourlyRate)   

router.put('/updateDoctorAffiliation', updateDoctorAffiliation)

router.post('/addDoctor', addDoctor)

router.get('/filterAllApps/doctor', filterAllApps)

router.get('/getPatientsForDoctor', getPatientsForDoctor)

router.post('/addHealthRecord/:username', addHealthRecord)

router.get('/viewHealthRecords/:username', viewHealthRecords)

router.get('/wallet-amount/:username', getWalletAmount);

router.post('/signup', signUp)

//login

router.post('/login', login)

//logout

router.get('/logout', logout)

//update password

router.post('/updateDoctorPassword', updateDoctorPassword)

//send otp and set password

router.post('/sendOtpAndSetPassword', sendOtpAndSetPassword)

router.get("/getDoctorAppointments/:username"

//notifications

router.post('/createNotificationDoctor', createNotificationDoctor);

router.delete('/deleteNotification/:notificationId', deleteNotification);

router.post('/getAllNotificationsDoctor', getAllNotificationsDoctor);

//conversation

router.post('/getconversationDoctor', getConversationDoctor);

router.post('/sendMessageDoctor', sendMessageDoctor);

//notifications

router.post('/createNotificationDoctor', createNotificationDoctor);

router.delete('/deleteNotification/:notificationId', deleteNotification);

router.post('/getAllNotificationsDoctor', getAllNotificationsDoctor);

//conversation

router.post('/getconversationDoctor', getConversationDoctor);

router.post('/sendMessageDoctor', sendMessageDoctor);





*This is for prescriptions routes:*
#
Endpoint: /api/prescription/”Method name”

//GET ALL perscriptions

router.get('/prescriptions', getPrescriptions)

//GET Single workout

router.get ('/name',getSinglePrescription)

//POST

router.post('/',createPrescription)

// DELETE

router.delete ('/:id',deletePrescription)

// UPDATE

router.patch ('/:id',updatePrescription)

//FILTERED 

router.get('/filter',filterPrescriptions)

//FILTERR

router.get('/filterr',filterPrescriptionn)	




router.get('/find-medicine', findMedicine);

router.put('/delete-medicine-from-prescription/:prescriptionId/:medicineName', deleteMedicineFromPrescription);

router.put('/add-medicine-to-prescription/:prescriptionId', addMedicineToPrescription);

router.put('/update-medicine-dosage/:prescriptionId/:medicineName/:newDosage', updateMedicineDosage);

router.get('/get-prescriptions-doctor/:username', getPrescriptionsDoctor);

router.get('/check-medicines', checkMedicines);





# Code Examples:
1-Sending OTP on mail to reset Password

2-View health records for a  specific patient

3-accept doctor requests 

const sendOtpAndSetPassword = async (req, res) => {

const { username , Email } = req.body;



try {

const user = await patient.findOne({ username });



if (!user) {

return res.status(404).json({ error: 'User not found' });

}



// Generate OTP

const otp = generateNumericOTP(); // You may need to configure OTP generation options



// Update user's password with the OTP

const salt = await bcrypt.genSalt();

const hashedPassword = await bcrypt.hash(otp, salt);

user.password = otp;

await user.save();



// Send OTP to the user's email

const transporter = nodemailer.createTransport({

service: 'gmail',

auth: {

user: 'peteraclsender@gmail.com',

pass: 'tayr rzwl yvip tqjt',

},

});

const mailOptions = {

from: 'peteraclsender@gmail.com',

to: Email,

subject: 'Password Reset OTP',

text: `Your new patient OTP is: ${otp}`,

};



transporter.sendMail(mailOptions, (error, info) => {

if (error) {

return res.status(500).json({ error: 'Error sending OTP via email' });

}

res.status(200).json({ message: 'OTP sent successfully' });

});

} catch (error) {

res.status(500).json({ error: error.message });

}

};

// View health records for a specific patient

const viewHealthRecords = async (req, res) => {

const { username } = req.params;

try {

// Assuming you have a User model with a 'username' field

const user = await Patient.findOne({ username });

if (!user) {

return res.status(404).json({ message: 'Patient not found' });

}

const healthRecords = await HealthRecord.find({ patientId: user.\_id });

if (healthRecords.length === 0) {

return res.status(404).json({ message: 'No health records found for the specified patient' });

}

res.status(200).json(healthRecords);

} catch (error) {

console.error('Error fetching health records:', error);

res.status(500).json({ error: 'Internal Server Error' });

}

};

// to accept requests

const approveRequests = async (req, res) => {

const { doctorId } = req.body;

try {

const pendingDoctor = await PendingDoctorModel.findById(doctorId);

if (!pendingDoctor) {

return res.status(404).json({ error: 'Doctor request not found' });

}



const hashedPassword = await bcrypt.hash(pendingDoctor.password, 10);

// Create a new doctor in the doctors collection

const newDoctor = new Doctor({

username: pendingDoctor.username,

name: pendingDoctor.name,

email: pendingDoctor.email,

password: hashedPassword, 

dateOfBirth: pendingDoctor.dateOfBirth,

hourlyRate: pendingDoctor.hourlyRate,

affiliation: pendingDoctor.affiliation,

educationalBackground: pendingDoctor.educationalBackground,

});

await newDoctor.save();

// Remove the doctor request from the pending requests collection

await PendingDoctorModel.findByIdAndDelete(doctorId);

res.status(201).json({ message: 'Doctor approved successfully and added to doctors database' });

} catch (error) {

console.error(error);

res.status(500).json({ error: 'Internal Server Error' });

}

};

const mongoose = require('mongoose')

const bcrypt = require('bcrypt');

const Schema = mongoose.Schema

const patientSchema = new Schema({

username:{

type: String,

required: true

},

name:{

type: String,

required: true

},

email:{

type: String,

required: true

},

password:{

type: String,

required: true

},

dateOfBirth:{

type: Date,

required:true

},

gender:{

type: String,

required: true

},

mobileNumber:{

type: String,

required: true

},

EmergencyContactName:{

type: String,

required: true

},

EmergencyContactNo:{

type: String,

required: true

},

Appointment:{

type: Date,



},

Appointment\_Status:{

type:String,

enum: ['upcoming', 'completed', 'cancelled','rescheduled'],



},

WalletAmount:{

type:Number,

default: 0,

},

appointments: [

{

date: { type: Date },

status: {

type: String,

enum: ["upcoming", "completed", "cancelled", "rescheduled",""],

},

},

],

medicalHistoryFiles: [

{

medicalHistoryFileData: {

type: Buffer,

},

},

],

},{timestamps: true})

patientSchema.methods.comparePassword = async function(candidatePassword) {

return bcrypt.compare(candidatePassword, this.password);

};

patientSchema.pre('save', async function(next) {

if (this.isModified('password')) {

const saltRounds = 10;

this.password = await bcrypt.hash(this.password, saltRounds);

}

next();

});

module.exports  = mongoose.model('Patient', patientSchema)

import React, { useState } from 'react';

import { FaUserCheck } from 'react-icons/fa';

const ApproveDoctorRequest = () => {

const [doctorId, setDoctorId] = useState('');

const [message, setMessage] = useState('');

const handleDoctorIdChange = (e) => {

setDoctorId(e.target.value);

};

const handleApproveRequest = async (e) => {

e.preventDefault();

try {

const response = await fetch('http://localhost:4000/api/admin/approveRequests', {

method: 'POST',

headers: {

'Content-Type': 'application/json',

},

body: JSON.stringify({ doctorId }),

});

const data = await response.json();

if (response.ok) {

setMessage(data.message);

} else {

setMessage(data.error);

}

} catch (error) {

console.error('Error during approval:', error);

setMessage('Internal Server Error');

}

};

return (

<>

<section className="Heading">

<h1>

<FaUserCheck /> Approve Doctor Request

</h1>

<p>Enter doctor ID to approve the request.</p>

</section>

<section className="form">

<form onSubmit={handleApproveRequest}>

<div className="form-group">

<label htmlFor="doctorId">Doctor ID:</label>

<input

type="text"

className="form-control"

id="doctorId"

name="doctorId"

value={doctorId}

placeholder="Enter Doctor ID"

onChange={handleDoctorIdChange}

/>

</div>

<button type="submit" className="btn btn-primary">

Approve Request

</button>

</form>

{message && <p className={message.includes('successfully') ? 'success-message' : 'error-message'}>{message}</p>}

</section>

</>

);

};



4- LOGIN      <---------



export default ApproveDoctorRequest;

// Login.js

import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Link } from "react-router-dom";

const Login = () => {

const navigate = useNavigate();

const [username, setUsername] = useState('');

const [password, setPassword] = useState('');

const [userType, setUserType] = useState('doctor'); // Default to pharmacist

const handleLogin = async (e) => {

e.preventDefault();

try {

if (userType === 'doctor') {

var response = await fetch('/api/doctors/login', {

method: 'POST',

headers: {

'Content-Type': 'application/json',

},

body: JSON.stringify({username : username, password: password }),

});

} else if (userType === 'admin') {

var response = await fetch('/api/admin/login', {

method: 'POST',

headers: {

'Content-Type': 'application/json',

},

body: JSON.stringify({ username, password }),

});

}else{

var response = await fetch('/api/patient/login', {

method: 'POST',

headers: {

'Content-Type': 'application/json',

},

body: JSON.stringify({ username, password }),

});



}

const data = await response.json();

console.log("data is ",data)

if (response.status === 200) {



localStorage.setItem('userType', userType);

localStorage.setItem('username', username);

localStorage.setItem('password', password);

if (userType === 'doctor') {

navigate('/DoctorHomePage'); // Adjust the path based on your routes

} else if (userType === 'admin') {

navigate('/AdminHome'); // Adjust the path based on your routes

} else {

const username = data.user.username;

// Store the user ID in local storage

localStorage.setItem('username', username);

console.log('Stored username in local storage:', username);

navigate('PatientHome'); // Adjust the path based on your routes

}



} else {

console.error(data.error);

}

} catch (error) {

console.error(error.message);

}

};

const handleResetPassword = () => {

// Navigate to the reset-password path

navigate('/reset-password');

};

return (

<div>

<h2>Login</h2>

<form onSubmit={handleLogin}>

<label>

User Type:

<select value={userType} onChange={(e) => setUserType(e.target.value)}>

<option value="doctor">Doctor</option>

<option value="admin">Admin</option>

<option value="Patient">Patient</option> 

</select>

</label>

<br />

<label>

Username:

<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

</label>

<br />

<label>

Password:

<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

</label>

<br />

<button type="submit">Login</button>



</form>

<button onClick={handleResetPassword}>Reset Password</button>

<div>

<Link to ="/signUp">

<button>Sign up</button>

</Link>

</div>

<p>If you want to Submit a request and become a doctor</p>

<div>

<Link to="/SubmitRequest">

<button> SubmitRequest</button>

</Link>

</div>

</div>

);

};

export default Login;

#
# Tests:
We used postman.


#
For example: if you want to test any method in backend, you go to postman, check whether it is type of (get/post/Put/Delete/…) from the routes , then type the url <http://localhost:4000/api/patient_or_doctor_or_prescription_or_admin/Method_name>

Then press send

You have to add the header: Content-Type with value application/json, also you have to type in body tap the parameters of the method if it is post like the screenshot (go to body, choose raw, Json)



1-As a patient, try reserving an appointment with a doctor and view if it’s updated

2-As a patient, try viewing your wallet amount

3-As a patient, try subscribing to a health Package then view it

4-As a doctor, try adding appointments and check if it’s updated by viewing your available appointments

5-As a doctor, try adding health record and view it

6-As a doctor, try to change your password and type the new password and try logging in again with your new password

7- As an admin, try removing a user , then try accessing again as this user to check if it is removed

8-Try to reset password and otp will be sent with new password on your mail
# License: 
This project uses Stripe to process. By using this project, you agree to be bound by the Stripe Services Agreement.

You can find the full text of the Stripe Services Agreement at the following link:

<https://stripe.com/legal>

Please make sure to read and understand the Stripe Services Agreement before using this project.

If you have any questions about the Stripe Services Agreement or how it applies to your use of this project, please contact Stripe at <support@stripe.com>.





