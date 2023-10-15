import { useState } from "react";

const DoctorForm = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [educationalBackground, setEducationalBackground] = useState("");
  const [availableAppointment, setAvailableAppointment] = useState("");

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doctor = {
      username,
      name,
      email,
      password,
      dateOfBirth,
      hourlyRate,
      affiliation,
      speciality,
      educationalBackground,
      availableAppointment,
    };

    const response = await fetch("/api/doctors", {
      method: "POST",
      body: JSON.stringify(doctor),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setUsername("");
      setName("");
      setEmail("");
      setPassword("");
      setDateOfBirth("");
      setHourlyRate("");
      setAffiliation("");
      setSpeciality("");
      setEducationalBackground("");
      setAvailableAppointment("");
      console.log("new doctor added:", json);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Doctor</h3>

      <label>Doctor Username:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />

      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label>Email:</label>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="text"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <label>Date Of Birth:</label>
      <input
        type="text"
        onChange={(e) => setDateOfBirth(e.target.value)}
        value={dateOfBirth}
      />
      <label>Hourly Rate:</label>
      <input
        type="number"
        onChange={(e) => setHourlyRate(e.target.value)}
        value={hourlyRate}
      />
      <label>Affiliation:</label>
      <input
        type="text"
        onChange={(e) => setAffiliation(e.target.value)}
        value={affiliation}
      />
      <label>Speciality:</label>
      <input
        type="text"
        onChange={(e) => setSpeciality(e.target.value)}
        value={speciality}
      />
      <label>Educational Background:</label>
      <input
        type="text"
        onChange={(e) => setEducationalBackground(e.target.value)}
        value={educationalBackground}
      />
      <label>Available Appointment:</label>
      <input
        type="datetime-local"
        onChange={(e) => setAvailableAppointment(e.target.value)}
        value={availableAppointment}
      />

      <button>Add Doctor</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default DoctorForm;
