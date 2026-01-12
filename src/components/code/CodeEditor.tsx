import React from 'react';

interface CodeEditorProps {
  code?: string;
  language?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  height?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ 
  code = '',
  language = 'javascript',
  onChange,
  readOnly = false,
  height = '300px'
}) => {
  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden" style={{ height }}>
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex justify-between items-center">
        <span className="text-sm text-gray-300 font-mono">{language}</span>
        <button 
          onClick={() => navigator.clipboard.writeText(code)}
          className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
        >
          复制
        </button>
      </div>
      <textarea
        value={code}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={readOnly}
        className="w-full h-full bg-gray-900 text-gray-100 p-4 font-mono text-sm
                 focus:outline-none resize-none"
        style={{ 
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
          lineHeight: '1.5'
        }}
      />
    </div>
  );
};
