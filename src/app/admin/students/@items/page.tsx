import ListContainer from '../../components/ListContainer';
import ListItem from '../../components/ListItem';
import { getStudents } from '../actions';

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ItemsPage({ searchParams }: Props) {
  const { items, pages } = await getStudents(
    Number(searchParams?.page),
    searchParams?.search as string,
  );
  return (
    <ListContainer items={items} path='/admin/students' total={pages}>
      {({ item, path }) => (
        <ListItem
          label={item.stdNo}
          description={item.name}
          id={item.stdNo}
          path={path}
        />
      )}
    </ListContainer>
  );
}
