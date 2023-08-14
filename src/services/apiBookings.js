import supabase from "./supabase";
import { getToday } from "../utils/helpers";
import { PAGINATION_PAGE_SIZE } from "../utils/Constants";

export async function getAllBookings(filter, sortBy, page) {
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName, email)", { count: "exact" });

  // FILTER
  if (filter && filter.field && filter.value) {
    const { field, value, method } = filter;
    query = query[method || "eq"](field, value);
    // if you want multiple filters, checked-in + > 5000 price, we can create array of objects,
    // then loop it, and for each object add a new query to the query variable like this above
  }

  // SORT
  if (sortBy.field && sortBy.direction) {
    const { field, direction } = sortBy;
    query = query.order(field, {
      ascending: direction === "asc",
    });
  }

  // PAGINATION
  if (page && page > 0) {
    const from = (page - 1) * (PAGINATION_PAGE_SIZE - 1);
    const to = from - 1 + PAGINATION_PAGE_SIZE;
    // 10 results (if PAGINATION_PAGE_SIZE=10)
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error.message);
    throw new Error("Could not load all Bookings, " + error.message + " for page " + page);
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date.
// Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  // here we need a date that is 7/30/90 days ago (MUST BE: ISOString, supabase expects that)
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  // here we need a date that is 7/30/90 days ago (MUST BE: ISOString, supabase expects that)
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that TODAY there is a check-in or a check-out
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
