import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/header/Header";
import { showFilter as useShowFilter } from "../hooks/useStore";

const FilterBar = React.lazy(() => import("../components/header/Search/FilterBar"))
const FiltredItems = React.lazy(() => import("../components/header/Search/FiltredItems"))
// import FilterBar from "../components/header/Search/FilterBar";
// import FiltredItems from "../components/header/Search/FiltredItems";


export default function Page({ children }) {
  const showFilter = useShowFilter(state => state.showFilter)
  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="pagina de promocion de negocios en cuba"
        />
        <title>apedir - Todos los negocios de Cuba a tu alcance</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href="/logo.svg"
          alt="logo apedir"
        />
      </Helmet>
      <Header />
      {
        showFilter ? (
          <React.Suspense fallback={<></>}>
            <FilterBar />
            <FiltredItems />
          </React.Suspense>
        ) :
          children
      }
    </div>
  );
}
