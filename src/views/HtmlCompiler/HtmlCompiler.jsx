import { useEffect, useRef, useState } from 'react';
import * as CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/addon/hint/css-hint.js';
import 'codemirror/addon/hint/javascript-hint.js';
import 'codemirror/addon/hint/html-hint.js';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/edit/closetag.js';

export default function HtmlCompiler() {
  const editorRef = useRef(null);
  const textareaRef = useRef(null);
  const [compilerResult, setCompilerResult] = useState('');

  useEffect(() => {
    if (textareaRef.current) {
      editorRef.current = CodeMirror.fromTextArea(textareaRef.current, {
        lineNumbers: true,
        theme: 'dracula',
        mode: 'htmlmixed',
        autoCloseTags: true,
        extraKeys: { 'Ctrl-Space': 'autocomplete' },
      });
      editorRef.current.setSize('100%', '60vh');
    }
  }, []);

  const compileJsCode = () => {
    if (!editorRef.current) return;
    setCompilerResult(editorRef.current.getValue());
  };

  const copyCode = () => {
    if (!editorRef.current) return;
    navigator.clipboard.writeText(editorRef.current.getValue());
    alert('Text copied to clipboard!');
  };

  return (
    <div className="w-100 bg-transparent">
      <header className="dark:bg-gray-800 bg-primary-100 dark:text-white p-2 flex px-4 shadow-sm">
        <img src="/src/assets/icons/htmlicon.svg" className="w-12" alt="HTML" />
        <p className="ms-4 mt-4 font-bold text-xl">Html Compiler</p>
      </header>
      <main className="dark:bg-gray-700 bg-slate-50 md:p-4">
        <div className="w-100 md:flex">
          <div className="pe-4 w-full">
            <div className="text-right mb-2">
              <button
                onClick={compileJsCode}
                className="bg-primary-500 h-10 mt-4 text-center px-3 rounded-md hover:bg-primary-800 hover:shadow-md text-white"
              >
                Run
              </button>
              <button
                onClick={copyCode}
                className="bg-slate-300 ms-2 h-10 text-center px-3 rounded-md hover:bg-slate-400 hover:shadow-md"
              >
                Copy Code
              </button>
            </div>
            <textarea ref={textareaRef} id="editor" />
          </div>
          <div className="p-1 logger-height bg-white basis-4/6 overflow-y-scroll">
            <iframe className="w-full h-full" title="Result" srcDoc={compilerResult} />
          </div>
        </div>
      </main>
    </div>
  );
}
