const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();
var cookie = require('cookie');

const clientId = process.env.GOOGLE_AUTH_CLIENT_ID;

export default async function handler(req, res) {

    const client = new OAuth2Client(clientId);
    const token = req.body.credential;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: clientId,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    const payload = ticket.getPayload();
    return JSON.stringify(payload);
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    }

    await verify()
    .then((user) => {
        console.log(user)
        res.setHeader('Set-Cookie', cookie.serialize('user', String(user), {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            path: '/',
        })).setHeader('Location', '/').status(302).end();
    })
    .catch(console.error);
}
  