import { ActionIcon, Box, Button, Card, Center, Checkbox, Grid, Group, Modal, Stack, Text } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconChevronLeft, IconChevronRight, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider";

function SavedContent({ page, setPage }) {
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const clipboard = useClipboard({ timeout: 1250 });
  const [selectedIds, setSelectedIds] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { getXsrfToken } = useAuth();

  const handleCopy = (content, id) => {
    clipboard.copy(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1250);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/saved?page=${page}`);
      if (!response.ok) {
        throw new Error("could not get data. Status: " + response.status)
      }
      const result = await response.json();

      setData(result);
      setTotalPages(result.page.totalPages)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleToggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(itemId => itemId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/saved', {
        method: 'DELETE',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          "X-XSRF-TOKEN": getXsrfToken(),
        },
        body: JSON.stringify(selectedIds)
      });

      if (!response.ok) {
        throw new Error("Failed to delete items");
      }
      console.log("deleted ", selectedIds.length, " items");

      setSelectedIds([]);
      setShowDeleteModal(false);
      fetchData();
    } catch (error) {
      console.error('Error deleting items:', error);
    }
  };


  if (loading || !data) {
    return <Center><Text size="sm">Loading...</Text></Center>;
  }

  return (
    <Stack gap="md" p="md" style={{ height: '100%', justifyContent: 'space-between' }}>
      <Grid gutter="lg">
        {data.content.map((item, index) => (
          <Grid.Col span={{ base: 12, md: 6 }} key={item.id}>
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ height: '350px', display: 'flex', flexDirection: 'column' }}
            >
              <Card.Section style={{ flex: 1, overflow: 'auto' }}>
                <Text size="sm" p="xs" style={{ whiteSpace: 'pre-wrap' }}>
                  {item.content}
                </Text>
              </Card.Section>

              <Group justify="space-between" mt="md">
                <Group>
                  <Checkbox
                    checked={selectedIds.includes(item.id)}
                    onChange={() => handleToggleSelect(item.id)}
                  />
                  <Text size="sm" c="dimmed">#{page * 4 + index + 1}</Text>
                </Group>
                <Text size="sm" c="dimmed">100x200 - {item.content.length} chars</Text>
                <Button
                  variant="light"
                  size="xs"
                  onClick={() => handleCopy(item.content, item.id)}
                >
                  {copiedId === item.id ? 'Copied!' : 'Copy'}
                </Button>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <Group justify="space-between" style={{ width: '100%' }}>
        <ActionIcon
          color="red"
          disabled={selectedIds.length === 0}
          onClick={() => setShowDeleteModal(true)}
        >
          <IconTrash size={20} />
        </ActionIcon>

        <Group>
          <Button
            variant="outline"
            onClick={() => setPage(p => p - 1)}
            disabled={page <= 0}
            leftSection={<IconChevronLeft size={16} />}
          >
            Previous
          </Button>

          <Text size="sm">
            Page {page + 1} of {totalPages}
          </Text>

          <Button
            variant="outline"
            onClick={() => setPage(p => p + 1)}
            disabled={page >= totalPages - 1}
            rightSection={<IconChevronRight size={16} />}
          >
            Next
          </Button>
        </Group>

        {/* Empty element to balance the space-between */}
        <Box style={{ width: 0 }} />
      </Group>

      <Modal
        opened={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
        centered
      >
        <Stack>
          <Text>Are you sure you want to delete {selectedIds.length} selected items?</Text>
          <Group justify="flex-end">
            <Button variant="light" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button color="red" onClick={handleDelete}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}
export default SavedContent;