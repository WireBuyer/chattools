import { ActionIcon, AppShell, Group, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import "@mantine/core/styles.css";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { lazy, Suspense } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginArea from './features/LoginArea';

const BrailleConverter = lazy(() => import('./pages/BrailleConverter'));
const TileMaker = lazy(() => import('./pages/TileMaker'));
const Test = lazy(() => import('./pages/Test'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
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
              <Link to="/">Braille Converter</Link>
              <Link to="/TileMaker">Tile Maker</Link>
            </Group>
            <Group>
              <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                {colorScheme === 'dark' ? <IconSun size="1rem" /> : <IconMoon size="1rem" />}
              </ActionIcon>
              <LoginArea />
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Main>
          {/* TODO: use a data router to take advantage of 6.4's api, namely lazy in place of element for lazy loading */}
          <Suspense>
            <Routes>
              <Route path="/" element={<BrailleConverter />} />
              <Route path="tilemaker" element={<TileMaker />} />
              <Route path="test" element={<Test />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AppShell.Main>
      </AppShell>
    </Router>
  );
}