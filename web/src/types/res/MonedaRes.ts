import { BaseRes } from "./Base";

export interface MonedaRes extends BaseRes {
    id: number,
    codigo : string,
    simbolo : string,
    nombre : string,
    decimales : number,
    unidadMonetaria : string,
    subUnidadMonetaria : string,
    redondeo : number
}
