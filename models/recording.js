import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
  name: String,
  disambiguation: String,
  id: String,
  count: Number,
});

const workSchema = new mongoose.Schema({
  id: String,
  title: String,
  type: String,
  type_id: String,
  language: String,
  languages: [String],
  iswcs: [String],
});

const relationSchema = new mongoose.Schema({
  type: String,
  type_id: String,
  direction: String,
  work: workSchema,
});

const artistSchema = new mongoose.Schema({
  id: String,
  name: String,
  sort_name: String,
  type: String,
  type_id: String,
  disambiguation: String,
  genres: [genreSchema],
});

const artistCreditSchema = new mongoose.Schema({
  name: String,
  joinphrase: String,
  artist: artistSchema,
});

const ratingSchema = new mongoose.Schema({
  value: Number,
  votes_count: Number,
});

const recordingSchema = new mongoose.Schema({
  id: String,
  title: String,
  genres: [genreSchema],
  rating: ratingSchema,
  relations: [relationSchema],
  artist_credit: [artistCreditSchema],
  disambiguation: String,
  video: Boolean,
  length: Number,
});

const Recording = mongoose.model("Recording", recordingSchema);
export default Recording;
