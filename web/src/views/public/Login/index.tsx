import Form from "./components/form";

const Login = () => {
  return (
    <main className="min-h-screen p-10 bg-primary-900 flex xl:items-center justify-center ">
      <section className="flex max-w-[100%] flex-col xl:flex-row h-max xl:h-[464px] shadow-xl ">
        <Form />
      </section>
    </main>
  );
};

export default Login;
