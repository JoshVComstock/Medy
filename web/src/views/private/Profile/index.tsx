import Button from "../../../components/common/button/button";
import Form from "../../../components/common/form/form";
import PageContainer from "../../../components/common/pageContainer";
import { useModal } from "../../../components/common/modal/useModal";
import { useUser } from "../../../context/user";
import { AUTH } from "../../../types/enums/Endpoints";
import { User } from "../../../types/interfaces/User";
import ModalChangePassword from "./components/modalChangePassword";
import { ProfileForm, profileSchema } from "./validations/profile";

const Profile = () => {
  const { user, setUser } = useUser();
  const { openModal, closeModal, state } = useModal("Cambiar contraseña");

  return (
    <PageContainer title="Mis datos">
      <ModalChangePassword closeModal={closeModal} state={state} />
      <div className="flex self-center pb-5 ">
        <Form<User, ProfileForm>
          key={JSON.stringify(user)}
          title="Formulario de perfil"
          item={user}
          initialValues={{
            login: user?.login,
            telefono: user?.telefono,
            firma: user?.firma || "",
            notificacion: user?.notificacion || "",
            codigoSecreto: user?.codigoSecreto || "",
            codigoBot: user?.codigoBot || "",
            estadoBot: user?.estadoBot || "",
            estado: user?.estado,
            idAccion: user?.idAccion,
            idEmpresa: user?.idEmpresa,
            idContacto: user?.idContacto || "",
            idTipoUsuario: user?.idTipoUsuario || "",
            activo: user?.activo,
          }}
          validationSchema={profileSchema}
          put={{
            route: AUTH.MODIFYUSERDATA,
            onBody: ({ login, telefono }) => ({
              login,
              telefono,
            }),
            onSuccess: (data) => setUser(data),
          }}
        >
          <Form.Column>
            <Form.Section expandable title="Credenciales">
              <Form.Input name="login" title="Nombre de usuario" />
              <Button type="button" onClick={() => openModal()}>
                Cambiar contraseña
              </Button>
            </Form.Section>
          </Form.Column>
          <Form.Column>
            <Form.Section expandable title="Datos">
              <Form.Input name="telefono" title="Teléfono" />
              <Form.Input disabled name="firma" title="Firma" />
              <Form.Input disabled name="notificacion" title="Notificación" />
              <Form.Input
                disabled
                name="codigoSecreto"
                title="Código secreto"
              />
            </Form.Section>
            <Form.Section expandable title="Bot">
              <Form.Input disabled name="codigoBot" title="Código BOT" />
              <Form.Input disabled name="estadoBot" title="Estado BOT" />
            </Form.Section>
          </Form.Column>
          <Form.Column>
            <Form.Section expandable title="IDs">
              <Form.Input
                disabled
                name="idTipoUsuario"
                title="ID Tipo Usuario"
              />
              <Form.Input disabled name="idAccion" title="ID Acción" />
              <Form.Input disabled name="idEmpresa" title="ID Empresa" />
              <Form.Input disabled name="idContacto" title="ID Contacto" />
            </Form.Section>
            <Form.Section expandable title="Estado">
              <Form.Input disabled name="estado" title="Estado" />
              <Form.Checkbox disabled name="activo" title="Activo" />
            </Form.Section>
          </Form.Column>
        </Form>
      </div>
    </PageContainer>
  );
};

export default Profile;
