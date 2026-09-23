import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import SearchBar from "../components/UI/SearchBar";
import CardKonsulSearch from "../components/Konsultasi/CardKonsulSearch";
import OptionButton from "../components/UI/OptionButton";
import { useDoctor } from "../hooks/useDoctor";

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dataParams = queryParams.get("data") ?? "";

  const { searchResults, searchPaging, isLoading, search } = useDoctor();

  useEffect(() => {
    search({ search_query: dataParams, page: 1, size: 10 });
  }, [dataParams]);

  return (
    <Layout>
      <SearchBar>Mau cari apa...</SearchBar>
      <OptionButton>
        {["Kucing", "Anjing", "Burung", "Kelinci", "Hamster", "Iguana"]}
      </OptionButton>

      <h3 className="font-poppins text-dark-grey px-[4%] md:px-[7%] xl:px-[10%] mt-2">
        Hasil pencarian : <span className="font-semibold">{dataParams}</span>
        {!isLoading && (
          <span className="text-subtle-grey font-normal">
            {" "}
            ({searchPaging?.total ?? 0} ditemukan)
          </span>
        )}
      </h3>

      <CardKonsulSearch data={searchResults} isLoading={isLoading} />
    </Layout>
  );
};

export default Search;
