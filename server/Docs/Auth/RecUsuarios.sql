CREATE TABLE public."RecUsuario" (
    "Id" integer NOT NULL,
    "IdTipoUsuario" integer NOT NULL,
    "IdEmpresa" integer NOT NULL,
    "IdContacto" integer NOT NULL,
    "IdAccion" integer NOT NULL,
    "IdUsrCreacion" integer NOT NULL,
    "IdUsrModificacion" integer NOT NULL,
    "Telefono" text NOT NULL,
    "Login" text NOT NULL,
    "Password" text NOT NULL,
    "CodigoSecreto" text,
    "Firma" text,
    "Notificacion" text,
    "EstadoBot" text,
    "CodigoBot" text,
    "Activo" boolean NOT NULL,
    "Estado" text NOT NULL
);

ALTER TABLE public."RecUsuario" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."RecUsuario_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE ONLY public."RecUsuario"
    ADD CONSTRAINT "PK_RecUsuario" PRIMARY KEY ("Id");