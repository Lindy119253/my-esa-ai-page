import React, { useCallback } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  language: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  language,
  onChange,
  readOnly = false,
}) => {
  const handleEditorChange = useCallback((value: string | undefined) => {
    onChange?.(value || '');
  }, [onChange]);

  return (
    <div className="h-full border border-gray-700 rounded">
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={handleEditorChange}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default CodeEditor;
