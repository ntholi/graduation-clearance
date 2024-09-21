import ListContainer from '../../components/ListContainer';
import ListItem from '../../components/ListItem';
import { getGraduatingStudents } from '../actions';

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ItemsPage({ searchParams }: Props) {
  const { items, totalPages } = await getGraduatingStudents(
    Number(searchParams?.page),
  );
  return (
    <ListContainer
      items={items}
      path='/admin/graduating-students'
      total={totalPages}
    >
      {({ item, path }) => (
        <ListItem
          label={item.stdNo}
          id={item.stdNo}
          key={item.stdNo}
          path={path}
        />
      )}
    </ListContainer>
  );
}
