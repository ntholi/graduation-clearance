import ItemsList from '@/app/admin/components/ItemsList';
import ListItem from '@admin/components/ListItem';
import { getBlockedStudents } from '../../actions';

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ItemsPage({ searchParams }: Props) {
  return (
    <ItemsList
      getItems={(page, search) => getBlockedStudents('finance', page, search)}
      path='/admin/blocked-students/finance'
      renderItem={(item, path) => (
        <ListItem
          label={item.stdNo}
          description={item.student?.name}
          id={item.id}
          path={path}
        />
      )}
      searchParams={searchParams}
    />
  );
}
