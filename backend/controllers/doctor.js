


const filterAllApps = async (req, res) => {
    try {
        const { date, status } = req.params;

        const filter = {};

        if (date) {
            filter.Appointment = date;
        }

        if (status) {
            filter.Appointment_Status = status;
        }

        const filteredAppointments = await Appointment.find(filter);

        if (filteredAppointments.length === 0) {
            return res.status(404).send('No matching appointments found');
        }

        res.send(filteredAppointments);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

const getPatientsForDoctor = async (req, res) => {
    const username = req.params.UserName;

    try {
        const doctor = await Doctor.findById(username).populate('ArrayOfPatients');

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found.' });
        }

        const patients = doctor.ArrayOfPatients;
        return res.json({ patients });
    } catch (error) {
        console.error('Error fetching patients:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {filterAllApps,getPatientsForDoctor};
