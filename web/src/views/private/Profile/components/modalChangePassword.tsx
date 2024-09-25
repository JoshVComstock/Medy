import Form from "../../../../components/common/form/form";
import Modal from "../../../../components/common/modal/modal";
import { ModalState } from "../../../../components/common/modal/useModal";
import { AUTH } from "../../../../types/enums/Endpoints";

import {
  ChangePasswordForm,
  changePasswordSchema,
} from "../validations/changePassword";

interface Props {
  state: ModalState;
  closeModal: () => void;
}

const ModalChangePassword = ({ state, closeModal }: Props) => {
  return (
    <Modal state={state}>
      <Form<string, ChangePasswordForm>
        initialValues={{
          actual: "",
          nueva: "",
          confirmar: "",
        }}
        validationSchema={changePasswordSchema}
        post={{
          route: AUTH.MODIFYPASSWORD,
          onSuccess: () => {
            closeModal();
          },
        }}
      >
        <Form.Column>
          <Form.Section title="Verifica que eres tú">
            <Form.Input
              type="password"
              name="actual"
              title="Contraseña actual"
            />
          </Form.Section>
          <Form.Section title="Cambia tu contraseña">
            <Form.Input type="password" name="nueva" title="Contraseña nueva" />
            <Form.Input
              type="password"
              name="confirmar"
              title="Confirmar contraseña"
            />
          </Form.Section>
        </Form.Column>
      </Form>
    </Modal>
  );
};

export default ModalChangePassword;
