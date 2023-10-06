import path from 'path';
import { fileURLToPath } from 'url'; 
import Locations from '../../models/locations.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);


const getMainPage = (req, res) => {
    return res.render(path.join(__dirname, '..', '..', 'views', 'admin', 'pages', 'regions.ejs'));
}

const getRegionPage = (req, res) => {
    const { regions } = res.locals
    const filteredRegions = regions.filter(region => region.region === req.params.region);
    const noRegionFound = filteredRegions.length === 0

    if (noRegionFound) {
        return res.status(404).render(path.join(__dirname, '..', '..', 'views', '404.ejs'));
    } else {
        const { region, description, locations } = filteredRegions[0];
        return res.render(path.join(__dirname, '..', '..', 'views', 'admin', 'pages', 'region.ejs'), { region, description, locations });
    }
};

const getLocationPage = async (req, res, next) => {
    try {
        const region = req.params.region;
        const locationData = await Locations.findOne({ location: req.params.location });
        const { location, description, mapImageLink, amenities } = locationData;
        return res.render(path.join(__dirname, '..', '..', 'views', 'admin', 'pages', 'location.ejs'), { region, location, description, mapImageLink, amenities });
    } catch (error) {
        next(error);
    }
};

const regionsController = { getMainPage, getRegionPage, getLocationPage };

export default regionsController;