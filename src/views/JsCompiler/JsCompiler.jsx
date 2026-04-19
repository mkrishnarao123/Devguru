import { useEffect, useRef, useState } from 'react';
import * as CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';

export default function JsCompiler() {
  const editorRef = useRef(null);
  const [compilerResult, setCompilerResult] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    initCodeEditor();
  }, []);

  const initCodeEditor = () => {
    if (textareaRef.current) {
      editorRef.current = CodeMirror.fromTextArea(textareaRef.current, {
        lineNumbers: true,
        theme: 'dracula',
        mode: 'javascript',
      });
      editorRef.current.setSize('100%', '60vh');
    }
  };

  const runCode = (code) => {
    const logOutput = [];
    const originalConsoleLog = console.log;

    try {
      console.log = (...args) => {
        logOutput.push(args.join(' '));
        originalConsoleLog.apply(console, args);
      };
      const func = new Function(code);
      const result = func();
      logOutput.push(result !== undefined ? result : '');
    } catch (error) {
      logOutput.push('Compile Error: ' + error.message);
    } finally {
      console.log = originalConsoleLog;
    }

    return logOutput;
  };

  const compileJsCode = () => {
    if (!editorRef.current) return;
    const getdata = editorRef.current.getValue();
    setCompilerResult(runCode(getdata));
  };

  const copyCode = () => {
    if (!editorRef.current) return;
    const getdata = editorRef.current.getValue();
    navigator.clipboard.writeText(getdata);
    alert('Text copied to clipboard!');
  };

  return (
    <div className="w-100 bg-transparent">
      <header className="dark:bg-gray-800 bg-primary-100 dark:text-white p-2 flex px-4 shadow-sm">
        <img src="/src/assets/icons/jslogo.svg" className="w-12" alt="JS" />
        <p className="ms-4 mt-4 font-bold text-xl">JS Compiler</p>
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
              <button className="bg-slate-300 ms-2 h-10 text-center px-3 rounded-md hover:bg-slate-400 hover:shadow-md">
                Log Messages :{compilerResult && compilerResult.length}
              </button>
            </div>
            <div>
              <textarea ref={textareaRef} id="editor" />
            </div>
          </div>
          <div className="p-4 logger-height bg-white basis-4/6 overflow-y-scroll">
            <div>
              <ul>
                {compilerResult.map((result, index) => (
                  <li key={index} className="flex justify-center items-center">
                    {index}.
                    <p className={`m-2 p-2 w-full ${result.includes('Compile Error') ? 'bg-red-50' : 'bg-green-50'}`}>
                      {result}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
