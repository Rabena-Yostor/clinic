import { useEffect, useState } from "react";
import axios from 'axios';
import DoctorDetails from "../components/DoctorDetails";


const HomeDoctors = () => {
  const [doctors, setDoctors] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [specialitySearchTerm, setSpecialitySearchTerm] = useState("");
  const [datetimeSearchTerm, setDatetimeSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(null);
 // const [selectedDoctorHealthRecords, setSelectedDoctorHealthRecords] = useState([]);

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

  

 // In your main component, structure your page with a header and main content area
 return (
  <div className="home-doctors-container">
    <section className="search-area">
      <input
        type="text"
        id="searchName"
        className="search-input"
        placeholder="Search by name"
        value={nameSearchTerm}
        onChange={(e) => setNameSearchTerm(e.target.value)}
      />
      <input
        type="text"
        className="search-input"
        placeholder="Search by speciality"
        value={specialitySearchTerm}
        onChange={(e) => setSpecialitySearchTerm(e.target.value)}
      />
      <input
        type="datetime-local"
        className="search-input"
        placeholder="Search by available appointment"
        value={datetimeSearchTerm}
        onChange={(e) => setDatetimeSearchTerm(e.target.value)}
      />
    </section>
    <section className="doctors-list">
      {filteredDoctors &&
        filteredDoctors.map((doctor) => (
          <DoctorDetails
            doctor={doctor}
            key={doctor._id}
          />
        ))}
    </section>
  </div>
);


};

export default HomeDoctors;
