import express from 'express';

let spotifyAccessToken = null;

export function StoreToken(req, res){
    spotifyAccessToken = req.body.accessToken;
    res.sendStatus(200);
    console.log(spotifyAccessToken);
};

export async function getData(req,res){
    if (!spotifyAccessToken) {
    return res.status(401).json({ error: "No token" });
    }

    const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
    },
    });

    const data = await response.json();
    res.json(data);
};
