require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const patientroutes = require('./routes/patient')
const app = express();
const doctorRoutes = require('./routes/doctors')
const adminRoutes = require('./routes/adminRoutes')
const prescriptionRoutes = require('./routes/prescriptionRoutes')

const cors = require('cors');

app.use(cors());
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})
app.use(express.json())

app.use('/api/patient',patientroutes)
app.use('/api/doctors',doctorRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/prescription',prescriptionRoutes)

const { resolve } = require("path");
// Replace if using a different env file or config
const env = require("dotenv").config({ path: "./.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

//app.use(express.static(process.env.STATIC_DIR));

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

// send the publishable key to the front end
app.get("/config", (req, res) => {
  res.send({
    publishableKey: 'pk_test_51O4R2WJ6reglJIMrbT7RTKyuwYmIFnSp0hbD9CKUiQJp7uw0ZoV6ClIimQ1CnkIXxf8mxYEHE4ouO2vWRCTcnw7t00p5tUfsb3',
  });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () =>{
            console.log('connected to db & listening on port',process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })


