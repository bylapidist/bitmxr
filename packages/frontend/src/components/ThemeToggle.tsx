import { ActionIcon } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { useStore } from '../state/useStore';

export default function ThemeToggle() {
  const scheme = useStore((s) => s.colorScheme);
  const toggle = useStore((s) => s.toggleColorScheme);
  const dark = scheme === 'dark';
  return (
    <ActionIcon onClick={toggle} variant="outline" aria-label="Toggle theme">
      {dark ? <IconSun size={16} /> : <IconMoonStars size={16} />}
    </ActionIcon>
  );
}
