import * as fs from "fs";

// mongodb
import mongodb from "mongodb";

export default defineEventHandler(async (event: any) => {

    // connect to mongodb
    const MongoClient = mongodb.MongoClient;
    const client = new MongoClient('mongodb://webapp:RrSHZ9Cc8vFUF8w9@cl2.najajan.de:27777/icodesk_configurator', {useUnifiedTopology: true});

    await client.connect();

    // get the database
    const db = client.db('icodesk_configurator');

    // get the collection
    const collection = db.collection('configs');

    // get the config id
    const configId = event.context.params.id

    // get the config
    const config = await readBody(event)

    // remove _id from config
    delete config._id

    // insert or update
    const result = await collection.updateOne({configId: configId}, {$set: config}, {upsert: true})

    // close the connection
    await client.close();

    // return the config
    return {status: 'ok'}

    /*
    const configFile = `server/configs/${event.context.params.id}.json`

    // get body
    const body = await readBody(event)

    // write the config file
    const success = fs.writeFileSync(configFile, JSON.stringify(body))
    console.log("writing config file", configFile, body)

    // return the config file
    return body

     */

})
