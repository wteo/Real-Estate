import { getDB } from '../utils/database.js';

class RegionsModel {
    constructor(state, region, description, locations) {
        this.state = state;
        this.region = region;
        this.description = description;
        this.locations = locations;
    }

    get collection() {
        return getDB().collection('regions');
    }

    getAllStates() {
        return this.collection.distinct('state');
    }

    getAllRegions() {
        return this.collection.find().toArray().then(regions => {
            return regions;
        });
    }

    async addRegion(state, region, description) {
        return this.collection.insertOne({ state, region, description, locations: [] });
    }

    async deleteRegion(region) {
        return await this.collection.deleteOne({ region });
    };

    async getAllRegionsByAlphabeticalOrder() {
        const regions = await this.getAllRegions();
        regions.forEach(region => {
            region.locations.sort((a, b) => a.location.localeCompare(b.location));
        });
        return regions;
    }

    async addLocation(region, location, imageLink) {
        return await this.collection.updateOne({ region }, { $push: { locations: { location, imageLink } } });
    }

    deleteLocation(selectedLocation) {
        return this.collection.updateOne({ 'locations.location': selectedLocation }, { $pull: { locations: { location: selectedLocation }} });
    }

    static deleteLocationPage(selectedLocation) {
        const db = getDB();
        return db.collection('locations').deleteOne({ location: selectedLocation });
    }

    static addLocationPage(location, description, mapImageLink) {
        const db = getDB();
        return db.collection('locations').insertOne({ location, description, mapImageLink, amenities: [] });
    }

    async updateLocation(region, paramsLocation, location, locationImageLink, description, mapImageLink) {
        const db = getDB();
        await db.collection('locations').updateOne(
            { 
                location: paramsLocation 
            }, { 
                $set: {
                    location,
                    description, 
                    mapImageLink 
                }
            });
        await this.collection.updateOne(
            { 
                region,
                "locations.location": paramsLocation
            },
            {
                $set: {
                    "locations.$.location": location,
                    "locations.$.imageLink": locationImageLink,
                }
            }
        );
        return;
    }

    async filterData(searchLocation) {
        const results = await this.collection.aggregate([
            { $unwind: '$locations' },
            { $match: { 'locations.location': { $regex: new RegExp(searchLocation, 'i') } } },
            { $project: { region: 1, 'locations.location': 1, 'locations.imageLink': 1 } }
        ]).toArray();
        return results.map(item => ({
            region: item.region,
            location: item.locations.location,
            imageLink: item.locations.imageLink
        }));
    }
}

export default RegionsModel;

