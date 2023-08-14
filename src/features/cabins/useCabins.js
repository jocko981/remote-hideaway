import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const x = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const { isLoading, data: cabinsData, error } = x;
  // console.log("x", x);
  // console.log("destructured: ", isLoading, cabinsData, error);

  return { isLoading, error, cabinsData };
}
