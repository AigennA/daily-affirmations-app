const sharp = require('sharp');
const path = require('path');

const OUT = path.join(__dirname, '..', 'assets', 'images');

// Colors
const BG = '#0A0A0F';
const GOLD = '#D4AF37';
const GOLD_LIGHT = '#F0D060';
const PURPLE = '#8B5CF6';

function mainIconSvg(size) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.28;
  const rayLen = size * 0.14;
  const rayStart = r + size * 0.04;
  const starR = size * 0.06;

  // 12 rays around the sun
  let rays = '';
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30) * Math.PI / 180;
    const x1 = cx + Math.cos(angle) * rayStart;
    const y1 = cy + Math.sin(angle) * rayStart;
    const x2 = cx + Math.cos(angle) * (rayStart + rayLen);
    const y2 = cy + Math.sin(angle) * (rayStart + rayLen);
    const width = i % 2 === 0 ? size * 0.025 : size * 0.015;
    rays += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${GOLD_LIGHT}" stroke-width="${width}" stroke-linecap="round" opacity="${i % 2 === 0 ? 0.9 : 0.5}"/>`;
  }

  // Small sparkle stars
  function sparkle(sx, sy, sr) {
    return `
      <line x1="${sx}" y1="${sy - sr}" x2="${sx}" y2="${sy + sr}" stroke="${GOLD_LIGHT}" stroke-width="${sr * 0.3}" stroke-linecap="round" opacity="0.7"/>
      <line x1="${sx - sr}" y1="${sy}" x2="${sx + sr}" y2="${sy}" stroke="${GOLD_LIGHT}" stroke-width="${sr * 0.3}" stroke-linecap="round" opacity="0.7"/>
    `;
  }

  return `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="${PURPLE}" stop-opacity="0.15"/>
          <stop offset="50%" stop-color="${GOLD}" stop-opacity="0.06"/>
          <stop offset="100%" stop-color="${BG}" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="sunGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stop-color="${GOLD_LIGHT}"/>
          <stop offset="100%" stop-color="${GOLD}"/>
        </radialGradient>
        <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${GOLD_LIGHT}" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- Background -->
      <rect width="${size}" height="${size}" fill="${BG}" rx="${size * 0.18}"/>

      <!-- Subtle background glow -->
      <circle cx="${cx}" cy="${cy}" r="${size * 0.45}" fill="url(#bgGlow)"/>

      <!-- Outer glow ring -->
      <circle cx="${cx}" cy="${cy}" r="${r + size * 0.02}" fill="none" stroke="${GOLD}" stroke-width="${size * 0.005}" opacity="0.25"/>

      <!-- Rays -->
      ${rays}

      <!-- Main sun circle -->
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#sunGrad)"/>

      <!-- Inner highlight -->
      <circle cx="${cx - r * 0.15}" cy="${cy - r * 0.15}" r="${r * 0.7}" fill="url(#innerGlow)"/>

      <!-- Lotus/heart shape inside sun -->
      <g transform="translate(${cx}, ${cy + r * 0.05}) scale(${r * 0.012})">
        <!-- Simplified lotus petals -->
        <path d="M0,-28 C-8,-20 -14,-8 0,5 C14,-8 8,-20 0,-28Z" fill="${BG}" opacity="0.6"/>
        <path d="M-18,-15 C-16,-8 -10,2 0,5 C-6,-4 -12,-10 -18,-15Z" fill="${BG}" opacity="0.4"/>
        <path d="M18,-15 C16,-8 10,2 0,5 C6,-4 12,-10 18,-15Z" fill="${BG}" opacity="0.4"/>
      </g>

      <!-- Sparkle stars -->
      ${sparkle(cx + size * 0.3, cy - size * 0.28, starR)}
      ${sparkle(cx - size * 0.32, cy + size * 0.25, starR * 0.7)}
      ${sparkle(cx + size * 0.22, cy + size * 0.32, starR * 0.5)}
    </svg>
  `;
}

function foregroundSvg(size) {
  // Just the sun + rays on transparent bg, centered in safe zone
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.18;
  const rayLen = size * 0.09;
  const rayStart = r + size * 0.025;

  let rays = '';
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30) * Math.PI / 180;
    const x1 = cx + Math.cos(angle) * rayStart;
    const y1 = cy + Math.sin(angle) * rayStart;
    const x2 = cx + Math.cos(angle) * (rayStart + rayLen);
    const y2 = cy + Math.sin(angle) * (rayStart + rayLen);
    const width = i % 2 === 0 ? size * 0.02 : size * 0.012;
    rays += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${GOLD_LIGHT}" stroke-width="${width}" stroke-linecap="round" opacity="${i % 2 === 0 ? 0.95 : 0.55}"/>`;
  }

  return `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sunG" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stop-color="${GOLD_LIGHT}"/>
          <stop offset="100%" stop-color="${GOLD}"/>
        </radialGradient>
      </defs>
      ${rays}
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#sunG)"/>
      <g transform="translate(${cx}, ${cy + r * 0.05}) scale(${r * 0.012})">
        <path d="M0,-28 C-8,-20 -14,-8 0,5 C14,-8 8,-20 0,-28Z" fill="${BG}" opacity="0.6"/>
        <path d="M-18,-15 C-16,-8 -10,2 0,5 C-6,-4 -12,-10 -18,-15Z" fill="${BG}" opacity="0.4"/>
        <path d="M18,-15 C16,-8 10,2 0,5 C6,-4 12,-10 18,-15Z" fill="${BG}" opacity="0.4"/>
      </g>
    </svg>
  `;
}

function backgroundSvg(size) {
  return `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgG" cx="50%" cy="45%" r="70%">
          <stop offset="0%" stop-color="#151520"/>
          <stop offset="100%" stop-color="${BG}"/>
        </radialGradient>
      </defs>
      <rect width="${size}" height="${size}" fill="url(#bgG)"/>
      <circle cx="${size * 0.3}" cy="${size * 0.25}" r="${size * 0.35}" fill="${PURPLE}" opacity="0.04"/>
      <circle cx="${size * 0.7}" cy="${size * 0.75}" r="${size * 0.3}" fill="${GOLD}" opacity="0.03"/>
    </svg>
  `;
}

function monochromeSvg(size) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.18;
  const rayLen = size * 0.09;
  const rayStart = r + size * 0.025;

  let rays = '';
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30) * Math.PI / 180;
    const x1 = cx + Math.cos(angle) * rayStart;
    const y1 = cy + Math.sin(angle) * rayStart;
    const x2 = cx + Math.cos(angle) * (rayStart + rayLen);
    const y2 = cy + Math.sin(angle) * (rayStart + rayLen);
    const width = i % 2 === 0 ? size * 0.02 : size * 0.012;
    rays += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="white" stroke-width="${width}" stroke-linecap="round" opacity="${i % 2 === 0 ? 1 : 0.6}"/>`;
  }

  return `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      ${rays}
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="white"/>
      <g transform="translate(${cx}, ${cy + r * 0.05}) scale(${r * 0.012})">
        <path d="M0,-28 C-8,-20 -14,-8 0,5 C14,-8 8,-20 0,-28Z" fill="black" opacity="0.6"/>
        <path d="M-18,-15 C-16,-8 -10,2 0,5 C-6,-4 -12,-10 -18,-15Z" fill="black" opacity="0.4"/>
        <path d="M18,-15 C16,-8 10,2 0,5 C6,-4 12,-10 18,-15Z" fill="black" opacity="0.4"/>
      </g>
    </svg>
  `;
}

function splashSvg(size) {
  // Larger, more prominent version for splash
  return mainIconSvg(size);
}

async function generate() {
  console.log('Generating icons...');

  // Main icon 1024x1024
  await sharp(Buffer.from(mainIconSvg(1024)))
    .resize(1024, 1024)
    .png()
    .toFile(path.join(OUT, 'icon.png'));
  console.log('  icon.png (1024x1024)');

  // Android adaptive icon foreground 432x432
  await sharp(Buffer.from(foregroundSvg(432)))
    .resize(432, 432)
    .png()
    .toFile(path.join(OUT, 'android-icon-foreground.png'));
  console.log('  android-icon-foreground.png (432x432)');

  // Android adaptive icon background 432x432
  await sharp(Buffer.from(backgroundSvg(432)))
    .resize(432, 432)
    .png()
    .toFile(path.join(OUT, 'android-icon-background.png'));
  console.log('  android-icon-background.png (432x432)');

  // Android monochrome 432x432
  await sharp(Buffer.from(monochromeSvg(432)))
    .resize(432, 432)
    .png()
    .toFile(path.join(OUT, 'android-icon-monochrome.png'));
  console.log('  android-icon-monochrome.png (432x432)');

  // Splash icon 288x288
  await sharp(Buffer.from(splashSvg(288)))
    .resize(288, 288)
    .png()
    .toFile(path.join(OUT, 'splash-icon.png'));
  console.log('  splash-icon.png (288x288)');

  // Favicon 48x48
  await sharp(Buffer.from(mainIconSvg(256)))
    .resize(48, 48)
    .png()
    .toFile(path.join(OUT, 'favicon.png'));
  console.log('  favicon.png (48x48)');

  console.log('Done!');
}

generate().catch(console.error);
