import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useRef } from 'react';
import useRoute from '@/Hooks/useRoute';
import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import { Input, Button } from '@nextui-org/react';

export default function UpdatePasswordForm() {
  const route = useRoute();
  const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });
  const passwordRef = useRef<HTMLInputElement>(null);
  const currentPasswordRef = useRef<HTMLInputElement>(null);

  function updatePassword() {
    form.put(route('user-password.update'), {
      errorBag: 'updatePassword',
      preserveScroll: true,
      onSuccess: () => form.reset(),
      onError: () => {
        if (form.errors.password) {
          form.reset('password', 'password_confirmation');
          passwordRef.current?.focus();
        }

        if (form.errors.current_password) {
          form.reset('current_password');
          currentPasswordRef.current?.focus();
        }
      },
    });
  }

  return (
    <FormSection
      onSubmit={updatePassword}
      title={'Update Password'}
      description={
        'Ensure your account is using a long, random password to stay secure.'
      }
      renderActions={() => (
        <>
          <ActionMessage on={form.recentlySuccessful} className="mr-3">
            Saved.
          </ActionMessage>

          <Button
            className={classNames({ 'opacity-25': form.processing })}
            disabled={form.processing}
            type="submit"
            color="primary"
            variant="solid"
          >
            Save
          </Button>
        </>
      )}
    >
      <div className="col-span-6 sm:col-span-4">
        <Input
          id="current_password"
          type="password"
          variant="bordered"
          label="Password"
          size="md"
          ref={currentPasswordRef}
          value={form.data.current_password}
          onChange={e =>
            form.setData('current_password', e.currentTarget.value)
          }
          validationState={form.errors.current_password ? 'invalid' : 'valid'}
          errorMessage={form.errors.current_password}
        />
      </div>

      <div className="col-span-6 sm:col-span-4">
        <Input
          id="password"
          type="password"
          variant="bordered"
          label="New Password"
          size="md"
          ref={passwordRef}
          value={form.data.password}
          onChange={e => form.setData('password', e.currentTarget.value)}
          validationState={form.errors.password ? 'invalid' : 'valid'}
          errorMessage={form.errors.password}
        />
      </div>

      <div className="col-span-6 sm:col-span-4">
        <Input
          id="password_confirmation"
          type="password"
          variant="bordered"
          label="Confirm Password"
          size="md"
          value={form.data.password_confirmation}
          onChange={e =>
            form.setData('password_confirmation', e.currentTarget.value)
          }
          validationState={form.errors.password ? 'invalid' : 'valid'}
          errorMessage={form.errors.password}
        />
      </div>
    </FormSection>
  );
}
