import axios from 'axios';
import classNames from 'classnames';
import React, { PropsWithChildren, useRef, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from '@nextui-org/react';

interface Props {
  title?: string;
  content?: string;
  button?: string;
  onConfirm(): void;
}

export default function ConfirmsPassword({
  title = 'Confirm Password',
  content = 'For your security, please confirm your password to continue.',
  button = 'Confirm',
  onConfirm,
  children,
}: PropsWithChildren<Props>) {
  const route = useRoute();
  const [confirmingPassword, setConfirmingPassword] = useState(false);
  const [form, setForm] = useState({
    password: '',
    error: '',
    processing: false,
  });
  const passwordRef = useRef<HTMLInputElement>(null);

  function startConfirmingPassword() {
    axios.get(route('password.confirmation')).then(response => {
      if (response.data.confirmed) {
        onConfirm();
      } else {
        setConfirmingPassword(true);

        setTimeout(() => passwordRef.current?.focus(), 250);
      }
    });
  }

  function confirmPassword() {
    setForm({ ...form, processing: true });

    axios
      .post(route('password.confirm'), {
        password: form.password,
      })
      .then(() => {
        closeModal();
        setTimeout(() => onConfirm(), 250);
      })
      .catch(error => {
        setForm({
          ...form,
          processing: false,
          error: error.response.data.errors.password[0],
        });
        passwordRef.current?.focus();
      });
  }

  function closeModal() {
    setConfirmingPassword(false);
    setForm({ processing: false, password: '', error: '' });
  }

  return (
    <span>
      <span onClick={startConfirmingPassword}>{children}</span>

      <Modal
        isOpen={confirmingPassword}
        onClose={closeModal}
        backdrop="blur"
        size="xl"
      >
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>

          <ModalBody>
            {content}
            <Input
              autoFocus
              type="password"
              variant="bordered"
              ref={passwordRef}
              label="Password"
              className="mt-2"
              value={form.password}
              onChange={e =>
                setForm({ ...form, password: e.currentTarget.value })
              }
              validationState={form.error ? 'invalid' : 'valid'}
              errorMessage={form.error}
            />
          </ModalBody>

          <ModalFooter>
            <Button onClick={closeModal} color="default" variant="light">
              Cancel
            </Button>
            <Button
              className={classNames('ml-2', { 'opacity-25': form.processing })}
              onClick={confirmPassword}
              disabled={form.processing}
              color="primary"
            >
              {button}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </span>
  );
}
