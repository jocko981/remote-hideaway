import { useForm } from "react-hook-form";
// ui
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ isCreating, createCabin, closeModal }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm({});
  const { errors, isDirty: isFormDirty } = formState;

  function onSubmit(formData) {
    if (!isFormDirty) {
      return;
    }

    const image = formData.image[0];

    createCabin(
      { ...formData, image: image },
      {
        onSuccess: (data) => {
          reset();
          closeModal?.();
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
          disabled={isCreating}
          {...register("name", {
            required: "Must be filled",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          defaultValue=""
          {...register("description", {
            required: "Must be filled",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo Url/File" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "Must be filled",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          disabled={isCreating}
          onClick={() => closeModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>Add new cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
