import { useSearchParams } from "react-router-dom";
import { useCabins } from "./useCabins";
import CabinRow from "./CabinRow";
// ui
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function CabinTable() {
  const { isLoading, error, cabinsData } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (error) return <p>{error?.message}</p>;

  const filterValue = searchParams.get("discount") || "all";
  // this will filter cabinsData and set value to filteredCabins,
  // if we don't have search params for ?discount

  // 1) FILTER
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabinsData;
  if (filterValue === "no-discount")
    filteredCabins = cabinsData.filter((cabin) => cabin.discount < 1);
  if (filterValue === "with-discount")
    filteredCabins = cabinsData.filter((cabin) => cabin.discount > 0);

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "desc" ? -1 : 1;
  const sortedCabins = !sortBy
    ? filteredCabins
    : filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  return (
    <Menus>
      <Table columns="7.2rem 1fr 11.2rem 1.2fr 3.2rem">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
