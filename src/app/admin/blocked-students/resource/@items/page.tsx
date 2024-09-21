import ItemsList from '@/app/admin/components/ItemsList';
import ListItem from '@admin/components/ListItem';
import { getBlockedStudents } from '../../actions';

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ItemsPage({ searchParams }: Props) {
  return (
    <ItemsList
      getItems={(page, search) => getBlockedStudents('resource', page, search)}
      path='/admin/blocked-students/resource'
      renderItem={(item, path) => (
        <ListItem label={item.stdNo} id={item.stdNo} path={path} />
      )}
      searchParams={searchParams}
    />
  );
}
