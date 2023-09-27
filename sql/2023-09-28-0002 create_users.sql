-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    sns_id character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    name character varying(255) COLLATE pg_catalog."default",
    birth character varying(255) COLLATE pg_catalog."default",
    address character varying(255) COLLATE pg_catalog."default",
    birthday character varying(255) COLLATE pg_catalog."default",
    age character varying(255) COLLATE pg_catalog."default",
    nickname character varying(255) COLLATE pg_catalog."default",
    gender character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    phone character varying(255) COLLATE pg_catalog."default",
    picture character varying(255) COLLATE pg_catalog."default",
    is_adult character varying(255) COLLATE pg_catalog."default",
    options jsonb DEFAULT '{}'::jsonb,
    provider_data jsonb DEFAULT '{}'::jsonb,
    email_verified_at timestamp with time zone,
    phone_verified_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_sign_in_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    blocked_at timestamp with time zone,
    deleted_at timestamp with time zone,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_unique UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;
-- Index: users_options_index

-- DROP INDEX IF EXISTS public.users_options_index;

CREATE INDEX IF NOT EXISTS users_options_index
    ON public.users USING gin
    (options)
    TABLESPACE pg_default;
-- Index: users_provider_data_index

-- DROP INDEX IF EXISTS public.users_provider_data_index;

CREATE INDEX IF NOT EXISTS users_provider_data_index
    ON public.users USING gin
    (provider_data)
    TABLESPACE pg_default;