const fs = require('fs');
const path = require('path');
const srcDir = 'C:/Users/MSI THIN/.gemini/antigravity-ide/brain/7b3ef2fc-c5c8-4704-b81e-655daa491afe';
const destDir = 'C:/Users/MSI THIN/OneDrive/Masaüstü/pdks test/src/frontend/src/assets/features';

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, {recursive: true});

const files = fs.readdirSync(srcDir);
files.forEach(f => {
  if(f.startsWith('real_') && f.endsWith('.jpg')) {
    const baseName = f.replace(/_\d+\.jpg$/, '.jpg');
    fs.copyFileSync(path.join(srcDir, f), path.join(destDir, baseName));
    console.log('Copied ' + baseName);
  }
});

const dataFile = 'C:/Users/MSI THIN/OneDrive/Masaüstü/pdks test/src/frontend/src/app/core/data/features.data.ts';
let content = fs.readFileSync(dataFile, 'utf8');

const categoryToImage = {
  'giris-cikis-yontemleri': 'assets/features/real_access_control.jpg',
  'puantaj-takip': 'assets/features/real_time_tracking.jpg',
  'personel-yonetimi': 'assets/features/real_hr_management.jpg',
  'raporlar-ve-analiz': 'assets/features/real_data_analytics.jpg',
  'sistem-ve-ayarlar': 'assets/features/real_system_settings.jpg',
  'genel': 'assets/features/real_general_features.jpg'
};

const lines = content.split('\n');
let newLines = [];
let currentCategory = null;

for (let i = 0; i < lines.length; i++) {
  newLines.push(lines[i]);
  const catMatch = lines[i].match(/category:\s*'([^']+)'/);
  if (catMatch) {
    currentCategory = catMatch[1];
  }
  
  if (lines[i].includes('tags:') && currentCategory) {
    if (!lines[i+1] || !lines[i+1].includes('imageUrl:')) {
      const imgPath = categoryToImage[currentCategory] || categoryToImage['genel'];
      newLines.push('    imageUrl: \'' + imgPath + '\',');
    }
  }
}

fs.writeFileSync(dataFile, newLines.join('\n'));
console.log('Updated features.data.ts');
