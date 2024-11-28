import { useCallback, useRef } from "react";

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
        display: 'inline-block',
        userSelect: 'text',
      }}
    >
      {asciiText}
    </div>
  );
}

export default AsciiDisplay;