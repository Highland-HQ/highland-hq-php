import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import ActionSection from '@/Components/ActionSection';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';

export default function DeleteUserForm() {
  const route = useRoute();
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const form = useForm({
    password: '',
  });
  const passwordRef = useRef<HTMLInputElement>(null);

  function confirmUserDeletion() {
    setConfirmingUserDeletion(true);

    setTimeout(() => passwordRef.current?.focus(), 250);
  }

  function deleteUser() {
    form.delete(route('current-user.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordRef.current?.focus(),
      onFinish: () => form.reset(),
    });
  }

  function closeModal() {
    setConfirmingUserDeletion(false);
    form.reset();
  }

  return (
    <ActionSection
      title={'Delete Account'}
      description={'Permanently delete your account.'}
    >
      <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
        Once your account is deleted, all of its resources and data will be
        permanently deleted. Before deleting your account, please download any
        data or information that you wish to retain.
      </div>

      <div className="mt-5">
        <Button onClick={confirmUserDeletion} color="danger">
          Delete Account
        </Button>
      </div>

      {/* <!-- Delete Account Confirmation Modal --> */}
      <Modal
        size="xl"
        backdrop="blur"
        isOpen={confirmingUserDeletion}
        onClose={closeModal}
      >
        <ModalContent>
          <ModalHeader>Delete Account</ModalHeader>
          <ModalBody>
            Are you sure you want to delete your account? Once your account is
            deleted, all of its resources and data will be permanently deleted.
            Please enter your password to confirm you would like to permanently
            delete your account.
            <div className="mt-4">
              <Input
                autoFocus
                type="password"
                variant="bordered"
                className="mt-2"
                label="Password"
                value={form.data.password}
                onChange={e => form.setData('password', e.currentTarget.value)}
                validationState={form.errors.password ? 'invalid' : 'valid'}
                errorMessage={form.errors.password}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeModal} color="default" variant="light">
              Cancel
            </Button>
            <Button
              onClick={deleteUser}
              color="danger"
              className={classNames('ml-2', { 'opacity-25': form.processing })}
            >
              Delete Account
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ActionSection>
  );
}
