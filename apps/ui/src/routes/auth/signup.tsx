import { Link, createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { House } from 'lucide-react';

import { AuthForm } from '@/components';
import { SignupSchema } from '@/schemas/auth';

export const Route = createFileRoute('/auth/signup')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation('auth');
  const signupSchema = SignupSchema(t);

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
              heading={t('heading2')}
              subheading={t('subheading2')}
              fields={[
                {
                  id: 'name',
                  type: 'text',
                  label: t('name'),
                  placeholder: 'John Doe',
                },
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
                  tooltip: [
                    t('minimumLength'),
                    t('minimumUpper'),
                    t('minimumLower'),
                    t('minimumNumber'),
                    t('minimumSymbol'),
                  ],
                },
                {
                  id: 'confirmPassword',
                  type: 'password',
                  label: t('confirmPassword'),
                },
              ]}
              submitLabel={t('signup')}
              showGoogleButton
              googleButtonLabel={t('signupWithGoogle')}
              alternateLink={{
                text: t('alreadyAccount'),
                to: '/auth/login',
                label: t('login2'),
              }}
              validationSchema={signupSchema}
              onSubmit={() => {}}
            />
          </div>
        </div>
      </div>
      <div className='bg-muted relative hidden lg:block'>
        <img
          src='/Signup.svg'
          alt='Sign up'
          className='absolute inset-0 h-full w-full dark:brightness-[0.7]'
        />
      </div>
    </div>
  );
}
