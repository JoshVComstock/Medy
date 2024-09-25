PGDMP     !    (    
            |         
   ERPBD_STAG     12.15 (Debian 12.15-1.pgdg110+1)    15.3 ?   �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    27881 
   ERPBD_STAG    DATABASE     w   CREATE DATABASE "ERPBD_STAG" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE "ERPBD_STAG";
                postgres    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            �           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    6            !           1255    28477 3   load_contable_asiento(integer, date, date, integer)    FUNCTION       CREATE FUNCTION public.load_contable_asiento(numero_filas integer, first_date date, second_date date, filas_detalle integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    i INTEGER = 0;
	id_comprobante INTEGER = 0;
	id_asiento INTEGER;
	id_cuenta INTEGER;
	random_date DATE;
	comprobante TEXT;
	concepto_val TEXT;
	datos_detalle INTEGER;
	haber BOOLEAN;
	debe INTEGER = 0;
	dinero NUMERIC;
	debe_calculo INTEGER = 0;
	distribuido_debe  INTEGER = 0;
	total_debe INTEGER = 0;
BEGIN
    WHILE i < numero_filas LOOP
		SELECT "Id" INTO id_comprobante FROM "ContableTipoComprobante" ORDER BY RANDOM() LIMIT 1;
		random_date = first_date + (random() * (second_date - first_date + 1))::int;
 		comprobante = TRIM(to_char(FLOOR(random() * 10000), '0000'));
		SELECT "Nombre" || comprobante INTO  concepto_val FROM "ContableTipoComprobante" WHERE "Id" = id_comprobante;
		INSERT INTO "ContableAsiento" ("IdTipoComprobante", "NumeroComprobante", "Fecha", "Concepto", "Estado", "FechaModificacion", "FechaCreacion", "IdLibroDiario")
        VALUES (id_comprobante, comprobante, random_date, concepto_val, 'AC', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);
		id_asiento = LASTVAL();
		datos_detalle = FLOOR(RANDOM()*(filas_detalle - 3 + 1) + 3);
		
		FOR j IN 1..datos_detalle LOOP
			SELECT "Id" INTO id_cuenta FROM "ContableCuenta" WHERE "Nivel" = 5 ORDER BY RANDOM() LIMIT 1;
			haber = random() > 0.5;
			dinero = ROUND(CAST(20.0 + random() * (1000.0 - 20.0) AS numeric), 0);
			CASE 
				WHEN haber THEN
					IF j = datos_detalle AND debe = 0 THEN
						debe = debe + 1;
					ELSE
						INSERT INTO "ContableDetalleAsiento" ("IdCuenta", "IdAsiento", "Glosa", "DebeBs", "HaberBs", "DebeSus", "HaberSus", "Estado", "FechaModificacion", "FechaCreacion")
						VALUES (id_cuenta, id_asiento, 'Glosa', null, dinero, null, ROUND(CAST(dinero/6.98 AS NUMERIC),2), 'AC', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
						debe_calculo = debe_calculo + dinero;
					END IF;
				WHEN NOT haber THEN
					IF j = datos_detalle AND debe = datos_detalle - 1 THEN
						INSERT INTO "ContableDetalleAsiento" ("IdCuenta", "IdAsiento", "Glosa", "DebeBs", "HaberBs", "DebeSus", "HaberSus", "Estado", "FechaModificacion", "FechaCreacion")
						VALUES (id_cuenta, id_asiento, 'Glosa', null, dinero, null, ROUND(CAST(dinero/6.98 AS NUMERIC),2), 'AC', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
						debe_calculo = debe_calculo + dinero;
					ELSE
						debe = debe + 1;
					END IF;
			END CASE;
		END LOOP;
		
		FOR k IN 1..debe LOOP
			distribuido_debe = ROUND(CAST((debe_calculo - total_debe) * random() AS NUMERIC),0);
			total_debe = total_debe + distribuido_debe;
			SELECT "Id" INTO id_cuenta FROM "ContableCuenta" WHERE "Nivel" = 5 ORDER BY RANDOM() LIMIT 1;
			IF k = debe THEN
				distribuido_debe = debe_calculo - (total_debe - distribuido_debe);
			END IF;
			INSERT INTO "ContableDetalleAsiento" ("IdCuenta", "IdAsiento", "Glosa", "DebeBs", "HaberBs", "DebeSus", "HaberSus", "Estado", "FechaModificacion", "FechaCreacion")
        	VALUES (id_cuenta, id_asiento, 'Glosa', distribuido_debe, null, ROUND(CAST(distribuido_debe/6.98 AS NUMERIC),2), null, 'AC', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
		END LOOP;
		debe = 0;
		total_debe = 0;
		debe_calculo = 0;
		i = i + 1;
    END LOOP;
END;
$$;
 |   DROP FUNCTION public.load_contable_asiento(numero_filas integer, first_date date, second_date date, filas_detalle integer);
       public          postgres    false    6                       1259    28325    CompraOrden    TABLE       CREATE TABLE public."CompraOrden" (
    "Id" integer NOT NULL,
    "IdProveedor" integer,
    "IdMoneda" integer NOT NULL,
    "RefProveedor" text NOT NULL,
    "CodOrden" text NOT NULL,
    "IdEmpresa" integer NOT NULL,
    "EstadoCompra" integer NOT NULL,
    "Prioridad" integer NOT NULL,
    "Nota" text NOT NULL,
    "IdUsrComprador" integer NOT NULL,
    "MontoSinImpuesto" integer NOT NULL,
    "MontoImpuesto" integer NOT NULL,
    "MontoTotal" integer NOT NULL,
    "FechaLimitePedido" date NOT NULL,
    "FechaConfirmacion" date NOT NULL,
    "FechaEntregaPlani" date NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 !   DROP TABLE public."CompraOrden";
       public         heap    postgres    false    6                       1259    28340    CompraOrdenDetalle    TABLE     .  CREATE TABLE public."CompraOrdenDetalle" (
    "Id" integer NOT NULL,
    "IdCompraOrden" integer,
    "IdProducto" integer,
    "IdUnidadMedida" integer NOT NULL,
    "IdMoneda" integer NOT NULL,
    "IdEmpaquetado" integer NOT NULL,
    "Nombre" text NOT NULL,
    "Cantidad" integer NOT NULL,
    "PrecioUnitario" integer NOT NULL,
    "PrecioSubtotal" integer NOT NULL,
    "PrecioTotal" integer NOT NULL,
    "PrecioImpuesto" integer NOT NULL,
    "CantidadSolicitada" integer NOT NULL,
    "CantidadRecibida" integer NOT NULL,
    "CantidadPaquete" integer NOT NULL,
    "FechaEsperada" date NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 (   DROP TABLE public."CompraOrdenDetalle";
       public         heap    postgres    false    6                       1259    28338    CompraOrdenDetalle_Id_seq    SEQUENCE     �   ALTER TABLE public."CompraOrdenDetalle" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."CompraOrdenDetalle_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    6    260                       1259    28323    CompraOrden_Id_seq    SEQUENCE     �   ALTER TABLE public."CompraOrden" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."CompraOrden_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    258    6            �            1259    28004    ContableAsiento    TABLE     �  CREATE TABLE public."ContableAsiento" (
    "Id" integer NOT NULL,
    "IdTipoComprobante" integer NOT NULL,
    "NumeroComprobante" text NOT NULL,
    "Fecha" date NOT NULL,
    "Concepto" text NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL,
    "IdLibroDiario" integer DEFAULT 0 NOT NULL
);
 %   DROP TABLE public."ContableAsiento";
       public         heap    postgres    false    6            �            1259    28002    ContableAsiento_Id_seq    SEQUENCE     �   ALTER TABLE public."ContableAsiento" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."ContableAsiento_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    226    6            �            1259    28245    ContableBanco    TABLE     n  CREATE TABLE public."ContableBanco" (
    "Id" integer NOT NULL,
    "IdCuenta" integer NOT NULL,
    "NumeroCuenta" text NOT NULL,
    "Nombre" text NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 #   DROP TABLE public."ContableBanco";
       public         heap    postgres    false    6            �            1259    28243    ContableBanco_Id_seq    SEQUENCE     �   ALTER TABLE public."ContableBanco" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."ContableBanco_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    250    6                        1259    28878    ContableCompartirLibroDiario    TABLE     f  CREATE TABLE public."ContableCompartirLibroDiario" (
    "Id" integer NOT NULL,
    "IdUsuario" integer NOT NULL,
    "IdLibroDiario" integer NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 2   DROP TABLE public."ContableCompartirLibroDiario";
       public         heap    postgres    false    6                       1259    28876 #   ContableCompartirLibroDiario_Id_seq    SEQUENCE     �   ALTER TABLE public."ContableCompartirLibroDiario" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."ContableCompartirLibroDiario_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    6    288            �            1259    27889    ContableCuenta    TABLE     �  CREATE TABLE public."ContableCuenta" (
    "Id" integer NOT NULL,
    "Codigo" text NOT NULL,
    "Descripcion" text NOT NULL,
    "Padre" text,
    "Moneda" text,
    "Nivel" integer NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 $   DROP TABLE public."ContableCuenta";
       public         heap    postgres    false    6            �            1259    27887    ContableCuenta_Id_seq    SEQUENCE     �   ALTER TABLE public."ContableCuenta" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."ContableCuenta_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    204    6            �            1259    28124    ContableDetalleAsiento    TABLE     �  CREATE TABLE public."ContableDetalleAsiento" (
    "Id" integer NOT NULL,
    "IdCuenta" integer NOT NULL,
    "IdAsiento" integer NOT NULL,
    "Glosa" text NOT NULL,
    "DebeBs" double precision,
    "HaberBs" double precision,
    "DebeSus" double precision,
    "HaberSus" double precision,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 ,   DROP TABLE public."ContableDetalleAsiento";
       public         heap    postgres    false    6            �            1259    28122    ContableDetalleAsiento_Id_seq    SEQUENCE     �   ALTER TABLE public."ContableDetalleAsiento" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."ContableDetalleAsiento_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    240    6            �            1259    28276    ContableLibroDiario    TABLE     I  CREATE TABLE public."ContableLibroDiario" (
    "Id" integer NOT NULL,
    "IdUsuario" integer NOT NULL,
    "Visualizacion" text NOT NULL,
    "FechaInicio" date NOT NULL,
    "FechaCierre" date,
    "Activo" boolean NOT NULL,
    "Password" text,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL,
    "Descripcion" text DEFAULT ''::text NOT NULL,
    "Nombre" text DEFAULT ''::text NOT NULL,
    "Importante" boolean NOT NULL
);
 )   DROP TABLE public."ContableLibroDiario";
       public         heap    postgres    false    6            �            1259    28274    ContableLibroDiario_Id_seq    SEQUENCE     �   ALTER TABLE public."ContableLibroDiario" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."ContableLibroDiario_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    6    254            �            1259    28266    ContableTipoCambio    TABLE     {  CREATE TABLE public."ContableTipoCambio" (
    "Id" integer NOT NULL,
    "Fecha" date NOT NULL,
    "Dolar" double precision NOT NULL,
    "Ufv" double precision NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 (   DROP TABLE public."ContableTipoCambio";
       public         heap    postgres    false    6            �            1259    28264    ContableTipoCambio_Id_seq    SEQUENCE     �   ALTER TABLE public."ContableTipoCambio" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."ContableTipoCambio_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    6    252            �            1259    27899    ContableTipoComprobante    TABLE     5  CREATE TABLE public."ContableTipoComprobante" (
    "Id" integer NOT NULL,
    "Nombre" text NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 -   DROP TABLE public."ContableTipoComprobante";
       public         heap    postgres    false    6            �            1259    27897    ContableTipoComprobante_Id_seq    SEQUENCE     �   ALTER TABLE public."ContableTipoComprobante" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."ContableTipoComprobante_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    206    6            �            1259    27909    ProdAtributo    TABLE     �  CREATE TABLE public."ProdAtributo" (
    "Id" integer NOT NULL,
    "Secuencia" integer NOT NULL,
    "Nombre" text NOT NULL,
    "TipoVisualizacion" text NOT NULL,
    "ModoCreacion" text NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 "   DROP TABLE public."ProdAtributo";
       public         heap    postgres    false    6            �            1259    28019    ProdAtributoValor    TABLE     �  CREATE TABLE public."ProdAtributoValor" (
    "Id" integer NOT NULL,
    "IdAtributo" integer NOT NULL,
    "Nombre" text NOT NULL,
    "Secuencia" integer NOT NULL,
    "Color" integer NOT NULL,
    "ColorHtml" text NOT NULL,
    "Personalizable" boolean NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 '   DROP TABLE public."ProdAtributoValor";
       public         heap    postgres    false    6            �            1259    28017    ProdAtributoValor_Id_seq    SEQUENCE     �   ALTER TABLE public."ProdAtributoValor" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."ProdAtributoValor_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    228    6            �            1259    27907    ProdAtributo_Id_seq    SEQUENCE     �   ALTER TABLE public."ProdAtributo" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."ProdAtributo_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    6    208            �            1259    28144    ProdBaseAtribValorRel    TABLE     �  CREATE TABLE public."ProdBaseAtribValorRel" (
    "Id" integer NOT NULL,
    "IdAtribValor" integer NOT NULL,
    "IdProdBase" integer NOT NULL,
    "PrecioExtra" integer NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 +   DROP TABLE public."ProdBaseAtribValorRel";
       public         heap    postgres    false    6            �            1259    28142    ProdBaseAtribValorRel_Id_seq    SEQUENCE     �   ALTER TABLE public."ProdBaseAtribValorRel" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."ProdBaseAtribValorRel_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    6    242            �            1259    27919    ProdCategoria    TABLE     �  CREATE TABLE public."ProdCategoria" (
    "Id" integer NOT NULL,
    "IdPadre" integer NOT NULL,
    "Nombre" text NOT NULL,
    "NombreCompleto" text NOT NULL,
    "PathPadre" text NOT NULL,
    "IdEstrategiaEliminacion" integer NOT NULL,
    "MetodoEmbalaje" text NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 #   DROP TABLE public."ProdCategoria";
       public         heap    postgres    false    6            �            1259    27917    ProdCategoria_Id_seq    SEQUENCE     �   ALTER TABLE public."ProdCategoria" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."ProdCategoria_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    210    6            �            1259    28204    ProdProducto    TABLE       CREATE TABLE public."ProdProducto" (
    "Id" integer NOT NULL,
    "IdProdBase" integer NOT NULL,
    "ProdBaseAtribValorRelId" integer,
    "CodInterno" text NOT NULL,
    "CodFabricante" text NOT NULL,
    "CodBarras" text NOT NULL,
    "Volumen" integer NOT NULL,
    "Peso" integer NOT NULL,
    "PathImagen" text,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 "   DROP TABLE public."ProdProducto";
       public         heap    postgres    false    6                        1259    28303    ProdProductoAtribValorRel    TABLE     q  CREATE TABLE public."ProdProductoAtribValorRel" (
    "Id" integer NOT NULL,
    "IdProdBaseAtriValorRel" integer NOT NULL,
    "IdProdProducto" integer NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 /   DROP TABLE public."ProdProductoAtribValorRel";
       public         heap    postgres    false    6            �            1259    28301     ProdProductoAtribValorRel_Id_seq    SEQUENCE     �   ALTER TABLE public."ProdProductoAtribValorRel" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."ProdProductoAtribValorRel_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    256    6            �            1259    28034    ProdProductoBase    TABLE     m  CREATE TABLE public."ProdProductoBase" (
    "Id" integer NOT NULL,
    "IdCategoria" integer NOT NULL,
    "IdUnidadMed" integer NOT NULL,
    "IdUnidadMedCompra" integer NOT NULL,
    "IdEmpresa" integer NOT NULL,
    "IdTipoProducto" integer NOT NULL,
    "Secuencia" integer NOT NULL,
    "Color" integer NOT NULL,
    "CodInterno" text NOT NULL,
    "CodFabricante" text NOT NULL,
    "CodBarras" text NOT NULL,
    "Prioridad" text NOT NULL,
    "Nombre" text NOT NULL,
    "Descripcion" text NOT NULL,
    "DescripcionCompra" text NOT NULL,
    "DescripcionVenta" text NOT NULL,
    "PrecioVenta" integer NOT NULL,
    "PrecioCosto" integer NOT NULL,
    "Volumen" integer NOT NULL,
    "Peso" integer NOT NULL,
    "Vendible" boolean NOT NULL,
    "Comprable" boolean NOT NULL,
    "Configurable" boolean NOT NULL,
    "Trazabilidad" text NOT NULL,
    "PlazoEntregaCli" text NOT NULL,
    "TipoServEnt" text NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 &   DROP TABLE public."ProdProductoBase";
       public         heap    postgres    false    6            �            1259    28032    ProdProductoBase_Id_seq    SEQUENCE     �   ALTER TABLE public."ProdProductoBase" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."ProdProductoBase_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    6    230            �            1259    28202    ProdProducto_Id_seq    SEQUENCE     �   ALTER TABLE public."ProdProducto" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."ProdProducto_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    248    6                       1259    28691 
   ProdTarifa    TABLE     �  CREATE TABLE public."ProdTarifa" (
    "Id" integer NOT NULL,
    "IdMoneda" integer,
    "IdEmpresa" integer,
    "Secuencia" integer NOT NULL,
    "Nombre" text NOT NULL,
    "PoliticaDescuento" text NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
     DROP TABLE public."ProdTarifa";
       public         heap    postgres    false    6                       1259    28711    ProdTarifaDetalle    TABLE     �  CREATE TABLE public."ProdTarifaDetalle" (
    "Id" integer NOT NULL,
    "IdTarifa" integer,
    "IdMoneda" integer,
    "IdProductoCategoria" integer,
    "IdProductoBase" integer,
    "IdProducto" integer,
    "PrecioComputable" text NOT NULL,
    "PrecioFijo" integer NOT NULL,
    "Descuento" integer NOT NULL,
    "AplicadoEn" text NOT NULL,
    "CantidadMin" integer NOT NULL,
    "FechaInicio" date NOT NULL,
    "FechaFin" date NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 '   DROP TABLE public."ProdTarifaDetalle";
       public         heap    postgres    false    6                       1259    28709    ProdTarifaDetalle_Id_seq    SEQUENCE     �   ALTER TABLE public."ProdTarifaDetalle" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."ProdTarifaDetalle_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    276    6                       1259    28689    ProdTarifa_Id_seq    SEQUENCE     �   ALTER TABLE public."ProdTarifa" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."ProdTarifa_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    274    6                       1259    28862    PvConfig    TABLE     �  CREATE TABLE public."PvConfig" (
    "Id" integer NOT NULL,
    "Nombre" text NOT NULL,
    "LimiteProducto" integer NOT NULL,
    "LimiteContactos" integer NOT NULL,
    "IdEmpresa" integer NOT NULL,
    "IdTipoTerminal" integer NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
    DROP TABLE public."PvConfig";
       public         heap    postgres    false    6                       1259    28860    PvConfig_Id_seq    SEQUENCE     �   ALTER TABLE public."PvConfig" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."PvConfig_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    286    6                       1259    28753 
   PvEfectivo    TABLE     l  CREATE TABLE public."PvEfectivo" (
    "Id" integer NOT NULL,
    "IdMoneda" integer NOT NULL,
    "Descripcion" text NOT NULL,
    "Valor" numeric NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
     DROP TABLE public."PvEfectivo";
       public         heap    postgres    false    6                       1259    28751    PvEfectivo_Id_seq    SEQUENCE     �   ALTER TABLE public."PvEfectivo" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."PvEfectivo_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    278    6                       1259    28673    PvMetodoPago    TABLE     ,  CREATE TABLE public."PvMetodoPago" (
    "Id" integer NOT NULL,
    "TipoPago" text NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 "   DROP TABLE public."PvMetodoPago";
       public         heap    postgres    false    6                       1259    28671    PvMetodoPago_Id_seq    SEQUENCE     �   ALTER TABLE public."PvMetodoPago" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."PvMetodoPago_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    6    272                       1259    28852    PvTipoMovimiento    TABLE     .  CREATE TABLE public."PvTipoMovimiento" (
    "Id" integer NOT NULL,
    "Nombre" text NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 &   DROP TABLE public."PvTipoMovimiento";
       public         heap    postgres    false    6                       1259    28850    PvTipoMovimiento_Id_seq    SEQUENCE     �   ALTER TABLE public."PvTipoMovimiento" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."PvTipoMovimiento_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    284    6            
           1259    28621    RecBanco    TABLE     �  CREATE TABLE public."RecBanco" (
    "Id" integer NOT NULL,
    "Nombre" text NOT NULL,
    "Direccion" text NOT NULL,
    "Direccion2" text NOT NULL,
    "CodigoPostal" text NOT NULL,
    "Ciudad" text NOT NULL,
    "Email" text NOT NULL,
    "Telefono" text NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
    DROP TABLE public."RecBanco";
       public         heap    postgres    false    6            	           1259    28619    RecBanco_Id_seq    SEQUENCE     �   ALTER TABLE public."RecBanco" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."RecBanco_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    266    6            �            1259    27929    RecContacto    TABLE     .  CREATE TABLE public."RecContacto" (
    "Id" integer NOT NULL,
    "IdEmpresa" integer,
    "Nombre" text NOT NULL,
    "Profesion" text NOT NULL,
    "NombreDespliegue" text NOT NULL,
    "IdentFiscal" text NOT NULL,
    "Color" integer NOT NULL,
    "IdPais" integer NOT NULL,
    "IdCiudad" integer NOT NULL,
    "EsEmpresa" boolean NOT NULL,
    "Direccion1" text NOT NULL,
    "Direccion2" text NOT NULL,
    "TelefonoFijo" text NOT NULL,
    "TelefonoMovil" text NOT NULL,
    "PuestoTrabajo" text NOT NULL,
    "Email" text NOT NULL,
    "SitioWeb" text NOT NULL,
    "Comentario" text NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL,
    "IdPadre" integer DEFAULT 0,
    "Latitud" integer DEFAULT 0 NOT NULL,
    "Longitud" integer DEFAULT 0 NOT NULL,
    "Numeracion" text DEFAULT ''::text NOT NULL,
    "TipoContacto" text DEFAULT ''::text NOT NULL,
    "Zona" text DEFAULT ''::text NOT NULL
);
 !   DROP TABLE public."RecContacto";
       public         heap    postgres    false    6                       1259    28631    RecContactoBanco    TABLE     �  CREATE TABLE public."RecContactoBanco" (
    "Id" integer NOT NULL,
    "IdContacto" integer,
    "IdBanco" integer,
    "IdMoneda" integer NOT NULL,
    "IdEmpresa" integer NOT NULL,
    "NumeroCuenta" text NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 &   DROP TABLE public."RecContactoBanco";
       public         heap    postgres    false    6                       1259    28629    RecContactoBanco_Id_seq    SEQUENCE     �   ALTER TABLE public."RecContactoBanco" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."RecContactoBanco_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    268    6            �            1259    27939    RecContactoCategoria    TABLE     �  CREATE TABLE public."RecContactoCategoria" (
    "Id" integer NOT NULL,
    "IdPadre" integer NOT NULL,
    "Nombre" text NOT NULL,
    "PathPadre" text NOT NULL,
    "Color" integer NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 *   DROP TABLE public."RecContactoCategoria";
       public         heap    postgres    false    6            �            1259    28049    RecContactoCategoriaRel    TABLE     d  CREATE TABLE public."RecContactoCategoriaRel" (
    "Id" integer NOT NULL,
    "IdContacto" integer NOT NULL,
    "IdCategContacto" integer NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 -   DROP TABLE public."RecContactoCategoriaRel";
       public         heap    postgres    false    6            �            1259    28047    RecContactoCategoriaRel_Id_seq    SEQUENCE     �   ALTER TABLE public."RecContactoCategoriaRel" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."RecContactoCategoriaRel_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    6    232            �            1259    27937    RecContactoCategoria_Id_seq    SEQUENCE     �   ALTER TABLE public."RecContactoCategoria" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."RecContactoCategoria_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214    6            �            1259    27927    RecContacto_Id_seq    SEQUENCE     �   ALTER TABLE public."RecContacto" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."RecContacto_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    212    6            �            1259    27949 
   RecEmpresa    TABLE     `  CREATE TABLE public."RecEmpresa" (
    "Id" integer NOT NULL,
    "IdContacto" integer,
    "IdMoneda" integer NOT NULL,
    "IdPadre" integer NOT NULL,
    "Nombre" text NOT NULL,
    "EmpresaDetalles" text NOT NULL,
    "Secuencia" integer NOT NULL,
    "Email" text NOT NULL,
    "TelefonoFijo" text NOT NULL,
    "TelefonoMovil" text NOT NULL,
    "FuenteLetra" text NOT NULL,
    "ColorPrimario" text NOT NULL,
    "ColorSecundario" text NOT NULL,
    "ColorBackground" text NOT NULL,
    "PieInforme" text NOT NULL,
    "CabeceraInforme" text NOT NULL,
    "PathLogo" text NOT NULL,
    "IdNomenclatura" integer NOT NULL,
    "CodigoQR" text NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
     DROP TABLE public."RecEmpresa";
       public         heap    postgres    false    6            �            1259    27947    RecEmpresa_Id_seq    SEQUENCE     �   ALTER TABLE public."RecEmpresa" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."RecEmpresa_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216    6            �            1259    27959    RecGrupo    TABLE     k  CREATE TABLE public."RecGrupo" (
    "Id" integer NOT NULL,
    "IdCategoria" integer NOT NULL,
    "Nombre" text NOT NULL,
    "Descripcion" text NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
    DROP TABLE public."RecGrupo";
       public         heap    postgres    false    6            �            1259    27957    RecGrupo_Id_seq    SEQUENCE     �   ALTER TABLE public."RecGrupo" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."RecGrupo_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218    6                       1259    28653 	   RecMoneda    TABLE     �  CREATE TABLE public."RecMoneda" (
    "Id" integer NOT NULL,
    "Codigo" text NOT NULL,
    "Simbolo" text NOT NULL,
    "Nombre" text NOT NULL,
    "Decimales" integer NOT NULL,
    "UnidadMonetaria" text NOT NULL,
    "SubUnidadMonetaria" text NOT NULL,
    "Redondeo" integer NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
    DROP TABLE public."RecMoneda";
       public         heap    postgres    false    6                       1259    28651    RecMoneda_Id_seq    SEQUENCE     �   ALTER TABLE public."RecMoneda" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."RecMoneda_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    270    6            �            1259    27969    RecTipoUsuario    TABLE     1  CREATE TABLE public."RecTipoUsuario" (
    "Id" integer NOT NULL,
    "Descripcion" text NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 $   DROP TABLE public."RecTipoUsuario";
       public         heap    postgres    false    6            �            1259    27967    RecTipoUsuario_Id_seq    SEQUENCE     �   ALTER TABLE public."RecTipoUsuario" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."RecTipoUsuario_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    6    220            �            1259    28069 
   RecUsuario    TABLE     m  CREATE TABLE public."RecUsuario" (
    "Id" integer NOT NULL,
    "IdTipoUsuario" integer,
    "IdEmpresa" integer NOT NULL,
    "IdContacto" integer,
    "IdAccion" integer NOT NULL,
    "Telefono" text NOT NULL,
    "Login" text NOT NULL,
    "Password" text NOT NULL,
    "CodigoSecreto" text,
    "Firma" text,
    "Notificacion" text,
    "EstadoBot" text,
    "CodigoBot" text,
    "Activo" boolean NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
     DROP TABLE public."RecUsuario";
       public         heap    postgres    false    6            �            1259    28164    RecUsuarioGrupo    TABLE     S  CREATE TABLE public."RecUsuarioGrupo" (
    "Id" integer NOT NULL,
    "IdUsuario" integer NOT NULL,
    "IdGrupo" integer NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 %   DROP TABLE public."RecUsuarioGrupo";
       public         heap    postgres    false    6            �            1259    28162    RecUsuarioGrupo_Id_seq    SEQUENCE     �   ALTER TABLE public."RecUsuarioGrupo" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."RecUsuarioGrupo_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    244    6            �            1259    28067    RecUsuario_Id_seq    SEQUENCE     �   ALTER TABLE public."RecUsuario" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."RecUsuario_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    6    234            �            1259    28184    RiAccesoModelo    TABLE     �  CREATE TABLE public."RiAccesoModelo" (
    "Id" integer NOT NULL,
    "IdGrupo" integer NOT NULL,
    "IdModelo" integer NOT NULL,
    "Ver" boolean NOT NULL,
    "Crear" boolean NOT NULL,
    "Editar" boolean NOT NULL,
    "Eliminar" boolean NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 $   DROP TABLE public."RiAccesoModelo";
       public         heap    postgres    false    6            �            1259    28182    RiAccesoModelo_Id_seq    SEQUENCE     �   ALTER TABLE public."RiAccesoModelo" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."RiAccesoModelo_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    246    6            �            1259    27979    RiCategoriaModulo    TABLE     �  CREATE TABLE public."RiCategoriaModulo" (
    "Id" integer NOT NULL,
    "IdPadre" integer NOT NULL,
    "Nombre" text NOT NULL,
    "Descripcion" text NOT NULL,
    "Secuencia" integer NOT NULL,
    "Visible" boolean NOT NULL,
    "Exclusivo" boolean NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 '   DROP TABLE public."RiCategoriaModulo";
       public         heap    postgres    false    6            �            1259    27977    RiCategoriaModulo_Id_seq    SEQUENCE     �   ALTER TABLE public."RiCategoriaModulo" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."RiCategoriaModulo_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    6    222            �            1259    27989    RiMenu    TABLE     �  CREATE TABLE public."RiMenu" (
    "Id" integer NOT NULL,
    "IdPadre" integer,
    "Secuencia" integer NOT NULL,
    "PathIcono" text,
    "PathPadre" text NOT NULL,
    "Nombre" text NOT NULL,
    "Accion" text,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
    DROP TABLE public."RiMenu";
       public         heap    postgres    false    6            �            1259    28089    RiMenuGrupoRel    TABLE     O  CREATE TABLE public."RiMenuGrupoRel" (
    "Id" integer NOT NULL,
    "IdMenu" integer NOT NULL,
    "IdGrupo" integer NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 $   DROP TABLE public."RiMenuGrupoRel";
       public         heap    postgres    false    6            �            1259    28087    RiMenuGrupoRel_Id_seq    SEQUENCE     �   ALTER TABLE public."RiMenuGrupoRel" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."RiMenuGrupoRel_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    236    6            �            1259    27987    RiMenu_Id_seq    SEQUENCE     �   ALTER TABLE public."RiMenu" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."RiMenu_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    6    224            �            1259    28109    RiModelo    TABLE     �  CREATE TABLE public."RiModelo" (
    "Id" integer NOT NULL,
    "Modelo" text NOT NULL,
    "Descripcion" text NOT NULL,
    "Tipo" text NOT NULL,
    "Secuencia" text NOT NULL,
    "IdMenu" integer NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
    DROP TABLE public."RiModelo";
       public         heap    postgres    false    6            �            1259    28107    RiModelo_Id_seq    SEQUENCE     �   ALTER TABLE public."RiModelo" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."RiModelo_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    6    238                       1259    28785    UmCategoria    TABLE     K  CREATE TABLE public."UmCategoria" (
    "Id" integer NOT NULL,
    "Nombre" text NOT NULL,
    "Agrupable" boolean NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 !   DROP TABLE public."UmCategoria";
       public         heap    postgres    false    6                       1259    28783    UmCategoria_Id_seq    SEQUENCE     �   ALTER TABLE public."UmCategoria" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."UmCategoria_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    6    280                       1259    28795    UmUnidadMedida    TABLE     �  CREATE TABLE public."UmUnidadMedida" (
    "Id" integer NOT NULL,
    "IdCategoria" integer NOT NULL,
    "Nombre" text NOT NULL,
    "Tipo" text NOT NULL,
    "Ratio" numeric NOT NULL,
    "Redondeo" numeric NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 $   DROP TABLE public."UmUnidadMedida";
       public         heap    postgres    false    6                       1259    28793    UmUnidadMedida_Id_seq    SEQUENCE     �   ALTER TABLE public."UmUnidadMedida" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."UmUnidadMedida_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    6    282                       1259    28426 
   VentaOrden    TABLE     �  CREATE TABLE public."VentaOrden" (
    "Id" integer NOT NULL,
    "IdEmpresa" integer NOT NULL,
    "IdCliente" integer NOT NULL,
    "IdTerminosPago" integer NOT NULL,
    "IdPrecio" integer NOT NULL,
    "IdMoneda" integer NOT NULL,
    "IdVendedor" integer NOT NULL,
    "IdEquipo" integer NOT NULL,
    "IdAlmacen" integer NOT NULL,
    "Toker" text NOT NULL,
    "CodigoOrden" text NOT NULL,
    "EstadoOrden" text NOT NULL,
    "EstadoFacturacion" text NOT NULL,
    "FechaValidez" date NOT NULL,
    "Tc" integer NOT NULL,
    "MontoSinImpuesto" integer NOT NULL,
    "MontoImpuesto" integer NOT NULL,
    "MontoImpago" integer NOT NULL,
    "MontoTotal" integer NOT NULL,
    "Nota" text NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
     DROP TABLE public."VentaOrden";
       public         heap    postgres    false    6                       1259    28436    VentaOrdenDetalle    TABLE       CREATE TABLE public."VentaOrdenDetalle" (
    "Id" integer NOT NULL,
    "IdVentaOrden" integer,
    "Secuencia" integer NOT NULL,
    "IdMoneda" integer NOT NULL,
    "IdProducto" integer,
    "IdUnidadMedida" integer NOT NULL,
    "IdEmpaquetado" integer NOT NULL,
    "EstadoOrden" text NOT NULL,
    "EstadoFacturacion" text NOT NULL,
    "CodigoInterno" text NOT NULL,
    "Nombre" text NOT NULL,
    "Cantidad" integer NOT NULL,
    "PrecioUnitario" integer NOT NULL,
    "Descuento" integer NOT NULL,
    "PrecioReducido" integer NOT NULL,
    "PrecioImpuesto" integer NOT NULL,
    "PrecioUnitConImpuesto" integer NOT NULL,
    "PrecioUnitSinImpuesto" integer NOT NULL,
    "SubtotalConImpuesto" integer NOT NULL,
    "SubtotalSinImpuesto" integer NOT NULL,
    "CantidadEnviada" integer NOT NULL,
    "TiempoEspera" integer NOT NULL,
    "Estado" text NOT NULL,
    "IdUsrCreacion" integer,
    "IdUsrModificacion" integer,
    "FechaModificacion" timestamp with time zone NOT NULL,
    "FechaCreacion" timestamp with time zone NOT NULL
);
 '   DROP TABLE public."VentaOrdenDetalle";
       public         heap    postgres    false    6                       1259    28434    VentaOrdenDetalle_Id_seq    SEQUENCE     �   ALTER TABLE public."VentaOrdenDetalle" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."VentaOrdenDetalle_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    264    6                       1259    28424    VentaOrden_Id_seq    SEQUENCE     �   ALTER TABLE public."VentaOrden" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."VentaOrden_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    6    262            �            1259    27882    __EFMigrationsHistory    TABLE     �   CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);
 +   DROP TABLE public."__EFMigrationsHistory";
       public         heap    postgres    false    6            �          0    28325    CompraOrden 
   TABLE DATA           p  COPY public."CompraOrden" ("Id", "IdProveedor", "IdMoneda", "RefProveedor", "CodOrden", "IdEmpresa", "EstadoCompra", "Prioridad", "Nota", "IdUsrComprador", "MontoSinImpuesto", "MontoImpuesto", "MontoTotal", "FechaLimitePedido", "FechaConfirmacion", "FechaEntregaPlani", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    258   �      �          0    28340    CompraOrdenDetalle 
   TABLE DATA           �  COPY public."CompraOrdenDetalle" ("Id", "IdCompraOrden", "IdProducto", "IdUnidadMedida", "IdMoneda", "IdEmpaquetado", "Nombre", "Cantidad", "PrecioUnitario", "PrecioSubtotal", "PrecioTotal", "PrecioImpuesto", "CantidadSolicitada", "CantidadRecibida", "CantidadPaquete", "FechaEsperada", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    260   �      �          0    28004    ContableAsiento 
   TABLE DATA           �   COPY public."ContableAsiento" ("Id", "IdTipoComprobante", "NumeroComprobante", "Fecha", "Concepto", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion", "IdLibroDiario") FROM stdin;
    public          postgres    false    226         �          0    28245    ContableBanco 
   TABLE DATA           �   COPY public."ContableBanco" ("Id", "IdCuenta", "NumeroCuenta", "Nombre", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    250   �      �          0    28878    ContableCompartirLibroDiario 
   TABLE DATA           �   COPY public."ContableCompartirLibroDiario" ("Id", "IdUsuario", "IdLibroDiario", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    288   �      v          0    27889    ContableCuenta 
   TABLE DATA           �   COPY public."ContableCuenta" ("Id", "Codigo", "Descripcion", "Padre", "Moneda", "Nivel", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    204   �      �          0    28124    ContableDetalleAsiento 
   TABLE DATA           �   COPY public."ContableDetalleAsiento" ("Id", "IdCuenta", "IdAsiento", "Glosa", "DebeBs", "HaberBs", "DebeSus", "HaberSus", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    240   �'      �          0    28276    ContableLibroDiario 
   TABLE DATA             COPY public."ContableLibroDiario" ("Id", "IdUsuario", "Visualizacion", "FechaInicio", "FechaCierre", "Activo", "Password", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion", "Descripcion", "Nombre", "Importante") FROM stdin;
    public          postgres    false    254   �c      �          0    28266    ContableTipoCambio 
   TABLE DATA           �   COPY public."ContableTipoCambio" ("Id", "Fecha", "Dolar", "Ufv", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    252   ld      x          0    27899    ContableTipoComprobante 
   TABLE DATA           �   COPY public."ContableTipoComprobante" ("Id", "Nombre", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    206   e      z          0    27909    ProdAtributo 
   TABLE DATA           �   COPY public."ProdAtributo" ("Id", "Secuencia", "Nombre", "TipoVisualizacion", "ModoCreacion", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    208   �e      �          0    28019    ProdAtributoValor 
   TABLE DATA           �   COPY public."ProdAtributoValor" ("Id", "IdAtributo", "Nombre", "Secuencia", "Color", "ColorHtml", "Personalizable", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    228   �e      �          0    28144    ProdBaseAtribValorRel 
   TABLE DATA           �   COPY public."ProdBaseAtribValorRel" ("Id", "IdAtribValor", "IdProdBase", "PrecioExtra", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    242   �e      |          0    27919    ProdCategoria 
   TABLE DATA           �   COPY public."ProdCategoria" ("Id", "IdPadre", "Nombre", "NombreCompleto", "PathPadre", "IdEstrategiaEliminacion", "MetodoEmbalaje", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    210   �e      �          0    28204    ProdProducto 
   TABLE DATA           �   COPY public."ProdProducto" ("Id", "IdProdBase", "ProdBaseAtribValorRelId", "CodInterno", "CodFabricante", "CodBarras", "Volumen", "Peso", "PathImagen", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    248   Mf      �          0    28303    ProdProductoAtribValorRel 
   TABLE DATA           �   COPY public."ProdProductoAtribValorRel" ("Id", "IdProdBaseAtriValorRel", "IdProdProducto", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    256   jf      �          0    28034    ProdProductoBase 
   TABLE DATA           �  COPY public."ProdProductoBase" ("Id", "IdCategoria", "IdUnidadMed", "IdUnidadMedCompra", "IdEmpresa", "IdTipoProducto", "Secuencia", "Color", "CodInterno", "CodFabricante", "CodBarras", "Prioridad", "Nombre", "Descripcion", "DescripcionCompra", "DescripcionVenta", "PrecioVenta", "PrecioCosto", "Volumen", "Peso", "Vendible", "Comprable", "Configurable", "Trazabilidad", "PlazoEntregaCli", "TipoServEnt", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    230   �f      �          0    28691 
   ProdTarifa 
   TABLE DATA           �   COPY public."ProdTarifa" ("Id", "IdMoneda", "IdEmpresa", "Secuencia", "Nombre", "PoliticaDescuento", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    274   �f      �          0    28711    ProdTarifaDetalle 
   TABLE DATA           ?  COPY public."ProdTarifaDetalle" ("Id", "IdTarifa", "IdMoneda", "IdProductoCategoria", "IdProductoBase", "IdProducto", "PrecioComputable", "PrecioFijo", "Descuento", "AplicadoEn", "CantidadMin", "FechaInicio", "FechaFin", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    276   �f      �          0    28862    PvConfig 
   TABLE DATA           �   COPY public."PvConfig" ("Id", "Nombre", "LimiteProducto", "LimiteContactos", "IdEmpresa", "IdTipoTerminal", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    286   �f      �          0    28753 
   PvEfectivo 
   TABLE DATA           �   COPY public."PvEfectivo" ("Id", "IdMoneda", "Descripcion", "Valor", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    278   �f      �          0    28673    PvMetodoPago 
   TABLE DATA           �   COPY public."PvMetodoPago" ("Id", "TipoPago", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    272   hg      �          0    28852    PvTipoMovimiento 
   TABLE DATA           �   COPY public."PvTipoMovimiento" ("Id", "Nombre", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    284   �g      �          0    28621    RecBanco 
   TABLE DATA           �   COPY public."RecBanco" ("Id", "Nombre", "Direccion", "Direccion2", "CodigoPostal", "Ciudad", "Email", "Telefono", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    266   �g      ~          0    27929    RecContacto 
   TABLE DATA           �  COPY public."RecContacto" ("Id", "IdEmpresa", "Nombre", "Profesion", "NombreDespliegue", "IdentFiscal", "Color", "IdPais", "IdCiudad", "EsEmpresa", "Direccion1", "Direccion2", "TelefonoFijo", "TelefonoMovil", "PuestoTrabajo", "Email", "SitioWeb", "Comentario", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion", "IdPadre", "Latitud", "Longitud", "Numeracion", "TipoContacto", "Zona") FROM stdin;
    public          postgres    false    212   �g      �          0    28631    RecContactoBanco 
   TABLE DATA           �   COPY public."RecContactoBanco" ("Id", "IdContacto", "IdBanco", "IdMoneda", "IdEmpresa", "NumeroCuenta", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    268   �h      �          0    27939    RecContactoCategoria 
   TABLE DATA           �   COPY public."RecContactoCategoria" ("Id", "IdPadre", "Nombre", "PathPadre", "Color", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    214   �h      �          0    28049    RecContactoCategoriaRel 
   TABLE DATA           �   COPY public."RecContactoCategoriaRel" ("Id", "IdContacto", "IdCategContacto", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    232   �h      �          0    27949 
   RecEmpresa 
   TABLE DATA           �  COPY public."RecEmpresa" ("Id", "IdContacto", "IdMoneda", "IdPadre", "Nombre", "EmpresaDetalles", "Secuencia", "Email", "TelefonoFijo", "TelefonoMovil", "FuenteLetra", "ColorPrimario", "ColorSecundario", "ColorBackground", "PieInforme", "CabeceraInforme", "PathLogo", "IdNomenclatura", "CodigoQR", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    216   i      �          0    27959    RecGrupo 
   TABLE DATA           �   COPY public."RecGrupo" ("Id", "IdCategoria", "Nombre", "Descripcion", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    218   3i      �          0    28653 	   RecMoneda 
   TABLE DATA           �   COPY public."RecMoneda" ("Id", "Codigo", "Simbolo", "Nombre", "Decimales", "UnidadMonetaria", "SubUnidadMonetaria", "Redondeo", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    270   �i      �          0    27969    RecTipoUsuario 
   TABLE DATA           �   COPY public."RecTipoUsuario" ("Id", "Descripcion", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    220   Aj      �          0    28069 
   RecUsuario 
   TABLE DATA           )  COPY public."RecUsuario" ("Id", "IdTipoUsuario", "IdEmpresa", "IdContacto", "IdAccion", "Telefono", "Login", "Password", "CodigoSecreto", "Firma", "Notificacion", "EstadoBot", "CodigoBot", "Activo", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    234   �j      �          0    28164    RecUsuarioGrupo 
   TABLE DATA           �   COPY public."RecUsuarioGrupo" ("Id", "IdUsuario", "IdGrupo", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    244   �k      �          0    28184    RiAccesoModelo 
   TABLE DATA           �   COPY public."RiAccesoModelo" ("Id", "IdGrupo", "IdModelo", "Ver", "Crear", "Editar", "Eliminar", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    246   �k      �          0    27979    RiCategoriaModulo 
   TABLE DATA           �   COPY public."RiCategoriaModulo" ("Id", "IdPadre", "Nombre", "Descripcion", "Secuencia", "Visible", "Exclusivo", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    222   pn      �          0    27989    RiMenu 
   TABLE DATA           �   COPY public."RiMenu" ("Id", "IdPadre", "Secuencia", "PathIcono", "PathPadre", "Nombre", "Accion", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    224   �n      �          0    28089    RiMenuGrupoRel 
   TABLE DATA           �   COPY public."RiMenuGrupoRel" ("Id", "IdMenu", "IdGrupo", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    236   �u      �          0    28109    RiModelo 
   TABLE DATA           �   COPY public."RiModelo" ("Id", "Modelo", "Descripcion", "Tipo", "Secuencia", "IdMenu", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    238   ~y      �          0    28785    UmCategoria 
   TABLE DATA           �   COPY public."UmCategoria" ("Id", "Nombre", "Agrupable", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    280   �|      �          0    28795    UmUnidadMedida 
   TABLE DATA           �   COPY public."UmUnidadMedida" ("Id", "IdCategoria", "Nombre", "Tipo", "Ratio", "Redondeo", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    282   �|      �          0    28426 
   VentaOrden 
   TABLE DATA           �  COPY public."VentaOrden" ("Id", "IdEmpresa", "IdCliente", "IdTerminosPago", "IdPrecio", "IdMoneda", "IdVendedor", "IdEquipo", "IdAlmacen", "Toker", "CodigoOrden", "EstadoOrden", "EstadoFacturacion", "FechaValidez", "Tc", "MontoSinImpuesto", "MontoImpuesto", "MontoImpago", "MontoTotal", "Nota", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    262   }      �          0    28436    VentaOrdenDetalle 
   TABLE DATA           �  COPY public."VentaOrdenDetalle" ("Id", "IdVentaOrden", "Secuencia", "IdMoneda", "IdProducto", "IdUnidadMedida", "IdEmpaquetado", "EstadoOrden", "EstadoFacturacion", "CodigoInterno", "Nombre", "Cantidad", "PrecioUnitario", "Descuento", "PrecioReducido", "PrecioImpuesto", "PrecioUnitConImpuesto", "PrecioUnitSinImpuesto", "SubtotalConImpuesto", "SubtotalSinImpuesto", "CantidadEnviada", "TiempoEspera", "Estado", "IdUsrCreacion", "IdUsrModificacion", "FechaModificacion", "FechaCreacion") FROM stdin;
    public          postgres    false    264   /}      t          0    27882    __EFMigrationsHistory 
   TABLE DATA           R   COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
    public          postgres    false    202   L}      �           0    0    CompraOrdenDetalle_Id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."CompraOrdenDetalle_Id_seq"', 1, false);
          public          postgres    false    259            �           0    0    CompraOrden_Id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."CompraOrden_Id_seq"', 1, false);
          public          postgres    false    257            �           0    0    ContableAsiento_Id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."ContableAsiento_Id_seq"', 200, true);
          public          postgres    false    225            �           0    0    ContableBanco_Id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."ContableBanco_Id_seq"', 1, false);
          public          postgres    false    249            �           0    0 #   ContableCompartirLibroDiario_Id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public."ContableCompartirLibroDiario_Id_seq"', 1, false);
          public          postgres    false    287            �           0    0    ContableCuenta_Id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."ContableCuenta_Id_seq"', 302, true);
          public          postgres    false    203            �           0    0    ContableDetalleAsiento_Id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."ContableDetalleAsiento_Id_seq"', 1277, true);
          public          postgres    false    239            �           0    0    ContableLibroDiario_Id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."ContableLibroDiario_Id_seq"', 1, true);
          public          postgres    false    253            �           0    0    ContableTipoCambio_Id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."ContableTipoCambio_Id_seq"', 5, true);
          public          postgres    false    251            �           0    0    ContableTipoComprobante_Id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public."ContableTipoComprobante_Id_seq"', 3, true);
          public          postgres    false    205            �           0    0    ProdAtributoValor_Id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."ProdAtributoValor_Id_seq"', 1, false);
          public          postgres    false    227            �           0    0    ProdAtributo_Id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."ProdAtributo_Id_seq"', 1, false);
          public          postgres    false    207            �           0    0    ProdBaseAtribValorRel_Id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."ProdBaseAtribValorRel_Id_seq"', 1, false);
          public          postgres    false    241            �           0    0    ProdCategoria_Id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."ProdCategoria_Id_seq"', 1, true);
          public          postgres    false    209            �           0    0     ProdProductoAtribValorRel_Id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public."ProdProductoAtribValorRel_Id_seq"', 1, false);
          public          postgres    false    255            �           0    0    ProdProductoBase_Id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."ProdProductoBase_Id_seq"', 1, false);
          public          postgres    false    229            �           0    0    ProdProducto_Id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."ProdProducto_Id_seq"', 1, false);
          public          postgres    false    247            �           0    0    ProdTarifaDetalle_Id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."ProdTarifaDetalle_Id_seq"', 1, false);
          public          postgres    false    275            �           0    0    ProdTarifa_Id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."ProdTarifa_Id_seq"', 1, false);
          public          postgres    false    273            �           0    0    PvConfig_Id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."PvConfig_Id_seq"', 1, false);
          public          postgres    false    285            �           0    0    PvEfectivo_Id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."PvEfectivo_Id_seq"', 2, true);
          public          postgres    false    277            �           0    0    PvMetodoPago_Id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."PvMetodoPago_Id_seq"', 1, false);
          public          postgres    false    271            �           0    0    PvTipoMovimiento_Id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."PvTipoMovimiento_Id_seq"', 1, false);
          public          postgres    false    283            �           0    0    RecBanco_Id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."RecBanco_Id_seq"', 1, false);
          public          postgres    false    265            �           0    0    RecContactoBanco_Id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."RecContactoBanco_Id_seq"', 1, false);
          public          postgres    false    267            �           0    0    RecContactoCategoriaRel_Id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."RecContactoCategoriaRel_Id_seq"', 1, false);
          public          postgres    false    231            �           0    0    RecContactoCategoria_Id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."RecContactoCategoria_Id_seq"', 1, true);
          public          postgres    false    213            �           0    0    RecContacto_Id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."RecContacto_Id_seq"', 1, true);
          public          postgres    false    211            �           0    0    RecEmpresa_Id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."RecEmpresa_Id_seq"', 1, false);
          public          postgres    false    215            �           0    0    RecGrupo_Id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."RecGrupo_Id_seq"', 2, true);
          public          postgres    false    217            �           0    0    RecMoneda_Id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."RecMoneda_Id_seq"', 2, true);
          public          postgres    false    269            �           0    0    RecTipoUsuario_Id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."RecTipoUsuario_Id_seq"', 1, true);
          public          postgres    false    219            �           0    0    RecUsuarioGrupo_Id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."RecUsuarioGrupo_Id_seq"', 2, true);
          public          postgres    false    243            �           0    0    RecUsuario_Id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."RecUsuario_Id_seq"', 2, true);
          public          postgres    false    233            �           0    0    RiAccesoModelo_Id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."RiAccesoModelo_Id_seq"', 48, true);
          public          postgres    false    245            �           0    0    RiCategoriaModulo_Id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."RiCategoriaModulo_Id_seq"', 1, false);
          public          postgres    false    221            �           0    0    RiMenuGrupoRel_Id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."RiMenuGrupoRel_Id_seq"', 94, true);
          public          postgres    false    235            �           0    0    RiMenu_Id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."RiMenu_Id_seq"', 73, true);
          public          postgres    false    223            �           0    0    RiModelo_Id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."RiModelo_Id_seq"', 33, true);
          public          postgres    false    237            �           0    0    UmCategoria_Id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."UmCategoria_Id_seq"', 1, false);
          public          postgres    false    279            �           0    0    UmUnidadMedida_Id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."UmUnidadMedida_Id_seq"', 1, false);
          public          postgres    false    281            �           0    0    VentaOrdenDetalle_Id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."VentaOrdenDetalle_Id_seq"', 1, false);
          public          postgres    false    263            �           0    0    VentaOrden_Id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."VentaOrden_Id_seq"', 1, false);
          public          postgres    false    261            �           2606    28332    CompraOrden PK_CompraOrden 
   CONSTRAINT     ^   ALTER TABLE ONLY public."CompraOrden"
    ADD CONSTRAINT "PK_CompraOrden" PRIMARY KEY ("Id");
 H   ALTER TABLE ONLY public."CompraOrden" DROP CONSTRAINT "PK_CompraOrden";
       public            postgres    false    258            �           2606    28347 (   CompraOrdenDetalle PK_CompraOrdenDetalle 
   CONSTRAINT     l   ALTER TABLE ONLY public."CompraOrdenDetalle"
    ADD CONSTRAINT "PK_CompraOrdenDetalle" PRIMARY KEY ("Id");
 V   ALTER TABLE ONLY public."CompraOrdenDetalle" DROP CONSTRAINT "PK_CompraOrdenDetalle";
       public            postgres    false    260            ^           2606    28011 "   ContableAsiento PK_ContableAsiento 
   CONSTRAINT     f   ALTER TABLE ONLY public."ContableAsiento"
    ADD CONSTRAINT "PK_ContableAsiento" PRIMARY KEY ("Id");
 P   ALTER TABLE ONLY public."ContableAsiento" DROP CONSTRAINT "PK_ContableAsiento";
       public            postgres    false    226            �           2606    28252    ContableBanco PK_ContableBanco 
   CONSTRAINT     b   ALTER TABLE ONLY public."ContableBanco"
    ADD CONSTRAINT "PK_ContableBanco" PRIMARY KEY ("Id");
 L   ALTER TABLE ONLY public."ContableBanco" DROP CONSTRAINT "PK_ContableBanco";
       public            postgres    false    250            �           2606    28885 <   ContableCompartirLibroDiario PK_ContableCompartirLibroDiario 
   CONSTRAINT     �   ALTER TABLE ONLY public."ContableCompartirLibroDiario"
    ADD CONSTRAINT "PK_ContableCompartirLibroDiario" PRIMARY KEY ("Id");
 j   ALTER TABLE ONLY public."ContableCompartirLibroDiario" DROP CONSTRAINT "PK_ContableCompartirLibroDiario";
       public            postgres    false    288            C           2606    27896     ContableCuenta PK_ContableCuenta 
   CONSTRAINT     d   ALTER TABLE ONLY public."ContableCuenta"
    ADD CONSTRAINT "PK_ContableCuenta" PRIMARY KEY ("Id");
 N   ALTER TABLE ONLY public."ContableCuenta" DROP CONSTRAINT "PK_ContableCuenta";
       public            postgres    false    204            w           2606    28131 0   ContableDetalleAsiento PK_ContableDetalleAsiento 
   CONSTRAINT     t   ALTER TABLE ONLY public."ContableDetalleAsiento"
    ADD CONSTRAINT "PK_ContableDetalleAsiento" PRIMARY KEY ("Id");
 ^   ALTER TABLE ONLY public."ContableDetalleAsiento" DROP CONSTRAINT "PK_ContableDetalleAsiento";
       public            postgres    false    240            �           2606    28283 *   ContableLibroDiario PK_ContableLibroDiario 
   CONSTRAINT     n   ALTER TABLE ONLY public."ContableLibroDiario"
    ADD CONSTRAINT "PK_ContableLibroDiario" PRIMARY KEY ("Id");
 X   ALTER TABLE ONLY public."ContableLibroDiario" DROP CONSTRAINT "PK_ContableLibroDiario";
       public            postgres    false    254            �           2606    28273 (   ContableTipoCambio PK_ContableTipoCambio 
   CONSTRAINT     l   ALTER TABLE ONLY public."ContableTipoCambio"
    ADD CONSTRAINT "PK_ContableTipoCambio" PRIMARY KEY ("Id");
 V   ALTER TABLE ONLY public."ContableTipoCambio" DROP CONSTRAINT "PK_ContableTipoCambio";
       public            postgres    false    252            E           2606    27906 2   ContableTipoComprobante PK_ContableTipoComprobante 
   CONSTRAINT     v   ALTER TABLE ONLY public."ContableTipoComprobante"
    ADD CONSTRAINT "PK_ContableTipoComprobante" PRIMARY KEY ("Id");
 `   ALTER TABLE ONLY public."ContableTipoComprobante" DROP CONSTRAINT "PK_ContableTipoComprobante";
       public            postgres    false    206            G           2606    27916    ProdAtributo PK_ProdAtributo 
   CONSTRAINT     `   ALTER TABLE ONLY public."ProdAtributo"
    ADD CONSTRAINT "PK_ProdAtributo" PRIMARY KEY ("Id");
 J   ALTER TABLE ONLY public."ProdAtributo" DROP CONSTRAINT "PK_ProdAtributo";
       public            postgres    false    208            a           2606    28026 &   ProdAtributoValor PK_ProdAtributoValor 
   CONSTRAINT     j   ALTER TABLE ONLY public."ProdAtributoValor"
    ADD CONSTRAINT "PK_ProdAtributoValor" PRIMARY KEY ("Id");
 T   ALTER TABLE ONLY public."ProdAtributoValor" DROP CONSTRAINT "PK_ProdAtributoValor";
       public            postgres    false    228            {           2606    28151 .   ProdBaseAtribValorRel PK_ProdBaseAtribValorRel 
   CONSTRAINT     r   ALTER TABLE ONLY public."ProdBaseAtribValorRel"
    ADD CONSTRAINT "PK_ProdBaseAtribValorRel" PRIMARY KEY ("Id");
 \   ALTER TABLE ONLY public."ProdBaseAtribValorRel" DROP CONSTRAINT "PK_ProdBaseAtribValorRel";
       public            postgres    false    242            I           2606    27926    ProdCategoria PK_ProdCategoria 
   CONSTRAINT     b   ALTER TABLE ONLY public."ProdCategoria"
    ADD CONSTRAINT "PK_ProdCategoria" PRIMARY KEY ("Id");
 L   ALTER TABLE ONLY public."ProdCategoria" DROP CONSTRAINT "PK_ProdCategoria";
       public            postgres    false    210            �           2606    28211    ProdProducto PK_ProdProducto 
   CONSTRAINT     `   ALTER TABLE ONLY public."ProdProducto"
    ADD CONSTRAINT "PK_ProdProducto" PRIMARY KEY ("Id");
 J   ALTER TABLE ONLY public."ProdProducto" DROP CONSTRAINT "PK_ProdProducto";
       public            postgres    false    248            �           2606    28310 6   ProdProductoAtribValorRel PK_ProdProductoAtribValorRel 
   CONSTRAINT     z   ALTER TABLE ONLY public."ProdProductoAtribValorRel"
    ADD CONSTRAINT "PK_ProdProductoAtribValorRel" PRIMARY KEY ("Id");
 d   ALTER TABLE ONLY public."ProdProductoAtribValorRel" DROP CONSTRAINT "PK_ProdProductoAtribValorRel";
       public            postgres    false    256            d           2606    28041 $   ProdProductoBase PK_ProdProductoBase 
   CONSTRAINT     h   ALTER TABLE ONLY public."ProdProductoBase"
    ADD CONSTRAINT "PK_ProdProductoBase" PRIMARY KEY ("Id");
 R   ALTER TABLE ONLY public."ProdProductoBase" DROP CONSTRAINT "PK_ProdProductoBase";
       public            postgres    false    230            �           2606    28698    ProdTarifa PK_ProdTarifa 
   CONSTRAINT     \   ALTER TABLE ONLY public."ProdTarifa"
    ADD CONSTRAINT "PK_ProdTarifa" PRIMARY KEY ("Id");
 F   ALTER TABLE ONLY public."ProdTarifa" DROP CONSTRAINT "PK_ProdTarifa";
       public            postgres    false    274            �           2606    28718 &   ProdTarifaDetalle PK_ProdTarifaDetalle 
   CONSTRAINT     j   ALTER TABLE ONLY public."ProdTarifaDetalle"
    ADD CONSTRAINT "PK_ProdTarifaDetalle" PRIMARY KEY ("Id");
 T   ALTER TABLE ONLY public."ProdTarifaDetalle" DROP CONSTRAINT "PK_ProdTarifaDetalle";
       public            postgres    false    276            �           2606    28869    PvConfig PK_PvConfig 
   CONSTRAINT     X   ALTER TABLE ONLY public."PvConfig"
    ADD CONSTRAINT "PK_PvConfig" PRIMARY KEY ("Id");
 B   ALTER TABLE ONLY public."PvConfig" DROP CONSTRAINT "PK_PvConfig";
       public            postgres    false    286            �           2606    28760    PvEfectivo PK_PvEfectivo 
   CONSTRAINT     \   ALTER TABLE ONLY public."PvEfectivo"
    ADD CONSTRAINT "PK_PvEfectivo" PRIMARY KEY ("Id");
 F   ALTER TABLE ONLY public."PvEfectivo" DROP CONSTRAINT "PK_PvEfectivo";
       public            postgres    false    278            �           2606    28680    PvMetodoPago PK_PvMetodoPago 
   CONSTRAINT     `   ALTER TABLE ONLY public."PvMetodoPago"
    ADD CONSTRAINT "PK_PvMetodoPago" PRIMARY KEY ("Id");
 J   ALTER TABLE ONLY public."PvMetodoPago" DROP CONSTRAINT "PK_PvMetodoPago";
       public            postgres    false    272            �           2606    28859 $   PvTipoMovimiento PK_PvTipoMovimiento 
   CONSTRAINT     h   ALTER TABLE ONLY public."PvTipoMovimiento"
    ADD CONSTRAINT "PK_PvTipoMovimiento" PRIMARY KEY ("Id");
 R   ALTER TABLE ONLY public."PvTipoMovimiento" DROP CONSTRAINT "PK_PvTipoMovimiento";
       public            postgres    false    284            �           2606    28628    RecBanco PK_RecBanco 
   CONSTRAINT     X   ALTER TABLE ONLY public."RecBanco"
    ADD CONSTRAINT "PK_RecBanco" PRIMARY KEY ("Id");
 B   ALTER TABLE ONLY public."RecBanco" DROP CONSTRAINT "PK_RecBanco";
       public            postgres    false    266            L           2606    27936    RecContacto PK_RecContacto 
   CONSTRAINT     ^   ALTER TABLE ONLY public."RecContacto"
    ADD CONSTRAINT "PK_RecContacto" PRIMARY KEY ("Id");
 H   ALTER TABLE ONLY public."RecContacto" DROP CONSTRAINT "PK_RecContacto";
       public            postgres    false    212            �           2606    28638 $   RecContactoBanco PK_RecContactoBanco 
   CONSTRAINT     h   ALTER TABLE ONLY public."RecContactoBanco"
    ADD CONSTRAINT "PK_RecContactoBanco" PRIMARY KEY ("Id");
 R   ALTER TABLE ONLY public."RecContactoBanco" DROP CONSTRAINT "PK_RecContactoBanco";
       public            postgres    false    268            N           2606    27946 ,   RecContactoCategoria PK_RecContactoCategoria 
   CONSTRAINT     p   ALTER TABLE ONLY public."RecContactoCategoria"
    ADD CONSTRAINT "PK_RecContactoCategoria" PRIMARY KEY ("Id");
 Z   ALTER TABLE ONLY public."RecContactoCategoria" DROP CONSTRAINT "PK_RecContactoCategoria";
       public            postgres    false    214            h           2606    28056 2   RecContactoCategoriaRel PK_RecContactoCategoriaRel 
   CONSTRAINT     v   ALTER TABLE ONLY public."RecContactoCategoriaRel"
    ADD CONSTRAINT "PK_RecContactoCategoriaRel" PRIMARY KEY ("Id");
 `   ALTER TABLE ONLY public."RecContactoCategoriaRel" DROP CONSTRAINT "PK_RecContactoCategoriaRel";
       public            postgres    false    232            Q           2606    27956    RecEmpresa PK_RecEmpresa 
   CONSTRAINT     \   ALTER TABLE ONLY public."RecEmpresa"
    ADD CONSTRAINT "PK_RecEmpresa" PRIMARY KEY ("Id");
 F   ALTER TABLE ONLY public."RecEmpresa" DROP CONSTRAINT "PK_RecEmpresa";
       public            postgres    false    216            S           2606    27966    RecGrupo PK_RecGrupo 
   CONSTRAINT     X   ALTER TABLE ONLY public."RecGrupo"
    ADD CONSTRAINT "PK_RecGrupo" PRIMARY KEY ("Id");
 B   ALTER TABLE ONLY public."RecGrupo" DROP CONSTRAINT "PK_RecGrupo";
       public            postgres    false    218            �           2606    28660    RecMoneda PK_RecMoneda 
   CONSTRAINT     Z   ALTER TABLE ONLY public."RecMoneda"
    ADD CONSTRAINT "PK_RecMoneda" PRIMARY KEY ("Id");
 D   ALTER TABLE ONLY public."RecMoneda" DROP CONSTRAINT "PK_RecMoneda";
       public            postgres    false    270            U           2606    27976     RecTipoUsuario PK_RecTipoUsuario 
   CONSTRAINT     d   ALTER TABLE ONLY public."RecTipoUsuario"
    ADD CONSTRAINT "PK_RecTipoUsuario" PRIMARY KEY ("Id");
 N   ALTER TABLE ONLY public."RecTipoUsuario" DROP CONSTRAINT "PK_RecTipoUsuario";
       public            postgres    false    220            l           2606    28076    RecUsuario PK_RecUsuario 
   CONSTRAINT     \   ALTER TABLE ONLY public."RecUsuario"
    ADD CONSTRAINT "PK_RecUsuario" PRIMARY KEY ("Id");
 F   ALTER TABLE ONLY public."RecUsuario" DROP CONSTRAINT "PK_RecUsuario";
       public            postgres    false    234                       2606    28171 "   RecUsuarioGrupo PK_RecUsuarioGrupo 
   CONSTRAINT     f   ALTER TABLE ONLY public."RecUsuarioGrupo"
    ADD CONSTRAINT "PK_RecUsuarioGrupo" PRIMARY KEY ("Id");
 P   ALTER TABLE ONLY public."RecUsuarioGrupo" DROP CONSTRAINT "PK_RecUsuarioGrupo";
       public            postgres    false    244            �           2606    28191     RiAccesoModelo PK_RiAccesoModelo 
   CONSTRAINT     d   ALTER TABLE ONLY public."RiAccesoModelo"
    ADD CONSTRAINT "PK_RiAccesoModelo" PRIMARY KEY ("Id");
 N   ALTER TABLE ONLY public."RiAccesoModelo" DROP CONSTRAINT "PK_RiAccesoModelo";
       public            postgres    false    246            W           2606    27986 &   RiCategoriaModulo PK_RiCategoriaModulo 
   CONSTRAINT     j   ALTER TABLE ONLY public."RiCategoriaModulo"
    ADD CONSTRAINT "PK_RiCategoriaModulo" PRIMARY KEY ("Id");
 T   ALTER TABLE ONLY public."RiCategoriaModulo" DROP CONSTRAINT "PK_RiCategoriaModulo";
       public            postgres    false    222            Z           2606    27996    RiMenu PK_RiMenu 
   CONSTRAINT     T   ALTER TABLE ONLY public."RiMenu"
    ADD CONSTRAINT "PK_RiMenu" PRIMARY KEY ("Id");
 >   ALTER TABLE ONLY public."RiMenu" DROP CONSTRAINT "PK_RiMenu";
       public            postgres    false    224            p           2606    28096     RiMenuGrupoRel PK_RiMenuGrupoRel 
   CONSTRAINT     d   ALTER TABLE ONLY public."RiMenuGrupoRel"
    ADD CONSTRAINT "PK_RiMenuGrupoRel" PRIMARY KEY ("Id");
 N   ALTER TABLE ONLY public."RiMenuGrupoRel" DROP CONSTRAINT "PK_RiMenuGrupoRel";
       public            postgres    false    236            s           2606    28116    RiModelo PK_RiModelo 
   CONSTRAINT     X   ALTER TABLE ONLY public."RiModelo"
    ADD CONSTRAINT "PK_RiModelo" PRIMARY KEY ("Id");
 B   ALTER TABLE ONLY public."RiModelo" DROP CONSTRAINT "PK_RiModelo";
       public            postgres    false    238            �           2606    28792    UmCategoria PK_UmCategoria 
   CONSTRAINT     ^   ALTER TABLE ONLY public."UmCategoria"
    ADD CONSTRAINT "PK_UmCategoria" PRIMARY KEY ("Id");
 H   ALTER TABLE ONLY public."UmCategoria" DROP CONSTRAINT "PK_UmCategoria";
       public            postgres    false    280            �           2606    28802     UmUnidadMedida PK_UmUnidadMedida 
   CONSTRAINT     d   ALTER TABLE ONLY public."UmUnidadMedida"
    ADD CONSTRAINT "PK_UmUnidadMedida" PRIMARY KEY ("Id");
 N   ALTER TABLE ONLY public."UmUnidadMedida" DROP CONSTRAINT "PK_UmUnidadMedida";
       public            postgres    false    282            �           2606    28433    VentaOrden PK_VentaOrden 
   CONSTRAINT     \   ALTER TABLE ONLY public."VentaOrden"
    ADD CONSTRAINT "PK_VentaOrden" PRIMARY KEY ("Id");
 F   ALTER TABLE ONLY public."VentaOrden" DROP CONSTRAINT "PK_VentaOrden";
       public            postgres    false    262            �           2606    28443 &   VentaOrdenDetalle PK_VentaOrdenDetalle 
   CONSTRAINT     j   ALTER TABLE ONLY public."VentaOrdenDetalle"
    ADD CONSTRAINT "PK_VentaOrdenDetalle" PRIMARY KEY ("Id");
 T   ALTER TABLE ONLY public."VentaOrdenDetalle" DROP CONSTRAINT "PK_VentaOrdenDetalle";
       public            postgres    false    264            A           2606    27886 .   __EFMigrationsHistory PK___EFMigrationsHistory 
   CONSTRAINT     {   ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");
 \   ALTER TABLE ONLY public."__EFMigrationsHistory" DROP CONSTRAINT "PK___EFMigrationsHistory";
       public            postgres    false    202            �           1259    28359 #   IX_CompraOrdenDetalle_IdCompraOrden    INDEX     q   CREATE INDEX "IX_CompraOrdenDetalle_IdCompraOrden" ON public."CompraOrdenDetalle" USING btree ("IdCompraOrden");
 9   DROP INDEX public."IX_CompraOrdenDetalle_IdCompraOrden";
       public            postgres    false    260            �           1259    28360     IX_CompraOrdenDetalle_IdProducto    INDEX     k   CREATE INDEX "IX_CompraOrdenDetalle_IdProducto" ON public."CompraOrdenDetalle" USING btree ("IdProducto");
 6   DROP INDEX public."IX_CompraOrdenDetalle_IdProducto";
       public            postgres    false    260            �           1259    28358    IX_CompraOrden_IdProveedor    INDEX     _   CREATE INDEX "IX_CompraOrden_IdProveedor" ON public."CompraOrden" USING btree ("IdProveedor");
 0   DROP INDEX public."IX_CompraOrden_IdProveedor";
       public            postgres    false    258            [           1259    28289     IX_ContableAsiento_IdLibroDiario    INDEX     k   CREATE INDEX "IX_ContableAsiento_IdLibroDiario" ON public."ContableAsiento" USING btree ("IdLibroDiario");
 6   DROP INDEX public."IX_ContableAsiento_IdLibroDiario";
       public            postgres    false    226            \           1259    28222 $   IX_ContableAsiento_IdTipoComprobante    INDEX     s   CREATE INDEX "IX_ContableAsiento_IdTipoComprobante" ON public."ContableAsiento" USING btree ("IdTipoComprobante");
 :   DROP INDEX public."IX_ContableAsiento_IdTipoComprobante";
       public            postgres    false    226            �           1259    28258    IX_ContableBanco_IdCuenta    INDEX     ]   CREATE INDEX "IX_ContableBanco_IdCuenta" ON public."ContableBanco" USING btree ("IdCuenta");
 /   DROP INDEX public."IX_ContableBanco_IdCuenta";
       public            postgres    false    250            �           1259    28886 -   IX_ContableCompartirLibroDiario_IdLibroDiario    INDEX     �   CREATE INDEX "IX_ContableCompartirLibroDiario_IdLibroDiario" ON public."ContableCompartirLibroDiario" USING btree ("IdLibroDiario");
 C   DROP INDEX public."IX_ContableCompartirLibroDiario_IdLibroDiario";
       public            postgres    false    288            �           1259    28887 )   IX_ContableCompartirLibroDiario_IdUsuario    INDEX     }   CREATE INDEX "IX_ContableCompartirLibroDiario_IdUsuario" ON public."ContableCompartirLibroDiario" USING btree ("IdUsuario");
 ?   DROP INDEX public."IX_ContableCompartirLibroDiario_IdUsuario";
       public            postgres    false    288            t           1259    28223 #   IX_ContableDetalleAsiento_IdAsiento    INDEX     q   CREATE INDEX "IX_ContableDetalleAsiento_IdAsiento" ON public."ContableDetalleAsiento" USING btree ("IdAsiento");
 9   DROP INDEX public."IX_ContableDetalleAsiento_IdAsiento";
       public            postgres    false    240            u           1259    28224 "   IX_ContableDetalleAsiento_IdCuenta    INDEX     o   CREATE INDEX "IX_ContableDetalleAsiento_IdCuenta" ON public."ContableDetalleAsiento" USING btree ("IdCuenta");
 8   DROP INDEX public."IX_ContableDetalleAsiento_IdCuenta";
       public            postgres    false    240            �           1259    28290     IX_ContableLibroDiario_IdUsuario    INDEX     k   CREATE INDEX "IX_ContableLibroDiario_IdUsuario" ON public."ContableLibroDiario" USING btree ("IdUsuario");
 6   DROP INDEX public."IX_ContableLibroDiario_IdUsuario";
       public            postgres    false    254            _           1259    28225    IX_ProdAtributoValor_IdAtributo    INDEX     i   CREATE INDEX "IX_ProdAtributoValor_IdAtributo" ON public."ProdAtributoValor" USING btree ("IdAtributo");
 5   DROP INDEX public."IX_ProdAtributoValor_IdAtributo";
       public            postgres    false    228            x           1259    28226 %   IX_ProdBaseAtribValorRel_IdAtribValor    INDEX     u   CREATE INDEX "IX_ProdBaseAtribValorRel_IdAtribValor" ON public."ProdBaseAtribValorRel" USING btree ("IdAtribValor");
 ;   DROP INDEX public."IX_ProdBaseAtribValorRel_IdAtribValor";
       public            postgres    false    242            y           1259    28227 #   IX_ProdBaseAtribValorRel_IdProdBase    INDEX     q   CREATE INDEX "IX_ProdBaseAtribValorRel_IdProdBase" ON public."ProdBaseAtribValorRel" USING btree ("IdProdBase");
 9   DROP INDEX public."IX_ProdBaseAtribValorRel_IdProdBase";
       public            postgres    false    242            �           1259    28321 3   IX_ProdProductoAtribValorRel_IdProdBaseAtriValorRel    INDEX     �   CREATE INDEX "IX_ProdProductoAtribValorRel_IdProdBaseAtriValorRel" ON public."ProdProductoAtribValorRel" USING btree ("IdProdBaseAtriValorRel");
 I   DROP INDEX public."IX_ProdProductoAtribValorRel_IdProdBaseAtriValorRel";
       public            postgres    false    256            �           1259    28322 +   IX_ProdProductoAtribValorRel_IdProdProducto    INDEX     �   CREATE INDEX "IX_ProdProductoAtribValorRel_IdProdProducto" ON public."ProdProductoAtribValorRel" USING btree ("IdProdProducto");
 A   DROP INDEX public."IX_ProdProductoAtribValorRel_IdProdProducto";
       public            postgres    false    256            b           1259    28230    IX_ProdProductoBase_IdCategoria    INDEX     i   CREATE INDEX "IX_ProdProductoBase_IdCategoria" ON public."ProdProductoBase" USING btree ("IdCategoria");
 5   DROP INDEX public."IX_ProdProductoBase_IdCategoria";
       public            postgres    false    230            �           1259    28228    IX_ProdProducto_IdProdBase    INDEX     _   CREATE INDEX "IX_ProdProducto_IdProdBase" ON public."ProdProducto" USING btree ("IdProdBase");
 0   DROP INDEX public."IX_ProdProducto_IdProdBase";
       public            postgres    false    248            �           1259    28229 '   IX_ProdProducto_ProdBaseAtribValorRelId    INDEX     y   CREATE INDEX "IX_ProdProducto_ProdBaseAtribValorRelId" ON public."ProdProducto" USING btree ("ProdBaseAtribValorRelId");
 =   DROP INDEX public."IX_ProdProducto_ProdBaseAtribValorRelId";
       public            postgres    false    248            �           1259    28746    IX_ProdTarifaDetalle_IdMoneda    INDEX     e   CREATE INDEX "IX_ProdTarifaDetalle_IdMoneda" ON public."ProdTarifaDetalle" USING btree ("IdMoneda");
 3   DROP INDEX public."IX_ProdTarifaDetalle_IdMoneda";
       public            postgres    false    276            �           1259    28747    IX_ProdTarifaDetalle_IdProducto    INDEX     i   CREATE INDEX "IX_ProdTarifaDetalle_IdProducto" ON public."ProdTarifaDetalle" USING btree ("IdProducto");
 5   DROP INDEX public."IX_ProdTarifaDetalle_IdProducto";
       public            postgres    false    276            �           1259    28748 #   IX_ProdTarifaDetalle_IdProductoBase    INDEX     q   CREATE INDEX "IX_ProdTarifaDetalle_IdProductoBase" ON public."ProdTarifaDetalle" USING btree ("IdProductoBase");
 9   DROP INDEX public."IX_ProdTarifaDetalle_IdProductoBase";
       public            postgres    false    276            �           1259    28749 (   IX_ProdTarifaDetalle_IdProductoCategoria    INDEX     {   CREATE INDEX "IX_ProdTarifaDetalle_IdProductoCategoria" ON public."ProdTarifaDetalle" USING btree ("IdProductoCategoria");
 >   DROP INDEX public."IX_ProdTarifaDetalle_IdProductoCategoria";
       public            postgres    false    276            �           1259    28750    IX_ProdTarifaDetalle_IdTarifa    INDEX     e   CREATE INDEX "IX_ProdTarifaDetalle_IdTarifa" ON public."ProdTarifaDetalle" USING btree ("IdTarifa");
 3   DROP INDEX public."IX_ProdTarifaDetalle_IdTarifa";
       public            postgres    false    276            �           1259    28744    IX_ProdTarifa_IdEmpresa    INDEX     Y   CREATE INDEX "IX_ProdTarifa_IdEmpresa" ON public."ProdTarifa" USING btree ("IdEmpresa");
 -   DROP INDEX public."IX_ProdTarifa_IdEmpresa";
       public            postgres    false    274            �           1259    28745    IX_ProdTarifa_IdMoneda    INDEX     W   CREATE INDEX "IX_ProdTarifa_IdMoneda" ON public."ProdTarifa" USING btree ("IdMoneda");
 ,   DROP INDEX public."IX_ProdTarifa_IdMoneda";
       public            postgres    false    274            �           1259    28875    IX_PvConfig_IdEmpresa    INDEX     U   CREATE INDEX "IX_PvConfig_IdEmpresa" ON public."PvConfig" USING btree ("IdEmpresa");
 +   DROP INDEX public."IX_PvConfig_IdEmpresa";
       public            postgres    false    286            �           1259    28766    IX_PvEfectivo_IdMoneda    INDEX     W   CREATE INDEX "IX_PvEfectivo_IdMoneda" ON public."PvEfectivo" USING btree ("IdMoneda");
 ,   DROP INDEX public."IX_PvEfectivo_IdMoneda";
       public            postgres    false    278            �           1259    28649    IX_RecContactoBanco_IdBanco    INDEX     a   CREATE INDEX "IX_RecContactoBanco_IdBanco" ON public."RecContactoBanco" USING btree ("IdBanco");
 1   DROP INDEX public."IX_RecContactoBanco_IdBanco";
       public            postgres    false    268            �           1259    28650    IX_RecContactoBanco_IdContacto    INDEX     g   CREATE INDEX "IX_RecContactoBanco_IdContacto" ON public."RecContactoBanco" USING btree ("IdContacto");
 4   DROP INDEX public."IX_RecContactoBanco_IdContacto";
       public            postgres    false    268            e           1259    28231 *   IX_RecContactoCategoriaRel_IdCategContacto    INDEX        CREATE INDEX "IX_RecContactoCategoriaRel_IdCategContacto" ON public."RecContactoCategoriaRel" USING btree ("IdCategContacto");
 @   DROP INDEX public."IX_RecContactoCategoriaRel_IdCategContacto";
       public            postgres    false    232            f           1259    28232 %   IX_RecContactoCategoriaRel_IdContacto    INDEX     u   CREATE INDEX "IX_RecContactoCategoriaRel_IdContacto" ON public."RecContactoCategoriaRel" USING btree ("IdContacto");
 ;   DROP INDEX public."IX_RecContactoCategoriaRel_IdContacto";
       public            postgres    false    232            J           1259    28415    IX_RecContacto_IdEmpresa    INDEX     [   CREATE INDEX "IX_RecContacto_IdEmpresa" ON public."RecContacto" USING btree ("IdEmpresa");
 .   DROP INDEX public."IX_RecContacto_IdEmpresa";
       public            postgres    false    212            O           1259    28409    IX_RecEmpresa_IdContacto    INDEX     [   CREATE INDEX "IX_RecEmpresa_IdContacto" ON public."RecEmpresa" USING btree ("IdContacto");
 .   DROP INDEX public."IX_RecEmpresa_IdContacto";
       public            postgres    false    216            |           1259    28235    IX_RecUsuarioGrupo_IdGrupo    INDEX     _   CREATE INDEX "IX_RecUsuarioGrupo_IdGrupo" ON public."RecUsuarioGrupo" USING btree ("IdGrupo");
 0   DROP INDEX public."IX_RecUsuarioGrupo_IdGrupo";
       public            postgres    false    244            }           1259    28236    IX_RecUsuarioGrupo_IdUsuario    INDEX     c   CREATE INDEX "IX_RecUsuarioGrupo_IdUsuario" ON public."RecUsuarioGrupo" USING btree ("IdUsuario");
 2   DROP INDEX public."IX_RecUsuarioGrupo_IdUsuario";
       public            postgres    false    244            i           1259    28233    IX_RecUsuario_IdContacto    INDEX     [   CREATE INDEX "IX_RecUsuario_IdContacto" ON public."RecUsuario" USING btree ("IdContacto");
 .   DROP INDEX public."IX_RecUsuario_IdContacto";
       public            postgres    false    234            j           1259    28234    IX_RecUsuario_IdTipoUsuario    INDEX     a   CREATE INDEX "IX_RecUsuario_IdTipoUsuario" ON public."RecUsuario" USING btree ("IdTipoUsuario");
 1   DROP INDEX public."IX_RecUsuario_IdTipoUsuario";
       public            postgres    false    234            �           1259    28237    IX_RiAccesoModelo_IdGrupo    INDEX     ]   CREATE INDEX "IX_RiAccesoModelo_IdGrupo" ON public."RiAccesoModelo" USING btree ("IdGrupo");
 /   DROP INDEX public."IX_RiAccesoModelo_IdGrupo";
       public            postgres    false    246            �           1259    28238    IX_RiAccesoModelo_IdModelo    INDEX     _   CREATE INDEX "IX_RiAccesoModelo_IdModelo" ON public."RiAccesoModelo" USING btree ("IdModelo");
 0   DROP INDEX public."IX_RiAccesoModelo_IdModelo";
       public            postgres    false    246            m           1259    28240    IX_RiMenuGrupoRel_IdGrupo    INDEX     ]   CREATE INDEX "IX_RiMenuGrupoRel_IdGrupo" ON public."RiMenuGrupoRel" USING btree ("IdGrupo");
 /   DROP INDEX public."IX_RiMenuGrupoRel_IdGrupo";
       public            postgres    false    236            n           1259    28241    IX_RiMenuGrupoRel_IdMenu    INDEX     [   CREATE INDEX "IX_RiMenuGrupoRel_IdMenu" ON public."RiMenuGrupoRel" USING btree ("IdMenu");
 .   DROP INDEX public."IX_RiMenuGrupoRel_IdMenu";
       public            postgres    false    236            X           1259    28239    IX_RiMenu_IdPadre    INDEX     M   CREATE INDEX "IX_RiMenu_IdPadre" ON public."RiMenu" USING btree ("IdPadre");
 '   DROP INDEX public."IX_RiMenu_IdPadre";
       public            postgres    false    224            q           1259    28242    IX_RiModelo_IdMenu    INDEX     O   CREATE INDEX "IX_RiModelo_IdMenu" ON public."RiModelo" USING btree ("IdMenu");
 (   DROP INDEX public."IX_RiModelo_IdMenu";
       public            postgres    false    238            �           1259    28808    IX_UmUnidadMedida_IdCategoria    INDEX     e   CREATE INDEX "IX_UmUnidadMedida_IdCategoria" ON public."UmUnidadMedida" USING btree ("IdCategoria");
 3   DROP INDEX public."IX_UmUnidadMedida_IdCategoria";
       public            postgres    false    282            �           1259    28454    IX_VentaOrdenDetalle_IdProducto    INDEX     i   CREATE INDEX "IX_VentaOrdenDetalle_IdProducto" ON public."VentaOrdenDetalle" USING btree ("IdProducto");
 5   DROP INDEX public."IX_VentaOrdenDetalle_IdProducto";
       public            postgres    false    264            �           1259    28455 !   IX_VentaOrdenDetalle_IdVentaOrden    INDEX     m   CREATE INDEX "IX_VentaOrdenDetalle_IdVentaOrden" ON public."VentaOrdenDetalle" USING btree ("IdVentaOrden");
 7   DROP INDEX public."IX_VentaOrdenDetalle_IdVentaOrden";
       public            postgres    false    264            �           2606    28390 B   CompraOrdenDetalle FK_CompraOrdenDetalle_CompraOrden_IdCompraOrden    FK CONSTRAINT     �   ALTER TABLE ONLY public."CompraOrdenDetalle"
    ADD CONSTRAINT "FK_CompraOrdenDetalle_CompraOrden_IdCompraOrden" FOREIGN KEY ("IdCompraOrden") REFERENCES public."CompraOrden"("Id");
 p   ALTER TABLE ONLY public."CompraOrdenDetalle" DROP CONSTRAINT "FK_CompraOrdenDetalle_CompraOrden_IdCompraOrden";
       public          postgres    false    260    258    3222            �           2606    28395 @   CompraOrdenDetalle FK_CompraOrdenDetalle_ProdProducto_IdProducto    FK CONSTRAINT     �   ALTER TABLE ONLY public."CompraOrdenDetalle"
    ADD CONSTRAINT "FK_CompraOrdenDetalle_ProdProducto_IdProducto" FOREIGN KEY ("IdProducto") REFERENCES public."ProdProducto"("Id");
 n   ALTER TABLE ONLY public."CompraOrdenDetalle" DROP CONSTRAINT "FK_CompraOrdenDetalle_ProdProducto_IdProducto";
       public          postgres    false    260    248    3207            �           2606    28385 2   CompraOrden FK_CompraOrden_RecContacto_IdProveedor    FK CONSTRAINT     �   ALTER TABLE ONLY public."CompraOrden"
    ADD CONSTRAINT "FK_CompraOrden_RecContacto_IdProveedor" FOREIGN KEY ("IdProveedor") REFERENCES public."RecContacto"("Id");
 `   ALTER TABLE ONLY public."CompraOrden" DROP CONSTRAINT "FK_CompraOrden_RecContacto_IdProveedor";
       public          postgres    false    3148    258    212            �           2606    28472 D   ContableAsiento FK_ContableAsiento_ContableLibroDiario_IdLibroDiario    FK CONSTRAINT     �   ALTER TABLE ONLY public."ContableAsiento"
    ADD CONSTRAINT "FK_ContableAsiento_ContableLibroDiario_IdLibroDiario" FOREIGN KEY ("IdLibroDiario") REFERENCES public."ContableLibroDiario"("Id") ON DELETE CASCADE;
 r   ALTER TABLE ONLY public."ContableAsiento" DROP CONSTRAINT "FK_ContableAsiento_ContableLibroDiario_IdLibroDiario";
       public          postgres    false    3215    226    254            �           2606    28012 L   ContableAsiento FK_ContableAsiento_ContableTipoComprobante_IdTipoComprobante    FK CONSTRAINT     �   ALTER TABLE ONLY public."ContableAsiento"
    ADD CONSTRAINT "FK_ContableAsiento_ContableTipoComprobante_IdTipoComprobante" FOREIGN KEY ("IdTipoComprobante") REFERENCES public."ContableTipoComprobante"("Id") ON DELETE CASCADE;
 z   ALTER TABLE ONLY public."ContableAsiento" DROP CONSTRAINT "FK_ContableAsiento_ContableTipoComprobante_IdTipoComprobante";
       public          postgres    false    206    3141    226            �           2606    28253 6   ContableBanco FK_ContableBanco_ContableCuenta_IdCuenta    FK CONSTRAINT     �   ALTER TABLE ONLY public."ContableBanco"
    ADD CONSTRAINT "FK_ContableBanco_ContableCuenta_IdCuenta" FOREIGN KEY ("IdCuenta") REFERENCES public."ContableCuenta"("Id") ON DELETE CASCADE;
 d   ALTER TABLE ONLY public."ContableBanco" DROP CONSTRAINT "FK_ContableBanco_ContableCuenta_IdCuenta";
       public          postgres    false    250    204    3139            �           2606    28888 \   ContableCompartirLibroDiario FK_ContableCompartirLibroDiario_ContableLibroDiario_IdLibroDia~    FK CONSTRAINT     �   ALTER TABLE ONLY public."ContableCompartirLibroDiario"
    ADD CONSTRAINT "FK_ContableCompartirLibroDiario_ContableLibroDiario_IdLibroDia~" FOREIGN KEY ("IdLibroDiario") REFERENCES public."ContableLibroDiario"("Id") ON DELETE CASCADE;
 �   ALTER TABLE ONLY public."ContableCompartirLibroDiario" DROP CONSTRAINT "FK_ContableCompartirLibroDiario_ContableLibroDiario_IdLibroDia~";
       public          postgres    false    254    3215    288            �           2606    28893 Q   ContableCompartirLibroDiario FK_ContableCompartirLibroDiario_RecUsuario_IdUsuario    FK CONSTRAINT     �   ALTER TABLE ONLY public."ContableCompartirLibroDiario"
    ADD CONSTRAINT "FK_ContableCompartirLibroDiario_RecUsuario_IdUsuario" FOREIGN KEY ("IdUsuario") REFERENCES public."RecUsuario"("Id") ON DELETE CASCADE;
    ALTER TABLE ONLY public."ContableCompartirLibroDiario" DROP CONSTRAINT "FK_ContableCompartirLibroDiario_RecUsuario_IdUsuario";
       public          postgres    false    3180    288    234            �           2606    28132 J   ContableDetalleAsiento FK_ContableDetalleAsiento_ContableAsiento_IdAsiento    FK CONSTRAINT     �   ALTER TABLE ONLY public."ContableDetalleAsiento"
    ADD CONSTRAINT "FK_ContableDetalleAsiento_ContableAsiento_IdAsiento" FOREIGN KEY ("IdAsiento") REFERENCES public."ContableAsiento"("Id") ON DELETE CASCADE;
 x   ALTER TABLE ONLY public."ContableDetalleAsiento" DROP CONSTRAINT "FK_ContableDetalleAsiento_ContableAsiento_IdAsiento";
       public          postgres    false    240    226    3166            �           2606    28137 H   ContableDetalleAsiento FK_ContableDetalleAsiento_ContableCuenta_IdCuenta    FK CONSTRAINT     �   ALTER TABLE ONLY public."ContableDetalleAsiento"
    ADD CONSTRAINT "FK_ContableDetalleAsiento_ContableCuenta_IdCuenta" FOREIGN KEY ("IdCuenta") REFERENCES public."ContableCuenta"("Id") ON DELETE CASCADE;
 v   ALTER TABLE ONLY public."ContableDetalleAsiento" DROP CONSTRAINT "FK_ContableDetalleAsiento_ContableCuenta_IdCuenta";
       public          postgres    false    204    240    3139            �           2606    28284 ?   ContableLibroDiario FK_ContableLibroDiario_RecUsuario_IdUsuario    FK CONSTRAINT     �   ALTER TABLE ONLY public."ContableLibroDiario"
    ADD CONSTRAINT "FK_ContableLibroDiario_RecUsuario_IdUsuario" FOREIGN KEY ("IdUsuario") REFERENCES public."RecUsuario"("Id") ON DELETE CASCADE;
 m   ALTER TABLE ONLY public."ContableLibroDiario" DROP CONSTRAINT "FK_ContableLibroDiario_RecUsuario_IdUsuario";
       public          postgres    false    254    3180    234            �           2606    28027 >   ProdAtributoValor FK_ProdAtributoValor_ProdAtributo_IdAtributo    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProdAtributoValor"
    ADD CONSTRAINT "FK_ProdAtributoValor_ProdAtributo_IdAtributo" FOREIGN KEY ("IdAtributo") REFERENCES public."ProdAtributo"("Id") ON DELETE CASCADE;
 l   ALTER TABLE ONLY public."ProdAtributoValor" DROP CONSTRAINT "FK_ProdAtributoValor_ProdAtributo_IdAtributo";
       public          postgres    false    208    3143    228            �           2606    28152 M   ProdBaseAtribValorRel FK_ProdBaseAtribValorRel_ProdAtributoValor_IdAtribValor    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProdBaseAtribValorRel"
    ADD CONSTRAINT "FK_ProdBaseAtribValorRel_ProdAtributoValor_IdAtribValor" FOREIGN KEY ("IdAtribValor") REFERENCES public."ProdAtributoValor"("Id") ON DELETE CASCADE;
 {   ALTER TABLE ONLY public."ProdBaseAtribValorRel" DROP CONSTRAINT "FK_ProdBaseAtribValorRel_ProdAtributoValor_IdAtribValor";
       public          postgres    false    3169    242    228            �           2606    28157 J   ProdBaseAtribValorRel FK_ProdBaseAtribValorRel_ProdProductoBase_IdProdBase    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProdBaseAtribValorRel"
    ADD CONSTRAINT "FK_ProdBaseAtribValorRel_ProdProductoBase_IdProdBase" FOREIGN KEY ("IdProdBase") REFERENCES public."ProdProductoBase"("Id") ON DELETE CASCADE;
 x   ALTER TABLE ONLY public."ProdBaseAtribValorRel" DROP CONSTRAINT "FK_ProdBaseAtribValorRel_ProdProductoBase_IdProdBase";
       public          postgres    false    242    3172    230            �           2606    28311 Y   ProdProductoAtribValorRel FK_ProdProductoAtribValorRel_ProdBaseAtribValorRel_IdProdBaseA~    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProdProductoAtribValorRel"
    ADD CONSTRAINT "FK_ProdProductoAtribValorRel_ProdBaseAtribValorRel_IdProdBaseA~" FOREIGN KEY ("IdProdBaseAtriValorRel") REFERENCES public."ProdBaseAtribValorRel"("Id") ON DELETE CASCADE;
 �   ALTER TABLE ONLY public."ProdProductoAtribValorRel" DROP CONSTRAINT "FK_ProdProductoAtribValorRel_ProdBaseAtribValorRel_IdProdBaseA~";
       public          postgres    false    242    3195    256            �           2606    28316 R   ProdProductoAtribValorRel FK_ProdProductoAtribValorRel_ProdProducto_IdProdProducto    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProdProductoAtribValorRel"
    ADD CONSTRAINT "FK_ProdProductoAtribValorRel_ProdProducto_IdProdProducto" FOREIGN KEY ("IdProdProducto") REFERENCES public."ProdProducto"("Id") ON DELETE CASCADE;
 �   ALTER TABLE ONLY public."ProdProductoAtribValorRel" DROP CONSTRAINT "FK_ProdProductoAtribValorRel_ProdProducto_IdProdProducto";
       public          postgres    false    3207    248    256            �           2606    28042 >   ProdProductoBase FK_ProdProductoBase_ProdCategoria_IdCategoria    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProdProductoBase"
    ADD CONSTRAINT "FK_ProdProductoBase_ProdCategoria_IdCategoria" FOREIGN KEY ("IdCategoria") REFERENCES public."ProdCategoria"("Id") ON DELETE CASCADE;
 l   ALTER TABLE ONLY public."ProdProductoBase" DROP CONSTRAINT "FK_ProdProductoBase_ProdCategoria_IdCategoria";
       public          postgres    false    210    3145    230            �           2606    28296 J   ProdProducto FK_ProdProducto_ProdBaseAtribValorRel_ProdBaseAtribValorRelId    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProdProducto"
    ADD CONSTRAINT "FK_ProdProducto_ProdBaseAtribValorRel_ProdBaseAtribValorRelId" FOREIGN KEY ("ProdBaseAtribValorRelId") REFERENCES public."ProdBaseAtribValorRel"("Id");
 x   ALTER TABLE ONLY public."ProdProducto" DROP CONSTRAINT "FK_ProdProducto_ProdBaseAtribValorRel_ProdBaseAtribValorRelId";
       public          postgres    false    248    3195    242            �           2606    28217 8   ProdProducto FK_ProdProducto_ProdProductoBase_IdProdBase    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProdProducto"
    ADD CONSTRAINT "FK_ProdProducto_ProdProductoBase_IdProdBase" FOREIGN KEY ("IdProdBase") REFERENCES public."ProdProductoBase"("Id") ON DELETE CASCADE;
 f   ALTER TABLE ONLY public."ProdProducto" DROP CONSTRAINT "FK_ProdProducto_ProdProductoBase_IdProdBase";
       public          postgres    false    248    3172    230            �           2606    28825 H   ProdTarifaDetalle FK_ProdTarifaDetalle_ProdCategoria_IdProductoCategoria    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProdTarifaDetalle"
    ADD CONSTRAINT "FK_ProdTarifaDetalle_ProdCategoria_IdProductoCategoria" FOREIGN KEY ("IdProductoCategoria") REFERENCES public."ProdCategoria"("Id");
 v   ALTER TABLE ONLY public."ProdTarifaDetalle" DROP CONSTRAINT "FK_ProdTarifaDetalle_ProdCategoria_IdProductoCategoria";
       public          postgres    false    276    3145    210            �           2606    28830 F   ProdTarifaDetalle FK_ProdTarifaDetalle_ProdProductoBase_IdProductoBase    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProdTarifaDetalle"
    ADD CONSTRAINT "FK_ProdTarifaDetalle_ProdProductoBase_IdProductoBase" FOREIGN KEY ("IdProductoBase") REFERENCES public."ProdProductoBase"("Id");
 t   ALTER TABLE ONLY public."ProdTarifaDetalle" DROP CONSTRAINT "FK_ProdTarifaDetalle_ProdProductoBase_IdProductoBase";
       public          postgres    false    276    3172    230            �           2606    28835 >   ProdTarifaDetalle FK_ProdTarifaDetalle_ProdProducto_IdProducto    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProdTarifaDetalle"
    ADD CONSTRAINT "FK_ProdTarifaDetalle_ProdProducto_IdProducto" FOREIGN KEY ("IdProducto") REFERENCES public."ProdProducto"("Id");
 l   ALTER TABLE ONLY public."ProdTarifaDetalle" DROP CONSTRAINT "FK_ProdTarifaDetalle_ProdProducto_IdProducto";
       public          postgres    false    3207    276    248            �           2606    28840 :   ProdTarifaDetalle FK_ProdTarifaDetalle_ProdTarifa_IdTarifa    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProdTarifaDetalle"
    ADD CONSTRAINT "FK_ProdTarifaDetalle_ProdTarifa_IdTarifa" FOREIGN KEY ("IdTarifa") REFERENCES public."ProdTarifa"("Id");
 h   ALTER TABLE ONLY public."ProdTarifaDetalle" DROP CONSTRAINT "FK_ProdTarifaDetalle_ProdTarifa_IdTarifa";
       public          postgres    false    274    276    3246            �           2606    28845 9   ProdTarifaDetalle FK_ProdTarifaDetalle_RecMoneda_IdMoneda    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProdTarifaDetalle"
    ADD CONSTRAINT "FK_ProdTarifaDetalle_RecMoneda_IdMoneda" FOREIGN KEY ("IdMoneda") REFERENCES public."RecMoneda"("Id");
 g   ALTER TABLE ONLY public."ProdTarifaDetalle" DROP CONSTRAINT "FK_ProdTarifaDetalle_RecMoneda_IdMoneda";
       public          postgres    false    270    3240    276            �           2606    28815 -   ProdTarifa FK_ProdTarifa_RecEmpresa_IdEmpresa    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProdTarifa"
    ADD CONSTRAINT "FK_ProdTarifa_RecEmpresa_IdEmpresa" FOREIGN KEY ("IdEmpresa") REFERENCES public."RecEmpresa"("Id");
 [   ALTER TABLE ONLY public."ProdTarifa" DROP CONSTRAINT "FK_ProdTarifa_RecEmpresa_IdEmpresa";
       public          postgres    false    274    3153    216            �           2606    28820 +   ProdTarifa FK_ProdTarifa_RecMoneda_IdMoneda    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProdTarifa"
    ADD CONSTRAINT "FK_ProdTarifa_RecMoneda_IdMoneda" FOREIGN KEY ("IdMoneda") REFERENCES public."RecMoneda"("Id");
 Y   ALTER TABLE ONLY public."ProdTarifa" DROP CONSTRAINT "FK_ProdTarifa_RecMoneda_IdMoneda";
       public          postgres    false    274    270    3240            �           2606    28870 )   PvConfig FK_PvConfig_RecEmpresa_IdEmpresa    FK CONSTRAINT     �   ALTER TABLE ONLY public."PvConfig"
    ADD CONSTRAINT "FK_PvConfig_RecEmpresa_IdEmpresa" FOREIGN KEY ("IdEmpresa") REFERENCES public."RecEmpresa"("Id") ON DELETE CASCADE;
 W   ALTER TABLE ONLY public."PvConfig" DROP CONSTRAINT "FK_PvConfig_RecEmpresa_IdEmpresa";
       public          postgres    false    3153    286    216            �           2606    28761 +   PvEfectivo FK_PvEfectivo_RecMoneda_IdMoneda    FK CONSTRAINT     �   ALTER TABLE ONLY public."PvEfectivo"
    ADD CONSTRAINT "FK_PvEfectivo_RecMoneda_IdMoneda" FOREIGN KEY ("IdMoneda") REFERENCES public."RecMoneda"("Id") ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public."PvEfectivo" DROP CONSTRAINT "FK_PvEfectivo_RecMoneda_IdMoneda";
       public          postgres    false    3240    270    278            �           2606    28661 5   RecContactoBanco FK_RecContactoBanco_RecBanco_IdBanco    FK CONSTRAINT     �   ALTER TABLE ONLY public."RecContactoBanco"
    ADD CONSTRAINT "FK_RecContactoBanco_RecBanco_IdBanco" FOREIGN KEY ("IdBanco") REFERENCES public."RecBanco"("Id");
 c   ALTER TABLE ONLY public."RecContactoBanco" DROP CONSTRAINT "FK_RecContactoBanco_RecBanco_IdBanco";
       public          postgres    false    266    268    3234            �           2606    28666 ;   RecContactoBanco FK_RecContactoBanco_RecContacto_IdContacto    FK CONSTRAINT     �   ALTER TABLE ONLY public."RecContactoBanco"
    ADD CONSTRAINT "FK_RecContactoBanco_RecContacto_IdContacto" FOREIGN KEY ("IdContacto") REFERENCES public."RecContacto"("Id");
 i   ALTER TABLE ONLY public."RecContactoBanco" DROP CONSTRAINT "FK_RecContactoBanco_RecContacto_IdContacto";
       public          postgres    false    268    3148    212            �           2606    28057 W   RecContactoCategoriaRel FK_RecContactoCategoriaRel_RecContactoCategoria_IdCategContacto    FK CONSTRAINT     �   ALTER TABLE ONLY public."RecContactoCategoriaRel"
    ADD CONSTRAINT "FK_RecContactoCategoriaRel_RecContactoCategoria_IdCategContacto" FOREIGN KEY ("IdCategContacto") REFERENCES public."RecContactoCategoria"("Id") ON DELETE CASCADE;
 �   ALTER TABLE ONLY public."RecContactoCategoriaRel" DROP CONSTRAINT "FK_RecContactoCategoriaRel_RecContactoCategoria_IdCategContacto";
       public          postgres    false    214    232    3150            �           2606    28062 I   RecContactoCategoriaRel FK_RecContactoCategoriaRel_RecContacto_IdContacto    FK CONSTRAINT     �   ALTER TABLE ONLY public."RecContactoCategoriaRel"
    ADD CONSTRAINT "FK_RecContactoCategoriaRel_RecContacto_IdContacto" FOREIGN KEY ("IdContacto") REFERENCES public."RecContacto"("Id") ON DELETE CASCADE;
 w   ALTER TABLE ONLY public."RecContactoCategoriaRel" DROP CONSTRAINT "FK_RecContactoCategoriaRel_RecContacto_IdContacto";
       public          postgres    false    232    3148    212            �           2606    28416 /   RecContacto FK_RecContacto_RecEmpresa_IdEmpresa    FK CONSTRAINT     �   ALTER TABLE ONLY public."RecContacto"
    ADD CONSTRAINT "FK_RecContacto_RecEmpresa_IdEmpresa" FOREIGN KEY ("IdEmpresa") REFERENCES public."RecEmpresa"("Id");
 ]   ALTER TABLE ONLY public."RecContacto" DROP CONSTRAINT "FK_RecContacto_RecEmpresa_IdEmpresa";
       public          postgres    false    216    3153    212            �           2606    28410 /   RecEmpresa FK_RecEmpresa_RecContacto_IdContacto    FK CONSTRAINT     �   ALTER TABLE ONLY public."RecEmpresa"
    ADD CONSTRAINT "FK_RecEmpresa_RecContacto_IdContacto" FOREIGN KEY ("IdContacto") REFERENCES public."RecContacto"("Id");
 ]   ALTER TABLE ONLY public."RecEmpresa" DROP CONSTRAINT "FK_RecEmpresa_RecContacto_IdContacto";
       public          postgres    false    212    3148    216            �           2606    28172 3   RecUsuarioGrupo FK_RecUsuarioGrupo_RecGrupo_IdGrupo    FK CONSTRAINT     �   ALTER TABLE ONLY public."RecUsuarioGrupo"
    ADD CONSTRAINT "FK_RecUsuarioGrupo_RecGrupo_IdGrupo" FOREIGN KEY ("IdGrupo") REFERENCES public."RecGrupo"("Id") ON DELETE CASCADE;
 a   ALTER TABLE ONLY public."RecUsuarioGrupo" DROP CONSTRAINT "FK_RecUsuarioGrupo_RecGrupo_IdGrupo";
       public          postgres    false    218    3155    244            �           2606    28177 7   RecUsuarioGrupo FK_RecUsuarioGrupo_RecUsuario_IdUsuario    FK CONSTRAINT     �   ALTER TABLE ONLY public."RecUsuarioGrupo"
    ADD CONSTRAINT "FK_RecUsuarioGrupo_RecUsuario_IdUsuario" FOREIGN KEY ("IdUsuario") REFERENCES public."RecUsuario"("Id") ON DELETE CASCADE;
 e   ALTER TABLE ONLY public."RecUsuarioGrupo" DROP CONSTRAINT "FK_RecUsuarioGrupo_RecUsuario_IdUsuario";
       public          postgres    false    234    3180    244            �           2606    28077 /   RecUsuario FK_RecUsuario_RecContacto_IdContacto    FK CONSTRAINT     �   ALTER TABLE ONLY public."RecUsuario"
    ADD CONSTRAINT "FK_RecUsuario_RecContacto_IdContacto" FOREIGN KEY ("IdContacto") REFERENCES public."RecContacto"("Id");
 ]   ALTER TABLE ONLY public."RecUsuario" DROP CONSTRAINT "FK_RecUsuario_RecContacto_IdContacto";
       public          postgres    false    3148    234    212            �           2606    28082 5   RecUsuario FK_RecUsuario_RecTipoUsuario_IdTipoUsuario    FK CONSTRAINT     �   ALTER TABLE ONLY public."RecUsuario"
    ADD CONSTRAINT "FK_RecUsuario_RecTipoUsuario_IdTipoUsuario" FOREIGN KEY ("IdTipoUsuario") REFERENCES public."RecTipoUsuario"("Id");
 c   ALTER TABLE ONLY public."RecUsuario" DROP CONSTRAINT "FK_RecUsuario_RecTipoUsuario_IdTipoUsuario";
       public          postgres    false    234    3157    220            �           2606    28192 1   RiAccesoModelo FK_RiAccesoModelo_RecGrupo_IdGrupo    FK CONSTRAINT     �   ALTER TABLE ONLY public."RiAccesoModelo"
    ADD CONSTRAINT "FK_RiAccesoModelo_RecGrupo_IdGrupo" FOREIGN KEY ("IdGrupo") REFERENCES public."RecGrupo"("Id") ON DELETE CASCADE;
 _   ALTER TABLE ONLY public."RiAccesoModelo" DROP CONSTRAINT "FK_RiAccesoModelo_RecGrupo_IdGrupo";
       public          postgres    false    246    218    3155            �           2606    28197 2   RiAccesoModelo FK_RiAccesoModelo_RiModelo_IdModelo    FK CONSTRAINT     �   ALTER TABLE ONLY public."RiAccesoModelo"
    ADD CONSTRAINT "FK_RiAccesoModelo_RiModelo_IdModelo" FOREIGN KEY ("IdModelo") REFERENCES public."RiModelo"("Id") ON DELETE CASCADE;
 `   ALTER TABLE ONLY public."RiAccesoModelo" DROP CONSTRAINT "FK_RiAccesoModelo_RiModelo_IdModelo";
       public          postgres    false    3187    238    246            �           2606    28097 1   RiMenuGrupoRel FK_RiMenuGrupoRel_RecGrupo_IdGrupo    FK CONSTRAINT     �   ALTER TABLE ONLY public."RiMenuGrupoRel"
    ADD CONSTRAINT "FK_RiMenuGrupoRel_RecGrupo_IdGrupo" FOREIGN KEY ("IdGrupo") REFERENCES public."RecGrupo"("Id") ON DELETE CASCADE;
 _   ALTER TABLE ONLY public."RiMenuGrupoRel" DROP CONSTRAINT "FK_RiMenuGrupoRel_RecGrupo_IdGrupo";
       public          postgres    false    236    3155    218            �           2606    28102 .   RiMenuGrupoRel FK_RiMenuGrupoRel_RiMenu_IdMenu    FK CONSTRAINT     �   ALTER TABLE ONLY public."RiMenuGrupoRel"
    ADD CONSTRAINT "FK_RiMenuGrupoRel_RiMenu_IdMenu" FOREIGN KEY ("IdMenu") REFERENCES public."RiMenu"("Id") ON DELETE CASCADE;
 \   ALTER TABLE ONLY public."RiMenuGrupoRel" DROP CONSTRAINT "FK_RiMenuGrupoRel_RiMenu_IdMenu";
       public          postgres    false    3162    236    224            �           2606    27997    RiMenu FK_RiMenu_RiMenu_IdPadre    FK CONSTRAINT     �   ALTER TABLE ONLY public."RiMenu"
    ADD CONSTRAINT "FK_RiMenu_RiMenu_IdPadre" FOREIGN KEY ("IdPadre") REFERENCES public."RiMenu"("Id");
 M   ALTER TABLE ONLY public."RiMenu" DROP CONSTRAINT "FK_RiMenu_RiMenu_IdPadre";
       public          postgres    false    3162    224    224            �           2606    28117 "   RiModelo FK_RiModelo_RiMenu_IdMenu    FK CONSTRAINT     �   ALTER TABLE ONLY public."RiModelo"
    ADD CONSTRAINT "FK_RiModelo_RiMenu_IdMenu" FOREIGN KEY ("IdMenu") REFERENCES public."RiMenu"("Id") ON DELETE CASCADE;
 P   ALTER TABLE ONLY public."RiModelo" DROP CONSTRAINT "FK_RiModelo_RiMenu_IdMenu";
       public          postgres    false    224    3162    238            �           2606    28803 8   UmUnidadMedida FK_UmUnidadMedida_UmCategoria_IdCategoria    FK CONSTRAINT     �   ALTER TABLE ONLY public."UmUnidadMedida"
    ADD CONSTRAINT "FK_UmUnidadMedida_UmCategoria_IdCategoria" FOREIGN KEY ("IdCategoria") REFERENCES public."UmCategoria"("Id") ON DELETE CASCADE;
 f   ALTER TABLE ONLY public."UmUnidadMedida" DROP CONSTRAINT "FK_UmUnidadMedida_UmCategoria_IdCategoria";
       public          postgres    false    282    3258    280            �           2606    28461 >   VentaOrdenDetalle FK_VentaOrdenDetalle_ProdProducto_IdProducto    FK CONSTRAINT     �   ALTER TABLE ONLY public."VentaOrdenDetalle"
    ADD CONSTRAINT "FK_VentaOrdenDetalle_ProdProducto_IdProducto" FOREIGN KEY ("IdProducto") REFERENCES public."ProdProducto"("Id");
 l   ALTER TABLE ONLY public."VentaOrdenDetalle" DROP CONSTRAINT "FK_VentaOrdenDetalle_ProdProducto_IdProducto";
       public          postgres    false    264    3207    248            �           2606    28466 >   VentaOrdenDetalle FK_VentaOrdenDetalle_VentaOrden_IdVentaOrden    FK CONSTRAINT     �   ALTER TABLE ONLY public."VentaOrdenDetalle"
    ADD CONSTRAINT "FK_VentaOrdenDetalle_VentaOrden_IdVentaOrden" FOREIGN KEY ("IdVentaOrden") REFERENCES public."VentaOrden"("Id");
 l   ALTER TABLE ONLY public."VentaOrdenDetalle" DROP CONSTRAINT "FK_VentaOrdenDetalle_VentaOrden_IdVentaOrden";
       public          postgres    false    262    264    3228            �      x������ � �      �      x������ � �      �   m	  x��\������?E���w��i�n\����0w>��H3N5G������.�Zi�!��B�.��_������������o���_b�!Ϳ�}��������[��UKLL����_��X��_�%;,��'�TĒ'Kʖσ�f*b)s�z�?�,���̟�r�����idӘ��Ű�����-K1�������>���XDc'��'C9'�˖cs!׈9���� PM�m��'��6�U<ɍ �¶v��*�<�3-'���*�2yB����πU<��y2k����]A.1�X5`�|1W���'.'TE�Π�F�k9�U�3x4�x�Uј�\ʋ V�D�ܶ�I��6��tn��1x/���A	䪧{�,���`�	ۻ6t�� �_<O��k�U<�=��ǅ�}�=��*W9�(����fL��)�%>���;����|h��h 
R�p�t!P���2�ȋ�V�xb� Q��TE㢠�DA��\�U<�r���R펪h<9(u���TE�~ ;tz���:����r��M;���`p0��]0��B E��P�;�ZXx,S��qG�+��-��x��N� �
TE���%��{9�U<���h9�V��ilS0կG��Ɠ�a�X��Ɂ�Dըr[P�@9��h̻��%x�S+ѝ�8���� 	;���N�ܠ�A������*�)���8��qW��(��m���zaH�d\���Ɠ�8���X���Y�����gǓ�Sc�;X;���2��?XU�HDǣȶ�!s�]AM��OV���q2�]���qQ�G��DP�{��ٱm�X���A)�D��펪h�X-�rv�X�����C��tEzrf��8��(�Z��ܢ�QU�ŻcP����l�{�ڱ�{��N��a�o��*o��qTE������M��qGP�Q4X~��Ɠ�T���:^�P7��vl;�:����R�	�B��hP%(�Š��:��B�o^���A�H�`�+�)1Ȥ��tTE����y@����MwEG/o������^��i]����ع�xfI�����8��=;@U4��0~;�uTE゠eZͶ5���OR'����@U4h�B4+� U�D� ���6]iz|2�Heɲ3�(���wY�s֦U�x�0����nV�����o_m �������X L�FǮQ�s��U<�b,�o���9*+B���o��qT��A㹢�J+M9W�k��5��y�J�`Ws��xP0̍z�L XF��Z�c����QOE�5��� ���S2���%C]ɼ[}�a�ªJ�p=.b���P���+�����*���x�0*M��XF�!T.�.�*��jA̜��N/P������B��-�\_�̀�x�
O�,UT��a:@;�*�q�g�+�� S(���*���h�QCq���|����!�!����6,F��a98�2����vY���B�Fy�.� �d��h�;֕'��PM<n�XF���[9��C��?�U܅dGe<Hr���������{JJ��<i���7�2�7��5��,#J��M3���n�!$/!4���-��x��e[[d��T�R~Ac�R��iQj��#Jub$a�(PalO���G����aW�zb�TS>��]�0��sz��T��"a4*Z��P���G�����L�gV�j�c&��4� ��z�������:�ӭ�P���"o܊ˈ:*~Ϲ�U��0-�
s��Qaa~�D,F��Hq�J����S��x�����T����1��˕!����#^�`�sfk��*�G�|b� ���3�a͡��o5���P�k�*Օ73�+%��g)��x��dn<����g�L$���C�2Ƞ��ar��4i�\�Lh�G,����4L%��ӎgPL�1��C�&�� ��TDU{̩��*�W��~䡊=�?���N�>�N�����Đ�8r�\Y��0�؍j	�� ˈ>w�H��:3P��!�7L��5�bl<��o16%ƒb�T�%9,#�ԡ���мL��d�9��:Tƃ�D��9�آn�b�;�s�9ڹv�	�������U�x�j�]�~t�#w�4�%#PODݯ�Y==��;��uB��y�fI^�3�*�X�>XF��Cn�
Ka��`l��%���*�q�`�r˲��x�%t.�PXU�G:.3�F�d)��0�8J{|R�N���OH����'���x��4Q�N�(�M4>����� ˈ���B��{�+�>�a�8^&��x�;������h7|��U���{��xPa,���{=E�����x��T��	#><��WC�q?~��۷���z      �      x������ � �      �      x������ � �      v      x��]�n�H�>�O��b��]1�?7Z�]lȢ���ݍ��lv����ޙy�=,�9����/��A%�vEe��.Ā_�O|�
F���,��z�����'�)�"�4?�/�C��qr���8�m<楞���I�4U9_��u���ADY�}��^(!.�'�i������T����@��B��Ě?�u9/�b�����#̬�ԋ5����y���-0#SJ����9�\M
w����R/5���U=�������bYO+wX�ά�z��btY�'��m�;�J��C����Ţ��7s?
�"�;�J�?�V��.%v(��++쐃r` ��|Y-
9�0�8�������.��@/	]���}�	��(��@�͝�0Ҝ���������v$�Hp8J��AB��
X�X��u$~�M����D1+�D"�ۃ�7���O6�n{�����W��G���v��$��^�j����^�o���)�p�4�j�,��cvb���@�F�<��v�m�7��;�ò��q���b4�'�X����NX&N�3kL\���V�����쬤�\oy[/�~�weS]��w8��J�	q�l��U����we9��r�8�,y(�'Bc��S��r>���rvcNY&QRODh>���/��+��gKl֞���Ţ7�{�ߖ͢��^��l��U)�'4��.���D�4c�*C���+��8���tǋ���~�;|�g7�k`��dTg.���kZ���tT���,]'�5!eA�f�TMou^�{Xw���p�nj�Mj���za`��Q�*�'8��w�O�����aY�QR/l���������� 
�4_}���V6���6I�PU�k2�*f��U�@84P�f��]�\Hꅚ�����	>�I�PSS~���YM�[9��p�bv�e'�85����[7�fb�zaf@�QS.����%�ͤ�����4�ր�H�DQa�7e1�~)\�w�c8$�"��P����N�/��X{m��^�ԋ����<���V����h��ǁjvs��$�"a �|��/��3fȎ6�цf4�iw<v�!�12��^KIQ*<G��e%�"��H��ZaO�j�}��G�]��2]M&���3���xR.�^	�-�*�M�ݳ��!v�"�?�>b����~����1�	I�('	�,8(�	��V<�_��^<�0������~�u�m7���ﻭ��^�}���^�>+F�T�j�� ٹTR/G�|X���^� �nX	;�	�ih�AT�=���u{�����~q����C�C��#�G���������_��z^:Nt�UJ�ű�|k7����u�y�m��@I���,���tOE����XjRR/NO��Fw����k���n��%'%��L��w�_��ϛ���,��n \���N�n8��Ёu��K4����*�%�۾�/��u�g,�)��h�0����Q[����`G����a�Ք�K���=�~u����^�Y/�Z� |�I��� f��M=Ӓ�K4�%��c}褳��|���f9bv�cD��8����6&C��h�KO�P��"��ZGƜ	��K4��o�N?�_m�v�a��q�?I�%�������Jq��R/�̘�n
X�y!]}�%\#�5��Q	�T�`�֊ܴ0�m�_��p*:�]pt�R/M�:�t��]!v�*��j��G���.n*��t\��Q꥚s�
���ne�=��\�.{���ߞ��i�q3J��D��x4���J2�@�99ZF��&����߻���W0���A���ݰ�b+I�TRa8�����Pta�\���^*�.Ա��~Y�Uy�4��I��JR/�	3Q��r�F$���FRk���������w�_��(bS���'��zY`�J����NܳY����Ѡ�^&�B���EDۮ�x���"��\8�g������:3p�Y�zY�q1�x�G���6ݯ`���ݢzyR�~v~�8�?��cZ]�M5�]�]F\ńpT����Əy������Aʞ�J�e��C�>���$����'13���=ѡ��_����wr�f�P%�������f2�S5�bZ�`�a���3�Ε�ˉ�����S�TZ��BK�J��D@ѰQG��&b�22�ӕ�˅�T���V�R����*��^vs�Fo(�r�KѰ�ky0��J�<�/��6�X�J�<���>=�0;�Ř��zy"1�JFg�����v�R/O	GB՗��BD�
���*eɿ��\��������ڂl�	�Ly�U w��h���e�����1���l�^��>�E��Pw��-�U��ͱ*J=Y�=��ХZ8F�f��ݸ9R�P�W×=bCP��~�0��4zĆkk�q��!��w�!�ͺ�Ej{j��{�.�VN������w#Ӯ ��Au�i��B&J;������t��Ɣ[f^[�D)`'vؗ�j
�������R��� �g!�LkB�_�bR�`�i��AӘ5�a�w�}�D~uWT�*[�D)��.��7h���^,|���G���3���o����ެڇnhe�U��]�7D)��D�fr!�����m)ր5������zI�n�R���T��:�P'z�b�}>�������?�59\�1IA���&i��A����ܯ�<�}��ӂE�N�>�	��{�Fe�~l�g�h.��rڷ�
���Т$�9(��(�i*��i� � &�+�e�2��������,4!k�LLv�Y�U��L�l�R��T�e�����`�W�j�1�{cZ�g����PE������G*ֽ��j�v���@���n��w��
�ԮZ�%C���/�Q!oc�JmS.�9m�3]Ҝ=As<A�&H�Z0��n@B~quq�e�	�������[�k�"2T�*OZ�j�\5��!آ��%B�78-�E1[M�1� ������Z�¦xÓ���b/��&�L�]%^]�돓;.4�a!����?�4�[�C) ��L+O˛y���]1Y��`C�j���8d/P
��Ű��(�;�D�߮�x����Բ������_(� 9Ia�{�Y����ahh���m������]�� 2У�k.:���ݡ�>�g�zZ&�"��"�P�d�
�d�k��l��XV���о��{���YEcnS��ȴ�����mX��?k��U�N�E,�E�ka~���Օ�v���s�P��XC)���_MO���e��z�Uz��a���p9� ��C`�u����
���d_�oΪ�	Z��*�+j�5���0$@*4K>�I�Y*#6�Q.%�4 ^;��t����2*eT���]1�3*��1�&�6jv��&O4�+�!�+|����#�FDx���W���Z��4.[�m9G) ��[-��u.ˬ�����NնW�a�K�������1L�m�l��z^ٗ�"6�Qf#F�|�D��(�<�ٔED)�X�o��(~^͓D�-�El�8J'$�!���i�+`glK8J-�hXi���v�/v@훁*��;�]����Pc�0�͏�Ų� o�V�z>�e�UKI�m0{F�+�S������ñ�Sr���'�ū��,m�����@U���n2�4�����B�x��/����;6,� �Ĺ�J�ZwT��)DI�n4�m�C���� �_?뻃�,�S��Hz�E��R��X2�}�ډd'�����V<����	����j�#ZT�v!�@#��	��ysle�@v�^�������N��_-��%Aʈ�t}8�ʅ�\�I�X���{ȋ��@b(�����J;=}w���Z���Te�f�]��R&y��[��[�L+`n'�k0�C&����[0�W[�rk"Y,����2�S��3[��K�$�P\�jg�)�ߛ���=�/�ߐG��K�kc�-�����S�z���Σ�&��@OKk��")���n����`��ssiDĘ
ğ�ת�:4��l�wL�l����-Dn��:ZC'����� .MPq-����������;����P   �v'[����l˕e��1��ӌ����n���Ӟ��4��d?��b����\h�N���֖�=�ER/�Ɔ:����S�,]Sp�#�p�5����e���� ieb]���5�|���E������pB���'�·����6>b;���?�"��h��K���|�]��k,��n��]�_���͘mG) '� ���a��N�_��j�F������@������^V�7�ǧu���]�9/����C�:�72ݮ���4g(��O"g�%��]=[Q
j��z=����c=#�Oɨ�z�n0_�v�ĞVxX��髧��4�j~��b��\�s�v�|��J>��f�l�CL-�Њ}/Y&����%T����۞��k�B�` �+�v��y���Bbt#�ɚW�N�ze讘�� �jQ6�M(��#<�#�i�
Q������dl@��������>t;wtn���%
}���32�Ӎ�r�w�8ƨ�6�ML$l=J(# U�T��@�����O�s>�5(�k������n�2?1P��Z����zb<6�勣U������F�(����S�����s���(\a�F� 	���>���A�Il��!|jR��B��%�]�s)`D��]�/��(�TV��Q��7J(�@��pºm��u,���q�Q6J.!8��8��� �jP,kH`�+/v�.6G) g��$����	Q
й�&����z痏_�M�����K���w��ed�z����ndS�u�c�c�Q2�.ܬ�͊��,F	X ~{x2&�F�F�(�P��)! m��\)`g���R �l�'�?�/ %.�ǟ��wkD��ϲ��������I�wb ��T�����q'r�p� SR��60�TV	b��S]�1l���R�!3t�F�a��I�]��Q�L|vR����OFwŤ��uҹ���B�����z��e�à�u�a�o��ļ>@���}�l�)JA���%{���<z����_a`�Î^g@~�i��! P}�^\���o	w��Y.ɑKDd@/�//�
_��;��Zv�a�Y�[�'�_��h7��جe��ĿAh��i�F���iWլ";;��8H���0Y�+���i�l�+J��28J�򪩮˳F�����
z�¿)����g��hn`�w|�F�'B���<)@��G����ݬ(T���9ݏ��tk��#0��A`pz�U�fM΁��� g������4�
w�g�WQ
��D�����ʗ���3���sJ�s���}7�R>�,˼>D'�$2P��xL�x9�x9Lt���'��|��W3ձ ���͟��`��J�w�P
���"��.W�eE�s�V�M5)��X�S����R� 34��E	�K�Dh���6���ٷ�P
蹁џ��In������Ow]X{���D46tIF���g�i�(������Mwܯ�ۏ�*��(C�B��*q�{|�/C�L���Ub���������IV����}�; 7@����t!��7__z����NAu��}��D���a��T5-�~qW-�3t`y
�#��S$<�e���Wp�WF�d�KB�G�'�_�\�ln^.��٘<��<2��!��*�':�k�n{��#�������ٱ�e�!
�#����\�׫浇e�b"dl�x��sw�&�36krXm��o�S�++�ٿ����r���Y��'� 7p-O{mR��%�|�9��r>�U`�����`;�0���\o���ҏe�́�I��|��;&kP��X�Ak"-����b��1g\vs��c��	1R�Lo��/�Y=?o�YE�5������=LԺx�l�8JQ�>%߹���M��gT��^p�8P�҅d[�Q
��&�ŝ�+�
�q�Z�j�m���nߞ������)5�O����=����>��n:����|����F4�M-�ʮO���+3%�6f�V�Q
:C����/����k�T����S��$J>4��6�a�e��=���W�����/���%��i�3�93E)��~��i(2�זq�>����I}r| ]���n��B�蕮sf�M>d�|Hҡ�{�{G����&a�����<���{Gg��@��Ġ�@�3G�fw!n�T���yQ�h�H�����~F��TS`D��W��W�����gw=�Sa(�K����qW�;�2*����B�B��Y��X^��ֺ�y���id��枸�_`�V\`�k��xHcC��Qs�r�̋3�a���R͑���d𓫳�K�j�j&�I�6Р�Ikd��9��r ��A��g�dl�#�DG*�O��a/�ۈ�-x{ ���Ƅy�[�s�
�-%���(���|/�ӠL����zvk�f32�fd��]q�C�29�/7����ed�FUC�j7ǶLN��1���dYt�p��n��~hv���%�;y�b+��X[��FJ����=���}�&������%��7���_4w9�:�f�f�Fö�G�ڀ���o=�//@j-G��<d��e�G��N��3:Qz�kE���.oؿ�̮G`�l�DF���PH������ݮ�l�DF��&E8M�L��`R�\�"���)��R��@:U��k�����2�&��[�\������f@|�����T�r�އG)�k�KGMY�DUS_^[(�ڛۘ�m�R��T�����o�<�cP
�nLh��F�m�~W��"q"<w8�x�)��kz��0^"r�a6Y�S� �L��x����Ӊ9{� �^8֜uJ�K6��p*{� ���Y*��7�}���@1�����b�����nU8o
�ޟ/<���vIV      �      x��}��;nd|�)6_�!�_���L�������H5uب���1_]�$�?Ţ���#?����������K�|r���������)�K��d�������Q��L�����#��!J.��ڟ<9E���PG����A�?�G�e�5��8�g�!%[�������q'ʲ%��H��AA?���5M��ZG��L�a�'��.�y�̮�)Arڛ-�E��A9�����`��N��B�|HO�8�uA�D3?�t1��m����c��t�������D�dvp䧰��t�[�Xj�p�Jyt�8 �'�k!�om�d-D/�|Rd4G����;�m���J	b���.D�_���da�a�駾ҋ}���E2�zZ>ō�n8o3��j�_��!2��Y�i�
vC��E��?sF�҇���,bnfIZ�oۏ%O#]���ȟuL{5�r0���B�������$Os�<���/�[\5��w�^rur�|�����͈��]����:=ӽ��$�-�s��cg��B�ګN�P�ٯ�z�[��q:%�؟�;�E/y*?3�ߏ5�F��e�o1�}��!�VE/���Q���<���C�G�C��U䲞Vi;R�/�;��i<�D� ����O&dX����F�Z���姾��~!�w�� 6=Ixz�W�r�f��X��>�Hy:ɘW������})�g�-p@4
��@j�����^���|0Z��:��x�
)��~,��Y�'����D��P?G�_�HO%y�y �~�2�
���5W���X�}�λ���j/���t�"2rP���Hv����5��E��4��x_l��=(2�yͺ������MJ��F�E_���I���ΰ�r�a!��K[�@�iG<��yzƇ�b���ݎTHa�VR�1	 ��A���� �<�ۻ.!l�}�g҇���{�"YO%�N/z� ��Ry	���^G�D�^r!�6Co��"���P߄w��@eX�_�<�|�;�W�^��D����,R5�:'�z�qy"���"�w-�z>�>�t�����GD�?��&mC�{'� s��j�yo��]W#1#:�;)O&�cZ��dO}�e'�C��VB6���e��?_�tS1>>!�Jo��)DxX�tA&.�|Q�Y��L1h臂�/�H����wt�+\�%��ݪQ�LrI�<���;�3�6HG�v�,/q�5dm��Ar�5ѿ"^B<�(׆D\�T/Je���zat����t�C���� 2�Ο�CJZ��θAZ��z#[E8�dI|�9 p���o�DK$����y?/z����_����"�ki�I,P,/�����g���_��%۵=����9���D�ԥ�? ��FsТO�_�(��mI�����I�q�2'���Ip�Ӌ�<���J�ѭ�}�(�rz����9fݟh��y�3/ٻ�h�^��[��R��n���v��l�q�e���.K���b�Q���|W�_L(� t	]��#j� ��%���*�Ť.Wn����]D��LINw���:(z|��B�&�[�T����(_���B8G.S�kK�y?��)ķ������0>���B�$��S�h�M8�H7E���H�F��!݄{Q���W}XO"\mlK�@�ӛXY��#�"M�tyՊ���œ�w��J7���D~��o*��.y�F)�EnB ���R<6��g��%/���������KIv�N���2��0�XN�8�v#�DJ�"�B��%}�HN���*ֿ����Pm}�a��g_���EyQ�v��Q��J@iNS��3װ��/<�l�/�8���%�(���"5�F�,1ᵌ ?�o���z*Bj��_���^D*��b�Ճ�����Ӊ�^���A��^� WK�����1!�T!7���)���%�}����?�v|NZC���Hv�B��V!0�)e:�Q�g�ւ�xZ�Ȼ�Tq[H0�����Ɠ42�4��D��/�h�SL_�B����QhG�8v~���<�.N�"�4�1��_=k���}��N9����\��/m ��Q'5c�&r,
��h���'����\�|sP���c��Hܳ���xf��'NQ#��?��fթv�h.���[�2�wu��ە�7�>�~";��tR6��¬�	hw-|����V�YI���(G��~.��e]P���ӗ�R".)��bxJ�A� �N���q^��
��~�v$�t�ƚ�VBqW�2��}��),�XR���!CaT�`/je�#D�p�X�2��
�x��S7�EG$�E�j���$��G����{s˒e=�h��|�kypV���?��������e	w-4�d��H	I��kj�Q��1��t`ƾ�I��Y�<0��5=�x����KH��4B��@��W?�\$�mOh�!��	H�b6/ 5Z�L�a��h�䇙�H�k1�G[�#��`��	���.^q�0����IlM ���Q���#Lv��,;S@�S��ZK�w����@�?���4S�����P����()7�^�_�	k�JrZ�H���m��T�Q�^SH�'ph���R-��G��l�ǚ���u�_�af�0�uj�P��g�1��������R�#D-�����؜������:3M�S�����W�1�rM7`��o���qEݵD��F��OB��/�Ll��{�R��G��-�1��@=�CS�|��$3y��J9_�扞Q��}ܽP��ʽ3��ܽ��RL��m�*-�M�^0�L5ʬ�4��_�X�kq�>:m,���x��^��i���ο��`�b����>�2bBi����Ҟ�z\����xۨd�"�^�����/F�F�Y���Dm3���;Bz&��j} 5f��3a�N >�"��7�����ƅ2�\G��	E�|}A��&��,��O{��a��2��%`ܩ�Q���"_�Q3H|���΅?_D!M��݋ՋWz5����{y�.�B�`@E���oRi�־�&&��s��?��b����,#��Mf�H��ERݩ��d��ZLE��dNB�\�B�c�x�Ũ�S�g��7F�:�ᴎ{[8U�6��~��V�v��	�ߦ��jg[�:��Y��w1����鬛_��Q��x�|m�����AJ�{d�K̻{��ߍ���҈Eܭ����sh��e�}�b��6W����t�L6ՓfW��B㨆]��oiC��wSl��ot�[���m��z	h{��t��e�li6d)���6�oVw��J2��~��(���q1f����e��M��(�C�Yi�\v�-e�±�z$�bbp�ʹ;ӆ*��{5������n��d�XǙnE)��Rᩜ����@�3;�19�hu=��w�T�5����܍���Jv�OV�#_ ���~�>�3_�P��|^4Lm��D�6�y�X�e�-TҘ=�����%S���+�\�a���/�?�q1����<L��� �����J��Y�
�%�{�D����Ϡ���KG�f�l�
J6y�z�ɯ�B�������,�1J���jr"F]�M5��1s�� 3�f���(���*EŜ=ȸ���� L������u¢�� �\uY;�[3/2Z�݉0�nV�v		F�6a�/���Fv����b�&:j �L�!^��;8ū�u<���v�xv=S��	;�yY�a�N�)C]�J�x:1�M^Rz�=����]��33O��D]5*�1\F��e����{ML��M4���+mZkFV�>���B�xR�����>-D��Ki�?��]��gQ�믺�!��Z@�S�5btW�Y7$=(�E���֫Hd���l!�?wF��7Wl��a�r���xz�&"̦5�LHSě���8�3��d��CQ����;�,��zXKwN�2�fJ3g��4{u��g�!�}��������p���}�w�:��T�ԕ����-�!vI��M�z&�EO}���'4�X�g)ٕ�Jy2˸@jOc��ym����4�����E�3Dm�J����5ȴɘ��p�����    $�8F����}���e4znq��A�{.x�)2���Q5-��̳��=���B�Q�r�Hݓ}y�1�z%|���䲮\ڶ@@]�s{S������l��dSKf6e"�߸Ei	��e�R@-���r�d�(�UdA/����t��F�*��w��7Ĵ���!���:N)����y�|N渢RwR��}x�Q?
hzz�
?�R����E�@��b��{%�m!�� �S]"���ʊ^��/��7���;�i�� A>�2L
1�\W���]�Ez��^z�Y��8�'�D���\����#�<��:�	�h���~�
+��S�lD�>	e�����MR�B�}�j���i2�d��R��D[	սV�Q�0���;u�E*�������^|}xY���L<Ѱ�az�z쎱/4Q�"aX~5BȖ
�Ac��R�5���1o��W�<�>�����ĳ�ldG���\ny;���p�Q>��V0�o�����y�I_Hu��水'�;�J@)�a��iD�f���������s-�l{@d��go�ƾS�W썈\3Hu�PV���Dۊ�a>*_��޵���UMe��aa݁��;Jj�6\�a�&D���]("����#�|��꼧�8z�7w�$�zy]S���	�a�-^�Ӎ1�8��>5a���/���'�J����X�qGu�GXFf6�Q��~�1�u+g7����<�7��lz����T},����w@��25�E��)m�ߘ:��z3���dYLu�� ��Q���U��X���U.��_C�� ��_'�5��,c���u�QF�zqW$��R�����8����y¶��wn\�x2�NBY������)EXLW/����fz��_���+� 5I��	`��KG�/
-.� �!�����
9=����r�[$T�/��U�^i�J�����+0��~՟����DV�V��T�8�I+���P施�6o�wY��=�}LC^O�Y�����ؽl1	C�A�gxր�%	%���ߔ
1=<��j�.��=�1�GO^���a��sU/�a�~�n��-~��b��B��N"���Q��lP1q�ɋ�=��mG���jz�Ŀd���3������r����6�a�k�+�� ��q��V�ٴ�"���q} Y)�
Ꝛ�S=5�ys{+r\r�%o����?�;�������&	%�*f��pvH-33�oT��z{q�U�3{8f�}�Q-���H�T��(^��a�	����A�^��)2�&Λj�{+�?���Lkݼ �ӹZ��ߑy�(����Y��nJ����v��O�^��R�D����S�.�����]^�\�&�Y!�:�i���@��Bt�L"/�(���Ej#�[pV#z�|���dוS�Ո~�9�� ���ʈ-0��Fh@l؈��K-�*|��+?y��
�ݸ?�؊�&�ڜ�A��Eu�v�ީwP��9 �C�R�O�?0���Q���jSoӋ�J�f�ۀRJX�gT�FLC@(O}�j4����:�+Hx8�q��WM�c����u�̝FW��a�zf���WPH0�Z��E���?��Z���-Ճ��#���~���=&
��W_�rL�{�{d�'!��[���Ƞ��b≹��$$[_x�1&�ef�/h��x�e�~���⼱��K/O~�H9&8`7�V�$����/L�Z��+aZ1�V�Q=k��`��P�S�8��4N�i#�h612�t���'�_�7����kf[r5ݼ�ٞrN�.~�� �X�p�x�V�<��"J�cڴL;DMe~��S1�V��A��p�� �0c*�G	�g�:��'__ ���*�M�7�?�s�^�����B�J�L�ު��o�7��k'9(��u�}�H�G/S(Jg�eڥ3
Cm�B�������/��i^1���Z��ۃ��-U2�	j���/��%�y�P���ȥ4a�FI�;�$^Gh����!��N�N�Ϙ��� ������B��5�΋(��û�f�}�p�*"���y�괃�h���VDY{F�(�3�E��(��q����cuP>i�i �i1c�+ֳ�G�<]L��.�<x*'s��ăR��SӺ4��p�OF���Wܒ7�Ϙ�叟F�/L��1��a��M��v2��l����c֝G�f�������w��Z�O�@HX�����كOB) �D�ٷ@v3��R��6_���oL�\)��!և�y-����SՅ�A�@΃���A&"5���p���Q�i?cZo+*H�%�ZN �E��]�B�bZ@DvըC ���|���&Qe��V\�����|�� ��L5��--`�&r���Ux�oj�íi-]$����+���a��n���,�E�lj>�^_(�;�mQao�F�MQ���6�孰���nE!�5���IyQ\N�N골�=a�o��Ԋ]��T�Z�YW/�׈�A|�Q��z9b�VHmŤy�KXw�11y��蝗��/�pY�\Q��ݍڌ��n���ֻݠ���%q���y��WO]ԃ2�'���d����4:����������&�4��(�c��h�}�Ze�4
�4Gl�v�4�L��j�o���<��XT:�h�fn9��Tz���xȤ�J�����$��>��e�IՓm���WL喝�HO"e�({��D�նO�A�!�X7κ���Rh=��=��+��_��hҚ+j�%�����trp�VmIB�M6L�|Q>����Ӄ��1n-�� U��G��a�@���"V��P���l�	�U��j��F�Ǵn��"d�������Q��Z��xłDt�I �3Q�^��R���;�.���Ƿ��3�R<��SI�uBw@fK�o� 6�6�0�>���"��;�a1�:����Zz�h���C0Sa �a;���JZ�I0p�/��Ԭ�hl��b��`;�:ǫA<�^(����mb#U��t��e��X6�9�l]K�<g��#���<>�w�L=o�(����C6�S�~O���R��N�V�S�&�y5�|���f�w�������Q?d��rv=���MD�	�z|#Hv�oY4�Q�^^�@��P2�U�ѿۿ��d�Oܓ�O��!�^������=57���rB����!W>��'/��ҷ�J^+����j�YݷZy�TQ*�Z*�$��[L�(�5��'�,#���j��dmLO��8��=a�g0q�
ݒ��W�'̽�!��o�QO�j��8s.��ўlJ��rw.�6��4���fv�h�$����c�hC{�	����\�_q�V�Ϣ��$�&F���?����ƓY �y%���6I`���~w1�<�p1뾘���tS�k7�-�H©6��^N�J&�Xi�^Mn��&KEA1]��Y{֥>h�2hWI��3�ޚ�̉u1��&j=�@�� �� Y�4�	�̑ZzC"�7�>�\���$��������F���bcH5?��.�A(�3��7�ܜPbw<Xzb�)��Kh�0�ψ�K�3ZƪCm�� #{�Y{�����`���A��bn�;�~�9w0w�>�}/f����W������c8X���O��`��(	�Z���"���1��a.��;jdX�^�����f]^�ODg;8|9�Kuע7�@�ԑ��.�_�Bt`@�K+�w�P�BD>4Ή�b6t�/;o$�a��M=�ײZ,���ru�i>9�|��upvy/1�z���/H������k~-�O����K������}X��\�O�½.�_0�����n�{���w���:&ޮ���R�)T)�/��ⴐ�����(���x�E�P5�P��礩"u#��f���^w��Ϳ{��`j���8-��?tc��ٛ�?*���A�,ɧ�E�qkJsע9K�v?��`���۝a�_;�|#�d�*�if��،Ҁ��`Q���_���i4!�W�:�/��V��ػI�����q���kX�=������B3p��d��'蓑P�πB�s��wf��U�G1���z��� ��?�    ���?(q@!	�� 4����ZX�:�d.BW ]�Ce/�YNs��ZSf:��g9�#�Vh��������Qs7�R��t��;@�R_-��zܚ���g�Ԏ>�)B�s��J[	���qdOt�!$�j,���i^��D��&E�@�8���w�^D�x�N��}��}|�I:�`���^��˭��X��{HZ�O�I;h}2����r��$�2�J^�?��$�ۋ{���*�Z}��f�z0*d�}�b��1x��~�(w]��3,j�p�6�naH8�4��g����������q6o���e1">�"[j���A�M{N���2h���^�7L���4F�����W3���A���0�/��ͬ�Z#5��\0cO�K�F���{đ��k��g�L�� ~5�M��L,�f�8�w`��&q-�(�q�/Hk���� �������`t�3W����=��A��g,�wm|�D�.~�dH3!Q��a������o���؈A�1�]�p´C�3|%�%�s<*S�z`R�E�U�b����s��k�#���wU��Ҥ����reWMl?�8]$��d���Og��e�����,�<���-��paF^��+�@�r`�Q(�K��H|�s��ŗ���=(�;�RL�Q���f�����3���d�mP�G�I?\>���պS�$�d�W��f���cN~Z�Vo�'�\0��b"�$��s�f;$���?{3v�/eZ~|�k�?Z��h�祺�Sݔuy
�,Wg��02��.��L�}�kܝ���tn�Z_���	��w&�r�O𚍦�9l�n�aą�d�zz�Y�`�W\� ޑ��ӝt��&���W=�7Lq��ʛ=0XW�|3z��H��Y�E��ey�g2e����2N�W���PCh�0���#{���������kh����eO�yz��2M�ᅑ��*���ڥ���/�`����99��zf ���=��V�X*}�ɱֽ�t�o�(��ā���J��R��DL+A����|2�c@��,�Y�g��g&v�#�� w���~6��}\ƖN4�V��K�8ŋ"�3����� �A�suQ"y��}�RW��"���"�no��d�l9q�v/�|�a������57_:���d�W5�������n����X<L��fa��s=t%��e��@ZyQH�!<8��̢��Y%��.O���k�д]��Ǡ~](�|�R ��!�b�W��-�v_^7�Ͱ�`�W��z�t���[�)��I��B�oƏV��k}�Q�f���^]�<��1]��Y[��'�rp�o ys��+G�1b0�/Ps�6����h[z��g���e@����y����|P���]����� Y�����>�~�J�=���!Ka��kjnD�B���B�9 �W�|����h ����N�5��wf�� ^��j�� �%qJq�gL�\������o��7�9�'Mfrq��t�ʙv�߁�[�x��&t�(�_�C񹻠M����#٘icw����]��e�a�*f�&��`g"�{�l�+��م�=���<�R��(�4Od�A�'�?��1��Ӣ�Kpo��B<a��4^o)$��:Y�bRg�L ��Qv`[��x$�D��ϐ�P'j2f4c&�óU�ʺ39ٔ��:��ӘSmY���D�	����K�r���~�JY�춌�T'�����Iڣ��x
ћ���q�,K��'F�J���'X�-n�'Su-��cH3�`��e�C�:��rP0���S�,��g)aOc��fˇH��P���D���.��d�NfĶ���'�[e����|�b_�y��E�Pս&H��<;A~1Up'4V\�n��L�4u�j!�{5]�5Z�?zbLB��| �;A��!���q�<���Ӌ�g-L.J�A���^~��̉	�)����ރ��J�0�;\�3Y��+�\:����{�_w����Y]��������1��%W,��y��~9�0�u�z����!���B��0���%�������k.������~1׊e/ˇ*�C1v���2�<g�a%N�c
FO��ֈ ��K���D�=/��D+�Mp��㏅��^�ƒ�F��8�����L�����`�1a02�$O�_0��ȅ6�l�[{�i~mfaR�&,�%����4�C�_��bK�F�?��X�r��y�Eh7c{L��UyQ_`x�0ۿL�Q�O'ʔO��&t��0��珖A�/O��,�}�d�9���%���ߊ
iRH�z}x7��7�x�:'�pմ���
���d�v���=΍�^�`�] �|ј_�������l�x�t&s�&`5���ZnI����{��@Z��q{`��B ��q���a$V��`ho�M�-�9��S{m=��М�3m�	���sM� �4��G��u��h�Ө5�����Nr�s���%=k�I�s�ď�	�x���BC}+?v���&F� ]���r!s(-�DY����'��� �~'�7M�O?X��ru��MYn�Q�7��j����l��$�G�(yp�'e��.1�Fc9��dZ��#oQ<Ȩ�n����1��עy~�������EӳXP���^jr\��R��wW�n��5��1���ӯ$&�[?ց����y&Z�����^��~Ċ�����W��w�D��4_�1�~�e�|�r��nnn���gtX�`���<����Z�8U���B���~���������ߩ�-�&��_�Z�3~�j�r��Lˑ-�&l�Jkf�ƢE�?�H#L��Z0��?�|ͯ8ū����)�2x&{NQ���?�j��ː�P�&�'�%��<%��)Rq�y��Z�~��z��eN�j(���Pu�BO#��q^Ք�Bi�6���	���b�����q���0��Jv�2/0�I(>��)� U'�� �g����z����<+�R$�OZ�j>���~a��=����K�9�+�S\�H�r���� ���+̷u��B|	P[X~i;��gG 6�9���'�.N�z�f���y2���[`~kZ
 �8�*>R�ڂ80`��LG�Y7_x63}Ah�8�����u����JsF�	���>0y�ӅK�_�RC{�fuk2��O�:����C��CMs��X߈R�f҈/����ajs�Ѻ�W��W�a�W�F�M\_`�P_[÷P�C���4?]�ړ���G<g�jV�j�j��yd���ý2�����g@�Q/c5��#��ɲ�Lk�[z�zF�0ߙ��t���RV�ȿe8�QRGE��؟�g5~���,���qcD��O�Ly��䢏��f_]�S�����}3 Z�L�M�6v��vrpv��!�f{Ec�qu}�P��7������=��b�)j3�`�ь"���N	�3��q�CE���(gG�HGB1���mu��hr\�E��0y��3�fK}���M������v�G���s��.��v�𻘗q ��d�+�FgZck�\������rk��iN�����r��ݚ��e]����>U�깦Ҹ���S^���L�漥��ǃr���d��>8ℓ,���D@4��kX�C�̔s��ߜ51q�Ӝ�a�6��=)|��	!`��1R�l�%�$z��ָ��s]T7b�=n�7�&�ӎt��mXB3x���}a���u����;p�v�8��M���q-�I�2�ZՇ�����ޔ�@�c�)ɯy���y�!`g�3��ڐp�7�)��4��S��\��}M����d #���MLQ�h��
0��4+�x�vVc�ad纄]��O�3e� l���Ok+N�)�k ���xZ�����"���8}gЮ�S�@�|��*���^���xQ�s������~�%N�Yv_Ffa�Q?,٨�*i4S*���P�*���O��n��n䭁�VT��B�'{B�ԧь���]���^>��M}�E����8�[��� �2|��A�mḫjE����!ؽC�AH���~ƍ2�B�
%)'+B\8;����y8⍕(W����"e�{m�0 �  G��ь��ӼSt��j
S]�<�t���N�i�3��k��'��?���n��e=�z�6n�U0j_q\�=��;r{
ӥ����{�܀Vެ@I`"��8sOt�i+��TN�<����T�ɮ�x���������EO}��ܟjë�����3y�M��uP�V�CP�;K���n�m�)؊3�F��ǝ�F��P�� �c�0�T�Dr���,�>0�+�����@�j���`|�����QT��ym���L���"�4G�MBU��
O�r��_&Mn]q���"����Ӣ��)�&D ϱ5�\'ٍED�י~w�9��ˁI@��0˓:f����X)	D¿�����e� *��n�ݽ�&S�S�v� ���gU���)J5���ґ�j�C�E)
$����kL�RzS���8��S�'1��	��F���� ���g�$U��/��ъ�/[�>�`B����Ye�)é0b�=T����g�u�+L6�r��F�`���#�'i(�?�{Λ������>s��~��%�0݅r_?�z��zx�䁉�D���E=�,w�����HkGUə��qm�p��~|���XF@d`�gT�tS�Y8Y=	8G1a�B�S�q~�F�D���Tg��8�M���������s�6P���ٙ��Q��oN�ϿQ�EA��X������7Y�k�[��M�Q�b=����Ge���8��W�i>Tx&�Č�d/'��Ye�:&S���j(��D�j�^�U�Paj[(Ps�ԈB��XUx#,h�^�?@�K.�G3���l�u�R�F/�,����㪊9�x�bz`�#?ňa���>hS��j]�ͪ(�eQ��i���G޷��mѦ@*Ξ6qē���(]��ϙ��"4� Ł�h\O);g�aHfzl���-����h�8x{����< ��I�)}�m��R���ς�1gW#N��NO��0�_�����_���)��Z��xp�;�O'��.����q|��؍��.�B�
�ӈ�p�l�ʍf]�p�	��8�(*��HB7�S��׬��Q��Yd���a>�}���ٙO���؜b����� �������HUZ륃j�� U 2���-��07`��;�/�n�Co8BYR�;M��p"�I#,E���+��k,)7N��f�'�^00��'*�J�;-��e�*�*�so�C����1��4gĐ���[��x'�����ľ01R��`lǙ��#6����8�l��ebL@-C;}@�Cd�a\��֑��E�ֻ��N�`�� $�?+�[.,���貧�^+��4�:��i��k�~5����{�� �-�7�Q��{,�e7�Sl�&V*^
����Ve>e�.���-�na���b�zO%�1�a��~J{ӧ�a��|Y�������)�@�[0�a�N�YϠ�m�p�eAp٠ĝ�@�m<�7�X ��?��8q*��O���d���d�%(O�ԛa�:_�_���)�:M�;�B �g	��X����A���?�6Ak�@s3��7&G��t���%�X��G�y��5m[�$�,�~Ϳ���y�Z����v��ْ��`&��9��>(�ߞ*LanAG���f�*�=U{]h��EHFq;�y��b�#LYvZ�5��Ud��y��GM����Be1�x�k'?8�8��$�Z�K�r�qi b��P����)���W����:���&c�E��Fm$�h���bm�g�-�ek��a��({��h&�do88A���R<{���l��p�O��a��3���y�s�El��q���c{Q
��"DHA0jbv�;t�O3�،8~=UsV�z�cx*��M�4���Z��|Q������Py�^���6DCp)�Ǹpn�txF�#W����\{������d�A�{�ә�@Ûkf,1y�D��am��4��'g���!��({_f�r��d���T:�F}hw↨�x]��eayG���3��b%.-�*�*rɞ�ىI��Ν>��5��e*i�ܱ�ד�w����#Od��dn�j#T������<�I�X;xPv��<L���u�6������)��9�Jܖ�HL��4�5��� [�m9q���T���`�
 �w�x�'�D�S���4���ۢ� 1&4�T��6�'��$��=�avB!܌��-��M},�i�/G�Id�,�nz�q@��*���-#�-�;]äd��f��a�8���\�ف�a�&�����(�d�OpV���M�4���T�\s������w��z�C%"�S��� �-����i�SmCX������X�t���\4�#� ɈßZ+�&$��#Gnʦ�����Аu�L��,���v��@j��a���OVE��&p�A4x��ug�,����Q+U�~}P���^P��>�~/����D$�bϦ���%]����jn�<��M��F)i��5�P���a� a�${��|�y��J�aK%�R�Q>{�W�Iܷ/e�,��W�}�La�V.�@sn��X9,��3�@�c�^hc�ĺ���د�qu��4�ŵ�_���mq	�8l��/��B {�QR���FtmL�p��٣�eceZm��_�K���S���y7y�|y�ď�ӜJ0ֳ��Z�h(�J�ʀ�biq�;��qĉ0�5���=�.q�_p�݉����i%���đ;@ۄrӆ`��yP>�mE��*V'�9�'��4�1(9ǯ���*̃ ��3�I�k�-n��g6�38��G�j����0�iԵ����3w����2>lr��W����<I	k��{s��W@35]�v�x��"*�[ץ���~��v�����"�B35ɍzF���D��)E��&�ri��&'/�n�5��z�h3FFĹ�*g�BXo�x'Y]����)6bU��tkF(�~�̱�P����1��x��$�Y jL}^V�Ց���B=Ԋ
`�1"�w*�@�S�����P�\0�Ir�s�n�� �|���?�C"      �   b   x�3�4�8�+)'39�����D��� LC#]cC��?NGg	D5ƺ��
FFVF�V�&z��&�d�KS�J�RRs@*��9K�b���� P�      �   �   x���=�0��99Ev������b���9(��
*����+�:�L<UVh&�ޕ<�jO�G�4?w�Ah�� ��f��^�HP慻JۗN5���)�[��/%{�_�U��a�ҙf���(y!
�P��цJg�mu��%��� �D�q�ީ��_[�cz      x   [   x�3���K/J-��tt��!##]c]CK##+#C+S=sSCm��\F��D�eahf��0�,�1�KfbQ&���qT�+F��� vM0�      z      x������ � �      �      x������ � �      �      x������ � �      |   ]   x�3�4�tN,IM�/:�6Q����PP��R�\�� A�ܤĜĬT �љ3����Lt�u-�����LM�,,,,L���r��qqq �  �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   ]   x�3�4�t���I-IUHIU04�"Gg�h�������������������[i���2B5����&z��F�&XF������ �N$`      �      x������ � �      �      x������ � �      �      x������ � �      ~   �   x�}���0�sy
�2j䤁h�p�ĥ��c%�x�=�^�4���wА���z����jr-��h���
�аz��Ӏ�jGJi�����k}�9�����)��j�w4/�+��:�#��9R�*e&�T��8��!ߊ]��61��6���n��ኊRP�!'}�$�!�E�      �      x������ � �      �   J   x�3�4�tN,IM�/�LT0�H,�0�9:�?N##]c]##c+K+S=Cssc3m��\1z\\\ %��      �      x������ � �      �      x������ � �      �      x�3�4��O�/�(MMIU�HLN-R(�p::�b�8��Lt�u-�����LM�,�-,��JrpL����,.)JL�<�9���_�Z�a������������������)�5Xe�b���� ��/�      �   o   x���1�@D�����3l���҉֜������&�_(,��d�7�sP�7��̟yz����qغ>bź�|�:y�bh�S�^���:g<�2�Р	���J�5����̾�'      �   =   x�3�-.M,���tt��!##]c]CK##+#C+S=Sm��\1z\\\ ~      �   �   x�m�Ao�@��˯�[#���p���VC����B����/Иh��&sy��7C	��[�͞Y��)��������S�3o��(Un�a~�ӈvMsJ+N�
~��m"Fn�/Oy���a�m}W�mA@>6��2�Ù�	�=ܥ� u7f��>�p�l���*��h��PU}e�K���6	�K���{���3\�/��C�O�~|Ϋ}�΍\�nȨ�@:~�ʂ| ��a��-鿩�34M���R�      �   U   x�}��� k<}��X�;�>����"��{�Y�;�g��X��8ĭ��f�]���6+%g	%B]ֽ��`g����D���G      �   c  x���Kj$AD�]��q���v��}c�Ϥ��@W9��`��R(�a�z�<�����{�M.��E>y<�\O��ѵ~����'�g�4}15#�Oj�z�Cdd�3�4R�9��#���s�% i�@HYHe�� ��r�[%��꤉[u4Kd8A��6߷4� p��I9â�1|ӲHA�t��_Y lc]Hw�]����pH�&=�1 [do�ҍ�g�@7M�j���Hq�PzW>d,I���'��������&7��$��W�]6�ۺ�ġ[���Ζ:�ۑ�+"��+m�b߈e5�{#�yA6�����톼�^GFu~�憄�,o+92�v+P��QvdV�V`/�:�82;A����"��Ս���D��,w��f{9܈P�X��I�>�uD�����QGYmt��x����1˻�?>=�LoZO�vK�8rݒ�[�������k��&gkk[��i �S*�,<�P��R�jd>?�M?VQX�ǳeÏ���-�1�O���.]"���F�B{���Gң�`{�2��Cٜk� �=A�~6�[�e�(��1�?$�Ǳ��h�a0`x&�tm�j�<�M#�0������q^�k      �      x������ � �      �   �  x��YM��6=��B�B[�%yo�mRh��I{�E��[�d��@�z�����CҖ����Yd�~c�Gqf83f��/��Ǯ���d�R#����3���H�*����{��UY&�wY��������C_���Exu�����;�
�� �+-[/�~Ǭ�8�:�47��]{4��MG毣X
�ŠT�$�0���5�y�%[� S�
�1(-��=��N��^7�f[o�X8�� ��Y�$?����d�2�=t@ie�����y��Mӵd�緿�8�%3(]� /����[���7�7�l#3 e�&���s����+x�����7u�
\������6=���V����q��G�茡��:�r`��@)��mP�f{y�&u���
c��\3Z���w��w����ǜ�d)��IMi��]���{u�sH��IQ��֥
M�]�R�ҡ$�P�:T����G��]}�����,(�@�{a�{���M��d?ĻW�&J@)[���w�����U��P�3�)n����	�����M��oz���wh<U�\�MɀC;�W��
�g@)7�֙�7�l�/�4y0�D�U)�Hkgg�Ӏ�a�C)ω�d��^�dl�*VRb:�r�X�{ӎ�z���6cs�ʚ�'Ӱ$�;��R�X�X>5��6�~ݼ��]ᕎ�,u6A	H�[���8~nֽV�@�z�~g�Rg�Gá���W�L��E�qx���R�i^��F/|�P�ĵ73#�ǡT0�lS�������iAD&Q��
�+]�P��9��]�3K:y� 5v_9�
���+��O����aZԁ���r��^���Ah���bX�kˡTH�j��}�U;l�{g$Fy-m�i��":sl�}���Q�:�&a%h�JEy����r�#�D㵴�j��n����,R���T�W֋MW,�d}���4��c[|�ڀ��B(y���br蹍������rӸV.��n�ѡ~^�|H
oY�\�0��Y.>7�ػ;pY���X��!��� �]�]�"���c��Y��Z��_��2|�|Mw���%��/+�_���5�n*p�oz6�A�,�Ҽ$�w:�]�i�i�`�a���0��r��콆�"z/���J^�[!�|ٱ��Ŕ8���f��+#����M(ڝAJ�a��Aof���AEP���_$#0�Ƹ[;z��d����H��0��#9a�T?��!9`O�<g{M�Z�,�T
�|��0��z��p�$j�Ft�h� �J��)m��WHK�<��7�x�nw-�"*�G�DD���� �ח�;��ح�¬h(�:%��ß�N��G6���}��C�J��3,�#.��E�^��re�#��Jܛ{�dV�V����8_��i�t����>k�Q��*�B�~�S0�"_���u����g���xs_q�}N|����Y=�E�Z��2�����&'CҴ����0fvb�z�0,���EN�/����	��	v��?�� ��4:�R���X�M�D���(P��v��*-Wivl����Q�g2Ի_��6<����4%رnQ6��/�د�:���+F�؄ס�X%�A��]%ϪU}���cm�Ro��t�J(�Y�e�f�TD{�]���>q�"���\�DPb�hQ���vAf�!�J^���8�.�;�d�u
���$Tr�[qʆɾ;6{�Y�5��x�;X,[�r3˔�?����/Ux�P*���ϵ��&��R:v�2�iu�;f�;���;!*Q,Ȯ�����_�N�      �   �  x��XA�![�S�}�'������'����@�J�N=���OV�1N���J��5�����}��sY�o-��^3�,�S�M�\�;�
T6ѡ*7Lk�W�*��JK�Hs��LP�u�� �F�R3��!��H���D��]���6*^�T����5��pA�7Be�աă�d$�h!ѭ^.(�BbKm0\�?8P)�w��j��ϴ~�%����5!���:��y�~WT�J�����렢9��5TԋbrkA�+�#��W�Hc��nz"[Fy�hK�8�-#����ԉ��JE\u�L�
�XB�H��D���WTt�Fx�)���q%�]
%T��#"�)�xP�%u"&Z�*US'�P3��BcM����u������kD]n{ƪ�~D���@p-4:ϛ�xbA�+4z�3��Q��*a���0P�sm�q췋�?�Jq� Pi�������J��8��@�%$��D�t�ei��	��Ҩk���^a�5Z?�`Z_Ѳ���L�т+�/KJa��@ŗ%%���G���ߘn�+G���ߘ�p�~��%c����O��|E���?�@x�T|d(15�A�gR"�;�p*�J$}P�A�c�2I?�>�x�W&"&�w�1���@�]j���P��nz�r����O�����j#<ap�*.��c����@�]V��}gʂ��@�/����)�*>+a/���@��b%��`YQU�L������{Y�k^��Ee������u��Ee���g��~s�ʰ�(Kp�uz���g�
���1�d�`Y����	��:�̼����Ae�=���NDL�q���'�:�̺c��`���r��'�`�,�u���:�b�fS�T�,>��%�pYQ�����kºfԵ�RBpAG��^y/K�\ח�[T|E�A��{�k�������ko��\��&��EU%�
����l�܅�xk~�U-������s�����r�ʪ����^��Q���[�k���}������3W�����%"� �g!      �   J  x���Kn�0���)�/���٥N�M]i�U6�E
�0$�@�t��u��,��@��3�?�C�ad�Խ��MG�O��|K�������|�Û��aY��gwQx�.�_4I9Y�^����\�qP$	��W�!I#�#l�
�<(��A�d~]i�aRm���G�n�`%ߛ֭+�6��Q�Ad����3Y��� �p��e�R���4&��e��Y��RTz��C�6K��d[��N����6KS�=��d��1���
i�4#+U�s��Z#«�V�d)<�U��r�1�hJt�X,D1��0��7���j]�w}&��$ס{h6K'�վU��45�h���&�6�q^�fY��֕z �`H^�QX�q\A�G�PIVQD��z㤬�%�����B�!�0:�q� Q{����m����m(����|�$$�p�H�la�)��ɛ`/wNl�)@R2\��b���s]�2H��V���NQ��ax���.�]|1���D�G|i�q�,�<�]��m����9$�I;�fz<��e��������)>h�q�
e
-�o��a���]0���m�u嶮�H
���e�;�|��<n�E���5e�+ד^��>�ᩎ��b�M��a��a��&��w'ĝ�X+��߇
f����e��I�V����a��=\=�PW�<%��Ûi�j�6}qlN��Ŕ�c�Q���Gd�[Jpw�T�ZY��`}!A`|�=z@�:��R3�>w�j��<�-��RC\ݭ3�ެ��U'Ɛ��d)̳�I��n���$��D ��ժ�XTfnw��5֣�):%�,}�����"i�      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      t   Z  x�u��n1����D>��B�F�6JrU�2�Zڵ�1���w��M$H�f<��a�	�HE9���Ѯ���;���#wTL���isx4T��R��͠{X��`�s�&}w}��1T���FM��y�r���3=.m�J���\@}0Bky��u��8�5�ӭ?vÐr�c���iv��0d<E^�V���	�)p���B�u�hGP��{7����#bQ���pP�h�*@�!��%�%e@N�V
N.|��Q�dBJէޠ8�b�Hڪ�.��[��	qE��6�a�Ro��=-Ju`�1�O����Hp�wI�v��7�>^�����jK���>�O�R�� �gg��x��~�y��s},�l��L���:�M�Y�������#�6��N��U��g>���	�w`�$i�*�4��(B˘� z��:�4���+��$x��~Ac��*T����߯ ����ѥ�FsuI���g����C�k$=�q;���K:p�G!���f�pF�k��Ѧ�?Sg^��_�`��)K��}�-;>�*(.*�SF
B�����v<8���H���ee��qEjv�W:D���Ո���L&� q1��     