import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";
import React, { useState } from "react";
import Output from "./Output";
import Prompt from "./Prompt";
import ResizableTile from "./ResizeableTile";
import Tests from "./Tests";

import "./App.css";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const tests = [
    "Test 1: Check for syntax errors",
    "Test 2: Check for logic errors",
  ];

  const onChange = React.useCallback((value, viewUpdate) => {
    // TODO: Track every change
    // console.log("value:", value);
  }, []);

  const runCode = () => {
    // You can implement code execution here and update the 'output' state.
    // For simplicity, let's assume it's just echoing the code.
    setOutput(code);
  };

  return (
    <div className="app">
      <ResizableTile>
        <Prompt promptText="Write a function that adds two numbers." />
      </ResizableTile>

      <ResizableTile width={400} height={300}>
        {/* <CodeEditor code={code} onChange={handleCodeChange} /> */}
        <CodeMirror
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
        />
        <button onClick={runCode}>Run Code</button>
      </ResizableTile>

      <ResizableTile>
        <Output output={output} />
      </ResizableTile>

      <ResizableTile>
        <Tests tests={tests} />
      </ResizableTile>
    </div>
  );
}
export default App;
