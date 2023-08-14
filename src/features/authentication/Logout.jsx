import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";
import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import Modal from "../../ui/Modal";
import ConfirmAction from "../../ui/ConfirmAction";

function Logout() {
  const { isLoading, logout } = useLogout();

  return (
    <Modal>
      <Modal.Open opens="logout">
        <ButtonIcon type="button" disabled={isLoading} onClick={logout}>
          {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
        </ButtonIcon>
      </Modal.Open>

      <Modal.Window name="logout" isRequesting={isLoading}>
        <ConfirmAction
          actionText="Logout"
          disabled={isLoading}
          onConfirm={logout}
          // onConfirm={() => logout({ onSuccess: console.log("rasdadsa onSuccess") })}
        />
      </Modal.Window>
    </Modal>
  );
}

export default Logout;
