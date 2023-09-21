import { Link, useForm, Head } from '@inertiajs/react';
import React, { useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import AuthenticationCard from '@/Components/AuthenticationCard';
import { Button, Input, Link as NextLink, Checkbox } from '@nextui-org/react';
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const page = useTypedPage();
  const route = useRoute();
  const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confPasswordVisible, setConfPasswordVisible] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('register'), {
      onFinish: () => form.reset('password', 'password_confirmation'),
    });
  }

  return (
    <AuthenticationCard heading="Register For An Account">
      <Head title="Register" />

      <div className="w-96">
        <form onSubmit={onSubmit}>
          <div>
            <Input
              required
              autoFocus
              type="text"
              variant="bordered"
              label="Full Name"
              size="md"
              value={form.data.name}
              onChange={e => form.setData('name', e.currentTarget.value)}
              validationState={form.errors.name ? 'invalid' : 'valid'}
              errorMessage={form.errors.name}
            />
          </div>

          <div className="mt-4">
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
            <Input
              required
              type={confPasswordVisible ? 'text' : 'password'}
              variant="bordered"
              label="Confirm Password"
              size="md"
              value={form.data.password_confirmation}
              onChange={e =>
                form.setData('password_confirmation', e.currentTarget.value)
              }
              onFocus={() => form.clearErrors()}
              validationState={
                form.errors.password_confirmation ? 'invalid' : 'valid'
              }
              errorMessage={form.errors.password_confirmation}
              endContent={
                <Button
                  isIconOnly
                  color="default"
                  variant="light"
                  onClick={() => setConfPasswordVisible(!confPasswordVisible)}
                >
                  {confPasswordVisible ? <Eye /> : <EyeOff />}
                </Button>
              }
            />
          </div>

          {page.props.jetstream.hasTermsAndPrivacyPolicyFeature && (
            <div className="mt-4">
              <Input
                validationState={form.errors.terms ? 'invalid' : 'valid'}
                errorMessage={form.errors.terms}
              >
                <div className="flex items-center">
                  <Checkbox
                    name="terms"
                    id="terms"
                    checked={form.data.terms}
                    onChange={e =>
                      form.setData('terms', e.currentTarget.checked)
                    }
                    required
                  />

                  <div className="ml-2">
                    I agree to the
                    <a
                      target="_blank"
                      href={route('terms.show')}
                      className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                      Terms of Service
                    </a>
                    and
                    <a
                      target="_blank"
                      href={route('policy.show')}
                      className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                      Privacy Policy
                    </a>
                  </div>
                </div>
              </Input>
            </div>
          )}

          <div className="flex items-center justify-end mt-4">
            <NextLink size="md" color="foreground" underline="hover">
              <Link href={route('login')}>Already registered?</Link>
            </NextLink>

            <Button
              type="submit"
              variant="solid"
              color="primary"
              disabled={form.processing}
              className="ml-4 font-bold"
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </AuthenticationCard>
  );
}
