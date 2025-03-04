


// 🔥 Allow requests from any domain (for testing)
app.use(cors());

// OR allow only your frontend URL
app.use(cors({
    origin: "https://panowar.github.io/my-video-site/public/index.html", // 🔥 Replace with your actual frontend URL
    methods: "GET,POST"
}));

app.get("/get-video", (req, res) => {
    res.json({ videoUrl: "https://your-storage.com/video.mp4" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const express = require('express');
const cors = require("cors");
const app = express();
const fs = require('fs');
const path = require('path');

// 🔥 Allow requests from any domain (for testing)
app.use(cors());

// OR allow only your frontend URL
app.use(cors({
    origin: "https://panowar.github.io/my-video-site/public/index.html", // 🔥 Replace with your actual frontend URL
    methods: "GET,POST"
}));

const videos = [
    "public/videos/video1.mp4",
    "public/videos/video2.mp4",
    "public/videos/video3.mp4"
];

let ipHistory = {}; // Store which IP got which video

app.use(express.static('public')); // Serve frontend files

app.get('/get-video', (req, res) => {
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    if (!ipHistory[ip]) {
        ipHistory[ip] = videos.shift(); // Assign the next video in the list
    }

    const videoPath = ipHistory[ip];

    if (!videoPath) {
        return res.json({ message: "No more videos available" });
    }

    res.json({ videoUrl: `/${videoPath}` });
});

// Start the server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
