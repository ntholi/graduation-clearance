import ListContainer from '../../components/ListContainer';
import ListItem from '../../components/ListItem';
import { getGraduatingStudents } from '../actions';

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ItemsPage({ searchParams }: Props) {
  const { items, pages } = await getGraduatingStudents(
    Number(searchParams?.page),
    searchParams?.search as string,
  );
  return (
    <ListContainer
      items={items}
      path='/admin/graduating-students'
      total={pages}
    >
      {({ item, path }) => (
        <ListItem label={item.stdNo} id={item.stdNo} path={path} />
      )}
    </ListContainer>
  );
}
