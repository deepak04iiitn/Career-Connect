import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import path from 'path'

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('MongoDB is connected!');
}).catch((err) => {
    console.log(err);
})

// const __dirname = path.resolve();

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.listen(3000 , () => {
    console.log('Server is running on port 3000!');
})

app.use('/backend/user' , userRoutes);
app.use('/backend/auth' , authRoutes);


const JobSchema = new mongoose.Schema({
    job_title: String,
    min_exp: String,
    max_exp: String,
    company: String,
    location: Array,
    jd: String,
    date: String,
  });
  const Naukri = mongoose.model('Naukri', JobSchema, 'naukri');
  
  
  app.get('/backend/naukri', async (req, res) => {

    try {
      const data = await Naukri.find();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch data: ' + err.message });
    }

  });


  {/*app.use(express.static(path.join(__dirname, '/frontend/dist'))); */}

  {/*app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  }); */}


// middleware
app.use((err , req , res , next) => {
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error!';

    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})