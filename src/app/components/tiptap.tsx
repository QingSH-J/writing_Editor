'use client'
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Editor } from '@tiptap/core';
import { TextStyle } from '@tiptap/extension-text-style';
import { FontFamily } from '@tiptap/extension-font-family';
import { FontSize } from '@tiptap/extension-font-size';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { TextAlign } from '@tiptap/extension-text-align';
import Heading from '@tiptap/extension-heading';

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
    { name: '小四', value: '12px-xiaosi' }, // 修改为唯一值

];



const MenuBar = ({ editor }: { editor: Editor | null }) => {
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
            // 处理特殊情况 '12px-xiaosi'
            const actualSize = fontsize === '12px-xiaosi' ? '12px' : fontsize;
            editor.chain().focus().setFontSize(actualSize).run();
        } else {
            editor.chain().focus().unsetFontSize().run();
        }
    };
    let currentSize = 'Default';
    // 检查当前字体大小
    for(const font of availableFontSizes) {
        // 对于 '12px-xiaosi'，需要特殊处理
        const valueToCheck = font.value === '12px-xiaosi' ? '12px' : font.value;
        if(editor.isActive('fontSize', valueToCheck)) {
            currentSize = font.value; // 保存原始值，包括 '12px-xiaosi'
            break;
        }
    }
    if(!currentSize || currentSize === 'Default'){
        const currentAttributes = editor.getAttributes('textStyle');
        if(currentAttributes.fontSize) {
            // 如果当前字体大小是12px，检查是否应该显示为"小四"
            if(currentAttributes.fontSize === '12px') {
                // 这里可以添加额外的逻辑来确定是否应该显示为"小四"
                // 例如，可以根据其他属性或上下文来决定
                // 现在简单地保持为 '12px'
                currentSize = currentAttributes.fontSize;
            } else {
                currentSize = currentAttributes.fontSize;
            }
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
        <div className="flex flex-wrap gap-1 bg-white p-4 rounded-md shadow-md justify-center">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className="w-8 h-8 flex items-center justify-center bg-white text-black rounded border border-gray-300 hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <Image src="/First/bold-svgrepo-com.svg" alt="Bold" width={16} height={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className="w-8 h-8 flex items-center justify-center bg-white text-black rounded border border-gray-300 hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <Image src="/First/italic-svgrepo-com.svg" alt="Italic" width={16} height={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className="w-8 h-8 flex items-center justify-center bg-white text-black rounded border border-gray-300 hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <Image src="/First/strikethrough-svgrepo-com.svg" alt="Strikethrough" width={16} height={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className="w-10 h-8 flex items-center justify-center bg-white text-black rounded border border-gray-300 hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <Image src="/code-svgrepo-com.svg" alt="Code" width={16} height={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                disabled={!editor.can().chain().focus().toggleBlockquote().run()}
                className="w-10 h-8 flex items-center justify-center bg-white text-black rounded border border-gray-300 hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <Image src="/List/blockquote-svgrepo-com.svg" alt="Blockquote" width={16} height={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                disabled={!editor.can().chain().focus().toggleBulletList().run()}
                className="w-10 h-8 flex items-center justify-center bg-white text-black rounded border border-gray-300 hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <Image src="/List/bullet-list-svgrepo-com.svg" alt="Bullet List" width={16} height={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                disabled={!editor.can().chain().focus().toggleOrderedList().run()}
                className="w-10 h-8 flex items-center justify-center bg-white text-black rounded border border-gray-300 hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <Image src="/List/ordered-list-svgrepo-com.svg" alt="Ordered List" width={16} height={16} />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleTextAlign('left').run()}
                disabled={!editor.can().chain().focus().toggleTextAlign('left').run()}
                className="w-10 h-8 flex items-center justify-center bg-white text-black rounded border border-gray-300 hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <Image src="/Align/align-text-left-svgrepo-com.svg" alt="Left Align" width={16} height={16} />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleTextAlign('right').run()}
                disabled={!editor.can().chain().focus().toggleTextAlign('right').run()}
                className="w-10 h-8 flex items-center justify-center bg-white text-black rounded border border-gray-300 hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <Image src="/Align/align-text-right-svgrepo-com.svg" alt="Right Align" width={16} height={16} />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleTextAlign('center').run()}
                disabled={!editor.can().chain().focus().toggleTextAlign('center').run()}
                className="w-10 h-8 flex items-center justify-center bg-white text-black rounded border border-gray-300 hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <Image src="/Align/align-text-center-svgrepo-com.svg" alt="Center Align" width={16} height={16} />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleTextAlign('justify').run()}
                disabled={!editor.can().chain().focus().toggleTextAlign('justify').run()}
                className="w-10 h-8 flex items-center justify-center bg-white text-black rounded border border-gray-300 hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <Image src="/Align/align-text-justify-svgrepo-com.svg" alt="Justify Align" width={16} height={16} />
            </button>

            <div className="control-group">
                <div className="button-group flex gap-1">
                    <button
                        onClick={() => editor.chain().focus().setParagraph().run()}
                        className={`w-14 h-8 flex items-center justify-center bg-white text-black rounded border border-gray-300 hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed ${editor.isActive('paragraph') ? 'bg-gray-500 text-white' : ''}`}
                    >
                        <span className="font-normal">正文</span>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={`w-10 h-8 flex items-center justify-center bg-white text-black rounded border border-gray-300 hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-500 text-white' : ''}`}
                    >
                        <span className="font-bold">H1</span>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`w-10 h-8 flex items-center justify-center bg-white text-black rounded border border-gray-300 hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-500 text-white' : ''}`}
                    >
                        <span className="font-bold">H2</span>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={`w-10 h-8 flex items-center justify-center bg-white text-black rounded border border-gray-300 hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-500 text-white' : ''}`}
                    >
                        <span className="font-bold">H3</span>
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
                    className="w-10 h-8 flex items-center justify-center bg-white text-black rounded border border-gray-300 hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    <div className="flex items-center">
                        <Image src="/Font/font-size-1-svgrepo-com.svg" alt="Font" width={16} height={16} />
                    </div>
                    <span className="text-xs ml-1">▼</span>
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
                                <span className="text-xs">▶</span>
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
                                <span className="text-xs">▶</span>
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
        </div>
    )
}

const Tiptap = () => {
    const editor = useEditor({
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
            })

        ],
        content: '<p>Hello world!</p>',
        onUpdate: ({ editor }) => {
            console.log(editor.getHTML());
        },
    })



    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-4xl bg-white p-4 rounded-md flex flex-col items-center">
                <div className="w-full flex justify-center mb-4">
                    <MenuBar editor={editor} />
                </div>
                <div className="border rounded-md flex-grow w-full">
                    <div className="h-full">
                        <EditorContent editor={editor} className="w-full h-full" />
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

