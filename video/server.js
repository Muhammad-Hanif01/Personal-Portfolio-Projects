const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.use(express.json());

// 1. Video Info Route
app.post('/api/fetch-video', (req, res) => {
    const { url } = req.body;
    // yt-dlp se title aur thumbnail mangwana
    exec(`yt-dlp --get-title --get-thumbnail ${url}`, (error, stdout, stderr) => {
        if (error) return res.status(400).json({ success: false });
        
        const output = stdout.split('\n');
        res.json({
            success: true,
            title: output[0],
            thumbnail: output[1],
            url: url
        });
    });
});

// 2. Real Download Route (Aapki apni website se download)
app.get('/download-now', (req, res) => {
    const videoURL = req.query.url;
    
    // Header taaki browser file save kare
    res.header('Content-Disposition', 'attachment; filename="video.mp4"');

    // yt-dlp ko command dena ke video ko download karke seedha stdout (browser) mein bheje
    const downloader = exec(`yt-dlp --buffer-size 16K -o - "${videoURL}"`);
    
    // Video data ko stream karna
    downloader.stdout.pipe(res);

    downloader.on('error', (err) => {
        console.error(err);
        res.status(500).send("Error downloading video");
    });
});

app.listen(3000, () => console.log('Server: http://localhost:3000'));