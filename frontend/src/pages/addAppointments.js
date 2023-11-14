import { useState } from "react";
import { useParams } from "react-router-dom";
const AddAppointment = () => {
    const { username } = useParams();
    const [date, setDate] = useState("");
   
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const appointment = { date };
        const response = await fetch(`/api/doctors/addAppointment/${username}`, {
        method: "POST",
        body: JSON.stringify(appointment),
        headers: {
            "Content-Type": "application/json",
        },
        });
        const json = await response.json();
        if (!response.ok) {
        setError(json.error);
        }
        if (response.ok) {
        setDate("");
        setError(null);
        console.log("Appointment Created");
        }
    };
    return (
        <form className="add-form" onSubmit={handleSubmit}>
        <h3>Add Appointment</h3>
        <label> date</label>
        <input
            type="datetime-local"
            onChange={(e) => setDate(e.target.value)}
            value={date}
        />
        
        <input type="submit" value="Add Appointment" />
        </form>
    );
    }
    export default AddAppointment;