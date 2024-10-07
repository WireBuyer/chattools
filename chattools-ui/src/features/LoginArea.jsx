import { Avatar, Box, Button, Group, Loader, Menu, Text } from "@mantine/core";
import { useAuth } from "../AuthProvider";
import { IconChevronDown, IconLogout } from "@tabler/icons-react";

function LoginArea() {
  const { isLoggedIn, user, logout } = useAuth();

  if (isLoggedIn === null) {
    return <Loader size="sm" />;
  }

  if (isLoggedIn) {
    return (
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Group gap="xs" style={{ cursor: 'pointer' }}>
            <Avatar src={user.avatarUrl} alt={user.name} radius="xl" size="md" />
            <Text>{user.name}</Text>
            <IconChevronDown size={14} />
          </Group>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconLogout size={14} />}
            onClick={logout}
          >
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  }

    return (
    <Button component="a" href="/api/login/oauth2/authorization/twitch">
      Login
    </Button>
  );
}

export default LoginArea;