import styled, { css } from "styled-components";
import { toast } from "react-hot-toast";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import { useCreateCabin } from "./useCreateCabin";
import { useDeleteCabin } from "./useDeleteCabin";
import { useEditCabin } from "./useEditCabin";
import EditCabinForm from "./EditCabinForm";
import { formatCurrency } from "../../utils/helpers";
// ui
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import ConfirmAction from "../../ui/ConfirmAction";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  word-break: break-all;
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;

  & span:first-child {
    margin-right: 0.8rem;
    ${(props) =>
      props.$discount &&
      css`
        text-decoration: line-through;
      `}
  }
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const { id: cabinId, name, maxCapacity, regularPrice, discount, imageUrl, description } = cabin;

  function handleDuplicateCabin(onConfirmOptions) {
    // Confim action window for Duplicate Cabin, handle closeModal with onSetteled !
    createCabin(
      {
        name: `Copy of ${name}`,
        maxCapacity,
        regularPrice,
        discount,
        imageUrl,
        description,
      },
      { ...onConfirmOptions, onSuccess: () => toast.success(`Created a copy of - ${name}`) }
    );
  }

  return (
    <Table.Row role="row">
      <Img src={imageUrl} alt={description} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity}</div>

      <Stacked>
        {discount ? (
          <Price $discount={discount}>
            <span>{formatCurrency(regularPrice)}</span>
            <span>{formatCurrency(regularPrice - discount)}</span>
          </Price>
        ) : (
          <Price $discount={discount}>
            <span>{formatCurrency(regularPrice)}</span>
          </Price>
        )}

        {discount ? (
          <Discount>{`Discount: ${formatCurrency(discount)}`}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
      </Stacked>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              {/* modal opener buttons */}
              <Modal.Open opens="duplicate-cabin">
                <Menus.Button icon={<HiSquare2Stack />}>Duplicate</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="edit-cabin">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete-cabin">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            {/* modal windows */}
            <Modal.Window name="duplicate-cabin" isRequesting={isCreating}>
              <ConfirmAction
                actionText={`Duplicate cabin - ${name}`}
                onConfirm={handleDuplicateCabin}
                disabled={isCreating}
              />
            </Modal.Window>

            <Modal.Window name="edit-cabin" isRequesting={isEditing} willOusideClickClose={false}>
              <EditCabinForm cabinToEdit={cabin} editCabin={editCabin} isEditing={isEditing} />
            </Modal.Window>

            <Modal.Window name="delete-cabin" isRequesting={isDeleting}>
              <ConfirmDelete
                resourceName={name}
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
