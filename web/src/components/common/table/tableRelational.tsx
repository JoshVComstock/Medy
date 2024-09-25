import IconInfo from "@assets/icons/iconInfo";
import Dropdown from "../dropdown/dropdown";
import ObjectMapper from "../objectMapper/objectMapper";

interface Props {
  relationalTitle?: string;
  relationalObj: Record<string, any>;
}

//* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Component for render a dropdown with relational object data ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
const TableRelational = ({ relationalTitle, relationalObj }: Props) => {
  return (
    <Dropdown
      title={relationalTitle}
      toggleElement={() => (
        <div className="h-4 w-4 cursor-pointer text-primary-700">
          <IconInfo />
        </div>
      )}
    >
      <ObjectMapper
        obj={relationalObj}
        exclude={[
          "id",
          "idUsrCreacion",
          "idUsrModificacion",
          "estado",
          "fechaModificacion",
          "fechaCreacion",
        ]}
      />
    </Dropdown>
  );
};

export default TableRelational;
