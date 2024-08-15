import { Box, Text, useComputedColorScheme } from "@mantine/core";
import { useState } from "react";

function AsciiDisplay({ asciiText }) {


  return (
    <Box
      style={{
        width: "100%",
        whiteSpace: "pre",
        fontFamily: "monospace",
      }}
    >
      <Text>{asciiText}</Text>
    </Box>
  );
}

export default AsciiDisplay;
