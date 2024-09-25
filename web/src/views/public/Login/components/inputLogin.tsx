import { ErrorMessage, Field } from "formik";

interface Props {
  title: string;
  name: string;
  placeholder?: string;
  type?: string;
}

const InputLogin = ({ title, name, placeholder, type = "text" }: Props) => {
  return (
    <div className="w-full sm:w-96 grid grid-cols-[1fr] sm:grid-cols-[1fr_250px] max-w-[100%]">
      <p className="font-semibold py-3">{title}</p>
      <Field
        type={type}
        placeholder={placeholder || `Ingrese ${name}`}
        className="border-b border-gray-300 outline-none py-3 w-full sm:w-auto"
        name={name}
      />
      <div className="sm:col-[2] h-6">
        <ErrorMessage name={name}>
          {(msg) => <small className="text-danger">{msg}</small>}
        </ErrorMessage>
      </div>
    </div>
  );
};

export default InputLogin;
