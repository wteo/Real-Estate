import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  location: String,
  imageLink: String
});

const regionSchema = new mongoose.Schema({
  state: String,
  region: String,
  description: String,
  locations: [locationSchema]
});

const Regions = mongoose.model('Regions', regionSchema);

export default Regions;
