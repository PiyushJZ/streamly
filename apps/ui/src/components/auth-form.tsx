import { Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { z } from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip } from '@/components';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField as ShadFormField,
} from '@/components/ui/form';

// ------------ Types ------------

interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  tooltip?: Array<string>;
  link?: {
    text: string;
    to: string;
  };
}

interface AuthFormProps {
  heading: string;
  subheading: string;
  fields: Array<FormField>;
  submitLabel: string;
  alternateLink?: { text: string; to: string; label: string };
  googleButtonLabel?: string;
  showGoogleButton?: boolean;
  validationSchema: z.ZodSchema<any>;
  onSubmit: (values: any) => void;
  className?: string;
}

// ------------ Component ------------

export function AuthForm({
  heading,
  subheading,
  fields,
  submitLabel,
  alternateLink,
  googleButtonLabel,
  showGoogleButton = false,
  validationSchema,
  onSubmit,
  className,
}: AuthFormProps) {
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: fields.reduce(
      (acc, field) => {
        acc[field.id] = '';
        return acc;
      },
      {} as Record<string, string>,
    ),
  });

  const { t } = useTranslation('auth');

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('flex flex-col gap-6', className)}
      >
        <div className='flex flex-col items-center gap-2 text-center'>
          <h1 className='text-2xl font-bold'>{heading}</h1>
          <p className='text-muted-foreground text-sm text-balance'>
            {subheading}
          </p>
        </div>

        <div className='grid gap-6'>
          {fields.map(field => (
            <ShadFormField
              key={field.id}
              control={form.control}
              name={field.id}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel className='flex items-center justify-between'>
                    <span className='flex items-center'>
                      {field.label}
                      {field.tooltip ? (
                        <Tooltip
                          trigger={<Info className='ml-1 h-4 w-4' />}
                          content={
                            <ul className='text-xs'>
                              {field.tooltip.map((tip, idx) => (
                                <li key={idx}>{tip}</li>
                              ))}
                            </ul>
                          }
                        />
                      ) : null}
                    </span>
                    {field.link ? (
                      <Link
                        to={field.link.to}
                        className='text-sm underline underline-offset-4'
                      >
                        {field.link.text}
                      </Link>
                    ) : null}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      {...formField}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            type='submit'
            className='w-full'
          >
            {submitLabel}
          </Button>

          {showGoogleButton && (
            <>
              <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                <span className='bg-background text-muted-foreground relative z-10 px-2'>
                  {t('orContinueWith')}
                </span>
              </div>
              <Button
                variant='outline'
                className='w-full'
              >
                <img
                  src='/icons/Google.svg'
                  className='h-4 w-4'
                />
                {googleButtonLabel}
              </Button>
            </>
          )}
        </div>

        {alternateLink && (
          <div className='text-center text-sm'>
            {alternateLink.text}{' '}
            <Link
              to={alternateLink.to}
              className='underline underline-offset-4'
            >
              {alternateLink.label}
            </Link>
          </div>
        )}
      </form>
    </Form>
  );
}
