--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

-- Started on 2022-12-23 16:58:40

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 3360 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16574)
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "usersId" integer,
    token character varying(500),
    "createdAt" date DEFAULT now()
);


--
-- TOC entry 217 (class 1259 OID 16573)
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3361 (class 0 OID 0)
-- Dependencies: 217
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- TOC entry 220 (class 1259 OID 16584)
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "usersId" integer,
    "createdAt" date DEFAULT now()
);


--
-- TOC entry 219 (class 1259 OID 16583)
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 219
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- TOC entry 222 (class 1259 OID 16594)
-- Name: urlscount; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urlscount (
    id integer NOT NULL,
    "usersId" integer,
    "urlId" integer
);


--
-- TOC entry 221 (class 1259 OID 16593)
-- Name: urlscount_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urlscount_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 221
-- Name: urlscount_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urlscount_id_seq OWNED BY public.urlscount.id;


--
-- TOC entry 216 (class 1259 OID 16566)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(55) NOT NULL,
    password character varying(100) NOT NULL,
    "createdAt" date DEFAULT now()
);


--
-- TOC entry 214 (class 1259 OID 16564)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 215 (class 1259 OID 16565)
-- Name: users_id_seq1; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq1 OWNED BY public.users.id;


--
-- TOC entry 3191 (class 2604 OID 16577)
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- TOC entry 3193 (class 2604 OID 16587)
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- TOC entry 3195 (class 2604 OID 16597)
-- Name: urlscount id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urlscount ALTER COLUMN id SET DEFAULT nextval('public.urlscount_id_seq'::regclass);


--
-- TOC entry 3189 (class 2604 OID 16569)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq1'::regclass);


--
-- TOC entry 3350 (class 0 OID 16574)
-- Dependencies: 218
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sessions (id, "usersId", token, "createdAt") FROM stdin;
1	1	e473ecd4-2816-49af-8e21-509000eb86b9	2022-12-23
\.


--
-- TOC entry 3352 (class 0 OID 16584)
-- Dependencies: 220
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.urls (id, url, "shortUrl", "usersId", "createdAt") FROM stdin;
1	{"url":"https://g1.globo.com/"}	dWLJQKgL	1	2022-12-23
2	https://www.uol.com.br/	ylka-f37	1	2022-12-23
3	https://www.terra.com.br/	Cj0q76Nb	1	2022-12-23
\.


--
-- TOC entry 3354 (class 0 OID 16594)
-- Dependencies: 222
-- Data for Name: urlscount; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.urlscount (id, "usersId", "urlId") FROM stdin;
1	1	2
\.


--
-- TOC entry 3348 (class 0 OID 16566)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, email, password, "createdAt") FROM stdin;
1	João	joao@driven.com.br	$2b$10$w6NewM7MS50d.xTBtXvcq.vMwJL.s1dmscbH352LF0TjViwgvgTBi	2022-12-23
\.


--
-- TOC entry 3365 (class 0 OID 0)
-- Dependencies: 217
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 1, true);


--
-- TOC entry 3366 (class 0 OID 0)
-- Dependencies: 219
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 4, true);


--
-- TOC entry 3367 (class 0 OID 0)
-- Dependencies: 221
-- Name: urlscount_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urlscount_id_seq', 1, true);


--
-- TOC entry 3368 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- TOC entry 3369 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq1', 1, true);


--
-- TOC entry 3199 (class 2606 OID 16582)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 3201 (class 2606 OID 16592)
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- TOC entry 3203 (class 2606 OID 16599)
-- Name: urlscount urlscount_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urlscount
    ADD CONSTRAINT urlscount_pkey PRIMARY KEY (id);


--
-- TOC entry 3197 (class 2606 OID 16572)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


-- Completed on 2022-12-23 16:58:41

--
-- PostgreSQL database dump complete
--

