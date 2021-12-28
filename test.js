let ffmpeg = require('fluent-ffmpeg');

ffmpeg.ffprobe('http://localhost:8010/proxy/quran/audio/128/ar.alafasy/138.mp3', function (err, metadata) {
    if (err) console.log(err);
    console.log(metadata);
})