import { Box, Button, Center, Flex, Text } from "@mantine/core";
import { useState } from "react";

// just a test page keep for now and remove later
function Test() {
  const [responseText, setResponseText] = useState('waiting');

  const handleFetchState = async () => {
    try {
      const response = await fetch('/api/me');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const res = await response.json();
      setResponseText("Logged in as: " + res["name"]);
    } catch (error) {
      console.error('Fetch error:', error);
      setResponseText('Error fetching data');
    }
  };

  return (
    <Flex h="600px">
      <Box w="50%" h="100%">
        <Center h="100%">
          <Box>
            <Button onClick={handleFetchState} mb="md">
              Fetch State
            </Button>
            {responseText && (
              <Text>
                {responseText}
              </Text>
            )}
          </Box>
        </Center>
      </Box>

      <Box w="50%" h="100%">
        <Center h="100%">
          <Box>
            <Button onClick={() => console.log("clicked test button")}>
              Test
            </Button>
          </Box>
        </Center>
      </Box>
    </Flex>
  );
}

export default Test;