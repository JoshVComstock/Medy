namespace server.Constants
{
    public static class Messages
    {
        public static class Auth
        {
            public static string FOUND { get; } = "Usuario obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el usuario";
            public static string CREATED { get; } = "Usuario registrado correctamente";
            public static string UPDATED { get; } = "Usuario actualizado exitosamente";
            public static string UPDATEDPASSWORD { get; } = "Contraseña actualizada exitosamente";
            public static string EXISTSUSERNAME { get; } = "Este nombre de usuario ya existe";
            public static string UNAUTHORIZED { get; } = "Las credenciales son inválidas";
            public static string ERRORCONFIG { get; } = "No se encontró la configuración para generar el token";
            public static string ERRORTOKEN { get; } = "Token inválido";
            public static string ERRORPASSWORDACTUAL { get; } = "La contraseña actual no coincide";
            public static string ERRORPASSWORDBODY { get; } = "Las contraseña nueva no coincide";
        }
        public static class ContableBanco
        {
            public static string GET { get; } = "Cuentas de bancos obtenidas correctamente";
            public static string FIND { get; } = "Cuenta de banco obtenida correctamente";
            public static string NOTFOUND { get; } = "No se encontró la cuenta de banco";
            public static string CREATED { get; } = "Cuenta de banco creada exitosamente";
            public static string UPDATED { get; } = "Cuenta de banco modificada exitosamente";
            public static string DELETED { get; } = "Cuenta de banco eliminada exitosamente";
        }
        public static class ContableDetalleAsiento
        {
            public static string GET { get; } = "Detalle asientos obtenidos correctamente";
            public static string FIND { get; } = "Detalle asiento obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el detalle asiento";
            public static string CREATED { get; } = "Detalle asiento creado exitosamente";
            public static string UPDATED { get; } = "Detalle asiento modificado exitosamente";
            public static string DELETED { get; } = "Detalle asiento eliminado exitosamente";
            public static string NOTASIENTO { get; } = "No se encontró el asiento seleccionado";
            public static string NOTCUENTA { get; } = "No se encontró la cuenta seleccionada";

        }
        public static class ProdCategoria
        {
            public static string GET { get; } = "Categorias obtenidos correctamente";
            public static string FIND { get; } = "Categoria obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró la categoria";
            public static string CREATED { get; } = "Categoria creada exitosamente";
            public static string UPDATED { get; } = "Categoria modificada exitosamente";
            public static string DELETED { get; } = "Categoria eliminada exitosamente";
            public static string EXISTS { get; } = "Ya existe una categoria con ese nombre";

        }
        public static class RiCategoriaModulo
        {
            public static string GET { get; } = "Modulos obtenidos correctamente";
            public static string FIND { get; } = "Modulo obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el modulo";
            public static string CREATED { get; } = "Modulo creado exitosamente";
            public static string UPDATED { get; } = "Modulo modificado exitosamente";
            public static string DELETED { get; } = "Modulo eliminado exitosamente";
            public static string EXISTS { get; } = "Ya existe un modulo con ese nombre";

        }
        public static class RecContactoCategoria
        {
            public static string GET { get; } = "Categorias obtenidos correctamente";
            public static string FIND { get; } = "Categoria obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró la categoria";
            public static string CREATED { get; } = "Categoria creada exitosamente";
            public static string UPDATED { get; } = "Categoria modificada exitosamente";
            public static string DELETED { get; } = "Categoria eliminada exitosamente";
            public static string EXISTS { get; } = "Ya existe una categoria con ese nombre";

        }
        public static class RecContacto
        {
            public static string GET { get; } = "Contactos obtenidos correctamente";
            public static string FIND { get; } = "Contacto obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el contacto";
            public static string CREATED { get; } = "Contacto creado exitosamente";
            public static string UPDATED { get; } = "Contacto modificado exitosamente";
            public static string DELETED { get; } = "Contacto eliminado exitosamente";
            public static string EXISTS { get; } = "Ya existe una contacto con ese nombre";
            public static string NOTEMPRESA { get; } = "No se encontró la empresa seleccionada";
        }
        public static class RecGrupo
        {
            public static string GET { get; } = "Grupos obtenidos correctamente";
            public static string FIND { get; } = "Grupo obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el grupo";
            public static string CREATED { get; } = "Grupo creado exitosamente";
            public static string UPDATED { get; } = "Grupo modificado exitosamente";
            public static string DELETED { get; } = "Grupo eliminado exitosamente";
            public static string EXISTS { get; } = "Ya existe un grupo con ese nombre";

        }
        public static class RiMenu
        {
            public static string GET { get; } = "Menus obtenidos correctamente";
            public static string FIND { get; } = "Menu obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el menu";
            public static string CREATED { get; } = "menu creado exitosamente";
            public static string UPDATED { get; } = "menu modificado exitosamente";
            public static string DELETED { get; } = "menu eliminado exitosamente";
            public static string EXISTS { get; } = "Ya existe un menu con ese nombre";
            public static string NOTPADRE { get; } = "No se encontró el menú padre seleccionado";

        }
        public static class ProdProductoBase
        {
            public static string GET { get; } = "Productos obtenidos correctamente";
            public static string FIND { get; } = "Producto obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el producto";
            public static string CREATED { get; } = "producto creado exitosamente";
            public static string UPDATED { get; } = "producto modificado exitosamente";
            public static string DELETED { get; } = "producto eliminado exitosamente";
            public static string EXISTS { get; } = "Ya existe un producto con ese nombre";
            public static string NOTCATEGORIA { get; } = "No se encontro la categoria selecionada";

        }
        public static class RecTipoUsuario
        {
            public static string GET { get; } = "Tipos usuarios obtenidos correctamente";
            public static string FIND { get; } = "Tipo usuario obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el tipo usuario";
            public static string CREATED { get; } = "Tipo usuario creado exitosamente";
            public static string UPDATED { get; } = "Tipo usuario modificado exitosamente";
            public static string DELETED { get; } = "Tipo usuario eliminado exitosamente";

        }
        public static class RecUsuario
        {
            public static string GET { get; } = "Usuarios obtenidos correctamente";
            public static string FIND { get; } = "Usuario obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el Usuario";
            public static string CREATED { get; } = "Usuario creado exitosamente";
            public static string UPDATED { get; } = "Usuario modificado exitosamente";
            public static string DELETED { get; } = "Usuario eliminado exitosamente";
            public static string EXISTS { get; } = "Ya existe una Usuario con ese nombre";
            public static string NOTCONTACTO { get; } = "No se encontro el contacto seleccionado";
            public static string NOTEMPRESA { get; } = "No se encontro la empresa seleccionada";
            public static string NOTTIPOUSUARIO { get; } = "No se encontro el tipo usuario seleccionado";


        }
        public static class RiModelo
        {
            public static string GET { get; } = "Modelos obtenidos correctamente";
            public static string FIND { get; } = "Modelo obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el modelo";
            public static string CREATED { get; } = "Modelo creado exitosamente";
            public static string UPDATED { get; } = "Modelo modificado exitosamente";
            public static string DELETED { get; } = "Modelo eliminado exitosamente";
            public static string EXISTS { get; } = "Ya existe un modelo con ese nombre";

        }
        public static class RiAccesoModelo
        {
            public static string GET { get; } = "Accesos obtenidos correctamente";
            public static string FIND { get; } = "Acceso obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el acceso";
            public static string CREATED { get; } = "Acceso creado exitosamente";
            public static string UPDATED { get; } = "Acceso modificado exitosamente";
            public static string DELETED { get; } = "Acceso eliminado exitosamente";
            public static string EXISTS { get; } = "Ya existe un acceso con ese nombre";
            public static string NOTMODELO { get; } = "No se encontro el modelo selecionada";
            public static string NOTGRUPO { get; } = "No se encontro el grupo selecionada";

        }
        public static class ProdAtributo
        {
            public static string GET { get; } = "Atributos obtenidos correctamente";
            public static string FIND { get; } = "Atributo obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el atributo";
            public static string CREATED { get; } = "Atributo creado exitosamente";
            public static string UPDATED { get; } = "Atributo modificado exitosamente";
            public static string DELETED { get; } = "Atributo eliminado exitosamente";
            public static string EXISTS { get; } = "Ya existe un atributo con ese nombre";

        }
        public static class ProdAtributoValor
        {
            public static string GET { get; } = "Atributos valor obtenidos correctamente";
            public static string FIND { get; } = "Atributo valor obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el atributo valor";
            public static string CREATED { get; } = "Atributo valor creado exitosamente";
            public static string UPDATED { get; } = "Atributo valor modificado exitosamente";
            public static string DELETED { get; } = "Atributo valor eliminado exitosamente";
            public static string EXISTS { get; } = "Ya existe un atributo valor con ese nombre";
            public static string NOTATRIBUTO { get; } = "No se encontro el atributo seleccionada";

        }
        public static class RecEmpresa
        {
            public static string GET { get; } = "Empresas obtenidos correctamente";
            public static string FIND { get; } = "Empresa obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró la empresa";
            public static string CREATED { get; } = "Empresa creado exitosamente";
            public static string UPDATED { get; } = "Empresa modificada exitosamente";
            public static string DELETED { get; } = "Empresa eliminada exitosamente";
            public static string EXISTS { get; } = "Ya existe un Empresa con ese nombre";
            public static string NOTCONTACTO { get; } = "No se encontro el contacto seleccionado";
            public static string NOTMONEDA { get; } = "No se encontro la moneda seleccionada";


        }
        public static class ProdProducto
        {
            public static string GET { get; } = "Productos obtenidos correctamente";
            public static string FIND { get; } = "Producto obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el Producto";
            public static string CREATED { get; } = "Producto creado exitosamente";
            public static string UPDATED { get; } = "Producto modificado exitosamente";
            public static string DELETED { get; } = "Producto eliminado exitosamente";
            public static string EXISTS { get; } = "Ya existe un Producto con ese nombre";
            public static string BADFORM { get; } = "Error en el formulario";

        }
        public static class CompraOrden
        {
            public static string GET { get; } = "Compras obtenidos correctamente";
            public static string FIND { get; } = "Compra obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró la compra";
            public static string CREATED { get; } = "Compra creado exitosamente";
            public static string UPDATED { get; } = "Compra modificado exitosamente";
            public static string DELETED { get; } = "Compra eliminado exitosamente";
            public static string NOTCONTACTO { get; } = "No se encontro el proveedor seleccionado";
            public static string NOTEMPRESA { get; } = "No se encontro la empresa seleccionada";
            public static string NOTMONEDA { get; } = "No se encontro la moneda seleccionada";

        }
        public static class VentaOrden
        {
            public static string GET { get; } = "Ventas obtenidos correctamente";
            public static string FIND { get; } = "Ventas obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró la venta";
            public static string CREATED { get; } = "Venta creado exitosamente";
            public static string UPDATED { get; } = "Venta modificado exitosamente";
            public static string DELETED { get; } = "Venta eliminado exitosamente";

        }
        public static class RecBanco
        {
            public static string GET { get; } = "Bancos obtenidos correctamente";
            public static string FIND { get; } = "Banco obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el banco";
            public static string CREATED { get; } = "Banco creado exitosamente";
            public static string UPDATED { get; } = "Banco modificado exitosamente";
            public static string DELETED { get; } = "Banco eliminado exitosamente";
            public static string EXISTS { get; } = "Ya existe un banco con ese nombre";
        }
        public static class Moneda
        {
            public static string GET { get; } = "Monedas obtenidos correctamente";
            public static string FIND { get; } = "Moneda obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró la moneda";
            public static string CREATED { get; } = "Moneda creado exitosamente";
            public static string UPDATED { get; } = "Moneda modificado exitosamente";
            public static string DELETED { get; } = "Moneda eliminado exitosamente";
            public static string EXISTS { get; } = "Ya existe una moneda con ese nombre";

        }
        public static class RecContactoBanco
        {
            public static string GET { get; } = "Contacto bancos obtenidos correctamente";
            public static string FIND { get; } = "Contacto banco obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el contacto banco";
            public static string CREATED { get; } = "Contacto banco creado exitosamente";
            public static string UPDATED { get; } = "Contacto banco modificado exitosamente";
            public static string DELETED { get; } = "Contacto banco eliminado exitosamente";
            public static string NOTCONTACTO { get; } = "No se encontro el contacto seleccionado";
            public static string NOTBANCO { get; } = "No se encontro el banco seleccionado";

        }
        public static class Efectivo
        {
            public static string GET { get; } = "Efectivos obtenidos correctamente";
            public static string FIND { get; } = "Efectivo obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el efectivo";
            public static string CREATED { get; } = "Efectivo creado exitosamente";
            public static string UPDATED { get; } = "Efectivo modificado exitosamente";
            public static string DELETED { get; } = "Efectivo eliminado exitosamente";
            public static string NOTMONEDA { get; } = "No se encontró el Moneda";
        }
        public static class UmUnidadMedida
        {
            public static string GET { get; } = "Unidades de medidas obtenidos correctamente";
            public static string FIND { get; } = "Unidad de medida obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró la unidad de medida";
            public static string CREATED { get; } = "Unidad de medida creado exitosamente";
            public static string UPDATED { get; } = "Unidad de medida modificado exitosamente";
            public static string DELETED { get; } = "Unidad de medida eliminado exitosamente";
            public static string EXISTS { get; } = "Ya existe una unidad de medida con ese nombre";

        }
        public static class UmCategoria
        {
            public static string GET { get; } = "Categorias obtenidas correctamente";
            public static string FIND { get; } = "Categoria obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró la categoria";
            public static string CREATED { get; } = "Categoria creada exitosamente";
            public static string UPDATED { get; } = "Categoria modificada exitosamente";
            public static string DELETED { get; } = "Categoria eliminada exitosamente";
            public static string EXISTS { get; } = "Ya existe una categoria con ese nombre";

        }
        public static class PvConfig
        {
            public static string GET { get; } = "Configs obtenidos correctamente";
            public static string FIND { get; } = "Config obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el config";
            public static string CREATED { get; } = "Config creado exitosamente";
            public static string UPDATED { get; } = "Config modificado exitosamente";
            public static string DELETED { get; } = "Config eliminado exitosamente";
            public static string NOTEMPRESA { get; } = "No se encontro la empresa seleccionado";

        }
        public static class PvCaja
        {
            public static string GET { get; } = "Cajas obtenidos correctamente";
            public static string FIND { get; } = "Caja obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el caja";
            public static string CREATED { get; } = "Caja creado exitosamente";
            public static string UPDATED { get; } = "Caja modificado exitosamente";
            public static string DELETED { get; } = "Caja eliminado exitosamente";

        }
        public static class ProdTarifa
        {
            public static string GET { get; } = "Tarifas obtenidos correctamente";
            public static string FIND { get; } = "Tarifa obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró la tarifa";
            public static string CREATED { get; } = "Tarifa creada exitosamente";
            public static string UPDATED { get; } = "Tarifa modificada exitosamente";
            public static string DELETED { get; } = "Tarifa eliminada exitosamente";
            public static string NOTMONEDA { get; } = "No se encontro la moneda seleccionada";
            public static string NOTEMPRESA { get; } = "No se encontro la empresa seleccionada";
            public static string NOTCATEGORIA { get; } = "No se encontro la categoria seleccionada";
            public static string NOTPRODUCTO { get; } = "No se encontro el producto seleccionado";
            public static string NOTPRODUCTOBASE { get; } = "No se encontro el producto base seleccionado";

        }
        //Pesquisas
        public static class Ciudad
        {
            public static string GET { get; } = "Ciudades obtenidos correctamente";
            public static string FIND { get; } = "Ciudad obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró la ciudad";
            public static string CREATED { get; } = "Ciudad creado exitosamente";
            public static string UPDATED { get; } = "Ciudad modificado exitosamente";
            public static string DELETED { get; } = "Ciudad eliminado exitosamente";
        }
        public static class Provincia
        {
            public static string GET { get; } = "Provincias obtenidos correctamente";
            public static string FIND { get; } = "Provincia obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró la provincia";
            public static string CREATED { get; } = "Provincia creado exitosamente";
            public static string UPDATED { get; } = "Provincia modificado exitosamente";
            public static string DELETED { get; } = "Provincia eliminado exitosamente";
        }
        public static class Municipio
        {
            public static string GET { get; } = "Municipios obtenidos correctamente";
            public static string FIND { get; } = "Municipio obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el municipio";
            public static string CREATED { get; } = "Municipio creado exitosamente";
            public static string UPDATED { get; } = "Municipio modificado exitosamente";
            public static string DELETED { get; } = "Municipio eliminado exitosamente";
        }
        public static class Centro
        {
            public static string GET { get; } = "Centros obtenidos correctamente";
            public static string FIND { get; } = "Centro obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el centro";
            public static string CREATED { get; } = "Centro creado exitosamente";
            public static string UPDATED { get; } = "Centro modificado exitosamente";
            public static string DELETED { get; } = "Centro eliminado exitosamente";
        }
        public static class Laboratorio
        {
            public static string GET { get; } = "Laboratorios obtenidos correctamente";
            public static string FIND { get; } = "Laboratorio obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el laboratorio";
            public static string CREATED { get; } = "Laboratorio creado exitosamente";
            public static string UPDATED { get; } = "Laboratorio modificado exitosamente";
            public static string DELETED { get; } = "Laboratorio eliminado exitosamente";
        }
        public static class Red
        {
            public static string GET { get; } = "Reds obtenidos correctamente";
            public static string FIND { get; } = "Red obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró la red";
            public static string CREATED { get; } = "Red creado exitosamente";
            public static string UPDATED { get; } = "Red modificado exitosamente";
            public static string DELETED { get; } = "Red eliminado exitosamente";
        }
        public static class ManejoCartilla
        {
            public static string GET { get; } = "Cartillas obtenidos correctamente";
            public static string FIND { get; } = "Cartilla obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró la cartilla";
            public static string CREATED { get; } = "Cartilla creado exitosamente";
            public static string UPDATED { get; } = "Cartilla modificado exitosamente";
            public static string DELETED { get; } = "Cartilla eliminado exitosamente";
        }
        public static class Cartilla
        {
            public static string GET { get; } = "Cartillas obtenidos correctamente";
            public static string FIND { get; } = "Cartilla obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró la cartilla";
            public static string CREATED { get; } = "Cartilla creado exitosamente";
            public static string UPDATED { get; } = "Cartilla modificado exitosamente";
            public static string DELETED { get; } = "Cartilla eliminado exitosamente";
        }
        public static class Paciente
        {
            public static string GET { get; } = "Pacientes obtenidos correctamente";
            public static string FIND { get; } = "Paciente obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el paciente";
            public static string CREATED { get; } = "Paciente creado exitosamente";
            public static string UPDATED { get; } = "Paciente modificado exitosamente";
            public static string DELETED { get; } = "Paciente eliminado exitosamente";
        }
        public static class Resultado
        {
            public static string GET { get; } = "Resultados obtenidos correctamente";
            public static string FIND { get; } = "Resultado obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el resultado";
            public static string CREATED { get; } = "Resultado creado exitosamente";
            public static string UPDATED { get; } = "Resultado modificado exitosamente";
            public static string DELETED { get; } = "Resultado eliminado exitosamente";
        }
        //end
    }
}
