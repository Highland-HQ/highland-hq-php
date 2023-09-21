import { router } from '@inertiajs/core';
import { Link, useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import { User } from '@/types';
import useTypedPage from '@/Hooks/useTypedPage';
import { Input, Button } from '@nextui-org/react';

interface Props {
  user: User;
}

export default function UpdateProfileInformationForm({ user }: Props) {
  const form = useForm({
    _method: 'PUT',
    name: user.name,
    email: user.email,
    photo: null as File | null,
  });
  const route = useRoute();
  const photoRef = useRef<HTMLInputElement>(null);
  const page = useTypedPage();
  const [verificationLinkSent, setVerificationLinkSent] = useState(false);

  function updateProfileInformation() {
    form.post(route('user-profile-information.update'), {
      errorBag: 'updateProfileInformation',
      preserveScroll: true,
      onSuccess: () => clearPhotoFileInput(),
    });
  }

  function clearPhotoFileInput() {
    if (photoRef.current?.value) {
      photoRef.current.value = '';
      form.setData('photo', null);
    }
  }

  return (
    <FormSection
      onSubmit={updateProfileInformation}
      title={'Profile Information'}
      description={`Update your account's profile information and email address.`}
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
          >
            Save
          </Button>
        </>
      )}
    >
      {/* <!-- Name --> */}
      <div className="col-span-6 sm:col-span-4">
        <Input
          type="name"
          variant="bordered"
          label="Name"
          size="md"
          value={form.data.name}
          onChange={e => form.setData('name', e.currentTarget.value)}
          validationState={form.errors.name ? 'invalid' : 'valid'}
          errorMessage={form.errors.name}
        />
      </div>

      {/* <!-- Email --> */}
      <div className="col-span-6 sm:col-span-4">
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

        {page.props.jetstream.hasEmailVerification &&
        user.email_verified_at === null ? (
          <div>
            <p className="text-sm mt-2 dark:text-white">
              Your email address is unverified.
              <Link
                href={route('verification.send')}
                type="submit"
                as="button"
                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                onClick={e => {
                  e.preventDefault();
                  setVerificationLinkSent(true);
                }}
              >
                Click here to re-send the verification email.
              </Link>
            </p>
            {verificationLinkSent && (
              <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                A new verification link has been sent to your email address.
              </div>
            )}
          </div>
        ) : null}
      </div>
    </FormSection>
  );
}
