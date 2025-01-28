// pages/_app.tsx
import { HistoryProvider } from '../contexts/HistoryContext'; // Caminho para o seu HistoryProvider
import HistoryPage from './HistoryPage';

function MyApp() {
  return (
    <HistoryProvider>
      <HistoryPage/>
    </HistoryProvider>
  );
}

export default MyApp;
