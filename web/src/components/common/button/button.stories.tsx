import Button from "./button";
import "../../../index.css";
import type { Meta, StoryFn } from "@storybook/react";
import IconX from "@assets/icons/iconX";
import IconConfig from "@assets/icons/iconConfig";
import IconHome from "@assets/icons/iconHome";

const icons = [
  {
    name: "",
    icon: undefined,
  },
  {
    name: "config",
    icon: <IconConfig />,
  },
  {
    name: "close",
    icon: <IconX />,
  },
  {
    name: "home",
    icon: <IconHome />,
  },
];

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  argTypes: {
    icon: {
      control: {
        type: "select",
      },
      options: icons.map((icon) => icon.name),
    },
    btnType: {
      control: {
        type: "select",
      },
      options: ["primary", "secondary", "tertiary"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["normal", "small"],
    },
  },
};

export default meta;

const Template: StoryFn = (args) => {
  const icon = icons.find((icon) => icon.name === (args.icon as string))?.icon;
  if (icon) {
    return <Button {...{ ...args, icon }} />;
  } else {
    return <Button {...args} />;
  }
};

export const Label = Template.bind({});
Label.args = {
  children: "Hola mundo",
  icon: "",
  btnType: "primary",
  disabled: false,
  size: "normal"
};

export const Icon = Template.bind({});
Icon.args = {
  children: "",
  icon: "close",
  btnType: "primary",
  disabled: false,
  size: "normal"
};

export const Primary = Template.bind({});
Primary.args = {
  children: "Configuración",
  icon: "config",
  btnType: "primary",
  disabled: false,
  size: "normal"
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Configuración",
  icon: "config",
  btnType: "secondary",
  disabled: false,
  size: "normal"
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  children: "Configuración",
  icon: "config",
  btnType: "tertiary",
  disabled: false,
  size: "normal"
};

export const TertiaryIcon = Template.bind({});
TertiaryIcon.args = {
  children: "",
  icon: "config",
  btnType: "tertiary",
  disabled: false,
  size: "normal"
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: "Configuración",
  icon: "config",
  btnType: "primary",
  disabled: true,
  size: "normal"
};

export const Small = Template.bind({});
Small.args = {
  children: "Configuración",
  icon: "config",
  btnType: "primary",
  disabled: false,
  size: "small"
};

export const Toggle = Template.bind({});
Toggle.args = {
  children: "Configuración",
  icon: "config",
  toggle: true,
  disabled: false,
  size: "normal"
};
