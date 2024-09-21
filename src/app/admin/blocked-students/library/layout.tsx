import ListPageLayout from '@admin/components/ListPageLayout';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  items: React.ReactNode;
};

export default async function Layout({ children, items }: Props) {
  return <ListPageLayout items={items}>{children}</ListPageLayout>;
}
