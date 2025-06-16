const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv');
const uploadRoute = require('./routes/upload.js');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/upload', uploadRoute);

app.listen(PORT, ()=>console.log(`app runnning on  port ${PORT}`));