import { useHistory } from "@/app/contexts/HistoryContext";
import HistoryCarousel from "./HistoryCarousel";

const HistorySection = () => {
    const { history } = useHistory(); // Pega o histórico do contexto
  
    if (history.length === 0) {
      return null; // Não renderiza o HistoryCarousel se não houver episódios no histórico
    }
  
    return <HistoryCarousel />;
  };