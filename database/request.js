import mongoose from "mongoose";
require("dotenv").config();

let client = null;

export async function query(incoming, params = [], config = {}) {
    let requestedModel;
    const replaceSafe = params.includes("-replace");

    if (!incoming.hasOwnProperty("modelName") || !incoming.hasOwnProperty("action")) {
        return "Missing an essential parameter";
    }
    if (!incoming.hasOwnProperty("query") && !incoming.hasOwnProperty("data")) {
        incoming.query = {};
        incoming.action = "fetch";
    }
    

    if (client === null) {
        client = mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    try {
        requestedModel = require(`./models/${incoming.modelName}`);
    } catch {
        return "Model not found";
    }

    const action = incoming.action;

    if (action === "fetch") {
        const model = requestedModel;
        const result = await model.find(incoming.query)

        if (result !== null) {
            return result;
        } 

        return "No results found";
    }

    if (action === "create") {
        const model = requestedModel;
        const result = model.findOneAndUpdate(incoming.query, incoming.data, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
        })

        if (result !== null) {
            return result;
        }

        return "No results found";
    }
}