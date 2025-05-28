'use client'
import Link from 'next/link';
import CherryBackground from '../../components/cherry-background';
import Image from 'next/image';

export default function FeaturesPage() {
  const features = [
    {
      title: '富文本编辑',
      description: '支持粗体、斜体、下划线、删除线等多种文本格式化选项，让您的文档更加丰富多彩。',
      icon: '📝'
    },
    {
      title: '段落样式',
      description: '提供标题、正文、引用等多种段落样式，轻松创建结构清晰的文档。',
      icon: '📄'
    },
    {
      title: '文本对齐',
      description: '支持左对齐、居中、右对齐和两端对齐，满足不同的排版需求。',
      icon: '⬅️'
    },
    {
      title: '字体选择',
      description: '提供多种字体选择，让您的文档更具个性和专业感。',
      icon: '🔤'
    },
    {
      title: '字号调整',
      description: '灵活调整字号大小，突出重点内容，提高文档可读性。',
      icon: '🔍'
    },
    {
      title: '列表功能',
      description: '支持有序列表和无序列表，帮助您组织和呈现信息。',
      icon: '📋'
    },
    {
      title: '美丽界面',
      description: '精心设计的用户界面，搭配樱花飘落动画，为您提供愉悦的写作体验。',
      icon: '🌸'
    },
    {
      title: '即将推出',
      description: '更多功能正在开发中，包括AI写作助手、图片插入、表格支持等，敬请期待！',
      icon: '🚀'
    }
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* 樱花背景 */}
      <CherryBackground />
      
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 shadow-md z-50 px-4 py-2">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/homepage" className="text-xl font-bold text-pink-500 hover:text-pink-600 transition-colors">
            樱花编辑器
          </Link>
          <div className="flex gap-4">
            <Link href="/homepage/features" className="px-3 py-1 rounded bg-pink-100 font-medium">
              功能
            </Link>
            <Link href="/homepage/about" className="px-3 py-1 rounded hover:bg-pink-100 transition-colors">
              关于
            </Link>
            <Link href="/homepage/editor" className="px-3 py-1 rounded hover:bg-pink-100 transition-colors">
              进入编辑器
            </Link>
          </div>
        </div>
      </nav>
      
      {/* 内容区域 */}
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">
            樱花编辑器功能
          </h1>
          <p className="text-center text-gray-600 mb-12">
            探索我们精心打造的功能，让您的写作更加高效和愉悦
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white bg-opacity-90 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start">
                  <div className="text-3xl mr-4">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/homepage/editor" 
              className="inline-block px-6 py-3 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600 transition-colors shadow-md"
            >
              立即体验
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
