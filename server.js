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

  const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    emailId: { type: String, unique: true },
  });
  
  const User = mongoose.model('User', userSchema);
  
  const emailSchema = new mongoose.Schema({
  to: String,
  subject: String,
  message: String,
});

const Email = mongoose.model('Email', emailSchema);

app.post('/register', async (req, res) => {
  try {
    const { name, password, emailId } = req.body;
    const user = new User({ name, password, emailId: emailId + '@mernmail' });
    await user.save();
    res.status(200).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId + '@mernmail' });
    if (user && user.password === password) {
      res.status(200).send({ message: 'Login successful', user });
    } else {
      res.status(400).send({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'biswasprasana004@gmail.com',
    pass: 'jgttdeiivzczcwba',
  },
});

app.post('/send-email', async (req, res) => {
  try {
    const { userId, to, subject, message } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    const email = new Email({ to, subject, message, from: user.emailId });
    await email.save();

    transporter.sendMail({
      from: user.emailId,
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