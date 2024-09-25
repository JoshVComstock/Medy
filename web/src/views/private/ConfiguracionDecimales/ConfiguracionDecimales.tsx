import FormColumn from "@/components/common/form/formColumn";
import Input from "@/components/common/inputs/input";
import PageContainer from "@/components/common/pageContainer";
import Button from "@/components/common/button/button";
import { useState } from "react";
import { alertSuccess } from "@/utils/alertsToast";
import { useLang } from "@/context/lang";



const ConfiguracionDecimales =() =>{
    const oldValue = localStorage.getItem("decimales");
    const {translate} = useLang();
    const [value, setValue] = useState(oldValue? oldValue : "2");
    function changeDecimals(value: string){
        localStorage.setItem("decimales", value);
        alertSuccess(translate("CONFIGURACION_DECIMALES_EXITO_MENSAJE"));
    }
    const onChange = (e : any) => {
        const value = e.target.value;
        if (value >= 0 && value <=20){
            setValue(value);
        }
    }
    return(
        <PageContainer title={translate("CONFIGURACION_DECIMALES_TITULO")}>
            <div className="w-1/5 ml-8 mt-8">
                <FormColumn>
                    <Input 
                        title={translate("CONFIGURACION_DECIMALES_INPUT_DECIMALES")}
                        type="number" 
                        value={value} onChange={onChange} 
                        size="base"
                        placeholder={translate("CONFIGURACION_DECIMALES_INPUT_PLACEHOLDER")}>
                        
                    </Input>
                    <Button 
                        
                        size="normal"
                        onClick={() => changeDecimals(value)}
                        >
                            {translate("CONFIGURACION_DECIMALES_BUTTON")}
                        </Button>
                </FormColumn>
                
            </div>
            
        </PageContainer>);
};

export default ConfiguracionDecimales;