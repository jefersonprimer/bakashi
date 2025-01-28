import { ListsProvider } from '../contexts/ListsContext';
import CrunchyList from './CrunchyList';

const Page = () => (
  <ListsProvider>
    <CrunchyList />
  </ListsProvider>
);

export default Page;
