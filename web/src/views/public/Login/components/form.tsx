import { LoginForm, loginSchema } from "../validations/login";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../context/user";
import Button from "../../../../components/common/button/button";
import IconChevronRight from "@assets/icons/iconChevronRight";
import { alertSuccess } from "../../../../utils/alertsToast";
import { ROUTES } from "../../../../types/enums/Routes";
import FormGlobal from "@/components/common/form/form";
import Logo from "../../../../assets/images/LodoMedyy.png";

const Form = () => {
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (values: LoginForm) => {
    const success = await login(values);
    if (!success) return;
    alertSuccess("Inicio de sesión correcto");
    navigate(ROUTES.INICIO);
  };

  return (
    <div className="bg-white py-2 px-10 sm:px-20 gap-2 flex flex-col items-center justify-center rounded-2xl">
      <img src={Logo} className="w-36 h-36" />
      <div className="w-full ">
        <FormGlobal
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={loginSchema}
          post={handleSubmit}
          button={(props) => (
            <Button {...props} icon={<IconChevronRight />}>
              Iniciar sesión
            </Button>
          )}
        >
          <FormGlobal.Column>
            <FormGlobal.Input
              name="username"
              title="Usuario"
              placeholder="Johnson"
            />
            <FormGlobal.Input
              name="password"
              type="password"
              title="Contraseña"
              placeholder="Ingrese contraseña"
            />
          </FormGlobal.Column>
        </FormGlobal>
      </div>
    </div>
  );
};

export default Form;
