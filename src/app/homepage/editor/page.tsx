'use client'
import Tiptap from '../../components/tiptap';
import CherryBackground from '../../components/cherry-background';
import Link from 'next/link';

export default function EditorPage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* 樱花背景 - 完全在后台，不影响编辑器 */}
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
            <Link href="/homepage/about" className="px-3 py-1 rounded hover:bg-pink-100 transition-colors">
              关于
            </Link>
            <Link href="/homepage" className="px-3 py-1 rounded hover:bg-pink-100 transition-colors">
              返回首页
            </Link>
          </div>
        </div>
      </nav>
      
      {/* 编辑器内容，添加顶部边距以避免被导航栏遮挡 */}
      <div style={{ position: 'relative', zIndex: 10, paddingTop: '60px' }}>
        <Tiptap />
      </div>
    </div>
  );
}
