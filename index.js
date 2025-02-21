import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Instrument from './models/instrument.js';
import Recording from './models/recording.js';
import Place from './models/place.js';
import User from './models/user.js';

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_secret_key';

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/Exam', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/instruments', verifyToken, async (req, res) => {
  try {
    const instrument = new Instrument(req.body);
    await instrument.save();
    res.status(201).json(instrument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/instruments', verifyToken, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const instruments = await Instrument.find()
      .populate('relatedRecordings')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();
    const totalItems = await Instrument.countDocuments();
    res.json({ page, totalPages: Math.ceil(totalItems / limit), totalItems, instruments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/recordings', verifyToken, async (req, res) => {
  try {
    const recording = new Recording(req.body);
    await recording.save();
    res.status(201).json(recording);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/recordings', verifyToken, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const recordings = await Recording.find()
      .populate('instrumentUsed')
      .populate('placeRecorded')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();
    const totalItems = await Recording.countDocuments();
    res.json({ page, totalPages: Math.ceil(totalItems / limit), totalItems, recordings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/places', verifyToken, async (req, res) => {
  try {
    const place = new Place(req.body);
    await place.save();
    res.status(201).json(place);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/places', verifyToken, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const places = await Place.find()
      .populate('recordingsHeld')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();
    const totalItems = await Place.countDocuments();
    res.json({ page, totalPages: Math.ceil(totalItems / limit), totalItems, places });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
