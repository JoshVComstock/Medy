import { ChangeEventHandler } from "react";
interface Props {
  selectedValue?: string;
  handleSelectMentionsChange: ChangeEventHandler<HTMLSelectElement>;
  users: string[];
  tabIndex?: number;
}
const MentionsListBox = ({
  selectedValue,
  users,
  handleSelectMentionsChange,
  tabIndex,
  ...field
}: Props) => {
  if (tabIndex === undefined) {
    tabIndex = -1;
  }
  return (
    <div className="flex z-10 bg-white w-fit h-fit">
      <select
        tabIndex={tabIndex} //exclude the select when we iterate the form with tabs
        size={users.length}
        value={selectedValue}
        className="appearance-none dark:bg-gray-700 dark:text-white"
        onChange={handleSelectMentionsChange}
        {...field}
      >
        {users.map((name) => (
          <option key={name} value={name} className="my-1 mx-1 text-center">
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default MentionsListBox;
