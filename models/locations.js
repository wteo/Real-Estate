import mongoose from 'mongoose';

const AmenitySchema = new mongoose.Schema({
    amenity: String,
    imageLink: String,
    hyperlink: String
});


const LocationSchema = new mongoose.Schema({
    location: String,
    description: String,
    mapImageLink: String,
    amenities: [AmenitySchema]
});

const Locations = mongoose.model('Locations', LocationSchema);

export default Locations;