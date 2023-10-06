import Regions from './regions.js';

class GlobalRegionsModel {
    constructor() {}

    async getRegionsWithSortedLocations() {
        const regions = await Regions.find();
        regions.forEach(region => {
            if (region.locations) {
                region.locations.sort((a, b) => a.location.localeCompare(b.location));
            }
        });
        return regions;
    }

    async searchByLocation(searchLocation) {
        const results = await Regions.aggregate([
            { $unwind: '$locations' },
            { $match: { 'locations.location': { $regex: new RegExp(searchLocation, 'i') } } },
            { $project: { region: 1, 'locations.location': 1, 'locations.imageLink': 1 } }
        ]);
        return results.map(item => ({
            region: item.region,
            location: item.locations.location,
            imageLink: item.locations.imageLink
        }));
    }
}

export default GlobalRegionsModel;
