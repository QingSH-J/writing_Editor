// src/app/components/cherry-background.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';

interface CherryBlossomData {
  id: string;
  left: string;
  fontSize: string;
  animationDelay: string;
  animationType: number;
}

const CherryBackground: React.FC = () => {
  const [cherryBlossoms, setCherryBlossoms] = useState<CherryBlossomData[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    const createCherryBlossom = () => {
      counterRef.current += 1;
      const newBlossom: CherryBlossomData = {
        id: `cherry-${Date.now()}-${counterRef.current}-${Math.random().toString(36).substr(2, 9)}`,
        left: `${Math.random() * 100}%`,
        fontSize: `${12 + Math.random() * 8}px`,
        animationDelay: `${Math.random() * 2}s`,
        animationType: Math.floor(Math.random() * 3),
      };
      setCherryBlossoms(prev => [...prev, newBlossom]);
    };

    const interval = setInterval(createCherryBlossom, 3000);
    const cleanup = setInterval(() => {
      setCherryBlossoms(prev => prev.slice(-8));
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(cleanup);
    };
  }, []);

  return (
    <>
      {/* 背景渐变 */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #fdf2f8 0%, #ffffff 50%, #faf5ff 100%)',
          zIndex: -999,
          pointerEvents: 'none'
        }}
      />

      {/* 樱花飘落 - 使用内联样式避免全局样式污染 */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -998,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
      >
        {cherryBlossoms.map(blossom => {
          // 内联定义动画样式
          const getKeyframes = (type: number) => {
            switch(type) {
              case 0:
                return `
                  @keyframes cherryFall0-${blossom.id} {
                    0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(calc(100vh + 100px)) rotate(360deg); opacity: 0; }
                  }
                `;
              case 1:
                return `
                  @keyframes cherryFall1-${blossom.id} {
                    0% { transform: translateY(-100px) rotate(0deg) translateX(0); opacity: 1; }
                    25% { transform: translateY(25vh) rotate(90deg) translateX(30px); opacity: 0.8; }
                    50% { transform: translateY(50vh) rotate(180deg) translateX(-30px); opacity: 0.6; }
                    75% { transform: translateY(75vh) rotate(270deg) translateX(20px); opacity: 0.4; }
                    100% { transform: translateY(calc(100vh + 100px)) rotate(360deg) translateX(0); opacity: 0; }
                  }
                `;
              case 2:
                return `
                  @keyframes cherryFall2-${blossom.id} {
                    0% { transform: translateY(-100px) rotate(0deg) scale(1); opacity: 1; }
                    30% { transform: translateY(30vh) rotate(108deg) scale(0.9) translateX(-25px); opacity: 0.8; }
                    60% { transform: translateY(60vh) rotate(216deg) scale(0.8) translateX(25px); opacity: 0.5; }
                    100% { transform: translateY(calc(100vh + 100px)) rotate(360deg) scale(0.6); opacity: 0; }
                  }
                `;
              default:
                return '';
            }
          };

          return (
            <React.Fragment key={blossom.id}>
              <style>
                {getKeyframes(blossom.animationType)}
              </style>
              <div
                style={{
                  position: 'absolute',
                  left: blossom.left,
                  top: '-50px',
                  fontSize: blossom.fontSize,
                  color: '#f9a8d4',
                  opacity: 0.5,
                  animationDelay: blossom.animationDelay,
                  animationDuration: `${8 + Math.random() * 4}s`,
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                  animationName: `cherryFall${blossom.animationType}-${blossom.id}`,
                  pointerEvents: 'none',
                  userSelect: 'none'
                }}
              >
                🌸
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default CherryBackground;