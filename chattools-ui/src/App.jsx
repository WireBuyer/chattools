import "@mantine/core/styles.css";
import { AppShell, Group, useMantineColorScheme, Text, ActionIcon, Button, useMantineTheme } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Page2 from './pages/Page2';
import { useState } from "react";
import { IconSun, IconMoon, IconSortAscendingShapesFilled } from "@tabler/icons-react";
import { NotFoundPage } from "./pages/NotFound";
import AsciiDisplay from "./features/AsciiDisplay/AsciiDisplay";

export default function App() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useMantineTheme();

  return (
    <Router>
      <AppShell 
      header={{ height: 60 }} 
      padding="0" 
      style={{
        minWidth: theme.breakpoints.xs,
        overflow: 'auto'
      }}>
        <AppShell.Header style={{ minWidth: theme.breakpoints.xs, }}>
          <Group justify="space-between" h="100%" px="md">
            <Text fw={10}>Your App Name</Text>
            <Group>
              <Link to="/">Page 1</Link>
              <Link to="/page2">Page 2</Link>
            </Group>
            <Group>
              <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                {colorScheme === 'dark' ? <IconSun size="1rem" /> : <IconMoon size="1rem" />}
              </ActionIcon>
              <Button>Login</Button>
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Main
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="page2" element={<Page2 />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </Router>
  );
}

// TODO:
// add noti for error