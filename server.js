// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

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

app.get('/emails', async (req, res) => {
  const emails = await Email.find();
  res.json(emails);
});

app.post('/emails', async (req, res) => {
  const email = new Email(req.body);
  await email.save();
  res.json(email);
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});