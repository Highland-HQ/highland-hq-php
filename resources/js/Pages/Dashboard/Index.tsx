import React from 'react';
import Welcome from '@/Components/Welcome';
import AppLayout from '@/Layouts/AppLayout';

export default function Dashboard() {
  return (
    <AppLayout title="Dashboard">
      <Welcome />
    </AppLayout>
  );
}
