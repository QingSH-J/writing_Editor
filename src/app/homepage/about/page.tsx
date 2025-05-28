'use client'
import Link from 'next/link';
import CherryBackground from '../../components/cherry-background';

export default function AboutPage() {
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
            <Link href="/homepage/features" className="px-3 py-1 rounded hover:bg-pink-100 transition-colors">
              功能
            </Link>
            <Link href="/homepage/about" className="px-3 py-1 rounded bg-pink-100 font-medium">
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
        <div className="max-w-3xl mx-auto bg-white bg-opacity-90 rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">关于樱花编辑器</h1>
          
          <div className="space-y-6 text-gray-700">
            <p>
              樱花编辑器是一个基于Tiptap和Next.js构建的现代化富文本编辑器，旨在为用户提供简洁、高效、美观的写作体验。
              我们相信，一个好的编辑器不仅要功能强大，还应该让写作变成一种享受。
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">我们的理念</h2>
            <p>
              在设计樱花编辑器时，我们秉持以下理念：
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>简洁至上</strong> - 去除不必要的干扰，让用户专注于内容创作</li>
              <li><strong>美学设计</strong> - 精心设计的界面和动画，为写作增添愉悦感</li>
              <li><strong>功能强大</strong> - 提供丰富的编辑功能，满足各种写作需求</li>
              <li><strong>用户友好</strong> - 直观的操作方式，降低学习成本</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">技术栈</h2>
            <p>
              樱花编辑器采用现代化的技术栈构建：
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Next.js</strong> - React框架，提供服务端渲染和静态生成能力</li>
              <li><strong>Tiptap</strong> - 基于ProseMirror的可扩展富文本编辑器框架</li>
              <li><strong>Tailwind CSS</strong> - 实用优先的CSS框架，用于快速构建自定义界面</li>
              <li><strong>TypeScript</strong> - 为JavaScript添加静态类型定义，提高代码质量和开发效率</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">未来计划</h2>
            <p>
              我们计划在未来添加更多功能，包括但不限于：
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>AI写作助手 - 提供智能写作建议和内容生成</li>
              <li>协作编辑 - 支持多人实时协作</li>
              <li>更多格式化选项 - 表格、代码块、数学公式等</li>
              <li>主题定制 - 允许用户自定义编辑器外观</li>
              <li>移动端优化 - 提供更好的移动设备使用体验</li>
            </ul>
            
            <div className="text-center mt-10">
              <Link 
                href="/homepage/editor" 
                className="inline-block px-6 py-3 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600 transition-colors shadow-md"
              >
                开始使用
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
