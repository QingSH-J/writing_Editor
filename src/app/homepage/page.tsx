'use client'
import { useState } from 'react';
import Tiptap from "../components/tiptap";
import CherryWebsite from "../components/cherry-website";
import CherryBackground from "../components/cherry-background";

export default function Homepage(){
    const [showEditor, setShowEditor] = useState(false);
    
    if (showEditor) {
        return (
            <div style={{ position: 'relative', minHeight: '100vh' }}>
                {/* 樱花背景 - 完全在后台，不影响编辑器 */}
                <CherryBackground />
                
                {/* 你的原始编辑器，完全不变 */}
                <div style={{ position: 'relative', zIndex: 10 }}>
                    <Tiptap />
                </div>
                
                {/* 返回按钮 - 调整位置避免重叠 */}
                <button 
                    onClick={() => setShowEditor(false)}
                    style={{
                        position: 'fixed',
                        top: '10px',
                        right: '20px', // 改到右上角避免重叠
                        zIndex: 1000,
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #f9a8d4',
                        borderRadius: '20px',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        fontSize: '14px',
                        color: '#6b7280',
                        fontWeight: '500'
                    }}
                >
                    ← 返回首页
                </button>
            </div>
        );
    }
    
    return <CherryWebsite onStartEditing={() => setShowEditor(true)} />;
}