import React, { useEffect, useRef } from "react";

const CodeEditor = ({ code, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    // Initialize CodeMirror
    const codeMirror = window.CodeMirror(editorRef.current, {
      value: code,
      mode: "python",
      theme: "material",
      lineNumbers: true,
    });

    // Attach a change event listener to CodeMirror
    codeMirror.on("change", (instance) => {
      // Get the updated code
      const newCode = instance.getValue();

      // Call the parent component's onChange callback
      onChange(newCode);
    });

    return () => {
      // Clean up CodeMirror instance when the component unmounts
      codeMirror.toTextArea();
    };
  }, [code, onChange]);

  // return <div ref={editorRef} />;
  return (
    <div className="code-editor">
      <h2>Code Editor</h2>
      <textarea ref={editorRef} defaultValue={code} />
    </div>
  );
};

export default CodeEditor;
