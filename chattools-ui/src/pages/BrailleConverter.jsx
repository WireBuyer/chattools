import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  ScrollArea,
  Stack,
  Tabs,
  Text,
  useComputedColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { useState } from "react";
import AsciiDisplay from "../features/AsciiDisplay";
import BrailleForm from "../features/BrailleForm";
import SavedContent from "../features/SavedContent";

function BrailleConverter() {
  const HEADER_HEIGHT = 60;

  const theme = useMantineTheme();
  const computedColorScheme = useComputedColorScheme();

  const [asciiText, setAsciiText] = useState("");
  const clipboard = useClipboard({ timeout: 1250 });

  const [activeTab, setActiveTab] = useState('ascii');
  const [savedPage, setSavedPage] = useState(0);


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
        height: "100%",
      }}>
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          style={{
            position: 'absolute',
            right: 330,
            top: 70,
            zIndex: 1,
            background: computedColorScheme === 'light' ? '#f0f4f8' : theme.colors.dark[7],
            padding: '5px',
            borderRadius: theme.radius.md,
            boxShadow: computedColorScheme === 'light'
              ? '0 2px 4px rgba(0,0,0,0.1)'
              : '0 2px 4px rgba(255,255,255,0.1)',
            border: `1px solid ${computedColorScheme === 'light'
              ? theme.colors.gray[3]
              : theme.colors.dark[4]
              }`,
          }}
        >
          <Tabs.List>
            <Tabs.Tab value="ascii" style={{
              backgroundColor: activeTab === 'ascii'
                ? (computedColorScheme === 'light' ? theme.colors.blue[1] : theme.colors.blue[9])
                : 'transparent'
            }}>ASCII Art</Tabs.Tab>
            <Tabs.Tab value="saved" style={{
              backgroundColor: activeTab === 'saved'
                ? (computedColorScheme === 'light' ? theme.colors.blue[1] : theme.colors.blue[9])
                : 'transparent'
            }}>Saved</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        {activeTab === 'ascii' ? <AsciiDisplay asciiText={asciiText} /> : <SavedContent page={savedPage} setPage={setSavedPage} />}
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
