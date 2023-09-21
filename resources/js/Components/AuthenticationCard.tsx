import React, { ReactNode } from 'react';
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import useRoute from '@/Hooks/useRoute';
import { Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';

interface AuthenticationCardProps {
  heading: string;
  children: ReactNode;
}

export default function AuthenticationCard({
  heading,
  children,
}: AuthenticationCardProps) {
  const route = useRoute();

  return (
    <div className="min-h-screen max-w-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center mx-4 lg:mx-0">
        <Button
          as={Link}
          startContent={<ChevronLeft />}
          href={route('storefront.index')}
          className="mb-4 place-self-start"
          color="default"
          variant="ghost"
        >
          Home
        </Button>
        <Card className="w-full">
          <CardHeader>
            <h1 className="px-3 text-2xl font-bold">
              {heading || 'Lorem Ipsum'}
            </h1>
          </CardHeader>
          <CardBody>{children}</CardBody>
        </Card>
      </div>
    </div>
  );
}
