import React from 'react';
import styled from 'styled-components';

const ImageWrapper = styled.div`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 'auto'};
`;

const OptimizedImage = ({ src, alt, width, height, className }) => {
  // WebP 경로 생성 - 대소문자 구분 없이 확장자 처리
  const webpSrc = src.replace('/img/', '/img-optimized/').replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, '.webp');
  
  return (
    <ImageWrapper width={width} height={height} className={className}>
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </picture>
    </ImageWrapper>
  );
};

export default OptimizedImage; 