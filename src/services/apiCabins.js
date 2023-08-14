import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Could not load Cabins");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const { image, imageUrl, ...restOfnewCabin } = newCabin;
  const hasImagePath = imageUrl?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${image?.name}`.replaceAll("/", "").replaceAll(" ", "-");
  const imagePath = image
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : imageUrl;

  // 1. Create/Edit cabin
  let query = supabase.from("cabins");
  // Create new cabin
  if (!id) query = query.insert([{ ...restOfnewCabin, imageUrl: imagePath }]);

  // Edit new cabin
  if (id) query = query.update({ ...restOfnewCabin, imageUrl: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error(`Could not create new Cabin, ${error.message}`);
  }

  // 2. upload image
  if (imageUrl && !image) return data;

  const { data: storageData, error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, image);

  // 3. delete cabin if there was error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error("Could not upload Cabin image and Cabin was not created");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Could not delete Cabin with id: " + id);
  }

  return data;
}
