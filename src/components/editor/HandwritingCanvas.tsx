"use client";

import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

import { 
  Pencil, 
  Eraser, 
  Square, 
  Type, 
  Hand, 
  Maximize2, 
  Download,
  Trash2,
  Undo2,
  Redo2,
  Highlighter
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  paperStyle?: 'ruled' | 'grid' | 'dots' | 'blank';
}

export const HandwritingCanvas = ({ paperStyle = 'ruled' }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const [activeTool, setActiveTool] = useState<'pen' | 'highlighter' | 'eraser' | 'select' | 'shape' | 'laser' | 'tape'>('pen');
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(2);
  const [opacity, setOpacity] = useState(1);
  const [tipStyle, setTipStyle] = useState<'round' | 'pointy'>('round');
  const [lineStyle, setLineStyle] = useState<'solid' | 'dashed' | 'dotted'>('solid');

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      backgroundColor: 'transparent',
    });

    fabricRef.current = canvas;

    // Set initial brush
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = color;
    canvas.freeDrawingBrush.width = brushSize;

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
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.color = color;
      canvas.freeDrawingBrush.width = brushSize;
      canvas.freeDrawingBrush.strokeLineCap = tipStyle;
      if (lineStyle !== 'solid') {
        canvas.freeDrawingBrush.strokeDashArray = lineStyle === 'dashed' ? [10, 5] : [2, 2];
      } else {
        canvas.freeDrawingBrush.strokeDashArray = [];
      }
    } else if (activeTool === 'highlighter') {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.color = `${color}44`; 
      canvas.freeDrawingBrush.width = brushSize * 5;
    } else if (activeTool === 'laser') {
       canvas.isDrawingMode = true;
       canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
       canvas.freeDrawingBrush.color = '#ef4444';
       canvas.freeDrawingBrush.width = 4;
       // Mock laser behavior: clear path after 1 second
       canvas.on('path:created', (e: any) => {
          setTimeout(() => canvas.remove(e.path), 1000);
       });
    } else if (activeTool === 'tape') {
       canvas.isDrawingMode = true;
       canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
       canvas.freeDrawingBrush.color = '#fde047'; // Tape yellow
       canvas.freeDrawingBrush.width = 40;
    } else if (activeTool === 'eraser') {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.color = '#fdfdfb'; 
      canvas.freeDrawingBrush.width = brushSize * 10;
    } else {
      canvas.isDrawingMode = false;
    }
  }, [activeTool, color, brushSize, tipStyle, lineStyle]);

  const clearCanvas = () => {
    fabricRef.current?.clear();
  };

  const undo = () => {
    // Basic undo logic
  };

  const exportAsImage = () => {
    const dataURL = fabricRef.current?.toDataURL({
      format: 'png',
      multiplier: 2,
    });
    if (dataURL) {
      const link = document.createElement('a');
      link.download = 'note.png';
      link.href = dataURL;
      link.click();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
      {/* Toolbar */}
      <div className="glass m-4 p-2 rounded-2xl flex items-center justify-between shadow-lg z-10">
        <div className="flex items-center gap-1">
          <ToolButton 
            active={activeTool === 'pen'} 
            onClick={() => setActiveTool('pen')}
            icon={<Pencil size={20} />}
            label="Pen"
          />
          <ToolButton 
            active={activeTool === 'highlighter'} 
            onClick={() => setActiveTool('highlighter')}
            icon={<Highlighter size={20} />}
            label="Highlighter"
          />
          <ToolButton 
            active={activeTool === 'eraser'} 
            onClick={() => setActiveTool('eraser')}
            icon={<Eraser size={20} />}
            label="Eraser"
          />
          <ToolButton 
            active={activeTool === 'laser'} 
            onClick={() => setActiveTool('laser')}
            icon={<Maximize2 size={20} className="rotate-45" />} 
            label="Laser Pointer"
          />
          <ToolButton 
            active={activeTool === 'tape'} 
            onClick={() => setActiveTool('tape')}
            icon={<Square size={20} className="fill-current opacity-50" />} 
            label="Masking Tape"
          />
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-2" />
          <div className="flex items-center gap-2 px-2">
            {['#000000', '#ef4444', '#3b82f6', '#10b981'].map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={cn(
                  "w-6 h-6 rounded-full border-2 transition-transform",
                  color === c ? "scale-125 border-slate-400" : "border-transparent"
                )}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-2" />
          
          <div className="flex items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-xl">
             {(['round', 'pointy'] as const).map(style => (
               <button 
                 key={style}
                 onClick={() => setTipStyle(style)}
                 className={cn("px-2 py-1 text-[10px] font-bold rounded-lg uppercase", tipStyle === style ? "bg-white dark:bg-slate-700 shadow-sm" : "text-slate-400")}
               >
                 {style}
               </button>
             ))}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <ToolButton onClick={undo} icon={<Undo2 size={20} />} label="Undo" />
          <ToolButton onClick={() => {}} icon={<Redo2 size={20} />} label="Redo" />
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-2" />
          <ToolButton onClick={clearCanvas} icon={<Trash2 size={20} />} label="Clear" />
          <ToolButton onClick={exportAsImage} icon={<Download size={20} />} label="Export" />
        </div>
      </div>

      {/* Canvas Area */}
      <div ref={containerRef} className="flex-1 relative mx-4 mb-4 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className={cn(
          "absolute inset-0 paper",
          paperStyle === 'ruled' && "paper-ruled",
          paperStyle === 'grid' && "paper-grid",
          paperStyle === 'dots' && "paper-dots"
        )} />
        <canvas ref={canvasRef} className="relative z-0" />
      </div>
    </div>
  );
};

const ToolButton = ({ active, onClick, icon, label }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "p-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 group",
      active 
        ? "bg-brand-primary text-white shadow-md scale-105" 
        : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
    )}
    title={label}
  >
    {icon}
  </button>
);
