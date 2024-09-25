import { Meta, StoryFn } from "@storybook/react";
import Accordion from "./accordion";
import "../../../index.css";
import { BrowserRouter } from "react-router-dom";
import TableContainer from "../table/tableContainer";

const meta: Meta<typeof Accordion> = {
  title: "Accordion",
  component: Accordion,
};

export default meta;

const Template: StoryFn<typeof Accordion> = (args) => (
  <BrowserRouter>
    <div className="w-[600px]">
      <Accordion {...args} />
    </div>
  </BrowserRouter>
);

export const Primary = Template.bind({});
Primary.args = {
  title: "Acordeón",
  children: (
    <TableContainer
      name="accordionStory"
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
          email: "john@gmail.com",
          username: "John",
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
