import { useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import { Button, Input } from '@nextui-org/react';

interface Props {
  token: string;
  email: string;
}

export default function ResetPassword({ token, email }: Props) {
  const route = useRoute();
  const form = useForm({
    token,
    email,
    password: '',
    password_confirmation: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('password.update'), {
      onFinish: () => form.reset('password', 'password_confirmation'),
    });
  }

  return (
    <AuthenticationCard heading="Reset Your Password">
      <Head title="Reset Password" />

      <form onSubmit={onSubmit}>
        <div>
          <Input
            id="email"
            type="email"
            label="Email"
            className="mt-1 block w-full"
            value={form.data.email}
            onChange={e => form.setData('email', e.currentTarget.value)}
            required
            autoFocus
            validationState={form.errors.email ? 'invalid' : 'valid'}
            errorMessage={form.errors.email}
          />
        </div>

        <div className="mt-4">
          <Input
            id="password"
            type="email"
            label="Email"
            className="mt-1 block w-full"
            value={form.data.password}
            onChange={e => form.setData('password', e.currentTarget.value)}
            required
            autoComplete="new-password"
            validationState={form.errors.password ? 'invalid' : 'valid'}
            errorMessage={form.errors.password}
          />
        </div>

        <div className="mt-4">
          <Input
            id="password_confirmation"
            type="password"
            label="Confirm Password"
            className="mt-1 block w-full"
            value={form.data.password_confirmation}
            onChange={e =>
              form.setData('password_confirmation', e.currentTarget.value)
            }
            required
            autoComplete="new_password"
            validationState={
              form.errors.password_confirmation ? 'invalid' : 'valid'
            }
            errorMessage={form.errors.password_confirmation}
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Button
            type="submit"
            variant="solid"
            color="primary"
            disabled={form.processing}
            className={classNames({ 'opacity-25': form.processing })}
          >
            Reset Password
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
}
