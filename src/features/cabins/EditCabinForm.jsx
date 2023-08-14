import { useForm } from "react-hook-form";
// ui
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { styled } from "styled-components";

const CurrentImageUrlWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const CurrentImageUrl = styled.div`
  background-size: cover;
  background-image: url(${(props) => props.$url});
  height: 14.4rem;
  aspect-ratio: 1/1;
  margin: 0.8rem 0;
`;

function EditCabinForm({ cabinToEdit = {}, isEditing, editCabin, closeModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditable = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editValues,
  });
  const { errors, isDirty: isFormDirty } = formState;

  function onSubmit(formData) {
    if (!isFormDirty) {
      return closeModal?.();
    }

    const image = typeof formData.image === "string" ? formData.image : formData.image[0];

    if (isEditable)
      editCabin(
        { newCabinData: { ...formData, image: image }, id: editId },
        {
          onSuccess: (editedCabinValues) => {
            // Updated Form values with newest Updated values for the cabin you are editting
            reset(editedCabinValues, { isDirty: false });
            // closeModal?.();
          },
        }
      );
  }

  function onError(formErrors) {
    // Do something if errors occured in form...
    console.log("Logs formErrors: ", formErrors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} $type={closeModal ? "modal" : "regular"}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isEditing}
          {...register("name", {
            required: "Must be filled",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isEditing}
          {...register("maxCapacity", {
            required: "Must be filled",
            min: {
              value: 1,
              message: "Capacity sholud be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isEditing}
          {...register("regularPrice", {
            required: "Must be filled",
            min: {
              value: 1,
              message: "Capacity sholud be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isEditing}
          defaultValue={0}
          {...register("discount", {
            required: "Must be filled",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount must be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isEditing}
          defaultValue=""
          {...register("description", {
            required: "Must be filled",
          })}
        />
      </FormRow>

      {cabinToEdit.imageUrl && (
        <CurrentImageUrlWrap>
          <span>Current image:</span>
          <CurrentImageUrl $url={cabinToEdit.imageUrl} />
        </CurrentImageUrlWrap>
      )}

      <FormRow label="Cabin photo Url/File" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditable ? false : "Must be filled",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          disabled={isEditing}
          onClick={() => closeModal?.()}
        >
          Cancel
        </Button>
        <Button $variation={isFormDirty ? "primary" : "secondary"} disabled={isEditing}>
          Edit cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default EditCabinForm;
