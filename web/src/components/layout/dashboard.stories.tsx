import { Meta, StoryFn } from "@storybook/react";
import Dashboard from "./dashboard";
import { BrowserRouter } from "react-router-dom";

const meta: Meta<typeof Dashboard> = {
  title: "Dashboard",
  component: Dashboard,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const Template: StoryFn<any> = (args) => (
  <BrowserRouter>
    <Dashboard {...args} />
  </BrowserRouter>
);

export const Primary = Template.bind({});
Primary.args = {};
