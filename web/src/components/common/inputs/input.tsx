import { useId, useState } from "react";
import InputError from "./inputError";
import { UsuarioRes } from "@/types/res/UsuarioRes";
import { ENDPOINTS } from "@/types/enums/Endpoints";
import { useGet } from "@/components/hooks/useGet";
import MentionsListBox from "./MentionsListBox";
import { useUser } from "@/context/user";
interface Props {
  title?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedValue?: string;
  handleSelectMentions?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
  error?: string;
  disabled?: boolean;
  noAutoComplete?: boolean;
  icon?: JSX.Element;
  minWidth?: string;
  size?: "base" | "small";
  name?:string
}
function getLastMention(value: string, character: string) {
  //get the word after the @
  const values = value.split(character);
  return values[values.length - 1];
}
function filterStringsStartingWith(
  inputArray: string[],
  prefix: string
): string[] {
  //filter the strings that starts with the prefix
  return inputArray.filter((item) => item.startsWith(prefix));
}
const Input = ({
  title,
  placeholder,
  required,
  type,
  error,
  disabled = false,
  value,
  onChange,
  selectedValue,
  handleSelectMentions,
  noAutoComplete,
  icon,
  minWidth = "320px",
  size = "base",
  name,
  ...field
}: Props) => {
  const id = useId();
  let names: string[] = [];
  const { state } = useUser();

  const { res } = useGet<UsuarioRes[]>(ENDPOINTS.USUARIO.GET, {
    send: state == "logged",
    alertError: false,
  });

  const getNames = (data: UsuarioRes[]) => {
    let values = [""];
    for (let row of data) {
      values.push(row.login);
    }
    return values;
  };
  if (res?.data) {
    names = getNames(res.data);
  }

  const [users, setUsers] = useState<string[]>([]);
  const [isAMention, setIsAMention] = useState(false);

  const updateNames = (name: string) => {
    //find the coincidences according to the letters after the last @
    let coincidences = filterStringsStartingWith(names, name);
    coincidences = coincidences.includes("")
      ? coincidences
      : [""].concat(coincidences);
    setUsers(coincidences);
  };
  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //Detect the @ and display the avalaible names
    if (isAMention) {
      updateNames(getLastMention(event.currentTarget.value, "@"));
    } else if (event.key === "@" && !isAMention) {
      setIsAMention(true);
      setUsers(names);
    }
  };

  const handleSelectMentionsChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    //
    if (handleSelectMentions) {
      handleSelectMentions(event);
      setIsAMention(false);
      setUsers([]);
    }
  };

  const classNames = [
    "text-sm ml-2 font-semibold text-gray-700 dark:text-white",
  ];
  if (required) {
    classNames.push("after:content-['_*'] after:text-primary-700");
  }

  const stylesInput = [
    "w-full px-2 pr-10 text-sm border outline-none border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 bg-white disabled:bg-gray-100 dark:bg-gray-500 dark:text-white",
  ];
  switch (size) {
    case "base":
      stylesInput.push("py-2");
      break;
    case "small":
      stylesInput.push("py-1");
      break;
  }
  if (icon) {
    stylesInput.push("pr-1 pl-6");
  }

  return (
    <div className="flex flex-col flex-1 gap-1 max-h-16">
      {title && (
        <label className={classNames.join(" ")} htmlFor={id}>
          {title}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="h-[80%] aspect-square absolute top-1/2 -translate-y-1/2 p-2 text-gray-600">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={stylesInput.join(" ")}
          name={name}
          style={{
            minWidth,
          }}
          value={value}
          onChange={onChange}
          onKeyUp={handleInputKeyDown}
          autoComplete={noAutoComplete ? "false" : undefined}
          {...field}
          type={type || "text"}
          placeholder={
            placeholder ||
            (title ? `Ingrese ${title?.toLocaleLowerCase()}` : undefined)
          }
          disabled={disabled}
        />
        <InputError error={error} />
      </div>
      <MentionsListBox
        selectedValue={selectedValue}
        users={users}
        handleSelectMentionsChange={handleSelectMentionsChange}
      />
    </div>
  );
};

export default Input;
