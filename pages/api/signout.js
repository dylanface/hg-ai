var cookie = require('cookie');

export default function handler(req, res) {
    res.setHeader('Set-Cookie', cookie.serialize('user', '', {
        expires: new Date(),
        httpOnly: true,
        path: '/',
    })).setHeader('Set-Cookie', cookie.serialize('userid', '', {
        expires: new Date(),
        httpOnly: true,
        path: '/',
    })).setHeader('Location', '/').status(302).end();
  }
  