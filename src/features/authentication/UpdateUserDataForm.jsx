import { useState } from "react";
import { styled } from "styled-components";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useCurrentUser } from "./useCurrentUser";
import { useUpdateCurrentUser } from "./useUpdateCurrentUser";

const CurrentImageUrlWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin-top: 0.8rem;
`;

const CurrentAvatarUrl = styled.div`
  background-size: cover;
  background-image: url(${(props) => props.$url});
  width: 14.4rem;
  aspect-ratio: 1/1;

  object-fit: cover;
  object-position: center;
`;

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data,
  // because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName, avatar: currentAvatarUrl },
    },
  } = useCurrentUser();

  const { isUpdating, updateCurrentUser } = useUpdateCurrentUser();

  const [fullName, setFullName] = useState(currentFullName ? currentFullName : "");
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (!fullName) return;
    if (fullName && fullName === currentFullName && !avatar) return;

    updateCurrentUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormRow label="Email address">
          <Input value={email} disabled />
        </FormRow>
        <FormRow label="Full name">
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            id="fullName"
            maxLength={27}
            disabled={isUpdating}
          />
        </FormRow>

        {currentAvatarUrl && (
          <CurrentImageUrlWrap>
            <span>Current avatar:</span>
            <CurrentAvatarUrl $url={currentAvatarUrl} />
          </CurrentImageUrlWrap>
        )}

        <FormRow label="Avatar image">
          <FileInput
            id="avatar"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            disabled={isUpdating}
          />
        </FormRow>
        <FormRow>
          <Button type="reset" $variation="secondary" disabled={isUpdating} onClick={handleCancel}>
            Reset/Cancel
          </Button>
          <Button disabled={isUpdating}>Update account</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default UpdateUserDataForm;
