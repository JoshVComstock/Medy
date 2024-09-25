INSERT INTO public."RiMenu"("IdPadre", "Secuencia", "PathIcono", "PathPadre", "Nombre", "Accion", "FechaCreacion", "Estado")

VALUES (null, 1, 'Contactos', '', 'Contactos', null, NOW(), 'AC'),
(null, 2, 'Compras', '', 'Compras', null, NOW(), 'AC'),
(null, 3, 'Ventas', '', 'Ventas', null, NOW(), 'AC'),
(null, 4, 'Inventario', '', 'Inventario', null, NOW(), 'AC'),
(null, 5, 'Puntero', '', 'Punto de venta', null, NOW(), 'AC'),
(null, 6, 'Contable', '', 'Contabilidad', null, NOW(), 'AC'),
(null, 7, 'Dashboard', '', 'Dashboard', null, NOW(), 'AC'),
(null, 8, 'Configuracion', '', 'Configuración', null, NOW(), 'AC'),

(1, 1, null, '', 'Contactos', '/dashboard/contactos', NOW(), 'AC'),
(1, 2, null, '', 'Categorías de contacto', '/dashboard/contactos-categorias', NOW(), 'AC'),
(1, 3, null, '', 'Configuración', '/dashboard/contactos-configuracion', NOW(), 'AC'),

(2, 1, null, '', 'Pedidos', '/dashboard/compras-pedidos', NOW(), 'AC'),
(2, 2, null, '', 'Productos', '/dashboard/compras-productos', NOW(), 'AC'),
(2, 3, null, '', 'Informes', '/dashboard/compras-informes', NOW(), 'AC'),
(2, 4, null, '', 'Configuración', '/dashboard/compras-configuracion', NOW(), 'AC'),
(12, 1, null, '', 'Solicitudes de presupuesto', '/dashboard/compras-pedidos-solicitudes', NOW(), 'AC'),
(12, 2, null, '', 'Pedidos de compra', '/dashboard/compras-pedidos-compra', NOW(), 'AC'),
(12, 3, null, '', 'Proveedores', '/dashboard/compras-pedidos-proveedores', NOW(), 'AC'),
(13, 1, null, '', 'Productos', '/dashboard/compras-productos-productos', NOW(), 'AC'),
(13, 2, null, '', 'Variantes de productos', '/dashboard/compras-productos-variantes', NOW(), 'AC'),

(6, 1, null, '', 'Cuentas', '/dashboard/contabilidad-cuentas', NOW(), 'AC'),
(6, 2, null, '', 'Asientos', '/dashboard/contabilidad-asientos', NOW(), 'AC'),

(8, 1, null, '', 'Usuarios', '/dashboard/configuracion-usuarios', NOW(), 'AC'),
(8, 2, null, '', 'Grupos', '/dashboard/configuracion-grupos', NOW(), 'AC'),
(8, 3, null, '', 'Menús', '/dashboard/configuracion-menus', NOW(), 'AC'),
(8, 4, null, '', 'Modelos', '/dashboard/configuracion-modelos', NOW(), 'AC')