import path from 'path';
import { fileURLToPath } from 'url';
import Locations from '../../models/locations.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getAddRegionForm = (req, res) => {
    return res.render(path.join(__dirname, '..', '..', 'views', 'admin', 'forms', 'add_region.ejs'));
}

const getUpdateRegionForm = (req, res) => {

    const { regions } = res.locals;
    const filteredRegion = regions.filter(region => region.region === req.params.region )
    const noRegionFound = filteredRegion.length === 0;

    if (noRegionFound) {
        return res.status(404).render(path.join(__dirname, '..', '..', 'views', '404.ejs'));
    } else {
        const { state, region, description } = filteredRegion[0];
        return res.render(path.join(__dirname, '..', '..', 'views', 'admin', 'forms', 'update_region.ejs'), { state, region, description });
    }
}

const getAddLocationForm = (req, res) => {
    const { states, regions } = res.locals;
    const noStates = regions.length === 0;
    const noRegionFound = regions.length === 0;

    if (noStates || noRegionFound) {
        return res.status(404).render(path.join(__dirname, '..', '..', 'views', '404.ejs'));
    } else {
        return res.render(path.join(__dirname, '..', '..', 'views', 'admin', 'forms', 'add_location.ejs'), { states, regions });
    }
}

const getUpdateLocationForm = async(req, res, next) => {
    try {
        const { regions } = res.locals;
        const filteredRegion = regions.filter(region => region.region === req.params.region);
        const filteredLocation = filteredRegion[0].locations.filter(location => location.location === req.params.location);
        const locationData = await Locations.findOne({ location: req.params.location});
        const { description, mapImageLink } = locationData;
        return res.render(path.join(__dirname, '..', '..', 'views', 'admin', 'forms', 'update_location.ejs'), { 
            region: req.params.region, 
            paramsLocation: req.params.location, 
            location: filteredLocation[0].location,
            locationImageLink: filteredLocation[0].imageLink,
            description, 
            mapImageLink
        });
    } catch (error) {
        next(error)
    }
};

const getAddAmenityForm = async (req, res, next) => {
    try {
        const { region, location } = req.params;
        return res.render(path.join(__dirname, '..', '..', 'views', 'admin', 'forms', 'add_amenity.ejs'), { region, location });
    } catch (error) {
        next(error);
    }
}

const getUpdateAmenityForm = async (req, res, next) => {
    try {
        const locationData = await Locations.findOne({ location: req.params.location });
        const amenity = locationData.amenities.filter(amenity => amenity.amenity === req.params.amenity);
        return res.render(path.join(__dirname, '..', '..', 'views', 'admin', 'forms', 'update_amenity.ejs'), 
            { 
                region: req.params.region, 
                location: req.params.location, 
                amenity: amenity[0].amenity, 
                imageLink: amenity[0].imageLink, 
                hyperlink: amenity[0].hyperlink 
            });
    } catch (error) {
        next(error);
    }
}

const regionsController = { getAddRegionForm, getUpdateRegionForm, getAddLocationForm, getUpdateLocationForm, getAddAmenityForm, getUpdateAmenityForm };

export default regionsController;