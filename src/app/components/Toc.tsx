'use client'
import React from 'react';
import { Editor } from '@tiptap/core';
// 修复导入路径
import { TextSelection } from '@tiptap/pm/state';

// 目录项接口
interface ToCItem {
  id: string;
  textContent: string;
  level: number;
  isActive?: boolean;
  isScrolledOver?: boolean;
  pos: number;
}

interface ToCItemProps {
  item: ToCItem;
  onItemClick: (pos: number) => void;
}

// 单个目录项组件
export const ToCItemComponent = ({ item, onItemClick }: ToCItemProps) => {
  const handleClick = () => {
    onItemClick(item.pos);
  };

  return (
    <div 
      className={`
        toc-item cursor-pointer px-3 py-2 rounded-md transition-all duration-200 hover:bg-pink-50
        ${item.isActive && !item.isScrolledOver ? 'bg-pink-100 text-pink-700 font-medium border-l-2 border-pink-500' : ''}
        ${item.isScrolledOver ? 'bg-gray-100 text-gray-600' : 'text-gray-700'}
      `}
      style={{
        paddingLeft: `${8 + (item.level - 1) * 16}px`,
        fontSize: item.level === 1 ? '16px' : item.level === 2 ? '14px' : '12px'
      }}
      onClick={handleClick}
    >
      <span className="block truncate">
        {item.textContent || `标题 ${item.level}`}
      </span>
    </div>
  );
};

// 目录容器组件
interface TableOfContentsProps {
  editor: Editor | null;
  items: ToCItem[];
}

export const TableOfContents = ({ editor, items }: TableOfContentsProps) => {
  const handleItemClick = (pos: number) => {
    if (editor) {
      // 跳转到指定位置
      editor.commands.setTextSelection(pos);
      editor.commands.scrollIntoView();
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="toc-container bg-white rounded-lg shadow-sm border p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
          </svg>
          目录
        </h3>
        <p className="text-gray-500 text-sm">暂无标题</p>
      </div>
    );
  }

  return (
    <div className="toc-container bg-white rounded-lg shadow-sm border">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
          </svg>
          目录
        </h3>
      </div>
      <div className="max-h-96 overflow-y-auto p-2">
        {items.map((item, index) => (
          <ToCItemComponent
            key={`${item.id}-${index}`}
            item={item}
            onItemClick={handleItemClick}
          />
        ))}
      </div>
    </div>
  );
};

export default TableOfContents;

