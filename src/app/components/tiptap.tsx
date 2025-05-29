'use client'
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Editor } from '@tiptap/core';
import { TextStyle } from '@tiptap/extension-text-style';
import { FontFamily } from '@tiptap/extension-font-family';
import { FontSize } from '@tiptap/extension-font-size';
import Image from 'next/image';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { TextAlign } from '@tiptap/extension-text-align';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history';
import TableOfContents from './Toc';
import CharacterCount from '@tiptap/extension-character-count';
import { ExportDocx } from '@tiptap-pro/extension-export-docx'
import Stream from 'node:stream';

// 定义目录项接口
interface ToCItem {
  id: string;
  textContent: string;
  level: number;
  isActive?: boolean;
  isScrolledOver?: boolean;
  pos: number;
}

//generate a menu bar with buttons for bold, italic, underline, strikethrough, code, blockquote, bullet list, ordered list, and link
const availableFonts = [
    { name: 'Arial', value: 'Arial, sans-serif' },
    { name: 'Courier New', value: '"Courier New", monospace' },
    { name: 'Georgia', value: 'Georgia, serif' },
    { name: 'Times New Roman', value: '"Times New Roman", serif' },
    { name: 'Trebuchet MS', value: '"Trebuchet MS", sans-serif' },
    { name: 'Verdana', value: 'Verdana, sans-serif' },
    { name: '宋体', value: '"宋体", sans-serif' },
    { name: '微软雅黑', value: '"微软雅黑", sans-serif' },
    { name: '黑体', value: '"黑体", sans-serif' },
    { name: '仿宋', value: '"仿宋", serif' },
    { name: '楷体', value: '"楷体", serif' },
    { name: 'Arial Black', value: '"Arial Black", sans-serif' },
    { name: 'Comic Sans MS', value: '"Comic Sans MS", cursive, sans-serif' },
    { name: 'Impact', value: 'Impact, Charcoal, sans-serif' },
    { name: '等线', value: '"等线", sans-serif' },
    { name: '华文细黑', value: '"华文细黑", sans-serif' },
]
const availableFontSizes = [
    { name: 'Small (12px)', value: '12px' },
    { name: 'Medium (14px)', value: '14px' },
    { name: 'Large (20px)', value: '20px' },
    { name: 'Extra Large (24px)', value: '24px' },
    { name: 'Huge (32px)', value: '32px' },
    { name: '小四', value: '12px-xiaosi' } // 修改 value 为唯一值
];


const MenuBar = ({ editor, isLoading, onExportDocx }: { editor: Editor | null, isLoading: boolean, onExportDocx: () => void }) => {
    const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);
    const [isMainDropdownOpen, setIsMainDropdownOpen] = useState(false);
    const [isFontSizeDropdownOpen, setIsFontSizeDropdownOpen] = useState(false);
    // 添加这些 ref 引用
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 添加这个 useEffect 钩子
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                // 点击发生在菜单外部，关闭所有菜单
                setIsMainDropdownOpen(false);
                setIsFontDropdownOpen(false);
                setIsFontSizeDropdownOpen(false);
            }
        };

        // 添加全局点击事件
        document.addEventListener('mousedown', handleClickOutside);

        // 组件卸载时清理事件
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []); // 空依赖数组表示只在组件挂载和卸载时运行

    if (!editor) {
        return null
    }
    const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const fontfamily = event.target.value;
        if (fontfamily) {
            editor.chain().focus().setFontFamily(fontfamily).run();
        } else {
            editor.chain().focus().unsetFontFamily().run();
        }
    };
    const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const fontsize = event.target.value;
        if (fontsize) {
            editor.chain().focus().setFontSize(fontsize).run();
        } else {
            editor.chain().focus().unsetFontSize().run();
        }
    };
    let currentSize = 'Default';
    for(const font of availableFontSizes) {
        if(editor.isActive('fontSize', font.value)) {
            currentSize = font.value;
            break;
        }
    }
    if(!currentSize){
        const currentAttributes = editor.getAttributes('textStyle');
        if(currentAttributes.fontSize) {
            currentSize = currentAttributes.fontSize;
        }
    }

    let currentFont = '';
    for(const font of availableFonts) {
        if(editor.isActive('fontFamily', font.value)) {
            currentFont = font.value;
            break;
        }
    }
    if(!currentFont){
        const currentAttributes = editor.getAttributes('textStyle');
        if(currentAttributes.fontFamily) {
            currentFont = currentAttributes.fontFamily;
        }
    }

        
    return (
        <div className="flex flex-wrap gap-1 bg-white p-4 rounded-md shadow-md">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className="w-8 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <Image src="/First/bold-svgrepo-com.svg" alt="Bold" width={16} height={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className="w-8 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <Image src="/First/italic-svgrepo-com.svg" alt="Italic" width={16} height={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className="w-8 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <Image src="/First/strikethrough-svgrepo-com.svg" alt="Strikethrough" width={16} height={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className="w-10 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <Image src="/code-svgrepo-com.svg" alt="Code" width={16} height={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                disabled={!editor.can().chain().focus().toggleBlockquote().run()}
                className="w-10 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <Image src="/List/blockquote-svgrepo-com.svg" alt="Blockquote" width={16} height={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                disabled={!editor.can().chain().focus().toggleBulletList().run()}
                className="w-10 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <Image src="/List/bullet-list-svgrepo-com.svg" alt="Bullet List" width={16} height={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                disabled={!editor.can().chain().focus().toggleOrderedList().run()}
                className="w-10 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <Image src="/List/ordered-list-svgrepo-com.svg" alt="Ordered List" width={16} height={16} />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleTextAlign('left').run()}
                disabled={!editor.can().chain().focus().toggleTextAlign('left').run()}
                className="w-10 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <Image src="/Align/align-text-left-svgrepo-com.svg" alt="Left Align" width={16} height={16} />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleTextAlign('right').run()}
                disabled={!editor.can().chain().focus().toggleTextAlign('right').run()}
                className="w-10 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <Image src="/Align/align-text-right-svgrepo-com.svg" alt="Right Align" width={16} height={16} />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleTextAlign('center').run()}
                disabled={!editor.can().chain().focus().toggleTextAlign('center').run()}
                className="w-10 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <Image src="/Align/align-text-center-svgrepo-com.svg" alt="Center Align" width={16} height={16} />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleTextAlign('justify').run()}
                disabled={!editor.can().chain().focus().toggleTextAlign('justify').run()}
                className="w-10 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <Image src="/Align/align-text-justify-svgrepo-com.svg" alt="Justify Align" width={16} height={16} />
            </button>

            <div className="control-group">
                <div className="button-group flex gap-1">
                    <button
                        onClick={() => editor.chain().focus().setParagraph().run()}
                        className={`w-14 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed ${editor.isActive('paragraph') ? 'bg-gray-500 text-white' : ''}`}
                    >
                        <span className="font-normal">正文</span>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={`w-10 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-500 text-white' : ''}`}
                    >
                        <span className="font-bold">H1</span>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`w-10 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-500 text-white' : ''}`}
                    >
                        <span className="font-bold">H2</span>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={`w-10 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-500 text-white' : ''}`}
                    >
                        <span className="font-bold">H3</span>
                    </button>
                </div>
            </div>

            <div className="control-group">
                <div className="button-group flex gap-1">
                    <button
                        onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}
                        className={`w-10 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-500 text-white' : ''}`}
                        >
                        <Image src="/DO/undo-svgrepo-com.svg" alt="Undo" width={16} height={16}></Image>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}
                        className={`w-10 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-500 text-white' : ''}`}
                    >
                        <Image src="/DO/redo-1-svgrepo-com.svg" alt="Redo" width={16} height={16}></Image>
                    </button>
                </div>
            </div>


            <div className="w-full"></div>

            <div className="relative inline-block" ref={dropdownRef}>
                <button
                    onClick={() => {
                        setIsMainDropdownOpen(!isMainDropdownOpen);
                        setIsFontDropdownOpen(false);
                        setIsFontSizeDropdownOpen(false);
                    }}
                    className="w-10 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    <div className="flex items-center">
                        <Image src="/Font/font-size-1-svgrepo-com.svg" alt="Font" width={16} height={16} />
                    </div>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>

                {isMainDropdownOpen && (
                    <div className="absolute z-20 mt-1 w-64 bg-white border border-gray-300 rounded-md shadow-lg">
                        <div className="relative px-3 py-2 hover:bg-gray-300">
                            <div
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => {
                                    setIsFontDropdownOpen(!isFontDropdownOpen);
                                    setIsFontSizeDropdownOpen(false);
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <Image src="/Font/font-family-svgrepo-com.svg" alt="Font" width={16} height={16} />
                                    <span>字体选择</span>
                                </div>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </div>

                            {/* 字体下拉子菜单 */}
                            {isFontDropdownOpen && (
                                <div className="absolute left-full top-0 w-48 bg-white border border-gray-300 rounded shadow-lg">
                                    {/* 添加一个固定高度的滚动容器 */}
                                    <div className="max-h-[300px] overflow-y-auto scrollbar-thin">
                                        <div
                                            className="px-3 py-2 hover:bg-gray-100 flex items-center sticky top-0 bg-white z-10 border-b border-gray-200"
                                            onClick={() => {
                                                handleFontChange({ target: { value: '' } } as React.ChangeEvent<HTMLSelectElement>);
                                                setIsFontDropdownOpen(false);
                                                setIsMainDropdownOpen(false);
                                            }}
                                        >
                                            <span>默认字体</span>
                                        </div>
                                        {availableFonts.map((font) => (
                                            <div
                                                key={font.value}
                                                className="px-3 py-2 hover:bg-gray-100"
                                                onClick={() => {
                                                    handleFontChange({ target: { value: font.value } } as React.ChangeEvent<HTMLSelectElement>);
                                                    setIsFontDropdownOpen(false);
                                                    setIsMainDropdownOpen(false);
                                                }}
                                                style={{ fontFamily: font.value }} // 预览字体效果
                                            >
                                                {font.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 字号选项 */}
                        <div className="relative px-3 py-2 hover:bg-gray-300">
                            <div
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => {
                                    setIsFontSizeDropdownOpen(!isFontSizeDropdownOpen);
                                    setIsFontDropdownOpen(false);
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <Image src="/Font/font-size-svgrepo-com1.svg" alt="Font Size" width={16} height={16} />
                                    <span>字号设置</span>
                                </div>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </div>

                            {/* 字号下拉子菜单 */}
                            {isFontSizeDropdownOpen && (
                                <div className="absolute left-full top-0 w-48 bg-white border border-gray-300 rounded shadow-lg">
                                    <div className="max-h-[300px] overflow-y-auto scrollbar-thin">
                                        <div
                                            className="px-3 py-2 hover:bg-gray-100 sticky top-0 bg-white z-10 border-b border-gray-200"
                                            onClick={() => {
                                                handleFontSizeChange({ target: { value: '' } } as React.ChangeEvent<HTMLSelectElement>);
                                                setIsFontSizeDropdownOpen(false);
                                                setIsMainDropdownOpen(false);
                                            }}
                                        >
                                            默认大小
                                        </div>
                                        {availableFontSizes.map((size) => (
                                            <div
                                                key={size.value}
                                                className="px-3 py-2 hover:bg-gray-100"
                                                onClick={() => {
                                                    handleFontSizeChange({ target: { value: size.value } } as React.ChangeEvent<HTMLSelectElement>);
                                                    setIsFontSizeDropdownOpen(false);
                                                    setIsMainDropdownOpen(false);
                                                }}
                                            >
                                                {size.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="w-full"></div>

            <div>
                <button 
                    onClick={onExportDocx}
                    disabled={isLoading}
                    className={`w-10 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed ${isLoading ? 'opacity-50' : ''}`}
                >
                    <Image src="/Export/file-doc-svgrepo-com.svg" alt="Export to DOCX" width={16} height={16} />
                    {isLoading && <span className="ml-2 animate-spin">⏳</span>}
                </button>
            </div>
        </div>
    )
}

const Tiptap = () => {
    // 使用useState存储初始内容
    const [initialContent, setInitialContent] = useState('<p>Hello world!</p>');
    // 添加一个状态标记是否已从localStorage加载内容
    const [contentLoaded, setContentLoaded] = useState(false);
    // 添加目录状态
    const [tocItems, setTocItems] = useState<ToCItem[]>([]);
    // 添加控制目录显示的状态
    const [showToc, setShowToc] = useState(true);
    // 添加字符统计状态
    const [charCount, setCharCount] = useState({ characters: 0, words: 0, paragraphs: 0 });

    const [isLoading, setIsLoading] = useState(false);
    // 保存上一次的定时器ID
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 在组件挂载时从localStorage获取内容
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedContent = localStorage.getItem('tiptap-content');
            if (savedContent) {
                console.log('从localStorage恢复内容:', savedContent);
                setInitialContent(savedContent);
            } else {
                console.log('localStorage中没有保存的内容，使用默认内容');
            }
            // 标记内容已加载，无论是从localStorage还是使用默认内容
            setContentLoaded(true);
        }
    }, []);

    // 创建一个保存函数
    const saveContentToLocalStorage = (content: string) => {
        // 清除之前的定时器
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // 设置新的定时器
        timeoutRef.current = setTimeout(() => {
            if (typeof window !== 'undefined') {
                localStorage.setItem('tiptap-content', content);
                console.log('内容已保存到localStorage:', content);
            }
        }, 500); // 500毫秒的延迟
    };

    // 添加调试日志
    useEffect(() => {
        console.log('当前初始内容状态:', {
            initialContent,
            contentLoaded
        });
    }, [initialContent, contentLoaded]);

    // 提取文档标题的函数
    const extractHeadings = useCallback((editor: Editor | null) => {
        if (!editor) return [];
        
        const items: ToCItem[] = [];
        const transaction = editor.state.tr;
        
        editor.state.doc.descendants((node, pos) => {
            if (node.type.name === 'heading') {
                const id = `heading-${items.length + 1}`;
                const level = node.attrs.level;
                const text = node.textContent;
                
                items.push({
                    id,
                    level,
                    textContent: text || `标题 ${level}`,
                    pos,
                });
            }
            return true;
        });
        
        return items;
    }, []);

    // 计算字符统计的函数
    const countCharacters = useCallback((editor: Editor | null) => {
        if (!editor) return { characters: 0, words: 0, paragraphs: 0 };
        
        const text = editor.getText();
        const characters = text.length;
        
        // 计算单词数（根据空格和标点符号分割）
        const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
        
        // 计算段落数（基于节点）
        let paragraphs = 0;
        editor.state.doc.descendants((node) => {
            if (node.type.name === 'paragraph' && node.textContent.trim().length > 0) {
                paragraphs++;
            }
            return true;
        });
        
        return { characters, words, paragraphs };
    }, []);

    // 只有在contentLoaded为true时才初始化编辑器
    const editor = useEditor(
        {
            extensions: [
                StarterKit,
                TextStyle,
                FontFamily.configure({
                    types: ['textStyle'],
                }),
                FontSize.configure({
                    types: ['textStyle'],
                }),
                TextAlign.configure({
                    types: ['heading', 'paragraph'],
                    alignments: ['left', 'center', 'right', 'justify'],
                    defaultAlignment: 'left',
                }),
                Heading.configure({
                    levels: [1, 2, 3],
                }),
                CharacterCount.configure({
                    limit: 100000, // 设置字符限制
                }),
                ExportDocx.configure({
                    onCompleteExport: (result: string | Blob | Stream | Buffer<ArrayBufferLike>) => {
                      setIsLoading(false)
                      const blob = new Blob([result as BlobPart], {
                        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                      })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
            
                      a.href = url
                      a.download = 'export.docx'
                      a.click()
                      URL.revokeObjectURL(url)
                    },
                  }),
            ],
            content: initialContent,
            onUpdate: ({ editor }) => {
                const content = editor.getHTML();
                console.log('编辑器内容已更新:', content.substring(0, 50) + (content.length > 50 ? '...' : ''));
                // 使用防抖函数保存内容到localStorage
                saveContentToLocalStorage(content);
                // 更新目录
                const headings = extractHeadings(editor);
                setTocItems(headings);
                
                // 更新字符统计
                const counts = countCharacters(editor);
                setCharCount(counts);
            },
            onCreate: ({ editor }) => {
                console.log('编辑器已创建，当前内容:', editor.getHTML().substring(0, 50) + (editor.getHTML().length > 50 ? '...' : ''));
                // 初始化目录
                const headings = extractHeadings(editor);
                setTocItems(headings);
                
                // 初始化字符统计
                const counts = countCharacters(editor);
                setCharCount(counts);
            }
        },
        // 添加依赖项，当contentLoaded或initialContent变化时重新初始化编辑器
        [contentLoaded, initialContent, extractHeadings]
    );

    // 添加编辑器状态变化的调试日志
    useEffect(() => {
        if (editor) {
            console.log('编辑器状态已更新，当前内容:', editor.getHTML().substring(0, 50) + (editor.getHTML().length > 50 ? '...' : ''));
        }
    }, [editor]);

    const handleExportDocx = useCallback(() => {
        setIsLoading(true);
        editor?.chain().exportDocx().run();
    }, [editor]);

    return (
        <div className="flex justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-6xl flex gap-6">
                {/* 目录侧边栏 */}
                {showToc && (
                    <div className="w-72 shrink-0">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-700">目录</h3>
                            <button 
                                onClick={() => setShowToc(false)}
                                className="text-gray-500 hover:text-gray-700"
                                title="隐藏目录"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="sticky top-4">
                            <TableOfContents editor={editor} items={tocItems} />
                        </div>
                    </div>
                )}
                
                {/* 编辑器主体 */}
                <div className={`${showToc ? 'flex-1' : 'w-full max-w-4xl mx-auto'} bg-white p-4 rounded-md flex flex-col`}>
                    <div className="flex justify-between items-center mb-3">
                        <MenuBar 
                            editor={editor} 
                            isLoading={isLoading}
                            onExportDocx={handleExportDocx}
                        />
                        {!showToc && (
                            <button 
                                onClick={() => setShowToc(true)}
                                className="ml-2 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
                                title="显示目录"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                                </svg>
                            </button>
                        )}
                    </div>
                    <div className="border rounded-md flex-grow p-4">
                        <div className="h-full">
                            <EditorContent editor={editor} className="w-full h-full prose max-w-none" />
                        </div>
                    </div>
                    
                    {/* 字符统计面板 */}
                    <div className="mt-3 bg-gray-50 rounded-md border border-gray-200 p-3">
                        <div className="flex flex-wrap justify-between items-center">
                            <div className="flex items-center text-gray-600">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1 12h9M4 19h8m-8-4h2m8 0h2M4 9h2m8 0h6"></path>
                                </svg>
                                <span className="text-sm font-medium">字符统计</span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center">
                                    <span className="text-gray-500">字符数：</span>
                                    <span className="font-medium text-gray-800">{charCount.characters}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-gray-500">单词数：</span>
                                    <span className="font-medium text-gray-800">{charCount.words}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-gray-500">段落数：</span>
                                    <span className="font-medium text-gray-800">{charCount.paragraphs}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx global>{`
                .ProseMirror {
                    outline: none !important;
                    border: none !important;
                    box-shadow: none !important;
                }

                .ProseMirror:focus {
                    outline: none !important;
                    border: none !important;
                    box-shadow: none !important;
                }

                .tiptap {
                    outline: none !important;
                    border: none !important;
                }

                /* 现有的样式保持不变 */
                .scrollbar-thin::-webkit-scrollbar {
                    width: 6px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 3px;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background: #888;
                    border-radius: 3px;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }
                .empty-block {
                    min-height: 100px; /* 设置最小高度 */
                    background-color: #f5f5f5; /* 设置背景颜色 */
                    border: 1px dashed #ccc; /* 设置边框样式 */
                    border-radius: 4px; /* 设置圆角 */
                }

                /* 正文样式 */
                .ProseMirror p {
                    font-size: 1em;
                    line-height: 1.5;
                    margin-top: 0.5em;
                    margin-bottom: 0.5em;
                    color: #333;
                }

                /* 标题样式 */
                .ProseMirror h1 {
                    font-size: 2em;
                    font-weight: bold;
                    line-height: 1.2;
                    margin-top: 0.67em;
                    margin-bottom: 0.67em;
                    color: #333;
                }

                .ProseMirror h2 {
                    font-size: 1.5em;
                    font-weight: bold;
                    line-height: 1.2;
                    margin-top: 0.83em;
                    margin-bottom: 0.83em;
                    color: #444;
                }

                .ProseMirror h3 {
                    font-size: 1.17em;
                    font-weight: bold;
                    line-height: 1.2;
                    margin-top: 1em;
                    margin-bottom: 1em;
                    color: #555;
                }

                /* 激活状态的标题按钮样式 */
                button.is-active {
                    background-color: #4a5568;
                    color: white;
                }
            `}</style>
        </div>
    )
}

export default Tiptap

