import * as fs from "fs";
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

    // get
    const result = await collection.findOne({configId: configId})

    // close the connection
    await client.close();

    console.log("RESULT",result)

    // if no result was found
    if (!result) {
        return {
            "version": "1.0.0",
            "colors": { "background": "#000000", "foreground": "#ffffff", "accent": "#00ffff", "danger": "#ff0000" },
            "modules": []
        }
    }

    // else return the config
    return result


    /*
    const configFile = `server/configs/${event.context.params.id}.json`

    // if the config file does not exist, return an empty object
    if (!fs.existsSync(configFile)) {
        return {
            "version": "1.0.0",
            "colors": { "background": "#000000", "foreground": "#ffffff", "accent": "#00ffff", "danger": "#ff0000" },
            "modules": []
        }
    }

    // read the config file
    const config = fs.readFileSync(configFile, 'utf8')

    // return the config file
    return JSON.parse(config)

     */

})
