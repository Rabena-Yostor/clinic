


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

module.exports = {filterAllApps};