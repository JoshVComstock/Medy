import { Meta, StoryFn } from "@storybook/react";
import Title from "./title";

const meta: Meta<typeof Title> = {
  title: "Title",
  component: Title,
};

export default meta;

const Template: StoryFn<typeof Title> = (args) => <Title {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Hola mundo",
};
