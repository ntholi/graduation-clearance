import ItemsList from '../../components/ItemsList';
import ListItem from '../../components/ListItem';
import { getGraduatingStudents } from '../actions';

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ItemsPage({ searchParams }: Props) {
  return (
    <ItemsList
      getItems={getGraduatingStudents}
      path='/admin/graduating-students'
      renderItem={(item, path) => (
        <ListItem label={item.stdNo} id={item.stdNo} path={path} />
      )}
      searchParams={searchParams}
    />
  );
}
