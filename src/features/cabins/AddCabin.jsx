import CreateCabinForm from "../../features/cabins/CreateCabinForm";
// ui
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { useCreateCabin } from "./useCreateCabin";

function AddCabin() {
  const { isCreating, createCabin } = useCreateCabin();

  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form" isRequesting={isCreating} willOusideClickClose={false}>
          <CreateCabinForm createCabin={createCabin} isCreating={isCreating} />
        </Modal.Window>

        {/* <Modal.Open opens="table">
        <Button>Show cabins Table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window> */}
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((isOpenModal) => !isOpenModal)}>Add new cabin</Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm closeModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
