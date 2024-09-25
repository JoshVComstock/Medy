import { Field, useFormikContext } from "formik";
import { useFormContext, useRequiredField } from "../formContext";
import { useCondition } from "../hooks/useCondition";
import Input from "../../inputs/input";
import { useState } from "react";

interface Props {
  title: string;

  name: string;
  condition?: (values: any) => boolean;
  placeholder?: string;
  type?: string;
  error?: string;
  disabled?: boolean;
  noAutoComplete?: boolean;
}

const FormInput = ({
  title,
  placeholder,
  name,
  type,
  error,
  condition,
  disabled = false,
  noAutoComplete,
}: Props) => {
  const required = useRequiredField(name);
  const appear = useCondition(name, condition);
  const { disabled: formDisabled } = useFormContext();
  const [selected, setSelected] = useState("");
  const { setFieldValue } = useFormikContext();
  if (appear) return null;

  //
  return (
    <Field name={name}>
      {({ field, meta }: any) => {
        const handleSelectMentions = (event: React.ChangeEvent<HTMLSelectElement>) => {//Update the input value with the @mention
          setSelected(event.target.value);
          const arrobaIndex = field.value.lastIndexOf("@");
          if (arrobaIndex < 0){
            return;
          }

          setFieldValue(name, field.value.slice(0, arrobaIndex) + event.target.value);
          setSelected("");
        };
        

        return (
          <Input
            {...field}
            handleSelectMentions = {handleSelectMentions}
            selected = {selected}
            title={title}
            disabled={disabled || formDisabled}
            placeholder={placeholder}
            required={required}
            type={type}
            error={error || (meta.touched && meta.error)}
            noAutoComplete={noAutoComplete}
          />
        );
      }}
    </Field>
  );
};

export default FormInput;
