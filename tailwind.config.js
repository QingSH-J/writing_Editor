module.exports = {
    theme: {
      extend: {
        keyframes: {
          'fall-straight': {
            '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
            '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' }
          },
          // ... 其他动画
        },
        animation: {
          'fall-straight': 'fall-straight linear infinite',
          'fall-wave': 'fall-wave ease-in-out infinite',
          'fall-spiral': 'fall-spiral ease-in-out infinite',
        }
      }
    }
  }