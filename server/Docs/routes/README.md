# Documentación ERP 

## Endpoints

>[!TIP]
>Todas las rutas requieren token, necesitan recibir el token secreto a través de la cabecera `Authorization` con el valor de `Bearer TOKEN_SECRETO`,
>de lo contrario el servidor responderá con estado 401
# Tipo comprobante
La respuesta que contiene los datos de tipo comprobate en el siguiente formato:
```json
  {
      "id": 1,
      "nombre": "egreso",
      "idUsrCreacion": 3,
      "idUsrModificacion": 1,
      "estado": "AC"
    }
```

## Registro
- Ruta: `/contableTipoComprobante`
- Método: `POST`
- Requiere token: `SI`
- Body: 
```json
  {
  "nombre": "string"
  }
```
- Respuesta:
```json
  {
    "message": "Tipo comprobantes obtenidos correctamente",
    "status": 200,
    "data": DATOS DE TIPO COMPROBANTE REGISTRADO
  }
```
## Modificar
- Ruta: `/contableTipoComprobante/id`
- Método: `PUT`
- Requiere token: `SI`
- Body: 
```json
  {
  "nombre": "string"
  }
```
- Respuesta:
```json
  {
     "message": "Tipo comprobante modificado exitosamente",
  "status": 200,
    "data": DATOS DE TIPO COMPROBANTE ACTUALIZADOS
  }
```

## Eliminar 
- Ruta: `/contableTipoComprobante/id`
- Método: `DELETE`
- Requiere token: `SI`
- Respuesta:
```json
  {
   "message": "Tipo comprobante eliminado exitosamente",
  "status": 200,
  "data": DATOS ELIMINADOS
  }
```
# contacto
La respuesta que contiene los datos de contacto es el siguiente formato:
```json
  {
    "id": 1,
      "idEmpresa": 0,
      "fechaCreacion": "2024-01-16T21:18:26.335431Z",
      "fechaModificacion": "2024-01-16T21:18:26.335431Z",
      "nombre": "string",
      "profesion": "string",
      "nombreDespliegue": "string",
      "identFiscal": "string",
      "color": 0,
      "idPais": 0,
      "idCiudad": 0,
      "esEmpresa": true,
      "direccion1": "string",
      "direccion2": "string",
      "telefonoFijo": "string",
      "telefonoMovil": "string",
      "puestoTrabajo": "string",
      "email": "string",
      "sitioWeb": "string",
      "comentario": "string",
      "categorias": [],
      "idUsrCreacion": 1,
      "idUsrModificacion": null,
      "estado": "AC"
  }
```

## Registro
- Ruta: `/recContacto`
- Método: `POST`
- Requiere token: `SI`
- Body: 
```json
  {
    "idEmpresa": 0,
  "nombre": "string",
  "profesion": "string",
  "nombreDespliegue": "string",
  "identFiscal": "string",
  "color": 0,
  "idPais": 0,
  "idCiudad": 0,
  "esEmpresa": true,
  "direccion1": "string",
  "direccion2": "string",
  "telefonoFijo": "string",
  "telefonoMovil": "string",
  "puestoTrabajo": "string",
  "email": "string",
  "sitioWeb": "string",
  "comentario": "string",
  "idsCategContacto": [
    0
  ]
  }
```
- Respuesta:
```json
  {
    "message": "Contacto creado exitosamente",
    "status": 200,
    "data": DATOS DE CONTACTO REGISTRADA
  }
```
## Modificar
- Ruta: `/recContacto/id`
- Método: `PUT`
- Requiere token: `SI`
- Body: 
```json
  {
  "idEmpresa": 0,
  "nombre": "string",
  "profesion": "string",
  "nombreDespliegue": "string",
  "identFiscal": "string",
  "color": 0,
  "idPais": 0,
  "idCiudad": 0,
  "esEmpresa": true,
  "direccion1": "string",
  "direccion2": "string",
  "telefonoFijo": "string",
  "telefonoMovil": "string",
  "puestoTrabajo": "string",
  "email": "string",
  "sitioWeb": "string",
  "comentario": "string",
  "idsCategContacto": [
    0
  ]
}
```
- Respuesta:
```json
  {
     "message": "Contacto modificado exitosamente",
  "status": 200,
    "data": DATOS DE CONTACTO ACTUALIZADOS
  }
```

## Eliminar
- Ruta: `/recContacto/id`
- Método: `DELETE`
- Requiere token: `SI`
- Respuesta:
```json
  {
   "message": "Contacto eliminado exitosamente",
  "status": 200,
  "data": DATOS ELIMINADOS
  }
```
# Grupo
La respuesta que contiene los datos de grupo en el siguiente formato:
```json
  {
      "id": 1,
      "idCategoria": 0,
      "nombre": "string",
      "descripcion": "string",
      "fechaCreacion": "2024-01-16T21:23:56.946208Z",
      "fechaModificacion": "2024-01-16T21:23:56.946208Z",
      "menus": [],
      "idUsrCreacion": 1,
      "idUsrModificacion": null,
      "estado": "AC"
  }
```

## Registro
- Ruta: `/recGrupo`
- Método: `POST`
- Requiere token: `SI`
- Body: 
```json
  {
    "idCategoria": 0,
  "nombre": "nombre categoria",
  "descripcion": "string",
  "idsMenu": [
    0
  ]
  }
```
- Respuesta:
```json
  {
     "message": "Grupo creado exitosamente",
     "status": 200,
    "data": DATOS DE GRUPO REGISTRADO
  }
```
## Modificar
- Ruta: `/recGrupo/id`
- Método: `PUT`
- Requiere token: `SI`
- Body: 
```json
  {
  "idPadre": 1,
  "nombre": "Nombre de contacto",
  "pathPadre": "ninguno",
  "color": 1
}
```
- Respuesta:
```json
  {
     "message": "Grupo modificado exitosamente",
     "status": 200,
    "data": DATOS DE GRUPO ACTUALIZADOS
  }
```

## Eliminar 
- Ruta: `/recGrupo/id`
- Método: `DELETE`
- Requiere token: `SI`
- Respuesta:
```json
  {
   "message": "Grupo eliminado exitosamente",
   "status": 200,
   "data": DATOS ELIMINADOS
  }
```
# Menu
La respuesta que contiene los datos de menu en el siguiente formato:
```json
  {
     "id": 1,
      "idPadre": 0,
      "secuencia": 0,
      "pathIcono": "string",
      "pathPadre": "string",
      "nombre": "string",
      "accion": "string",
      "fechaCreacion": "2024-01-16T21:34:06.122195Z",
      "fechaModificacion": "2024-01-16T21:34:06.122195Z",
      "idUsrCreacion": null,
      "idUsrModificacion": null,
      "estado": "AC"
  }
```

## Registro
- Ruta: `/riMenu`
- Método: `POST`
- Requiere token: `SI`
- Body: 
```json
  {
   "idPadre": 0,
  "secuencia": 0,
  "pathIcono": "string",
  "pathPadre": "string",
  "nombre": "string",
  "accion": "string"
  }
```
- Respuesta:
```json
  {
      "message": "Menu creado exitosamente",
      "status": 200,
      "data": DATOS DE MENU REGISTRADO
  }
```
## Modificar 
- Ruta: `/riMenu/id`
- Método: `PUT`
- Requiere token: `SI`
- Body: 
```json
  {
  "idPadre": 0,
  "secuencia": 0,
  "pathIcono": "string",
  "pathPadre": "string",
  "nombre": "string",
  "accion": "string"
}
```
- Respuesta:
```json
  {
     "message": "Menu modificado exitosamente",
  "status": 200,
    "data": DATOS DE MENU ACTUALIZADOS
  }
```

## Eliminar 
- Ruta: `/riMenu/id`
- Método: `DELETE`
- Requiere token: `SI`
- Respuesta:
```json
  {
   "message": "Menu eliminado exitosamente",
   "status": 200,
   "data": DATOS ELIMINADOS
  }
```
# Producto categoria
La respuesta que contiene los datos de producto categoria en el siguiente formato:
```json
  {
     "id": 1,
      "idPadre": 0,
      "nombre": "string",
      "nombreCompleto": "string",
      "pathPadre": "string",
      "fechaCreacion": "2024-01-16T21:38:48.571203Z",
      "fechaModificacion": "2024-01-16T21:38:48.571203Z",
      "idEstrategiaEliminacion": 0,
      "metodoEmbalaje": "string",
      "idUsrCreacion": 1,
      "idUsrModificacion": null,
      "estado": "AC"
  }
```

## Registro
- Ruta: `/productoCategoria`
- Método: `POST`
- Requiere token: `SI`
- Body: 
```json
{
  "idPadre": 0,
  "nombre": "string",
  "nombreCompleto": "string",
  "pathPadre": "string",
  "idEstrategiaEliminacion": 0,
  "metodoEmbalaje": "string"
}
```
- Respuesta:
```json
  {
      "message": "Categoria creada exitosamente",
      "status": 200,
      "data": DATOS DE PRODUCTO CATEGORIA REGISTRADO
  }
```
## Modificar 
- Ruta: `/productoCategoria/id`
- Método: `PUT`
- Requiere token: `SI`
- Body: 
```json
 {
  "idPadre": 0,
  "nombre": "string",
  "nombreCompleto": "string",
  "pathPadre": "string",
  "idEstrategiaEliminacion": 0,
  "metodoEmbalaje": "string"
}
```
- Respuesta:
```json
  {
     "message": "Categoria modificada exitosamente",
  "status": 200,
    "data": DATOS DE CATEGORIA PRODUCTO ACTUALIZADOS
  }
```

## Eliminar 
- Ruta: `/productoCategoria/id`
- Método: `DELETE`
- Requiere token: `SI`
- Respuesta:
```json
  {
   "message": "Categoria eliminado exitosamente",
   "status": 200,
   "data": DATOS ELIMINADOS
  }
```
# Producto base
La respuesta que contiene los datos de producto base en el siguiente formato:
```json
  {
"id": 1,
      "idCategoria": 1,
      "idUnidadMed": 0,
      "idUnidadMedCompra": 0,
      "idEmpresa": 0,
      "idTipoProducto": 0,
      "sequencia": 0,
      "color": 0,
      "codInterno": "string",
      "codFabricante": "string",
      "codBarras": "string",
      "prioridad": "string",
      "nombre": "string",
      "descripcion": "string",
      "descripcionCompra": "string",
      "descripcionVenta": "string",
      "precioVenta": 0,
      "precioCosto": 0,
      "volumen": 0,
      "peso": 0,
      "vendible": true,
      "comprable": true,
      "configurable": true,
      "fechaCreacion": "0001-01-01T00:00:00",
      "fechaModificacion": "0001-01-01T00:00:00",
      "trazabilidad": "string",
      "plazoEntregaCli": "string",
      "tipoServEnt": "string",
      "idUsrCreacion": 1,
      "idUsrModificacion": null,
      "estado": "AC"
}
```

## Registro
- Ruta: `/prodProductoBase`
- Método: `POST`
- Requiere token: `SI`
- Body: 
```json
{
  "idCategoria": 1,
  "idUnidadMed": 0,
  "idUnidadMedCompra": 0,
  "idEmpresa": 0,
  "idTipoProducto": 0,
  "sequencia": 0,
  "color": 0,
  "codInterno": "string",
  "codFabricante": "string",
  "codBarras": "string",
  "prioridad": "string",
  "nombre": "string",
  "descripcion": "string",
  "descripcionCompra": "string",
  "descripcionVenta": "string",
  "precioVenta": 0,
  "precioCosto": 0,
  "volumen": 0,
  "peso": 0,
  "vendible": true,
  "comprable": true,
  "configurable": true,
  "trazabilidad": "string",
  "plazoEntregaCli": "string",
  "tipoServEnt": "string"
}
```
- Respuesta:
```json
  {
      "message": "Producto creado exitosamente",
      "status": 200,
      "data": DATOS DE PRODUCTO REGISTRADO
  }
```
## Modificar 
- Ruta: `/prodProductoBase/id`
- Método: `PUT`
- Requiere token: `SI`
- Body: 
```json
 {
  "idCategoria": 0,
  "idUnidadMed": 0,
  "idUnidadMedCompra": 0,
  "idEmpresa": 0,
  "idTipoProducto": 0,
  "sequencia": 0,
  "color": 0,
  "codInterno": "string",
  "codFabricante": "string",
  "codBarras": "string",
  "prioridad": "string",
  "nombre": "string",
  "descripcion": "string",
  "descripcionCompra": "string",
  "descripcionVenta": "string",
  "precioVenta": 0,
  "precioCosto": 0,
  "volumen": 0,
  "peso": 0,
  "vendible": true,
  "comprable": true,
  "configurable": true,
  "trazabilidad": "string",
  "plazoEntregaCli": "string",
  "tipoServEnt": "string"
}
```
- Respuesta:
```json
  {
     "message": "Producto modificado exitosamente",
     "status": 200,
    "data": DATOS DE PRODUCTO ACTUALIZADOS
  }
```

## Eliminar 
- Ruta: `/prodProductoBase/id`
- Método: `DELETE`
- Requiere token: `SI`
- Respuesta:
```json
  {
   "message": "Producto eliminado exitosamente",
   "status": 200,
   "data": DATOS ELIMINADOS
  }
```
# Categoria modulo
La respuesta que contiene los datos de categoria modulo en el siguiente formato:
```json
  {    "id": 1,
      "fechaCreacion": "2024-01-16T21:50:37.22147Z",
      "fechaModificacion": "2024-01-16T21:50:37.22147Z",
      "idPadre": 0,
      "nombre": "string",
      "descripcion": "string",
      "secuencia": 0,
      "visible": true,
      "exclusivo": true,
      "idUsrCreacion": 1,
      "idUsrModificacion": null,
      "estado": "AC"
}
```

## Registro
- Ruta: `/riCategoriaModulo`
- Método: `POST`
- Requiere token: `SI`
- Body: 
```json
{
  "idPadre": 0,
  "nombre": "string",
  "descripcion": "string",
  "secuencia": 0,
  "visible": true,
  "exclusivo": true
}
```
- Respuesta:
```json
  {
      "message": "Modulo creado exitosamente",
      "status": 200,
      "data": DATOS DE MODULO CATEGORIA REGISTRADO
  }
```
## Modificar 
- Ruta: `/riCategoriaModulo/id`
- Método: `PUT`
- Requiere token: `SI`
- Body: 
```json
 {
  "idPadre": 0,
  "nombre": "nombre modulo",
  "descripcion": "string",
  "secuencia": 0,
  "visible": true,
  "exclusivo": true
}
```
- Respuesta:
```json
  {
      "message": "Modulo modificado exitosamente",
      "status": 200,
      "data": DATOS DE MODULO CATEGORIA ACTUALIZADOS
  }
```

## Eliminar 
- Ruta: `/riCategoriaModulo/id`
- Método: `DELETE`
- Requiere token: `SI`
- Respuesta:
```json
  {
   "message": "Modulo eliminado exitosamente",
   "status": 200,
   "data": DATOS ELIMINADOS
  }
```
# Categoria contacto
La respuesta que contiene los datos de categoria contacto en el siguiente formato:
```json
  {
    "id": 1,
    "idPadre": 1,
    "nombre": "Nombre de contacto",
    "pathPadre": "ninguno",
    "fechaCreacion": "2024-01-16T20:58:14.4108843Z",
    "fechaModificacion": "2024-01-16T20:58:14.4108843Z",
    "color": 1,
    "idUsrCreacion": 1,
    "idUsrModificacion": null,
    "estado": "AC"
  }
```

## Registro
- Ruta: `/recCategoriaContacto`
- Método: `POST`
- Requiere token: `SI`
- Body: 
```json
  {
    "idPadre": 1,
    "nombre": "Nombre de contacto",
    "pathPadre": "ninguno",
    "color": 1
  }
```
- Respuesta:
```json
  {
    "message": "Categoria creada exitosamente",
    "status": 200,
    "data": DATOS DE LA CATEGORIA REGISTRADA
  }
```
## Modificar
- Ruta: `/recCategoriaContacto/id`
- Método: `PUT`
- Requiere token: `SI`
- Body: 
```json
  {
  "idPadre": 1,
  "nombre": "Nombre de contacto",
  "pathPadre": "ninguno",
  "color": 1
}
```
- Respuesta:
```json
  {
    "message": "Categoria modificada exitosamente",
  "status": 200,
    "data": DATOS DE CATEGORIA ACTUALIZADOS
  }
```

## Eliminar 
- Ruta: `/recCategoriaContacto/id`
- Método: `DELETE`
- Requiere token: `SI`
- Respuesta:
```json
  {
   "message": "Categoria eliminada exitosamente",
  "status": 200,
  "data": DATOS ELIMINADOS
  }
```
# Contable asiento
La respuesta que contiene los datos de contable asiento en el siguiente formato:
```json
  {  "id": 1,
      "idTipoComprobante": 2,
      "nombreTipoComprobante": "string",
      "numeroComprobante": "string",
      "fecha": "2024-01-16",
      "concepto": "string",
      "fechaCreacion": "2024-01-16T21:56:56.813173Z",
      "idUsrCreacion": 1,
      "idUsrModificacion": null,
      "estado": "AC"
}
```

## Registro
- Ruta: `/contableAsiento`
- Método: `POST`
- Requiere token: `SI`
- Body: 
```json
{
  "idTipoComprobante": 2,
  "numeroComprobante": "string",
  "fecha": "2024-01-16",
  "concepto": "string"
}
```
- Respuesta:
```json
  {
      "message": "Asiento creado exitosamente",
       "status": 200,
      "data": DATOS DE CONTABLE ASIENTO REGISTRADO
  }
```
## Modificar 
- Ruta: `/contableAsiento/id`
- Método: `PUT`
- Requiere token: `SI`
- Body: 
```json
 {
  "idTipoComprobante": 0,
  "numeroComprobante": "string",
  "fecha": "2024-01-16",
  "concepto": "string"
}
```
- Respuesta:
```json
  {
      message": "Asiento modificado exitosamente",
      "status": 200,
      "data": DATOS DE CONTABLE ASIENTO ACTUALIZADOS
  }
```

## Eliminar 
- Ruta: `/contableAsiento/id`
- Método: `DELETE`
- Requiere token: `SI`
- Respuesta:
```json
  {
   "message": "Asiento eliminado exitosamente",
   "status": 200,
   "data": DATOS ELIMINADOS
  }
```
# Contable cuenta
La respuesta que contiene los datos de contable cuenta en el siguiente formato:
```json
  {  "id": 1,
      "codigo": "string",
      "descripcion": "string",
      "nivel": 0,
      "padre": "string",
      "moneda": "string",
      "idUsrCreacion": 1,
      "idUsrModificacion": null,
      "estado": "AC"
}
```

## Registro
- Ruta: `/contableCuenta`
- Método: `POST`
- Requiere token: `SI`
- Body: 
```json
{
  "codigo": "string",
  "descripcion": "string",
  "nivel": 0,
  "padre": "string",
  "moneda": "string"
}
```
- Respuesta:
```json
  {
      "message": "Cuenta creada exitosamente",
      "status": 200,
      "data": DATOS DE CONTABLE CUENTA REGISTRADO
  }
```
## Modificar 
- Ruta: `/contableCuenta/id`
- Método: `PUT`
- Requiere token: `SI`
- Body: 
```json
{
  "codigo": "string",
  "descripcion": "string",
  "nivel": 0,
  "padre": "string",
  "moneda": "string"
}
```
- Respuesta:
```json
  {
       "message": "Cuenta modificada exitosamente",
       "status": 200,
       "data": DATOS DE CONTABLE CUENTA ACTUALIZADOS
  }
```

## Eliminar 
- Ruta: `/contableCuenta/id`
- Método: `DELETE`
- Requiere token: `SI`
- Respuesta:
```json
  {
   "message": "Cuenta eliminado exitosamente",
   "status": 200,
   "data": DATOS ELIMINADOS
  }
```
# Contable detalle asiento
La respuesta que contiene los datos de contable detalle asiento en el siguiente formato:
```json
  {  "id": 1,
      "idCuenta": 1,
      "codigoCuenta": "string",
      "idAsiento": 1,
      "conceptoAsiento": "string",
      "glosa": "string",
      "debeBs": 0,
      "haberBs": 0,
      "debeSus": 0,
      "haberSus": 0,
      "idUsrCreacion": 1,
      "idUsrModificacion": null,
      "estado": "AC"
}
```

## Registro
- Ruta: `/contableDetalleAsiento`
- Método: `POST`
- Requiere token: `SI`
- Body: 
```json
{
  "idCuenta": 1,
  "idAsiento": 1,
  "glosa": "string",
  "debeBs": 0,
  "debeSus": 0,
  "haberBs": 0,
  "haberSus": 0
}
```
- Respuesta:
```json
  {
      "message": "Detalle asiento creado exitosamente",
  "status": 200,
      "data": DATOS DE CONTABLE DETALLE ASIENTO REGISTRADO
  }
```
## Modificar 
- Ruta: `/contableDetalleAsiento/id`
- Método: `PUT`
- Requiere token: `SI`
- Body: 
```json
{
  "idCuenta": 0,
  "idAsiento": 0,
  "glosa": "string",
  "debeBs": 0,
  "debeSus": 0,
  "haberBs": 0,
  "haberSus": 0
}
```
- Respuesta:
```json
  {
       "message": "Detalle asiento modificado exitosamente",
       "status": 200,
       "data": DATOS DE CONTABLE DETALLE ASIENTO ACTUALIZADOS
  }
```

## Eliminar 
- Ruta: `/contableDetalleAsiento/id`
- Método: `DELETE`
- Requiere token: `SI`
- Respuesta:
```json
  {
   "message": "Detalle asiento eliminado exitosamente",
   "status": 200,
   "data": DATOS ELIMINADOS
  }
```
