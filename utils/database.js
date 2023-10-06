import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017/realestates';

export const mongoConnect = (callback) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Connected!');
        callback();
    })
    .catch(err => {
        console.log(err);
        throw new Error('Connection error');
    });
};

