"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Code,
  Heading1,
  Heading2,
  Undo,
  Redo
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: `
      <h2>Welcome to Lumina Notes</h2>
      <p>This is a premium rich text editor. You can use <strong>bold</strong>, <em>italic</em>, and other formatting options.</p>
      <ul>
        <li>Checklists coming soon</li>
        <li>Code blocks included</li>
        <li>Tables support</li>
      </ul>
    `,
    editorProps: {
      attributes: {
        class: 'prose prose-slate dark:prose-invert max-w-none focus:outline-none min-h-[500px] p-8',
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 overflow-hidden">
      {/* Toolbar */}
      <div className="border-b p-2 flex flex-wrap gap-1 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <MenuButton 
          onClick={() => editor.chain().focus().toggleBold().run()} 
          active={editor.isActive('bold')}
          icon={<Bold size={18} />} 
        />
        <MenuButton 
          onClick={() => editor.chain().focus().toggleItalic().run()} 
          active={editor.isActive('italic')}
          icon={<Italic size={18} />} 
        />
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1" />
        <MenuButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
          active={editor.isActive('heading', { level: 1 })}
          icon={<Heading1 size={18} />} 
        />
        <MenuButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
          active={editor.isActive('heading', { level: 2 })}
          icon={<Heading2 size={18} />} 
        />
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1" />
        <MenuButton 
          onClick={() => editor.chain().focus().toggleBulletList().run()} 
          active={editor.isActive('bulletList')}
          icon={<List size={18} />} 
        />
        <MenuButton 
          onClick={() => editor.chain().focus().toggleOrderedList().run()} 
          active={editor.isActive('orderedList')}
          icon={<ListOrdered size={18} />} 
        />
        <MenuButton 
          onClick={() => editor.chain().focus().toggleCodeBlock().run()} 
          active={editor.isActive('codeBlock')}
          icon={<Code size={18} />} 
        />
        <MenuButton 
          onClick={() => editor.chain().focus().toggleBlockquote().run()} 
          active={editor.isActive('blockquote')}
          icon={<Quote size={18} />} 
        />
        <div className="flex-1" />
        <MenuButton onClick={() => editor.chain().focus().undo().run()} icon={<Undo size={18} />} />
        <MenuButton onClick={() => editor.chain().focus().redo().run()} icon={<Redo size={18} />} />
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-auto paper mx-auto my-8 max-w-4xl w-full rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

const MenuButton = ({ onClick, active, icon }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "p-2 rounded-lg transition-all duration-200",
      active 
        ? "bg-brand-primary text-white" 
        : "hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
    )}
  >
    {icon}
  </button>
);
