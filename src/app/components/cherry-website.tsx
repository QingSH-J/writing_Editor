'use client'
import React, { useState, useEffect } from 'react';

interface CherryBlossomStyle {
  left: string;
  fontSize: string;
  animationDelay: string;
  animationDuration: string;
}

interface CherryBlossomProps {
  id: number | string;
  style: CherryBlossomStyle;
  animationType: number;
}

interface CherryWebsiteProps {
  onStartEditing: () => void;
}

interface CherryBlossomData {
  id: number;
  animationType: number;
  style: CherryBlossomStyle;
}

const CherryBlossom: React.FC<CherryBlossomProps> = ({ id, style, animationType }) => {
  // 使用内联样式确保动画工作
  const getAnimationStyle = (type: number) => {
    const animations = {
      0: 'fall-straight 8s linear infinite',
      1: 'fall-wave 10s ease-in-out infinite', 
      2: 'fall-spiral 12s ease-in-out infinite'
    };
    return animations[type as keyof typeof animations] || animations[0];
  };

  return (
    <>
      <style jsx>{`
        @keyframes fall-straight {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes fall-wave {
          0% {
            transform: translateY(-100vh) rotate(0deg) translateX(0);
            opacity: 1;
          }
          25% {
            transform: translateY(25vh) rotate(90deg) translateX(20px);
            opacity: 0.9;
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(-20px);
            opacity: 0.8;
          }
          75% {
            transform: translateY(75vh) rotate(270deg) translateX(20px);
            opacity: 0.4;
          }
          100% {
            transform: translateY(100vh) rotate(360deg) translateX(0);
            opacity: 0;
          }
        }
        
        @keyframes fall-spiral {
          0% {
            transform: translateY(-100vh) rotate(0deg) translateX(0) scale(1);
            opacity: 1;
          }
          30% {
            transform: translateY(30vh) rotate(108deg) translateX(-30px) scale(0.9);
            opacity: 0.9;
          }
          60% {
            transform: translateY(60vh) rotate(216deg) translateX(30px) scale(0.7);
            opacity: 0.6;
          }
          90% {
            transform: translateY(90vh) rotate(324deg) translateX(-15px) scale(0.5);
            opacity: 0.3;
          }
          100% {
            transform: translateY(100vh) rotate(360deg) translateX(0) scale(0.3);
            opacity: 0;
          }
        }
      `}</style>
      <div
        key={id}
        className="absolute opacity-70 select-none pointer-events-none"
        style={{
          left: style.left,
          fontSize: style.fontSize,
          animationDelay: style.animationDelay,
          animation: getAnimationStyle(animationType),
          color: '#f9a8d4'
        }}
      >
        🌸
      </div>
    </>
  );
};

const CherryWebsite: React.FC<CherryWebsiteProps> = ({ onStartEditing }) => {
  const [cherryBlossoms, setCherryBlossoms] = useState<CherryBlossomData[]>([]);

  useEffect(() => {
    // 创建樱花
    const createCherryBlossom = (): void => {
      const animationType: number = Math.floor(Math.random() * 3);
      const newBlossom: CherryBlossomData = {
        id: Date.now() + Math.random(),
        animationType,
        style: {
          left: `${Math.random() * 100}%`,
          fontSize: `${12 + Math.random() * 8}px`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${8 + Math.random() * 4}s`,
        }
      };
      setCherryBlossoms(prev => [...prev, newBlossom]);
    };

    // 定期创建樱花
    const interval = setInterval(createCherryBlossom, 1500);

    // 清理过多的樱花
    const cleanup = setInterval(() => {
      setCherryBlossoms(prev => prev.slice(-15));
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(cleanup);
    };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #fdf2f8, #ffffff, #faf5ff)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 樱花特效 */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 10
      }}>
        {cherryBlossoms.map(blossom => (
          <CherryBlossom 
            key={blossom.id} 
            id={blossom.id} 
            style={blossom.style}
            animationType={blossom.animationType}
          />
        ))}
      </div>

      {/* 背景装饰 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: '5rem',
          left: '2.5rem',
          width: '8rem',
          height: '8rem',
          background: '#f9a8d4',
          borderRadius: '50%',
          filter: 'blur(48px)',
          animation: 'pulse 2s infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '10rem',
          right: '5rem',
          width: '6rem',
          height: '6rem',
          background: '#c084fc',
          borderRadius: '50%',
          filter: 'blur(32px)',
          animation: 'pulse 2s infinite 1s'
        }}></div>
      </div>

      {/* 导航栏 */}
      <nav style={{
        position: 'relative',
        zIndex: 20,
        backdropFilter: 'blur(8px)',
        background: 'rgba(255, 255, 255, 0.7)',
        borderBottom: '1px solid #fce7f3',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '1rem 1.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                background: 'linear-gradient(to right, #f472b6, #a855f7)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: 'white', fontSize: '1.25rem' }}>✏️</span>
              </div>
              <h1 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #db2777, #9333ea)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0
              }}>
                樱花编辑器
              </h1>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem'
            }}>
              <a href="#features" style={{
                color: '#6b7280',
                textDecoration: 'none',
                transition: 'color 0.3s'
              }} onMouseOver={(e) => e.target.style.color = '#db2777'} onMouseOut={(e) => e.target.style.color = '#6b7280'}>
                功能
              </a>
              <a href="#about" style={{
                color: '#6b7280',
                textDecoration: 'none',
                transition: 'color 0.3s'
              }} onMouseOver={(e) => e.target.style.color = '#db2777'} onMouseOut={(e) => e.target.style.color = '#6b7280'}>
                关于
              </a>
              <a href="#contact" style={{
                color: '#6b7280',
                textDecoration: 'none',
                transition: 'color 0.3s'
              }} onMouseOver={(e) => e.target.style.color = '#db2777'} onMouseOut={(e) => e.target.style.color = '#6b7280'}>
                联系
              </a>
              <button 
                onClick={onStartEditing}
                style={{
                  background: 'linear-gradient(to right, #ec4899, #9333ea)',
                  color: 'white',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
              >
                开始写作
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main style={{ position: 'relative', zIndex: 20 }}>
        {/* 英雄区域 */}
        <section style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '5rem 1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '3.75rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '1.5rem',
              lineHeight: '1.1',
              margin: '0 0 1.5rem 0'
            }}>
              让文字
              <span style={{
                background: 'linear-gradient(to right, #ec4899, #9333ea)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                绽放
              </span>
              如樱
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#6b7280',
              maxWidth: '32rem',
              margin: '0 auto',
              lineHeight: '1.75'
            }}>
              在这个充满诗意的编辑器中，每一个字符都像樱花般优雅飘落，
              让您的创作过程变成一场美丽的艺术之旅。
            </p>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '4rem',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={onStartEditing}
              style={{
                background: 'linear-gradient(to right, #ec4899, #9333ea)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '9999px',
                fontSize: '1.125rem',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
              }}
            >
              <span>✏️</span>
              <span>开始创作</span>
            </button>
            <button style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(8px)',
              color: '#374151',
              padding: '1rem 2rem',
              borderRadius: '9999px',
              fontSize: '1.125rem',
              fontWeight: '600',
              border: '1px solid #fce7f3',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
            }}>
              <span style={{ color: '#ec4899' }}>💖</span>
              <span>了解更多</span>
            </button>
          </div>

          {/* 特性卡片 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '5rem'
          }}>
            {[
              { icon: '📄', title: '富文本编辑', desc: '支持多种格式的文本编辑，包括字体、字号、对齐方式等，让您的文字表达更加丰富多彩。', gradient: 'linear-gradient(to right, #f472b6, #a855f7)' },
              { icon: '⭐', title: '代码高亮', desc: '内置多种编程语言的语法高亮，让代码编写变得更加清晰和愉悦。', gradient: 'linear-gradient(to right, #60a5fa, #06b6d4)' },
              { icon: '💖', title: '优雅体验', desc: '精心设计的界面和交互，配合樱花飘落的动效，为您带来前所未有的写作体验。', gradient: 'linear-gradient(to right, #34d399, #10b981)' }
            ].map((feature, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(8px)',
                borderRadius: '1rem',
                padding: '2rem',
                border: '1px solid #fce7f3',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  background: feature.gradient,
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto'
                }}>
                  <span style={{ fontSize: '2rem' }}>{feature.icon}</span>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '0.75rem',
                  margin: '0 0 0.75rem 0'
                }}>{feature.title}</h3>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 底部 */}
        <footer style={{
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(8px)',
          borderTop: '1px solid #fce7f3',
          padding: '3rem 0'
        }}>
          <div style={{
            maxWidth: '72rem',
            margin: '0 auto',
            padding: '0 1.5rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                {['📱', '🐦', '💖'].map((icon, index) => (
                  <a key={index} href="#" style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    fontSize: '1.5rem',
                    transition: 'color 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#db2777'}
                  onMouseOut={(e) => e.target.style.color = '#6b7280'}>
                    {icon}
                  </a>
                ))}
              </div>
              <p style={{
                color: '#6b7280',
                margin: 0
              }}>
                © 2025 樱花编辑器. 让文字如花般绽放 🌸
              </p>
            </div>
          </div>
        </footer>
      </main>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default CherryWebsite;