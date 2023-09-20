import { Link, useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import { Button, Checkbox, Input, Link as NextLink } from '@nextui-org/react';
import { Eye, EyeOff } from 'lucide-react';
import useTypedPage from '@/Hooks/useTypedPage';

interface Props {
  canResetPassword: boolean;
  status: string;
}

export default function Login({ canResetPassword, status }: Props) {
  const route = useRoute();
  const page = useTypedPage();
  const form = useForm({
    email: '',
    password: '',
    remember: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('login'), {
      onFinish: () => form.reset('password'),
    });
  }

  return (
    <AuthenticationCard heading="Log In To Highland">
      {status && (
        <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
          {status}
        </div>
      )}

      <Head title="Login" />

      <form onSubmit={onSubmit}>
        <div>
          <Input
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

        <div className="mt-4">
          <Input
            required
            type={passwordVisible ? 'text' : 'password'}
            variant="bordered"
            label="Password"
            size="md"
            value={form.data.password}
            onChange={e => form.setData('password', e.currentTarget.value)}
            onFocus={() => form.clearErrors()}
            validationState={form.errors.password ? 'invalid' : 'valid'}
            errorMessage={form.errors.password}
            endContent={
              <Button
                isIconOnly
                color="default"
                variant="light"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <Eye /> : <EyeOff />}
              </Button>
            }
          />
        </div>

        <div className="mt-4">
          <Checkbox
            isSelected={form.data.remember === 'on'}
            onChange={e =>
              form.setData('remember', e.currentTarget.checked ? 'on' : '')
            }
          >
            Remember Me?
          </Checkbox>
        </div>

        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0 mt-4">
          {canResetPassword && (
            <NextLink
              className="pr-4"
              size="md"
              color="foreground"
              underline="hover"
            >
              <Link href={route('password.request')}>
                Forgot your password?
              </Link>
            </NextLink>
          )}

          <div className="flex items-center justify-end">
            <NextLink size="md" color="foreground" underline="hover">
              <Link href={route('register')}>Need an account?</Link>
            </NextLink>

            <Button
              type="submit"
              variant="solid"
              color="primary"
              disabled={form.processing}
              className="ml-4 font-bold"
            >
              Log In
            </Button>
          </div>
        </div>
      </form>
    </AuthenticationCard>
  );
}
