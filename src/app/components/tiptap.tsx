'use client'
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Editor } from '@tiptap/react';
import { TextStyle } from '@tiptap/extension-text-style';
import { FontFamily } from '@tiptap/extension-font-family';
import { FontSize } from '@tiptap/extension-font-size';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { TextAlign } from '@tiptap/extension-text-align';
import CodeBlock from '@tiptap/extension-code-block';

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
];

const codeLanguages = [
    { name: 'Plain text', value: 'plaintext' },
    { name: 'JavaScript', value: 'js' },
    { name: 'TypeScript', value: 'ts' },
    { name: 'HTML', value: 'html' },
    { name: 'CSS', value: 'css' },
    { name: 'C++', value: 'cpp' },
    { name: 'C#', value: 'csharp' },
    { name: 'Python', value: 'python' },
    { name: 'Java', value: 'java' },
    { name: 'PHP', value: 'php' },
    { name: 'Ruby', value: 'ruby' },
    { name: 'Go', value: 'go' },
    { name: 'SQL', value: 'sql' },
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

            <button
                onClick={() => {
                    editor.chain().focus().setCodeBlock({ language: 'plaintext' }).run();
                }}
                className="w-10 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <Image src="/First/code-1115-svgrepo-com.svg" alt="Code Block" width={16} height={16} />
            </button>

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
        </div>
    )
}

const Tiptap = () => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                // 停用内置的 codeBlock 以使用我们的自定义版本
                codeBlock: false,
            }),
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
            CodeBlock.configure({
                HTMLAttributes: {
                    class: 'language-js empty-block code-block-with-language',
                },
                defaultLanguage: 'plaintext',
                // 添加语言选择器所需的支持
                languageClassPrefix: 'language-',
            }),
        ],
        content: '<p>Hello world!</p>',
        onUpdate: ({ editor }) => {
            console.log(editor.getHTML());
        },
        // 在 onUpdate 回调后添加
        onTransaction: ({ editor }) => {
            // 使用 setTimeout 确保 DOM 已更新
            setTimeout(() => {
                const codeBlocks = document.querySelectorAll('pre');
                console.log('找到代码块数量:', codeBlocks.length); // 添加调试信息
                
                codeBlocks.forEach(codeBlock => {
                    // 如果已经有选择器，则跳过
                    if (codeBlock.querySelector('.code-language-selector')) return;
                    
                    console.log('处理代码块:', codeBlock); // 添加调试信息
                    console.log('代码块类名:', codeBlock.className); // 检查类名
                    
                    // 从类名中获取当前语言
                    let currentLang = 'plaintext';
                    codeBlock.classList.forEach(className => {
                        if (className.startsWith('language-')) {
                            currentLang = className.replace('language-', '');
                        }
                    });
                    
                    // 创建选择器
                    const selector = document.createElement('div');
                    selector.className = 'code-language-selector';
                    selector.textContent = codeLanguages.find(lang => lang.value === currentLang)?.name || 'Language';
                    
                    // 点击显示下拉菜单
                    selector.onclick = (e) => {
                        e.stopPropagation();
                        
                        // 移除任何现有的下拉菜单
                        document.querySelectorAll('.language-dropdown').forEach(el => el.remove());
                        
                        // 创建下拉菜单
                        const dropdown = document.createElement('div');
                        dropdown.className = 'language-dropdown scrollbar-thin';
                        
                        // 添加语言选项
                        codeLanguages.forEach(lang => {
                            const item = document.createElement('div');
                            item.className = 'language-dropdown-item';
                            item.textContent = lang.name;
                            item.onclick = (e) => {
                                e.stopPropagation();
                                
                                // 获取代码块节点位置并设置语言
                                const position = editor.view.posAtDOM(codeBlock, 0);
                                if (position) {
                                    editor.chain().focus().setCodeBlock({ language: lang.value }).run();
                                    selector.textContent = lang.name;
                                }
                                
                                dropdown.remove();
                            };
                            dropdown.appendChild(item);
                        });
                        
                        selector.appendChild(dropdown);
                        
                        // 点击其他地方关闭下拉菜单
                        const closeDropdown = (e: MouseEvent) => {
                            if (!dropdown.contains(e.target as Node)) {
                                dropdown.remove();
                                document.removeEventListener('mousedown', closeDropdown);
                            }
                        };
                        document.addEventListener('mousedown', closeDropdown);
                    };
                    
                    // 在选择器添加到代码块之前添加调试
                    console.log('准备添加选择器到代码块');
                    codeBlock.appendChild(selector);
                    console.log('已添加选择器到代码块');
                });
            }, 0);
        },
    });

    useEffect(() => {
        if (editor) {
            // 手动触发一次检查，确保现有代码块有语言选择器
            setTimeout(() => {
                const codeBlocks = document.querySelectorAll('pre');
                // 与onTransaction中相同的代码...
                console.log('找到代码块数量:', codeBlocks.length); // 添加调试信息
                
                codeBlocks.forEach(codeBlock => {
                    // 如果已经有选择器，则跳过
                    if (codeBlock.querySelector('.code-language-selector')) return;
                    
                    console.log('处理代码块:', codeBlock); // 添加调试信息
                    console.log('代码块类名:', codeBlock.className); // 检查类名
                    
                    // 从类名中获取当前语言
                    let currentLang = 'plaintext';
                    codeBlock.classList.forEach(className => {
                        if (className.startsWith('language-')) {
                            currentLang = className.replace('language-', '');
                        }
                    });
                    
                    // 创建选择器
                    const selector = document.createElement('div');
                    selector.className = 'code-language-selector';
                    selector.textContent = codeLanguages.find(lang => lang.value === currentLang)?.name || 'Language';
                    
                    // 点击显示下拉菜单
                    selector.onclick = (e) => {
                        e.stopPropagation();
                        
                        // 移除任何现有的下拉菜单
                        document.querySelectorAll('.language-dropdown').forEach(el => el.remove());
                        
                        // 创建下拉菜单
                        const dropdown = document.createElement('div');
                        dropdown.className = 'language-dropdown scrollbar-thin';
                        
                        // 添加语言选项
                        codeLanguages.forEach(lang => {
                            const item = document.createElement('div');
                            item.className = 'language-dropdown-item';
                            item.textContent = lang.name;
                            item.onclick = (e) => {
                                e.stopPropagation();
                                
                                // 获取代码块节点位置并设置语言
                                const position = editor.view.posAtDOM(codeBlock, 0);
                                if (position) {
                                    editor.chain().focus().setCodeBlock({ language: lang.value }).run();
                                    selector.textContent = lang.name;
                                }
                                
                                dropdown.remove();
                            };
                            dropdown.appendChild(item);
                        });
                        
                        selector.appendChild(dropdown);
                        
                        // 点击其他地方关闭下拉菜单
                        const closeDropdown = (e: MouseEvent) => {
                            if (!dropdown.contains(e.target as Node)) {
                                dropdown.remove();
                                document.removeEventListener('mousedown', closeDropdown);
                            }
                        };
                        document.addEventListener('mousedown', closeDropdown);
                    };
                    
                    // 在选择器添加到代码块之前添加调试
                    console.log('准备添加选择器到代码块');
                    codeBlock.appendChild(selector);
                    console.log('已添加选择器到代码块');
                });
            }, 500);
        }
    }, [editor]);

    return (
        <div className="flex justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-4xl bg-white p-4 rounded-md flex flex-col">
                <MenuBar editor={editor} />
                <div className="border rounded-md flex-grow">
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
                /* 代码块容器相对定位，以便放置语言选择器 */
                .code-block-with-language {
                    position: relative;
                }
                /* 语言选择器样式 */
                .code-language-selector {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    z-index: 100; /* 提高z-index */
                    color: #333; /* 颜色更深 */
                    font-size: 12px;
                    padding: 3px 8px; /* 更大的内边距 */
                    border-radius: 3px;
                    border: 1px solid #bbb; /* 边框更明显 */
                    background-color: #fff; /* 背景色更明显 */
                    cursor: pointer;
                    opacity: 1; /* 完全不透明 */
                    box-shadow: 0 1px 3px rgba(0,0,0,0.2); /* 添加阴影 */
                }
                .code-language-selector:hover {
                    opacity: 1;
                }
                /* 下拉菜单样式 */
                .language-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background-color: white;
                    border: 1px solid #ddd;
                    border-radius: 3px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                    z-index: 20;
                    max-height: 200px;
                    overflow-y: auto;
                    min-width: 120px;
                }
                .language-dropdown-item {
                    padding: 5px 10px;
                    cursor: pointer;
                    white-space: nowrap;
                }
                .language-dropdown-item:hover {
                    background-color: #f5f5f5;
                }
                /* 确保代码块有正确的定位上下文 */
                pre {
                    position: relative !important;
                    padding-top: 30px !important; /* 为选择器腾出空间 */
                }
            `}</style>
        </div>
    )
}

export default Tiptap

