// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const mongodbUri = "mongodb+srv://biswasprasana004:BlAWpiQZXg1DyI5Y@cluster0.z2jtykk.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

  const emailSchema = new mongoose.Schema({
  to: String,
  subject: String,
  message: String,
});

const Email = mongoose.model('Email', emailSchema);

app.post('/send-email', async (req, res) => {
  try {
    const { to, subject, message } = req.body;
    const email = new Email({ to, subject, message });
    await email.save();

    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });
    
    // Inside the /send-email route
    transporter.sendMail({
      from: 'your-email@gmail.com',
      to,
      subject,
      text: message,
    }, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
    
    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});