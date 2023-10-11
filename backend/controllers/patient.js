const filterAllApps = async (req, res) => {
    try {
        const { date, status } = req.params;

        const filter = {};

        if (date) {
            filter.appdate = date;
        }

        if (status) {
            filter.appstatus = status;
        }

        const filteredAppointments = await patient.find(filter);

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