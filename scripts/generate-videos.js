import { execSync } from 'child_process';
import fs from 'fs';

// Configuration for realistic ASL gesture animation videos
// Uses exact frame variable 'on' in FFmpeg zoompan (30 fps)
// Short, punchy, physically accurate hand movements with seamless looping
const gestures = [
  {
    id: 'hello',
    title: 'HELLO',
    img: 'src/assets/images/asl_hello_gesture_1789126726923.jpg',
    duration: 1.8,
    frames: 54,
    // Temple-to-salute outward arc:
    // Hand at temple smoothly sweeps outward to the right in a confident salute/wave, pauses, and returns
    filter: [
      "scale=640:480:force_original_aspect_ratio=increase",
      "crop=640:480",
      "zoompan=z='1.05+0.05*(1-cos(2*PI*on/54))/2':x='iw/2-(iw/zoom/2)+26*(1-cos(2*PI*on/54))/2':y='ih/2-(ih/zoom/2)-10*sin(2*PI*on/54)':d=54:s=640x480:fps=30"
    ].join(',')
  },
  {
    id: 'thank_you',
    title: 'THANK YOU',
    img: 'src/assets/images/asl_thank_you_1789126742990.jpg',
    duration: 1.8,
    frames: 54,
    // Chin outward sweep toward camera:
    // Hand touches chin, moves forward toward camera (zoom + downward translate) and returns
    filter: [
      "scale=640:480:force_original_aspect_ratio=increase",
      "crop=640:480",
      "zoompan=z='1.03+0.09*(1-cos(2*PI*on/54))/2':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)+24*(1-cos(2*PI*on/54))/2':d=54:s=640x480:fps=30"
    ].join(',')
  },
  {
    id: 'help',
    title: 'HELP',
    img: 'src/assets/images/asl_help_gesture_1789126757505.jpg',
    duration: 2.2,
    frames: 66,
    // Two-handed supportive lift:
    // Fist resting on base palm lifts upward 30px, pauses at peak, and lowers smoothly
    filter: [
      "scale=640:480:force_original_aspect_ratio=increase",
      "crop=640:480",
      "zoompan=z='1.06':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)-30*(1-cos(2*PI*on/66))/2':d=66:s=640x480:fps=30"
    ].join(',')
  },
  {
    id: 'yes',
    title: 'YES',
    img: 'src/assets/images/asl_yes_gesture_1789126771568.jpg',
    duration: 1.6,
    frames: 48,
    // Fist nodding twice from the wrist:
    // 2 distinct full nods (24 frames each)
    filter: [
      "scale=640:480:force_original_aspect_ratio=increase",
      "crop=640:480",
      "zoompan=z='1.05+0.04*abs(sin(2*PI*on/24))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)+22*sin(2*PI*on/24)':d=48:s=640x480:fps=30"
    ].join(',')
  },
  {
    id: 'no',
    title: 'NO',
    img: 'src/assets/images/asl_no_gesture_1789126788397.jpg',
    duration: 1.4,
    frames: 42,
    // Snapping fingers closed twice against thumb:
    // 2 crisp, snappy beak clamping motions (21 frames each)
    filter: [
      "scale=640:480:force_original_aspect_ratio=increase",
      "crop=640:480",
      "zoompan=z='1.04+0.08*pow(abs(sin(2*PI*on/21)),0.6)':x='iw/2-(iw/zoom/2)+14*sin(2*PI*on/21)':y='ih/2-(ih/zoom/2)+18*pow(abs(sin(2*PI*on/21)),0.6)':d=42:s=640x480:fps=30"
    ].join(',')
  }
];

if (!fs.existsSync('public/videos')) {
  fs.mkdirSync('public/videos', { recursive: true });
}

console.log('Generating compact, realistic ASL gesture demonstration videos...');

for (const g of gestures) {
  const mp4Out = `public/videos/asl_${g.id}_demo.mp4`;
  console.log(`Rendering ${g.title} (${g.duration}s, ${g.frames} frames)...`);
  
  // High compression efficiency with H.264 CRF 26 and constrained maxrate
  const cmd = `ffmpeg -y -loop 1 -i "${g.img}" -vf "${g.filter}" -c:v libx264 -preset medium -crf 26 -maxrate 450k -bufsize 900k -t ${g.duration} -pix_fmt yuv420p -movflags +faststart -r 30 "${mp4Out}"`;
  
  execSync(cmd, { stdio: 'pipe' });
  const stats = fs.statSync(mp4Out);
  console.log(`✓ ${g.title} generated: ${mp4Out} (${Math.round(stats.size / 1024)} KB)`);
}

// Copy hello demo to root public as fallback
if (fs.existsSync('public/videos/asl_hello_demo.mp4')) {
  fs.copyFileSync('public/videos/asl_hello_demo.mp4', 'public/asl_hello_demo.mp4');
}

console.log('All gesture demonstration videos successfully generated and optimized!');
