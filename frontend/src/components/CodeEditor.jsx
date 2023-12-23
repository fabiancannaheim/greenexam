import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import CodeMirror from "@uiw/react-codemirror";
import React, { useEffect, useRef } from "react";

const CodeEditor = ({ code, onCodeChange, runCode }) => {
  const theme = localStorage.getItem("theme");
  // const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

  return (
    <>
      <CodeMirror
        value={code}
        extensions={[python(), java()]}
        onChange={onCodeChange}
        height="500px"
        theme={theme}
        autoFocus={true}
      />
      <button onClick={runCode} className="btn btn-primary">
        Run Code
      </button>
    </>
  );
};

export default CodeEditor;
