import { useId } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Switch } from '@/components/ui/switch';

export function ThemeSwitch() {
  const id = useId();
  const { theme, setTheme } = useTheme();

  return (
    <div
      className='group inline-flex items-center gap-2'
      data-state={theme === 'light' ? 'checked' : 'unchecked'}
    >
      <span
        className='flex-1 cursor-pointer text-right text-sm font-medium group-data-[state=checked]:text-zinc-500/70 dark:group-data-[state=checked]:text-zinc-400/70'
        aria-controls={id}
        onClick={() => setTheme('dark')}
      >
        <MoonIcon
          size={16}
          aria-hidden='true'
        />
      </span>
      <Switch
        id={id}
        checked={theme === 'light'}
        onCheckedChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        aria-labelledby={`${id}-off ${id}-on`}
        aria-label='Toggle between dark and light mode'
      />
      <span
        className='flex-1 cursor-pointer text-left text-sm font-medium group-data-[state=unchecked]:text-zinc-500/70 dark:group-data-[state=unchecked]:text-zinc-400/70'
        aria-controls={id}
        onClick={() => setTheme('light')}
      >
        <SunIcon
          size={16}
          aria-hidden='true'
        />
      </span>
    </div>
  );
}
