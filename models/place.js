import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
  id: String,
  name: String,
  sort_name: String,
  type: String,
  type_id: String,
  disambiguation: String,
});

const lifeSpanSchema = new mongoose.Schema({
  begin: String,
  end: String,
  ended: Boolean,
});

const eventSchema = new mongoose.Schema({
  id: String,
  name: String,
  type: String,
  type_id: String,
  cancelled: Boolean,
  time: String,
  disambiguation: String,
  life_span: lifeSpanSchema,
});

const placeRelationSchema = new mongoose.Schema({
  type: String,
  type_id: String,
  direction: String,
  event: eventSchema,
});

const placeSchema = new mongoose.Schema({
  id: String,
  name: String,
  type: String,
  type_id: String,
  address: String,
  area: areaSchema,
  coordinates: String,
  disambiguation: String,
  life_span: lifeSpanSchema,
  relations: [placeRelationSchema],
});

const Place = mongoose.model("Place", placeSchema);
export default Place;
