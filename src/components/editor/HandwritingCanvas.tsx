"use client";

import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { 
  Pencil, 
  Eraser, 
  Highlighter, 
  MousePointer2, 
  Shapes, 
  Undo2, 
  Redo2, 
  Trash2,
  Download,
  Settings2,
  Circle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  paperStyle?: 'blank' | 'dotted' | 'lined' | 'graph';
  paperColor?: string;
  paperSpacing?: number;
}

export const HandwritingCanvas = ({ 
  paperStyle = 'blank', 
  paperColor = '#ffffff',
  paperSpacing = 1 
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  
  const [activeTool, setActiveTool] = useState<'pen' | 'highlighter' | 'eraser' | 'select' | 'shape'>('pen');
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(2);
  
  const COLORS = ['#000000', '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      backgroundColor: 'transparent',
    });

    fabricRef.current = canvas;

    const handleResize = () => {
      if (containerRef.current) {
        canvas.setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      canvas.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!fabricRef.current) return;
    const canvas = fabricRef.current;

    if (activeTool === 'pen') {
      canvas.isDrawingMode = true;
      const brush = new fabric.PencilBrush(canvas);
      brush.color = color;
      brush.width = brushSize;
      canvas.freeDrawingBrush = brush;
    } else if (activeTool === 'highlighter') {
      canvas.isDrawingMode = true;
      const brush = new fabric.PencilBrush(canvas);
      brush.color = `${color}33`; 
      brush.width = brushSize * 8;
      canvas.freeDrawingBrush = brush;
    } else if (activeTool === 'eraser') {
      canvas.isDrawingMode = true;
      const brush = new fabric.PencilBrush(canvas);
      brush.width = 24;
      brush.globalCompositeOperation = 'destination-out';
      canvas.freeDrawingBrush = brush;
    } else {
      canvas.isDrawingMode = false;
    }
  }, [activeTool, color, brushSize]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#f0f0f2] dark:bg-[#000000]">
      {/* Premium Toolbar */}
      <div className="flex justify-center p-4">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-toolbar rounded-2xl px-4 py-2 flex items-center gap-2 shadow-xl border border-white/20"
        >
          <div className="flex items-center gap-1 pr-4 border-r border-gray-200 dark:border-gray-800">
            <ToolButton 
              active={activeTool === 'pen'} 
              onClick={() => setActiveTool('pen')}
              icon={<Pencil size={20} />}
            />
            <ToolButton 
              active={activeTool === 'highlighter'} 
              onClick={() => setActiveTool('highlighter')}
              icon={<Highlighter size={20} />}
            />
            <ToolButton 
              active={activeTool === 'eraser'} 
              onClick={() => setActiveTool('eraser')}
              icon={<Eraser size={20} />}
            />
            <ToolButton 
              active={activeTool === 'select'} 
              onClick={() => setActiveTool('select')}
              icon={<MousePointer2 size={20} />}
            />
          </div>

          <div className="flex items-center gap-2 px-4 border-r border-gray-200 dark:border-gray-800">
            {COLORS.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={cn(
                  "w-6 h-6 rounded-full border-2 transition-all hover:scale-125",
                  color === c ? "scale-125 ring-2 ring-blue-500 ring-offset-2" : "border-transparent"
                )}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <div className="flex items-center gap-1 pl-2">
            <ToolButton onClick={() => fabricRef.current?.undo()} icon={<Undo2 size={18} />} />
            <ToolButton onClick={() => fabricRef.current?.redo()} icon={<Redo2 size={18} />} />
            <ToolButton onClick={() => fabricRef.current?.clear()} icon={<Trash2 size={18} />} className="text-red-500 hover:bg-red-50" />
          </div>
        </motion.div>
      </div>

      {/* Infinite Canvas Area */}
      <div ref={containerRef} className="flex-1 relative overflow-auto p-12 flex justify-center">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={cn(
            "relative shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-sm min-h-[1200px] w-full max-w-4xl transition-all duration-500",
            paperStyle === 'blank' && "paper-blank",
            paperStyle === 'dotted' && "paper-dots",
            paperStyle === 'lined' && "paper-lined",
            paperStyle === 'graph' && "paper-graph"
          )}
          style={{ 
            backgroundColor: paperColor,
            backgroundSize: paperStyle === 'lined' ? `100% ${32 * paperSpacing}px` : 
                           paperStyle === 'dotted' || paperStyle === 'graph' ? `${32 * paperSpacing}px ${32 * paperSpacing}px` : undefined
          }}
        >
          <canvas ref={canvasRef} className="relative z-10" />
        </motion.div>
      </div>
    </div>
  );
};

const ToolButton = ({ active, onClick, icon, className }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "p-2 rounded-xl transition-all duration-200 flex items-center justify-center group",
      active 
        ? "bg-blue-500 text-white shadow-lg" 
        : cn("hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400", className)
    )}
  >
    {React.cloneElement(icon as React.ReactElement, { size: 20 })}
  </button>
);

