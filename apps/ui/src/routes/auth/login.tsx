import { Link, createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { House } from 'lucide-react';

import { AuthForm } from '@/components';
import { LoginSchema } from '@/schemas/auth';

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation('auth');
  const loginSchema = LoginSchema(t);

  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <Link
            to='/'
            className='flex items-center gap-2 font-medium'
          >
            <div className='bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md'>
              <House className='size-4' />
            </div>
            Streamly
          </Link>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <AuthForm
              heading={t('heading')}
              subheading={t('subheading')}
              fields={[
                {
                  id: 'email',
                  type: 'email',
                  label: t('email'),
                  placeholder: 'm@example.com',
                },
                {
                  id: 'password',
                  type: 'password',
                  label: t('password'),
                  link: {
                    text: t('forgotPassword'),
                    to: '/auth/forgot-password',
                  },
                },
              ]}
              submitLabel={t('login')}
              showGoogleButton
              googleButtonLabel={t('loginWithGoogle')}
              alternateLink={{
                text: t('noAccount'),
                to: '/auth/signup',
                label: t('signup'),
              }}
              validationSchema={loginSchema}
              onSubmit={() => {}}
            />
          </div>
        </div>
      </div>
      <div className='bg-muted relative hidden lg:block'>
        <img
          src={'/Login.svg'}
          alt='Login'
          className='absolute inset-0 h-full w-full dark:brightness-[0.7]'
        />
      </div>
    </div>
  );
}
