import ListContainer from '@admin/components/ListContainer';
import ListItem from '@admin/components/ListItem';
import { getBlockedStudents } from '../../actions';

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ItemsPage({ searchParams }: Props) {
  const { items, pages } = await getBlockedStudents(
    'resource',
    Number(searchParams?.page),
    searchParams?.search as string,
  );
  return (
    <ListContainer
      items={items}
      path='/admin/blocked-students/resource'
      total={pages}
    >
      {({ item, path }) => (
        <ListItem label={item.stdNo} id={item.stdNo} path={path} />
      )}
    </ListContainer>
  );
}
