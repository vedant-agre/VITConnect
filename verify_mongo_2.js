const ConnectMongo = require('connect-mongo');
console.log('Top keys:', Object.keys(ConnectMongo));
if (ConnectMongo.create) console.log('Top.create is function');
else console.log('Top.create is MISSING');

if (ConnectMongo.MongoStore) {
    console.log('Inner keys:', Object.keys(ConnectMongo.MongoStore));
    if (ConnectMongo.MongoStore.create) console.log('Inner.create is function');
    else console.log('Inner.create is MISSING');
}
