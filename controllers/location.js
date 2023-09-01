import path from 'path';
import { fileURLToPath } from 'url'; 
import RegionsModel from '../models/regions.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getSelectedLocation = (req, res) => {
    const regions = RegionsModel.getAllRegions();
    const location = req.params.location;
    res.render(path.join(__dirname, '..', 'views', 'location.ejs'), { regions, location });
}


const locationController = { getSelectedLocation };

export default locationController;