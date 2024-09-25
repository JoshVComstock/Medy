import { BaseRes } from "@/types/res/Base";
import { MonedaRes } from "@/types/res/MonedaRes";
export default interface efectivoRes extends BaseRes{
    id : number;
    descripcion: string;
    moneda:MonedaRes;
    valor: number;
};