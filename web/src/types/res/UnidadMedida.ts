import { BaseRes } from "@/types/res/Base";
import RmCategoriaRes from "./RmCategoriaRes";
export default interface UnidadMedidaRes extends BaseRes{
    id : number;
    idCategoria : number;
    nombre : string;
    tipo : string;
    ratio : number;
    redondeo : number;
    categoria:RmCategoriaRes;
};