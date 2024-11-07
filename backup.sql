--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2024-11-06 17:01:48 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 18609)
-- Name: boutique; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.boutique (
    id_boutique integer NOT NULL,
    nom character varying(100) NOT NULL,
    adresse character varying(255),
    ville character varying(100),
    pays character varying(100),
    code_postal character varying(10),
    email character varying(100) NOT NULL
);


ALTER TABLE public.boutique OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 18614)
-- Name: boutique_id_boutique_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.boutique_id_boutique_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.boutique_id_boutique_seq OWNER TO postgres;

--
-- TOC entry 3679 (class 0 OID 0)
-- Dependencies: 218
-- Name: boutique_id_boutique_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.boutique_id_boutique_seq OWNED BY public.boutique.id_boutique;


--
-- TOC entry 219 (class 1259 OID 18615)
-- Name: historique_de_gain; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.historique_de_gain (
    id_historique integer NOT NULL,
    date_gain timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_lot integer,
    id_user integer
);


ALTER TABLE public.historique_de_gain OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 18619)
-- Name: historique_de_gain_id_historique_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.historique_de_gain_id_historique_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.historique_de_gain_id_historique_seq OWNER TO postgres;

--
-- TOC entry 3680 (class 0 OID 0)
-- Dependencies: 220
-- Name: historique_de_gain_id_historique_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.historique_de_gain_id_historique_seq OWNED BY public.historique_de_gain.id_historique;


--
-- TOC entry 221 (class 1259 OID 18620)
-- Name: lot; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lot (
    id_lot integer NOT NULL,
    description character varying(255),
    valeur numeric(10,2)
);


ALTER TABLE public.lot OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 18623)
-- Name: lot_id_lot_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lot_id_lot_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.lot_id_lot_seq OWNER TO postgres;

--
-- TOC entry 3681 (class 0 OID 0)
-- Dependencies: 222
-- Name: lot_id_lot_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lot_id_lot_seq OWNED BY public.lot.id_lot;


--
-- TOC entry 223 (class 1259 OID 18624)
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id integer NOT NULL,
    status boolean NOT NULL,
    libelle character varying(100) NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 18627)
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.role_id_seq OWNER TO postgres;

--
-- TOC entry 3682 (class 0 OID 0)
-- Dependencies: 224
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- TOC entry 225 (class 1259 OID 18628)
-- Name: ticket; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ticket (
    id_ticket integer NOT NULL,
    code_ticket character varying(10) NOT NULL,
    date_validation timestamp without time zone,
    id_user integer,
    remis boolean DEFAULT false,
    status boolean NOT NULL
);


ALTER TABLE public.ticket OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 18632)
-- Name: ticket_id_ticket_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ticket_id_ticket_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ticket_id_ticket_seq OWNER TO postgres;

--
-- TOC entry 3683 (class 0 OID 0)
-- Dependencies: 226
-- Name: ticket_id_ticket_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ticket_id_ticket_seq OWNED BY public.ticket.id_ticket;


--
-- TOC entry 227 (class 1259 OID 18633)
-- Name: utilisateur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utilisateur (
    id_user integer NOT NULL,
    nom character varying(100) NOT NULL,
    prenom character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    mot_de_passe character varying(255) NOT NULL,
    role_id integer,
    date_de_naissance date,
    sexe character(1),
    status boolean NOT NULL
);


ALTER TABLE public.utilisateur OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 18638)
-- Name: utilisateur_boutique; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utilisateur_boutique (
    id_user_boutique integer NOT NULL,
    id_user integer,
    id_boutique integer
);


ALTER TABLE public.utilisateur_boutique OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 18641)
-- Name: utilisateur_boutique_id_user_boutique_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.utilisateur_boutique_id_user_boutique_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.utilisateur_boutique_id_user_boutique_seq OWNER TO postgres;

--
-- TOC entry 3684 (class 0 OID 0)
-- Dependencies: 229
-- Name: utilisateur_boutique_id_user_boutique_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.utilisateur_boutique_id_user_boutique_seq OWNED BY public.utilisateur_boutique.id_user_boutique;


--
-- TOC entry 230 (class 1259 OID 18642)
-- Name: utilisateur_id_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.utilisateur_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.utilisateur_id_user_seq OWNER TO postgres;

--
-- TOC entry 3685 (class 0 OID 0)
-- Dependencies: 230
-- Name: utilisateur_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.utilisateur_id_user_seq OWNED BY public.utilisateur.id_user;


--
-- TOC entry 3480 (class 2604 OID 18643)
-- Name: boutique id_boutique; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boutique ALTER COLUMN id_boutique SET DEFAULT nextval('public.boutique_id_boutique_seq'::regclass);


--
-- TOC entry 3481 (class 2604 OID 18644)
-- Name: historique_de_gain id_historique; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historique_de_gain ALTER COLUMN id_historique SET DEFAULT nextval('public.historique_de_gain_id_historique_seq'::regclass);


--
-- TOC entry 3483 (class 2604 OID 18645)
-- Name: lot id_lot; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lot ALTER COLUMN id_lot SET DEFAULT nextval('public.lot_id_lot_seq'::regclass);


--
-- TOC entry 3484 (class 2604 OID 18646)
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- TOC entry 3485 (class 2604 OID 18647)
-- Name: ticket id_ticket; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket ALTER COLUMN id_ticket SET DEFAULT nextval('public.ticket_id_ticket_seq'::regclass);


--
-- TOC entry 3487 (class 2604 OID 18648)
-- Name: utilisateur id_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur ALTER COLUMN id_user SET DEFAULT nextval('public.utilisateur_id_user_seq'::regclass);


--
-- TOC entry 3488 (class 2604 OID 18649)
-- Name: utilisateur_boutique id_user_boutique; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur_boutique ALTER COLUMN id_user_boutique SET DEFAULT nextval('public.utilisateur_boutique_id_user_boutique_seq'::regclass);


--
-- TOC entry 3660 (class 0 OID 18609)
-- Dependencies: 217
-- Data for Name: boutique; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.boutique (id_boutique, nom, adresse, ville, pays, code_postal, email) FROM stdin;
\.


--
-- TOC entry 3662 (class 0 OID 18615)
-- Dependencies: 219
-- Data for Name: historique_de_gain; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.historique_de_gain (id_historique, date_gain, id_lot, id_user) FROM stdin;
\.


--
-- TOC entry 3664 (class 0 OID 18620)
-- Dependencies: 221
-- Data for Name: lot; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lot (id_lot, description, valeur) FROM stdin;
\.


--
-- TOC entry 3666 (class 0 OID 18624)
-- Dependencies: 223
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (id, status, libelle) FROM stdin;
1	t	client
2	t	admin
3	t	employe
\.


--
-- TOC entry 3668 (class 0 OID 18628)
-- Dependencies: 225
-- Data for Name: ticket; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ticket (id_ticket, code_ticket, date_validation, id_user, remis, status) FROM stdin;
\.


--
-- TOC entry 3670 (class 0 OID 18633)
-- Dependencies: 227
-- Data for Name: utilisateur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utilisateur (id_user, nom, prenom, email, mot_de_passe, role_id, date_de_naissance, sexe, status) FROM stdin;
13	Barca	Life	med@outlook.fr	$2b$10$LN5D7Iave4.W.dWfKT2Q4eXpzOWG.q7/5Gt/V./UAX7YepfxpyF6e	1	1940-12-12	H	t
14	ok	ok	ok@outlook.com	$2b$10$MOJU1alnjA/J2LOs5zXGi.eOneRqvqGjUOjZSedLX3GiXvKQMVlcW	1	1999-01-01	H	t
15	Barca	Life	aa@outlook.fr	$2b$10$hkJDP4.0hXGrMOxzFcz95.JMReImO9.dBGMfLxCKOgb03J6KkdXia	1	1999-12-12	H	t
16	o	o	med@outlook.frd	$2b$10$qYUSYxGApw0KCZn/QfaiUOkC2SGoOfwtnsdlNSJGWwE/HKwOI3hIK	1	1999-12-12	H	t
\.


--
-- TOC entry 3671 (class 0 OID 18638)
-- Dependencies: 228
-- Data for Name: utilisateur_boutique; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utilisateur_boutique (id_user_boutique, id_user, id_boutique) FROM stdin;
\.


--
-- TOC entry 3686 (class 0 OID 0)
-- Dependencies: 218
-- Name: boutique_id_boutique_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.boutique_id_boutique_seq', 1, false);


--
-- TOC entry 3687 (class 0 OID 0)
-- Dependencies: 220
-- Name: historique_de_gain_id_historique_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.historique_de_gain_id_historique_seq', 1, false);


--
-- TOC entry 3688 (class 0 OID 0)
-- Dependencies: 222
-- Name: lot_id_lot_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lot_id_lot_seq', 1, false);


--
-- TOC entry 3689 (class 0 OID 0)
-- Dependencies: 224
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_id_seq', 3, true);


--
-- TOC entry 3690 (class 0 OID 0)
-- Dependencies: 226
-- Name: ticket_id_ticket_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ticket_id_ticket_seq', 1, false);


--
-- TOC entry 3691 (class 0 OID 0)
-- Dependencies: 229
-- Name: utilisateur_boutique_id_user_boutique_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.utilisateur_boutique_id_user_boutique_seq', 1, false);


--
-- TOC entry 3692 (class 0 OID 0)
-- Dependencies: 230
-- Name: utilisateur_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.utilisateur_id_user_seq', 16, true);


--
-- TOC entry 3490 (class 2606 OID 18651)
-- Name: boutique boutique_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boutique
    ADD CONSTRAINT boutique_email_key UNIQUE (email);


--
-- TOC entry 3492 (class 2606 OID 18653)
-- Name: boutique boutique_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boutique
    ADD CONSTRAINT boutique_pkey PRIMARY KEY (id_boutique);


--
-- TOC entry 3494 (class 2606 OID 18655)
-- Name: historique_de_gain historique_de_gain_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historique_de_gain
    ADD CONSTRAINT historique_de_gain_pkey PRIMARY KEY (id_historique);


--
-- TOC entry 3496 (class 2606 OID 18657)
-- Name: lot lot_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lot
    ADD CONSTRAINT lot_pkey PRIMARY KEY (id_lot);


--
-- TOC entry 3498 (class 2606 OID 18659)
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- TOC entry 3500 (class 2606 OID 18661)
-- Name: ticket ticket_code_ticket_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_code_ticket_key UNIQUE (code_ticket);


--
-- TOC entry 3502 (class 2606 OID 18663)
-- Name: ticket ticket_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_pkey PRIMARY KEY (id_ticket);


--
-- TOC entry 3508 (class 2606 OID 18665)
-- Name: utilisateur_boutique utilisateur_boutique_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur_boutique
    ADD CONSTRAINT utilisateur_boutique_pkey PRIMARY KEY (id_user_boutique);


--
-- TOC entry 3504 (class 2606 OID 18667)
-- Name: utilisateur utilisateur_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_email_key UNIQUE (email);


--
-- TOC entry 3506 (class 2606 OID 18669)
-- Name: utilisateur utilisateur_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_pkey PRIMARY KEY (id_user);


--
-- TOC entry 3509 (class 2606 OID 18670)
-- Name: historique_de_gain historique_de_gain_id_lot_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historique_de_gain
    ADD CONSTRAINT historique_de_gain_id_lot_fkey FOREIGN KEY (id_lot) REFERENCES public.lot(id_lot);


--
-- TOC entry 3510 (class 2606 OID 18675)
-- Name: historique_de_gain historique_de_gain_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historique_de_gain
    ADD CONSTRAINT historique_de_gain_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.utilisateur(id_user);


--
-- TOC entry 3511 (class 2606 OID 18680)
-- Name: ticket ticket_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.utilisateur(id_user);


--
-- TOC entry 3513 (class 2606 OID 18685)
-- Name: utilisateur_boutique utilisateur_boutique_id_boutique_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur_boutique
    ADD CONSTRAINT utilisateur_boutique_id_boutique_fkey FOREIGN KEY (id_boutique) REFERENCES public.boutique(id_boutique);


--
-- TOC entry 3514 (class 2606 OID 18690)
-- Name: utilisateur_boutique utilisateur_boutique_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur_boutique
    ADD CONSTRAINT utilisateur_boutique_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.utilisateur(id_user);


--
-- TOC entry 3512 (class 2606 OID 18695)
-- Name: utilisateur utilisateur_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(id);


-- Completed on 2024-11-06 17:01:48 CET

--
-- PostgreSQL database dump complete
--

