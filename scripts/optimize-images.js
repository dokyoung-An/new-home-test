const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'public/img';
const outputDir = 'public/img-optimized';

// 디렉토리 생성 함수
function ensureDirectoryExistence(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 이미지 최적화 함수
async function optimizeImage(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // WebP로 변환 및 최적화
    await image
      .webp({ quality: 80 })
      .toFile(outputPath);
    
    console.log(`Optimized: ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
  }
}

// 디렉토리 순회 함수
async function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const inputPath = path.join(dirPath, item);
    const relativePath = path.relative(inputDir, dirPath);
    const outputPath = path.join(outputDir, relativePath, item);
    
    if (fs.statSync(inputPath).isDirectory()) {
      ensureDirectoryExistence(path.join(outputDir, relativePath, item));
      await processDirectory(inputPath);
    } else {
      // 이미지 파일만 처리
      const ext = path.extname(item).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const webpPath = outputPath.replace(/\.[^.]+$/, '.webp');
        ensureDirectoryExistence(path.dirname(webpPath));
        await optimizeImage(inputPath, webpPath);
      }
    }
  }
}

// 메인 실행
ensureDirectoryExistence(outputDir);
processDirectory(inputDir).then(() => {
  console.log('Image optimization completed!');
}); 