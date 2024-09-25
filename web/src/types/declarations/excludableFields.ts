const excludableFields : Set<string> = new Set();//Campos para excluirlos del formato numero en las tablas
excludableFields.add("secuencia");
excludableFields.add("simbolo");
excludableFields.add("color");
excludableFields.add("codinterno");
excludableFields.add("codfabricante");
excludableFields.add("codbarras");
excludableFields.add("telefono");
excludableFields.add("toker");
excludableFields.add("codigoorden");
excludableFields.add("estadoorden");
excludableFields.add("empresa");
excludableFields.add("pedido");

export default excludableFields;