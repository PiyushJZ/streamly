import { createFileRoute } from '@tanstack/react-router';
import { ThemeSwitch } from '@/components';
import { FlipWords } from '@/components/ui/flip-words';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  const words = ['Youtube', 'Twitch', 'Instagram', 'Facebook', 'TikTok'];

  return (
    <>
      <ThemeSwitch />
      <div className='flex h-[40rem] items-center justify-center px-4'>
        <div className='mx-auto text-4xl font-normal text-neutral-600 dark:text-neutral-400'>
          Stream to
          <FlipWords
            words={words}
            duration={1000}
          />{' '}
          <br />
          directly from Streamly
        </div>
      </div>
    </>
  );
}
