const { MongoClient, ServerApiVersion } = require("mongodb");

mongodbConfigObject = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
};

let database;

async function initDb() {
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017', mongodbConfigObject);
    database = client.db('second-api');
}


function getDb() {
    if (!database) {
        throw new Error('Connecting to the database failed!');
    }

    return database;
}

module.exports = {
    initDb: initDb,
    getDb: getDb
};