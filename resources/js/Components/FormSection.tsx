import React, { PropsWithChildren } from 'react';
import SectionTitle from '@/Components/SectionTitle';
import { Card, CardBody, CardFooter } from '@nextui-org/react';

interface Props {
  title: string;
  description: string;
  renderActions?(): JSX.Element;
  onSubmit(): void;
}

export default function FormSection({
  onSubmit,
  renderActions,
  title,
  description,
  children,
}: PropsWithChildren<Props>) {
  const hasActions = !!renderActions;

  return (
    <div className="md:grid md:grid-cols-3 md:gap-6 mx-4 md:mx-0">
      <SectionTitle title={title} description={description} />

      <div className="mt-5 md:mt-0 md:col-span-2">
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <Card>
            <CardBody>
              <div className="flex flex-col gap-4">{children}</div>
            </CardBody>
            <CardFooter>{hasActions && <>{renderActions?.()}</>}</CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
