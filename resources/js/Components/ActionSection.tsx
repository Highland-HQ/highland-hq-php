import React, { PropsWithChildren } from 'react';
import SectionTitle from '@/Components/SectionTitle';
import { Card, CardBody } from '@nextui-org/react';

interface Props {
  title: string;
  description: string;
}

export default function ActionSection({
  title,
  description,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="md:grid md:grid-cols-3 md:gap-6 mx-4">
      <SectionTitle title={title} description={description} />

      <div className="mt-5 md:mt-0 md:col-span-2">
        <Card>
          <CardBody>{children}</CardBody>
        </Card>
      </div>
    </div>
  );
}
