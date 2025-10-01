// 이미지 압축 함수
export const compressImage = (file, quality = 0.8, maxWidth = 1200, maxHeight = 1200) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // 원본 크기
      let { width, height } = img;

      // 최대 크기 제한
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;

      // 이미지 그리기
      ctx.drawImage(img, 0, 0, width, height);

      // 압축된 이미지를 Blob으로 변환
      canvas.toBlob(
        (blob) => {
          // File 객체로 변환
          const compressedFile = new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          resolve(compressedFile);
        },
        'image/jpeg',
        quality
      );
    };

    img.src = URL.createObjectURL(file);
  });
};

// 파일 크기를 읽기 쉬운 형태로 변환
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 이미지 파일인지 확인
export const isImageFile = (file) => {
  return file.type.startsWith('image/');
};

// 여러 이미지 압축 처리
export const compressMultipleImages = async (files, quality = 0.8, maxWidth = 1200, maxHeight = 1200) => {
  const compressedFiles = [];
  
  for (const file of files) {
    if (isImageFile(file)) {
      const compressed = await compressImage(file, quality, maxWidth, maxHeight);
      compressedFiles.push(compressed);
    }
  }
  
  return compressedFiles;
};









