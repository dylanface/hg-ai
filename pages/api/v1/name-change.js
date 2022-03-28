import clientPromise from "/database/init"
import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react"


export default async function handler(req, res) {
    let operation;
    
    const session = await getSession({ req })
    if (!session) return res.status(403).send("Unauthorized")

    const prefName = {
        first: req.body["first-name"],
        last: req.body["last-name"]
    }

    await clientPromise.then(async (client) => {
        const db = client.db()
        const users = db.collection("users")

        operation = await users.updateOne({ _id: ObjectId(session.user.id) }, { $set: { prefName: prefName } })
    });

    return res.redirect('/settings', 200)
}