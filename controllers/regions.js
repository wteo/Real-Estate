import path from 'path';
import { fileURLToPath } from 'url'; 
import Regions from '../models/regions.js';
import Locations from '../models/locations.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const fetchRegion = async(req, res, next) => {
    try {
        const regionData = await Regions.findOne({ region: req.params.region });
    
        if (!regionData) {
          return res.status(404).render(path.join(__dirname, '..', 'views', '404.ejs'));
        } else {
          return res.render(path.join(__dirname, '..', 'views', 'region.ejs'), { 
            region: regionData.region, 
            description: regionData.description, 
            locations: regionData.locations 
          });
        }
    } catch (error) {
        next(error);
    }
}

const addRegion = async (req, res, next) => {
    try {
        const { state, region, description } = req.body;
        await Regions.create({ state, region, description });
        return res.redirect(`/${region}/admin`);
    } catch (error) {
        next(error);
    }
}

const updateRegion = async (req, res, next) => {
    try {
        const { state, region, description } = req.body;
        const query = { region: req.params.region };
        await Regions.updateOne (query, { state, region, description });
        return res.redirect(`/admin`);
    } catch (error) {
        next(error);
    }
}

const deleteRegion = async (req, res, next) => {
    try {
        await Regions.deleteOne({ region: req.body.region });
        return res.redirect('/admin');
    } catch (error) {
        next(error);
    }
}

const addLocation = async (req, res, next) => {
    try {
        const { region, location, locationImageLink, description, mapImageLink } = req.body
        await Regions.updateOne({ region }, { $push: { locations: { location, imageLink: locationImageLink } } });
        await Locations.create({ location, description, mapImageLink, amenities: [] });
        return res.redirect(`/${region}/admin`);
    } catch (error) {
        next(error);
    }
}

const updateLocation = async (req, res, next) => {
    try {
        const { location, locationImageLink, description, mapImageLink } = req.body;
        const conditions = { region: req.params.region, 'locations.location': req.params.location };
        const update = {
            $set: {
                'locations.$.location': location,
                'locations.$.imageLink': locationImageLink
            }
        };
        await Regions.updateOne(conditions, update);
        await Locations.updateOne({ location: req.params.location }, { location, description, mapImageLink})
        return res.redirect(`/${req.params.region}/${req.body.location}/admin`);
    } catch (error) {
        next(error);
    }
};

const deleteLocation = async (req, res, next) => {
    try {
        const { region, location } = req.body;
        const conditions = { 'locations.location': location };
        const update = { $pull: { locations: { location }} };
        await Regions.updateOne (conditions, update);
        await Locations.deleteOne({ location });
        return res.redirect(`/${region}/admin`);
    } catch (error) {
        next(error);
    }
}

const regionsController = { fetchRegion, addRegion, updateRegion, deleteRegion, addLocation, updateLocation, deleteLocation };

export default regionsController;