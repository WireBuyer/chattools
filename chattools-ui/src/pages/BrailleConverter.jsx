import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  ScrollArea,
  Stack,
  Text,
  useComputedColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { useState } from "react";
import AsciiDisplay from "../features/AsciiDisplay";
import BrailleForm from "../features/BrailleForm";

function BrailleConverter() {

  const HEADER_HEIGHT = 60;

  const theme = useMantineTheme();
  const computedColorScheme = useComputedColorScheme();

  const [asciiText, setAsciiText] = useState("");
  const clipboard = useClipboard({ timeout: 1250 });

  return (
    <Flex
      direction="row"
      style={{
        height: "calc(100vh - 60px)",
        width: "100%"
      }}
    >

      <Box style={{
        flex: 1,
        overflow: "auto",
        padding: "10px 10px 10px 10px",
        scrollbarColor: "red orange",
        background: computedColorScheme === 'light' ? '#f0f4f8' : theme.colors.dark[7],
        height: "100%"
      }}>
        <AsciiDisplay asciiText={asciiText} />
      </Box>

      <Divider />

      <Stack>
        <ScrollArea style={{ width: "300px", padding: "10px", overflow: "auto" }}>
          <BrailleForm setAsciiText={setAsciiText} />
        </ScrollArea>

        <Center>
          <Group>
            <Text>Char count: {asciiText.length}</Text>
            <Button
              onClick={() => {
                if (asciiText.length > 1) clipboard.copy(asciiText);
              }
              }>
              {clipboard.copied ? 'Copied' : 'Copy Braille'}
            </Button>
          </Group>
        </Center>
      </Stack>
    </Flex>
  );
}

export default BrailleConverter;
