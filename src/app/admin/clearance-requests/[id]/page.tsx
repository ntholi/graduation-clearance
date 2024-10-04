import { auth } from '@/auth';
import { Box, Tabs, TabsList, TabsPanel, TabsTab } from '@mantine/core';
import { notFound } from 'next/navigation';
import Form from '../Form';
import { getRequest, Responder, respondToRequest } from '../actions';
import PaymentsDisplay from './PaymentsDisplay';
import { GraduationCap, ListCheck, SquareArrowOutUpRight } from 'lucide-react';
import RepeatModules from './RepeatModules';

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: Props) {
  const session = await auth();
  let responder: Responder = session?.user?.role as Responder;
  const item = await getRequest(id, responder);

  if (!item) {
    return notFound();
  }

  return (
    <Tabs p={'xl'} defaultValue='clearance'>
      <TabsList>
        <TabsTab value='clearance' leftSection={<ListCheck size='1rem' />}>
          Clearance
        </TabsTab>
        <TabsTab
          value='repeat-modules'
          leftSection={<GraduationCap size='1rem' />}
        >
          Repeat Modules
        </TabsTab>
      </TabsList>
      <TabsPanel value='clearance' p={'lg'}>
        <Form
          responder={responder}
          student={{ stdNo: item.stdNo, ...item.student }}
          onSubmit={async (value) => {
            'use server';
            await respondToRequest(item.stdNo, item.id, {
              responder: value.responder,
              status: value.status,
              reasonBlocked: value.reasonBlocked,
            });
          }}
        />
        {responder === 'finance' || responder === 'admin' ? (
          <PaymentsDisplay stdNo={item.stdNo} />
        ) : null}
      </TabsPanel>
      <TabsPanel value='repeat-modules' p={'lg'}>
        <RepeatModules stdNo={item.stdNo} />
      </TabsPanel>
    </Tabs>
  );
}
