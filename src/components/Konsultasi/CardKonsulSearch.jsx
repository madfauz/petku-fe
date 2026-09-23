import { normalizePraktekList } from "../../utils/praktek";
import PraktekCardList from "./PraktekCardList";

const CardKonsulSearch = ({ data, isLoading }) => {
  const practices = normalizePraktekList(data);

  return (
    <PraktekCardList
      practices={practices}
      isLoading={isLoading}
      emptyMessage="Tidak ada praktek yang cocok dengan pencarianmu."
      wrap
    />
  );
};

export default CardKonsulSearch;
