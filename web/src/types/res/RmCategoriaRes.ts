import { BaseRes } from "./Base";

export default interface RmCategoriaRes extends BaseRes {
    id: number;
    nombre: string;
    agrupable: boolean;
}
