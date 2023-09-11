import React, { PropsWithChildren, ReactNode } from 'react';
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import useTypedPage from '@/Hooks/useTypedPage';
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
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-xl flex flex-col items-center justify-center">
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
        <Card className="w-full p-2">
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
