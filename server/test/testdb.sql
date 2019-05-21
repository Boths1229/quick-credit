--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3
-- Dumped by pg_dump version 11.3

-- Started on 2019-05-20 16:05:33

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

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 203 (class 1259 OID 16688)
-- Name: loanrepayment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.loanrepayment (
    id integer NOT NULL,
    loanid integer NOT NULL,
    firstname character varying NOT NULL,
    lastname character varying NOT NULL,
    email character varying NOT NULL,
    tenor character varying NOT NULL,
    amount real NOT NULL,
    paymentinstallment real NOT NULL,
    status character varying(11) DEFAULT 'approved'::character varying NOT NULL,
    repaid boolean DEFAULT false NOT NULL,
    balance real DEFAULT 0.00 NOT NULL,
    interest real NOT NULL,
    createdon date
);


ALTER TABLE public.loanrepayment OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16684)
-- Name: loanrepayment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.loanrepayment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.loanrepayment_id_seq OWNER TO postgres;

--
-- TOC entry 2857 (class 0 OID 0)
-- Dependencies: 201
-- Name: loanrepayment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.loanrepayment_id_seq OWNED BY public.loanrepayment.id;


--
-- TOC entry 202 (class 1259 OID 16686)
-- Name: loanrepayment_loanid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.loanrepayment_loanid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.loanrepayment_loanid_seq OWNER TO postgres;

--
-- TOC entry 2858 (class 0 OID 0)
-- Dependencies: 202
-- Name: loanrepayment_loanid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.loanrepayment_loanid_seq OWNED BY public.loanrepayment.loanid;


--
-- TOC entry 200 (class 1259 OID 16670)
-- Name: loans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.loans (
    id integer NOT NULL,
    loanid integer NOT NULL,
    firstname character varying NOT NULL,
    lastname character varying NOT NULL,
    email character varying NOT NULL,
    tenor character varying NOT NULL,
    amount real NOT NULL,
    bankname character varying NOT NULL,
    accountnumber double precision NOT NULL,
    paymentinstallment real NOT NULL,
    status character varying(11) DEFAULT 'pending'::character varying NOT NULL,
    repaid boolean DEFAULT false NOT NULL,
    balance real DEFAULT 0.00 NOT NULL,
    interest real NOT NULL,
    createdon date
);


ALTER TABLE public.loans OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 16666)
-- Name: loans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.loans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.loans_id_seq OWNER TO postgres;

--
-- TOC entry 2859 (class 0 OID 0)
-- Dependencies: 198
-- Name: loans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.loans_id_seq OWNED BY public.loans.id;


--
-- TOC entry 199 (class 1259 OID 16668)
-- Name: loans_loanid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.loans_loanid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.loans_loanid_seq OWNER TO postgres;

--
-- TOC entry 2860 (class 0 OID 0)
-- Dependencies: 199
-- Name: loans_loanid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.loans_loanid_seq OWNED BY public.loans.loanid;


--
-- TOC entry 197 (class 1259 OID 16454)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    firstname character varying NOT NULL,
    lastname character varying NOT NULL,
    homeaddress character varying NOT NULL,
    organization character varying NOT NULL,
    organizationaddress character varying NOT NULL,
    age integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    status character varying(11) DEFAULT 'unverified'::character varying NOT NULL,
    isadmin boolean DEFAULT false NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 16452)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 2861 (class 0 OID 0)
-- Dependencies: 196
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2712 (class 2604 OID 16691)
-- Name: loanrepayment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loanrepayment ALTER COLUMN id SET DEFAULT nextval('public.loanrepayment_id_seq'::regclass);


--
-- TOC entry 2713 (class 2604 OID 16692)
-- Name: loanrepayment loanid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loanrepayment ALTER COLUMN loanid SET DEFAULT nextval('public.loanrepayment_loanid_seq'::regclass);


--
-- TOC entry 2709 (class 2604 OID 16673)
-- Name: loans id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loans ALTER COLUMN id SET DEFAULT nextval('public.loans_id_seq'::regclass);


--
-- TOC entry 2710 (class 2604 OID 16674)
-- Name: loans loanid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loans ALTER COLUMN loanid SET DEFAULT nextval('public.loans_loanid_seq'::regclass);


--
-- TOC entry 2704 (class 2604 OID 16457)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2851 (class 0 OID 16688)
-- Dependencies: 203
-- Data for Name: loanrepayment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.loanrepayment (id, loanid, firstname, lastname, email, tenor, amount, paymentinstallment, status, repaid, balance, interest, createdon) FROM stdin;
\.


--
-- TOC entry 2848 (class 0 OID 16670)
-- Dependencies: 200
-- Data for Name: loans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.loans (id, loanid, firstname, lastname, email, tenor, amount, bankname, accountnumber, paymentinstallment, status, repaid, balance, interest, createdon) FROM stdin;
1	1	undefined	undefined	undefined	4	40000	jdkdkkdd	25363782	10500	pending	f	0	2000	\N
3	3	undefined	undefined	undefined	4	40000	jdkdkkdd	25363782	10500	pending	f	0	2000	\N
4	4	undefined	undefined	undefined	4	40000	jdkdkkdd	25363782	10500	pending	f	0	2000	\N
5	5	undefined	undefined	undefined	4	40000	jdkdkkdd	25363782	10500	pending	f	0	2000	\N
6	6	undefined	undefined	undefined	4	40000	jdkdkkdd	25363782	10500	pending	f	0	2000	\N
7	7	undefined	undefined	undefined	4	40000	jdkdkkdd	25363782	10500	pending	f	0	2000	\N
2	2	undefined	undefined	undefined	4	40000	jdkdkkdd	25363782	10500	approved	f	0	2000	\N
\.


--
-- TOC entry 2845 (class 0 OID 16454)
-- Dependencies: 197
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, firstname, lastname, homeaddress, organization, organizationaddress, age, email, password, status, isadmin) FROM stdin;
3	sonmajkkl	Enyiokwakll	3755 diamond str	sonmahjb integrated	2t tope str	21	sonmhha@example.com	$2b$10$KlBcTg.J/r7NGuHaD1tx0.1kCJBsnTIe9OjT4DG0irAptpPkbv4x2	unverified	f
4	kenedy	iwuchi	close 3 aki	owos 	123 broad street	20	owo@example.com	$2b$10$zO/5zqUqDALIShRs9CT5re5MiqEMttT4WCWOGiZqpmQlWk1EQQQiS	unverified	f
5	Adeogo	Adejana	oniru	owos 	123 broad street	23	hardecx@andela.com	$2b$10$fr.aSG.fTNXwi8tr6tZsAuklmk4EnYemCmNSPCs0iK3GIKXy2VdBK	unverified	f
6	sonmajkkl	Enyiokwakll	3755 diamond str	sonmahjb integrated	2t tope str	21	sonmhha@example2321.com	$2b$10$KcmQia8KMqQUtGkI1A9R/.CYrMfCQ1MtKbRFAs6RWEIx8gYpAa5s2	unverified	f
7	sonmajkkl	Enyiokwakll	3755 diamond str	sonmahjb integrated	2t tope str	21	sonmhha@example232199.com	$2b$10$xsOwRbX6qYf6ZDNOBE8FdeMIhIL9JtPhsUUfZ6fUQAwrX.rkMwDZe	unverified	f
8	sonmajkkl	Enyiokwakll	3755 diamond str	sonmahjb integrated	2t tope str	21	sonmhha@example2321990.com	$2b$10$h0.yeaEF5aQph7sFqezL3u0YAGHBm.OqPBXLzDq0e7sVt8oR6Fzry	unverified	f
9	sonmajkkl	Enyiokwakll	3755 diamond str	sonmahjb integrated	2t tope str	21	sonmhha@example23219901.com	$2b$10$6ml73rLjc1oJzHovCCOQR.LWfmAoySKQLEvP1f2a6P2KIGwGe7xd2	unverified	f
10	sonmajkkl	Enyiokwakll	3755 diamond str	sonmahjb integrated	2t tope str	21	sonmhha@example232199012.com	$2b$10$IN82WBPknIARyJRGzIfCIOQKJLWWxpyHwVJjelu9Ouy8PwD3Aw2JW	unverified	f
11	sonmajkkl	Enyiokwakll	3755 diamond str	sonmahjb integrated	2t tope str	21	sonmhha@example2321990121.com	$2b$10$sdNOBg4BfvWSRK4Formq4e.xLWa7BFRdK6dByxU7b6iHXlA3t9Vsa	unverified	f
12	sonmajkkl	Enyiokwakll	3755 diamond str	sonmahjb integrated	2t tope str	21	sonmhha@example23219901210.com	$2b$10$scwRMOzZwTa80q8htBgViOyntPRQ9.EDwyv3kyaNIEYH.RUhhnk.2	unverified	f
13	sonmajkkl	Enyiokwakll	3755 diamond str	sonmahjb integrated	2t tope str	21	sonmhha@example232199012101.com	$2b$10$AjnG1AxSJWtPDHnrGmfI0OEZz1wNDPjsfcCTN4BRrmli4hXVOKGku	unverified	f
14	sonmajkkl	Enyiokwakll	3755 diamond str	sonmahjb integrated	2t tope str	21	sonmhha@example2321990121011.com	$2b$10$vtXiklE7RorXv/sRD.8Uo.sc.piW64SWKRWHtS6BEUfESUExwZY76	unverified	f
15	sonmajkkl	Enyiokwakll	3755 diamond str	sonmahjb integrated	2t tope str	21	sonmhha@example23219901210111.com	$2b$10$5Vd6ar.42qljpM3MGr3oIeouQIvFNBrFG3.fNxonCHS1YQ2PWGLqC	unverified	f
16	sonmajkkl	Enyiokwakll	3755 diamond str	sonmahjb integrated	2t tope str	21	sonmhha@example232199012101111.com	$2b$10$UhZCkep7om.cJ1QVvIxqCOnzLwfjXs3r40RArNyttCbwCIFXbbIW6	unverified	f
1	chukwuma	emmanuel	23 ere str	boths Int	123 broad street	25	boths104@example.co	$2b$10$Joh.iPtexisqiM07JzEruuErkDglZbPtQd1FRnaZf220ITtU/GK3e	verified	f
20	enemme	nskekeld	bxmsos	jdlkdlemd	klsmsls	22	amaka21@yahoo.com	$2b$10$nZopkfcgb27e7Yq9Z2doZ.aZWM5.5LrVlBKgyaZ/LQG1O17VEpwb.	verified	f
21	ejike	igboko	ugwueke	ejik ltd	ndielu	35	ejike@yahoo.com	$2b$10$eYRJltRohJmOCUsbdJ2W6.vELRwfQ7tK5Fm9CdFNQEgQ8LkHvoHpu	unverified	f
19	destiny	okun	calabar	models	calabar	20	des45@some.com	$2b$10$sNfjs50oYS05zINzt18oOOYnvR6H589mWtCEhCkCIr738tLUSR0Xi	verified	f
18	amaka	chuks	canada	vals ltd	toronto	29	amaka@yahoo.com	$2b$10$q5xNia4WyRwvIaJ.XvPuOeDOSD6L8.bV0MyCTNX8LnNx2ZsC18QCS	verified	f
17	ngozi	okorie	15 okoko re	vals ltd	34 ikorudu	22	ngo2001@yahoo.com	$2b$10$5MLCUZ5LQmOx/tN64Qw8xer.wOUH6qmb2lxly6QP/PHNasa8QsmHa	verified	f
2	kene	bryan	23 ere str	boths Int	123 broad street	20	kene@example.com	$2b$10$eSOg2n.aj2JU8pHLMcmCMu9a27j2iekFvLTMRwsyCOk6ZJLfB6KLe	verified	f
\.


--
-- TOC entry 2862 (class 0 OID 0)
-- Dependencies: 201
-- Name: loanrepayment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.loanrepayment_id_seq', 1, false);


--
-- TOC entry 2863 (class 0 OID 0)
-- Dependencies: 202
-- Name: loanrepayment_loanid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.loanrepayment_loanid_seq', 1, false);


--
-- TOC entry 2864 (class 0 OID 0)
-- Dependencies: 198
-- Name: loans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.loans_id_seq', 7, true);


--
-- TOC entry 2865 (class 0 OID 0)
-- Dependencies: 199
-- Name: loans_loanid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.loans_loanid_seq', 7, true);


--
-- TOC entry 2866 (class 0 OID 0)
-- Dependencies: 196
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 21, true);


--
-- TOC entry 2722 (class 2606 OID 16700)
-- Name: loanrepayment loanrepayment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loanrepayment
    ADD CONSTRAINT loanrepayment_pkey PRIMARY KEY (id);


--
-- TOC entry 2720 (class 2606 OID 16682)
-- Name: loans loans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loans
    ADD CONSTRAINT loans_pkey PRIMARY KEY (id);


--
-- TOC entry 2718 (class 2606 OID 16464)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


-- Completed on 2019-05-20 16:05:37

--
-- PostgreSQL database dump complete
--

