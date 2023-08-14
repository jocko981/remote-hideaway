// import { useForm } from "react-hook-form";
// import { useCreateCabin } from "./useCreateCabin";
// import { useEditCabin } from "./useEditCabin";
// // ui
// import Input from "../../ui/Input";
// import Form from "../../ui/Form";
// import Button from "../../ui/Button";
// import FileInput from "../../ui/FileInput";
// import Textarea from "../../ui/Textarea";
// import FormRow from "../../ui/FormRow";

// function CreateCabinForm({ cabinToEdit = {}, closeModal }) {
//   const { id: editId, ...editValues } = cabinToEdit;
//   const isEditable = Boolean(editId);

//   const { register, handleSubmit, reset, getValues, formState } = useForm({
//     defaultValues: isEditable ? editValues : {},
//   });
//   const { errors } = formState;

//   const { isCreating, createCabin } = useCreateCabin();
//   const { isEditing, editCabin } = useEditCabin();

//   const isWorking = isCreating || isEditing;
//   const isFormDirty = formState.isDirty;

//   function onSubmit(formData) {
//     if (!isFormDirty) {
//       return closeModal?.();
//     }
//     // console.log(formData);
//     const image = typeof formData.image === "string" ? formData.image : formData.image[0];

//     if (isEditable)
//       editCabin(
//         { newCabinData: { ...formData, image: image }, id: editId },
//         {
//           onSuccess: (data) => {
//             reset();
//             closeModal?.();
//           },
//         }
//       );
//     else
//       createCabin(
//         { ...formData, image: image },
//         {
//           onSuccess: (data) => {
//             // console.log(data);
//             reset();
//             closeModal?.();
//           },
//         }
//       );
//   }

//   function onError(formErrors) {
//     console.log("only logs formErrors onError: ", formErrors);
//   }

//   return (
//     <Form onSubmit={handleSubmit(onSubmit, onError)} $type={closeModal ? "modal" : "regular"}>
//       <FormRow label="Cabin name" error={errors?.name?.message}>
//         <Input
//           type="text"
//           id="name"
//           disabled={isWorking}
//           {...register("name", {
//             required: "Must be filled",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
//         <Input
//           type="number"
//           id="maxCapacity"
//           disabled={isWorking}
//           {...register("maxCapacity", {
//             required: "Must be filled",
//             min: {
//               value: 1,
//               message: "Capacity sholud be at least 1",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Regular price" error={errors?.regularPrice?.message}>
//         <Input
//           type="number"
//           id="regularPrice"
//           disabled={isWorking}
//           {...register("regularPrice", {
//             required: "Must be filled",
//             min: {
//               value: 1,
//               message: "Capacity sholud be at least 1",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Discount" error={errors?.discount?.message}>
//         <Input
//           type="number"
//           id="discount"
//           disabled={isWorking}
//           defaultValue={0}
//           {...register("discount", {
//             required: "Must be filled",
//             validate: (value) =>
//               Number(value) <= Number(getValues().regularPrice) ||
//               "Discount must be less than regular price",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Description for website" error={errors?.description?.message}>
//         <Textarea
//           type="number"
//           id="description"
//           disabled={isWorking}
//           defaultValue=""
//           {...register("description", {
//             required: "Must be filled",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Cabin photo Url/File" error={errors?.image?.message}>
//         <FileInput
//           id="image"
//           accept="image/*"
//           {...register("image", {
//             required: isEditable ? false : "Must be filled",
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button
//           $variation="secondary"
//           type="reset"
//           disabled={isWorking}
//           onClick={() => closeModal?.()}
//         >
//           Cancel
//         </Button>
//         <Button disabled={isWorking}>{isEditable ? "Edit cabin" : "Add new cabin"}</Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;
