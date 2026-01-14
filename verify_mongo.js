const MongoStore = require('connect-mongo');
console.log('MongoStore type:', typeof MongoStore);
console.log('MongoStore keys:', Object.keys(MongoStore));
try {
    console.log('MongoStore.create type:', typeof MongoStore.create);
} catch (e) {
    console.log('MongoStore.create access error:', e.message);
}
