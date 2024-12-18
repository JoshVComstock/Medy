import Input from "../../inputs/input";

interface Props {
  onChange: any;
  title: string;
  value: any;
}

const InputDynamically = ({ onChange, title, value }: Props) => {
  return <Input onChange={onChange} handleSelectMentions = {(_:any)=>{}} title={title} value={value} />;
};

export default InputDynamically;
