import { keyframes } from '@emotion/react';

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  } 
  100% {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  0% {
    opacity: 1;
  } 
  100% {
    opacity: 0;
  }
`;

export const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const slideDown = keyframes`
  0% {
    transform: translateY(0%);
  } 
  100% {
    transform: translateY(100%);
  }
`;

export const slideUp = keyframes`
  0% {
    transform: translateY(100%);
  }  
  100% {
    transform: translateY(0%);
  }
`;
