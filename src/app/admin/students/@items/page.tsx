import ItemsList from '../../components/ItemsList';
import ListItem from '../../components/ListItem';
import { getStudents } from '../actions';

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ItemsPage({ searchParams }: Props) {
  return (
    <ItemsList
      getItems={getStudents}
      path='/admin/students'
      renderItem={(item, path) => (
        <ListItem
          label={item.stdNo}
          description={item.name}
          id={item.stdNo}
          path={path}
        />
      )}
      searchParams={searchParams}
    />
  );
}
