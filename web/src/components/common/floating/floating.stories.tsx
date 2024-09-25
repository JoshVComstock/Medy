import { Meta, StoryFn } from "@storybook/react";
import "../../../index.css";
import TableContainer from "../table/tableContainer";
import Floating from "./floating";
import { BrowserRouter } from "react-router-dom";
import { useModal } from "../modal/useModal";
import Button from "../button/button";

const meta: Meta<typeof Floating> = {
  title: "Floating",
  component: Floating,
};

export default meta;

const Template: StoryFn<typeof Floating> = (args) => {
  const { state, openModal } = useModal("Floating");
  return (
    <BrowserRouter>
      <Button onClick={() => openModal()}>Abrir flotante</Button>
      <Floating {...args} state={state} />
    </BrowserRouter>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  width: "60%",
  children: (
    <TableContainer
      name="storybookExample"
      data={[
        {
          email: "josh@gmail.com",
          username: "Josh",
          phone: "68540820",
        },
        {
          email: "mau@gmail.com",
          username: "Mau",
          phone: "76407344",
        },
        {
          email: "juan@gmail.com",
          username: "Juan",
          phone: "76382334",
        },
      ]}
      columns={[
        {
          header: "Email",
          accessorKey: "email",
        },
        {
          header: "Username",
          accessorKey: "username",
        },
        {
          header: "Phone",
          accessorKey: "phone",
        },
      ]}
    />
  ),
};
