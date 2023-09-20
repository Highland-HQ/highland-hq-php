import { useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import { Input, Button } from '@nextui-org/react';

export default function ConfirmPassword() {
  const route = useRoute();
  const form = useForm({
    password: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('password.confirm'), {
      onFinish: () => form.reset(),
    });
  }

  return (
    <AuthenticationCard heading="Confirm Password">
      <Head title="Secure Area" />

      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        This is a secure area of the application. Please confirm your password
        before continuing.
      </div>

      <form onSubmit={onSubmit}>
        <div>
          <Input
            id="password"
            label="Password"
            type="password"
            className="mt-1 block w-full"
            value={form.data.password}
            onChange={e => form.setData('password', e.currentTarget.value)}
            autoFocus
            validationState={form.errors.password ? 'invalid' : 'valid'}
            errorMessage={form.errors.password}
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button
            type="submit"
            variant="solid"
            color="primary"
            disabled={form.processing}
            className={classNames('ml-4', { 'opacity-25': form.processing })}
          >
            Confirm
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
}
