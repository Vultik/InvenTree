import { Trans } from '@lingui/macro';
import { Button, Group, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useToggle } from '@mantine/hooks';

import { api } from '../../../../App';
import { EditButton } from '../../../../components/items/EditButton';
import { ApiPaths } from '../../../../enums/ApiEndpoints';
import { apiUrl } from '../../../../states/ApiState';
import { useUserState } from '../../../../states/UserState';

export function AccountDetailPanel() {
  const [user, fetchUserState] = useUserState((state) => [
    state.user,
    state.fetchUserState
  ]);
  const form = useForm({ initialValues: user });
  const [editing, setEditing] = useToggle([false, true] as const);
  function SaveData(values: any) {
    api.put(apiUrl(ApiPaths.user_me), values).then((res) => {
      if (res.status === 200) {
        setEditing();
        fetchUserState();
      }
    });
  }

  return (
    <form onSubmit={form.onSubmit((values) => SaveData(values))}>
      <Group>
        <Title order={3}>
          <Trans>Account Details</Trans>
        </Title>
        <EditButton setEditing={setEditing} editing={editing} />
      </Group>
      <Group>
        {editing ? (
          <Stack spacing="xs">
            <TextInput
              label="First name"
              placeholder="First name"
              {...form.getInputProps('first_name')}
            />
            <TextInput
              label="Last name"
              placeholder="Last name"
              {...form.getInputProps('last_name')}
            />
            <Group position="right" mt="md">
              <Button type="submit">
                <Trans>Submit</Trans>
              </Button>
            </Group>
          </Stack>
        ) : (
          <Stack spacing="0">
            <Text>
              <Trans>First name: {form.values.first_name}</Trans>
            </Text>
            <Text>
              <Trans>Last name: {form.values.last_name}</Trans>
            </Text>
          </Stack>
        )}
      </Group>
    </form>
  );
}
