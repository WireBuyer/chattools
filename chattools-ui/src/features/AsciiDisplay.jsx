import { useRef, useCallback } from "react";

function AsciiDisplay({ asciiText }) {
  const textRef = useRef(null);

  const handleKeyDown = useCallback((event) => {
    if (event.ctrlKey && event.key === 'a') {
      event.preventDefault();
      
      const range = document.createRange();
      range.selectNodeContents(textRef.current);
      
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, []);

  return (
    <div
      ref={textRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{
        fontFamily: 'monospace',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        display: 'inline-block',
        minWidth: '100%',
        margin: 0,
        padding: 0,
        overflow: 'auto',
        userSelect: 'text',
        outline: 'none',
      }}
    >
      {asciiText}
    </div>
  );
}

export default AsciiDisplay;