import path from 'path';
import { fileURLToPath } from 'url'; 
import Locations from '../models/locations.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getSelectedLocation = async (req, res, next) => {
    try {
        const region = req.params.region;
        const locationData = await Locations.findOne({ location: req.params.location });
        const { location, description, mapImageLink, amenities } = locationData;
        return res.render(path.join(__dirname, '..', 'views', 'location.ejs'), { region, location, description, mapImageLink, amenities });
    } catch (error) {
        next(error);
    }
}

const deleteAmenity = async (req, res, next) => {
    try {
        const { location, amenity } = req.body;
        await Locations.updateOne({ location }, { $pull: { amenities: { amenity }} });
        return res.redirect(`/${req.params.region}/${location}/admin`);
    } catch (error) {
        next(error);
    }
}

const addAmenity = async (req, res, next) => {
    try {
        const { region, location } = req.params;
        const { amenity, imageLink, hyperlink } = req.body
        await Locations.updateOne({ location }, { $push: { amenities: { amenity, imageLink, hyperlink } } });
        return res.redirect(`/${region}/${location}/admin`);
    } catch (error) {
        next(error);
    }
}

const updateAmenity = async (req, res, next) => {
    try {
        const { region, location } = req.params;
        const { amenity, imageLink, hyperlink } = req.body;
        await Locations.updateOne({ 
            location,
            "amenities.amenity": req.params.amenity
        } , {
            $set: {
                "amenities.$.amenity": amenity,
                "amenities.$.imageLink": imageLink,
                "amenities.$.hyperlink": hyperlink
            }
        });
        return res.redirect(`/${region}/${location}/admin`);
    } catch (error) {
        next(error);
    }
}

const locationsController = { getSelectedLocation, deleteAmenity, addAmenity, updateAmenity };

export default locationsController;