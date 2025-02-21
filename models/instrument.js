import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
  name: String,
  disambiguation: String,
  id: String,
  count: Number,
});

const relationSchema = new mongoose.Schema({
  type: String,
  direction: String,
  genre: genreSchema,
  instrument: {
    name: String,
    description: String,
    id: String,
    type: String,
    disambiguation: String,
    type_id: String,
  },
});

const aliasSchema = new mongoose.Schema({
  name: String,
  sort_name: String,
  locale: String,
  primary: Boolean,
  type: String,
});

const tagSchema = new mongoose.Schema({
  name: String,
  count: Number,
});

const instrumentSchema = new mongoose.Schema({
  id: String,
  name: String,
  type: String,
  type_id: String,
  genres: [genreSchema],
  relations: [relationSchema],
  relatedRecordings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recording' }],
  aliases: [aliasSchema],
  tags: [tagSchema],
  description: String,
  disambiguation: String,
});

const Instrument = mongoose.model("Instrument", instrumentSchema);

export default Instrument;
