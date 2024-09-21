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
    <ListContainer path='/admin/graduating-students' total={totalPages}>
      {(props) =>
        items.map((item) => (
          <ListItem
            label={item.stdNo}
            href={`${props.path}/${item.stdNo}`}
            key={item.stdNo}
            {...props}
          />
        ))
      }
    </ListContainer>
  );
}
