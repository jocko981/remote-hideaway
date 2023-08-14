import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ sortOptions }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select $type="white" selectOptions={sortOptions} value={sortBy} onChange={handleChange} />
  );
}

export default SortBy;
