import { useEffect, useState } from "react";
import DoctorDetails from "../components/DoctorDetails";
import DoctorForm from "../components/DoctorForm";
import HealthRecordForm from '../components/HealthRecordForm';

const HomeDoctors = () => {
  const [doctors, setDoctors] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [specialitySearchTerm, setSpecialitySearchTerm] = useState("");
  const [datetimeSearchTerm, setDatetimeSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("/api/doctors/getAllDoctors");
        const json = await response.json();

        if (response.ok) {
          setDoctors(json);
          setFilteredDoctors(json);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
  };

  useEffect(() => {
    if (!doctors) return;

    const nameFiltered = doctors.filter((doctor) =>
    doctor.name && doctor.name.toLowerCase().includes(nameSearchTerm.toLowerCase())
  );
  
  const specialityFiltered = doctors.filter((doctor) =>
    doctor.speciality &&
    doctor.speciality.toLowerCase().includes(specialitySearchTerm.toLowerCase())
  );
  
  const datetimeFiltered = doctors.filter((doctor) =>
    doctor.availableAppointment &&
    doctor.availableAppointment.toLowerCase().includes(datetimeSearchTerm.toLowerCase())
  );

    setFilteredDoctors(
      nameSearchTerm && specialitySearchTerm && datetimeSearchTerm
        ? nameFiltered
            .filter((doctor) =>
              doctor.speciality
                .toLowerCase()
                .includes(specialitySearchTerm.toLowerCase())
            )
            .filter((doctor) =>
              doctor.availableAppointment
                .toLowerCase()
                .includes(datetimeSearchTerm.toLowerCase())
            )
        : nameSearchTerm && specialitySearchTerm
        ? nameFiltered
        : nameSearchTerm && datetimeSearchTerm
        ? nameFiltered.filter((doctor) =>
            doctor.availableAppointment
              .toLowerCase()
              .includes(datetimeSearchTerm.toLowerCase())
          )
        : specialitySearchTerm && datetimeSearchTerm
        ? specialityFiltered.filter((doctor) =>
            doctor.availableAppointment
              .toLowerCase()
              .includes(datetimeSearchTerm.toLowerCase())
          )
        : nameSearchTerm
        ? nameFiltered
        : specialitySearchTerm
        ? specialityFiltered
        : datetimeSearchTerm
        ? datetimeFiltered
        : doctors
    );
  }, [doctors, nameSearchTerm, specialitySearchTerm, datetimeSearchTerm]);

  const addHealthRecord = async (username, healthRecordData) => {
    try {
      const { bloodPressure, heartRate, allergies, medications } = healthRecordData;
      const response = await fetch(`http://localhost:4000/api/doctors/addHealthRecord/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // You can pass additional data in the body if needed
        body: JSON.stringify({
          username,
          newHealthRecordData:{
            bloodPressure,
            heartRate,
            allergies,
            medications,
          }
        }),
      });
      console.log('Response:', response);
      const data = await response.json();
      if (response.ok) {
        console.log('Health record added successfully:', data.message);
        alert('Health reacord added succefully')
      } else {
        if (response.status === 404 && data.error === 'Patient not found') {
          console.error('Error adding health record: Patient not found');
          alert('Patient not found. Please check the username and try again.')
           } else {
          console.error('Error adding health record:', data.error);
          alert('Error adding health record. Please try again.'); 

        }
      }
    } catch (error) {
      console.error('Error adding health record:', error);
    }
  };

  return (
    <div className="home">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name"
          value={nameSearchTerm}
          onChange={(e) => setNameSearchTerm(e.target.value)}
        />
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by speciality"
          value={specialitySearchTerm}
          onChange={(e) => setSpecialitySearchTerm(e.target.value)}
        />
      </div>
      <div className="search-bar">
        <input
          type="datetime-local"
          placeholder="Search by available appointment"
          value={datetimeSearchTerm}
          onChange={(e) => setDatetimeSearchTerm(e.target.value)}
        />
      </div>
      <div className="doctors">
        {filteredDoctors &&
          filteredDoctors.map((doctor) => (
            <DoctorDetails
              doctor={doctor}
              key={doctor._id}
              onClick={() => handleDoctorClick(doctor)}
            />
          ))}
      </div>
      <DoctorForm />
      <HealthRecordForm onAddHealthRecord={addHealthRecord} />
      {selectedDoctor && (
        <div className="selected-doctor-info">
          <h2>Selected Doctor Information</h2>
          <DoctorDetails doctor={selectedDoctor} />
        </div>
      )}
    </div>
  );
};

export default HomeDoctors;
