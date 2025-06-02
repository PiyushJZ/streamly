import { Link, createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { House } from 'lucide-react';

import { AuthForm } from '@/components';
import { ForgotPasswordSchema } from '@/schemas/auth';

export const Route = createFileRoute('/auth/forgot-password')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation('auth');
  const forgotPasswordSchema = ForgotPasswordSchema(t);

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
              heading={t('forgotPassword')}
              subheading={t('subheading3')}
              fields={[
                {
                  id: 'email',
                  type: 'email',
                  label: t('email'),
                  placeholder: 'you@example.com',
                },
              ]}
              submitLabel={t('sendResetLink')}
              alternateLink={{
                text: t('rememberPassword'),
                to: '/auth/login',
                label: t('goBackToLogin'),
              }}
              validationSchema={forgotPasswordSchema}
              onSubmit={() => {}}
            />
          </div>
        </div>
      </div>
      <div className='bg-muted relative hidden lg:block'>
        <img
          src='/ForgotPassword.svg'
          alt='Forgot Password'
          className='absolute inset-0 h-full w-full dark:brightness-[0.7]'
        />
      </div>
    </div>
  );
}
