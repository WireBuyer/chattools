import { ActionIcon, AppShell, Button, Group, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import "@mantine/core/styles.css";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { NotFoundPage } from "./pages/NotFound";
import TileMaker from './pages/TileMaker';

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
              <Link to="/">Home</Link>
              <Link to="/TileMaker">Tile Maker</Link>
            </Group>
            <Group>
              <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                {colorScheme === 'dark' ? <IconSun size="1rem" /> : <IconMoon size="1rem" />}
              </ActionIcon>
              <Button>Login</Button>
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="TileMaker" element={<TileMaker />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </Router>
  );
}