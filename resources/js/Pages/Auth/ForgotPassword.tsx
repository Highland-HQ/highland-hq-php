import { useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { Button, Input } from '@nextui-org/react';

interface Props {
  status: string;
}

export default function ForgotPassword({ status }: Props) {
  const route = useRoute();
  const form = useForm({
    email: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('password.email'));
  }

  return (
    <AuthenticationCard heading="Forgot Your Password?">
      <Head title="Forgot Password" />

      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        No problem. Just let us know your email address and we will email you a
        password reset link that will allow you to choose a new one.
      </div>

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
          {status}
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className=" mb-4">
          <Input
            required
            type="email"
            variant="bordered"
            label="Email"
            size="md"
            value={form.data.email}
            onChange={e => form.setData('email', e.currentTarget.value)}
            validationState={form.errors.email ? 'invalid' : 'valid'}
            errorMessage={form.errors.email}
          />
        </div>

        <div className="flex items-center justify-end">
          <Button
            type="submit"
            variant="solid"
            color="primary"
            disabled={form.processing}
          >
            Email Password Reset Link
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
}
