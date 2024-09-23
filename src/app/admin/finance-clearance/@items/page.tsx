import ItemsList from '@admin/components/ItemsList';
import ListItem from '@admin/components/ListItem';
import { getClearanceList } from '../actions';

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ItemsPage({ searchParams }: Props) {
  return (
    <ItemsList
      getItems={getClearanceList}
      path='/admin/finance-clearance'
      renderItem={(item, path) => (
        <ListItem
          label={item.stdNo}
          description={item.student?.name}
          id={item.stdNo}
          path={path}
        />
      )}
      searchParams={searchParams}
    />
  );
}
