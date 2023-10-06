import session from 'express-session';
import connectMongoDBSession from 'connect-mongodb-session';

const Store = connectMongoDBSession(session);

export const MongoDBStore = new Store({
  uri: 'mongodb://localhost:27017/realestates',
  collection: 'sessions',
  autoRemove: 'interval',
  autoRemoveInterval: 10
});
