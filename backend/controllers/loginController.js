import fetch from "node-fetch";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "http://127.0.0.1:4000/callback";
const FRONTEND_URI = "http://127.0.0.1:5173";
const SCOPES = [
    "user-read-private",
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
];

export const login = (req, res) => {
    const params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPES.join(" "),
    redirect_uri: REDIRECT_URI,
    show_dialog: true,
    });

    res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
};

export const callback = async (req, res) => {
    const code = req.query.code;

    if (!code) {
    return res.redirect(`${FRONTEND_URI}/?error=no_code`);
    }

    const authOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
        "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
    },
    body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        }),
    };

    try {
    const response = await fetch("https://accounts.spotify.com/api/token", authOptions);
    const data = await response.json();

    if (data.access_token) {
        res.redirect(`${FRONTEND_URI}/?access_token=${data.access_token}`);
    } else {
        res.redirect(`${FRONTEND_URI}/?error=token_failed`);
    }
    } catch (err) {
    console.error(err);
    res.redirect(`${FRONTEND_URI}/?error=server_error`);
    }
};
