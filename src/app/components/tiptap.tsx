'use client'
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Editor } from '@tiptap/react';
import { TextStyle } from '@tiptap/extension-text-style';
import { FontFamily } from '@tiptap/extension-font-family';
import { FontSize } from '@tiptap/extension-font-size';
//generate a menu bar with buttons for bold, italic, underline, strikethrough, code, blockquote, bullet list, ordered list, and link
const availableFonts = [
    { name: 'Arial', value: 'Arial, sans-serif' },
    { name: 'Courier New', value: '"Courier New", monospace' },
    { name: 'Georgia', value: 'Georgia, serif' },
    { name: 'Times New Roman', value: '"Times New Roman", serif' },
    { name: 'Trebuchet MS', value: '"Trebuchet MS", sans-serif' },
    { name: 'Verdana', value: 'Verdana, sans-serif' },
]
const availableFontSizes = [
    { name: 'Small (12px)', value: '12px' },
    { name: 'Medium (14px)', value: '14px' },
    { name: 'Large (20px)', value: '20px' },
    { name: 'Extra Large (24px)', value: '24px' },
    { name: 'Huge (32px)', value: '32px' },
];
    
const MenuBar = ({ editor }: { editor: Editor | null }) => {
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

    let currentFront = '';
    for(const font of availableFonts) {
        if(editor.isActive('fontFamily', font.value)) {
            currentFront = font.value;
            break;
        }
    }
    if(!currentFront){
        const currentAttributes = editor.getAttributes('textStyle');
        if(currentAttributes.fontFamily) {
            currentFront = currentAttributes.fontFamily;
        }
    }
    return (
        <div className="flex flex-wrap gap-1 bg-white p-4 rounded-md shadow-md">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className="px-1 py-0.5 text-sm bg-white text-black rounded-md hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                B
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className="px-1 py-0.5 text-sm bg-white text-black rounded-md hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                I
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className="px-1 py-0.5 bg-white text-black rounded-md hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Strikethrough
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className="px-1 py-0.5 bg-white text-black rounded-md hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Code
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                disabled={!editor.can().chain().focus().toggleBlockquote().run()}
                className="px-1 py-0.5 bg-white text-black rounded-md hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Blockquote
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                disabled={!editor.can().chain().focus().toggleBulletList().run()}
                className="px-1 py-0.5 bg-white text-black rounded-md hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Bullet List
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                disabled={!editor.can().chain().focus().toggleOrderedList().run()}
                className="px-2 py-1 bg-white text-black rounded-md hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Ordered List
            </button>
            <select
                value={currentFront}
                onChange={handleFontChange}
                className="px-2 py-1 bg-white text-black rounded-md hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <option value="">Default</option>
                {availableFonts.map((font) => (
                    <option key={font.value} value={font.value}>
                        {font.name}
                    </option>
                ))}
            </select>

            <select 
                value={currentSize}
                onChange={handleFontSizeChange}
                className="px-2 py-1 bg-white text-black rounded-md hover:bg-gray-500 active:scale-95 transition-transform duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed" >
                <option value="">Default</option>
                {availableFontSizes.map((font) => (
                    <option key={font.value} value={font.value}>
                        {font.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

const Tiptap = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            FontFamily.configure({
                types: ['textStyle'], // 确保与 TextStyle 配合使用
            }),
            FontSize.configure({
                types: ['textStyle'],                    // 确保与 TextStyle 配合使用
            }),
        ],
        content: '<p>Hello world!</p>',
        onUpdate: ({ editor }) => {
            console.log(editor.getHTML());
        },
    })
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-[297mm] p-8 bg-white shadow-lg rounded-md">
                <MenuBar editor={editor} />
                <EditorContent editor={editor} className="border border-gray-300 rounded-md p-4" />
            </div>
        </div>
    )
}
export default Tiptap

