--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

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

--
-- Name: orderstatus; Type: TYPE; Schema: public; Owner: apiculturefromtn
--

CREATE TYPE public.orderstatus AS ENUM (
    'PENDING',
    'PROCESSING',
    'SHIPPED',
    'DELIVERED',
    'CANCELLED',
    'CHANGE_REQUESTED',
    'BACK'
);


ALTER TYPE public.orderstatus OWNER TO apiculturefromtn;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart_items; Type: TABLE; Schema: public; Owner: apiculturefromtn
--

CREATE TABLE public.cart_items (
    id integer NOT NULL,
    user_id integer,
    product_id integer,
    quantity integer NOT NULL,
    name character varying
);


ALTER TABLE public.cart_items OWNER TO apiculturefromtn;

--
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: apiculturefromtn
--

CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_items_id_seq OWNER TO apiculturefromtn;

--
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apiculturefromtn
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: apiculturefromtn
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying,
    image_url character varying
);


ALTER TABLE public.categories OWNER TO apiculturefromtn;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: apiculturefromtn
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO apiculturefromtn;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apiculturefromtn
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: apiculturefromtn
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer,
    product_id integer,
    quantity integer NOT NULL,
    price double precision NOT NULL,
    name character varying,
    shipping_cost double precision DEFAULT 9
);


ALTER TABLE public.order_items OWNER TO apiculturefromtn;

--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: apiculturefromtn
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_items_id_seq OWNER TO apiculturefromtn;

--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apiculturefromtn
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: apiculturefromtn
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    total_amount double precision NOT NULL,
    status public.orderstatus,
    created_at timestamp without time zone,
    username character varying NOT NULL,
    email character varying NOT NULL,
    telephone character varying NOT NULL,
    location character varying NOT NULL,
    payment_method character varying NOT NULL,
    payed character varying,
    code character varying NOT NULL,
    vip_code character varying
);


ALTER TABLE public.orders OWNER TO apiculturefromtn;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: apiculturefromtn
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO apiculturefromtn;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apiculturefromtn
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: apiculturefromtn
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying NOT NULL,
    description text,
    price double precision NOT NULL,
    stock_quantity integer NOT NULL,
    category_id integer,
    discounted_price double precision,
    image_url text,
    image2_url text,
    image3_url text,
    image4_url text,
    promo boolean,
    buzzent text,
    rating double precision,
    num_ratings integer,
    slug character varying,
    shipping_cost double precision DEFAULT 9,
    subcategory_id integer,
    vip_price double precision DEFAULT 0
);


ALTER TABLE public.products OWNER TO apiculturefromtn;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: apiculturefromtn
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO apiculturefromtn;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apiculturefromtn
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: stories; Type: TABLE; Schema: public; Owner: apiculturefromtn
--

CREATE TABLE public.stories (
    id integer NOT NULL,
    title character varying NOT NULL,
    platform character varying NOT NULL,
    url text NOT NULL,
    thumbnail text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    periority integer
);


ALTER TABLE public.stories OWNER TO apiculturefromtn;

--
-- Name: stories_id_seq; Type: SEQUENCE; Schema: public; Owner: apiculturefromtn
--

CREATE SEQUENCE public.stories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.stories_id_seq OWNER TO apiculturefromtn;

--
-- Name: stories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apiculturefromtn
--

ALTER SEQUENCE public.stories_id_seq OWNED BY public.stories.id;


--
-- Name: subcategories; Type: TABLE; Schema: public; Owner: apiculturefromtn
--

CREATE TABLE public.subcategories (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying,
    image_url text,
    link character varying,
    category_id integer
);


ALTER TABLE public.subcategories OWNER TO apiculturefromtn;

--
-- Name: subcategories_id_seq; Type: SEQUENCE; Schema: public; Owner: apiculturefromtn
--

CREATE SEQUENCE public.subcategories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subcategories_id_seq OWNER TO apiculturefromtn;

--
-- Name: subcategories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apiculturefromtn
--

ALTER SEQUENCE public.subcategories_id_seq OWNED BY public.subcategories.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: apiculturefromtn
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying,
    email character varying NOT NULL,
    hashed_password character varying NOT NULL
);


ALTER TABLE public.users OWNER TO apiculturefromtn;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: apiculturefromtn
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO apiculturefromtn;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apiculturefromtn
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: vip_cards; Type: TABLE; Schema: public; Owner: apiculturefromtn
--

CREATE TABLE public.vip_cards (
    id integer NOT NULL,
    customer_key character varying NOT NULL,
    customer_name character varying NOT NULL,
    email character varying,
    telephone character varying,
    code character varying NOT NULL,
    approved boolean NOT NULL,
    issued_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.vip_cards OWNER TO apiculturefromtn;

--
-- Name: vip_cards_id_seq; Type: SEQUENCE; Schema: public; Owner: apiculturefromtn
--

CREATE SEQUENCE public.vip_cards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vip_cards_id_seq OWNER TO apiculturefromtn;

--
-- Name: vip_cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: apiculturefromtn
--

ALTER SEQUENCE public.vip_cards_id_seq OWNED BY public.vip_cards.id;


--
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: stories id; Type: DEFAULT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.stories ALTER COLUMN id SET DEFAULT nextval('public.stories_id_seq'::regclass);


--
-- Name: subcategories id; Type: DEFAULT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.subcategories ALTER COLUMN id SET DEFAULT nextval('public.subcategories_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: vip_cards id; Type: DEFAULT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.vip_cards ALTER COLUMN id SET DEFAULT nextval('public.vip_cards_id_seq'::regclass);


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: apiculturefromtn
--

COPY public.cart_items (id, user_id, product_id, quantity, name) FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: apiculturefromtn
--

COPY public.categories (id, name, description, image_url) FROM stdin;
4	Cadre & Cire	Découvrez notre sélection de produits : tous les cadres de ruches, les outils pour le montage des cadres et les cires	https://apistore.fr/wp-content/uploads/2019/05/Cadre-Dadant-hausse-droit-Cire%CC%81-e1645717913283.jpg
11	Anti-varroa	Kill Vareo Abeille est un traitement spécialement conçu pour la lutte contre le varroa et les parasites des abeilles. Sa formule à base d’essences naturelles contribue à protéger la colonie tout en respectant la santé des abeilles et la qualité du miel.	https://api.apiculturegalai.tn/uploads/44.png
6	Emballages pour miel	Les emballages de miel sont conçus pour préserver la qualité et la pureté du produit, tout en facilitant son utilisation. Disponibles en verre, plastique ou en format "squeeze", ils allient praticité, hygiène et esthétisme.	https://s.alicdn.com/@sc04/kf/H219cd04c41384570b723b285bb0691d41.jpg
7	Matériel d’extraction du miel	L’équipement pour le miel comprend les outils indispensables à l’extraction et au conditionnement du miel, comme l’extracteur, le tamis et le maturateur. Ces équipements permettent de garantir un miel pur, bien filtré et prêt à être mis en pot dans des conditions hygiéniques	https://www.apiculture.net/11155-large_default/xkit-miellerie-gm-extracteur-6-12-ou-3-cadres-dadant-avec-moteur.jpg.pagespeed.ic.G5SZvTqVEV.jpg
1	Ruches & accessoires	Notre sélection d'articles pour acheter une ruche, entretenir une ruche et réparer une ruche.\nTous les modèles de ruche sont disponibles en pièces détachées	https://www.apiculture.net/13682-large_default/ruche-a-tenons-dadant-10-cadres-avec-hausse.jpg
5	Équipement apiculteur	Matériels nécessaires pour le management des ruches.	https://www.apiculture.net/18789/pack-outillage-apiculteur.jpg
8	Traitement & santé	Cette catégorie regroupe les compléments alimentaires et les produits attire-essaims destinés à améliorer la santé des colonies d’abeilles et à faciliter la capture des essaims naturels. Ces produits contribuent à renforcer la vitalité des abeilles, stimuler l’activité de la colonie et favoriser le bon développement des ruches.	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2024%20d%C3%A9c.%202025,%2009_00_08.png
9	Packs & promotions	Kit d’apiculture complet, idéal pour débutants et professionnels, comprenant tous les outils essentiels pour une gestion efficace de la ruche.	https://www.apiculture.net/13963/xkit-debutant-apiculture.jpg.pagespeed.ic.mUswkUH1ki.jpg
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: apiculturefromtn
--

COPY public.order_items (id, order_id, product_id, quantity, price, name, shipping_cost) FROM stdin;
18	9	30	1	10	Couvre-cadres bois Dadant 10 cadres	9
19	9	3	1	43	Housse Riche 	9
20	9	32	1	740	Extracteur 3 cadre	9
21	10	3	1	43	Housse Riche 	9
23	12	23	1	40	 Ruchette à tenons Dadant 6 cadres	9
24	13	34	1	249	Presse-miel manuel 	9
26	15	31	1	540	Extracteur 2 cadre 	9
27	16	34	1	249	Presse-miel manuel 	9
30	19	9	1	23	Enfumoir pour apiculteur	9
31	20	31	1	538	Extracteur 2 cadre 	9
32	21	33	1	928	extracteur 4 cadres 	9
34	23	27	1	2.2	Pot en verre carré (212ml)	9
36	25	9	1	25	Enfumoir pour apiculteur	9
37	25	36	1	15	Gants en cuir qualité supérieure	9
38	25	43	1	20	Masque rond 	9
39	26	79	1	75	APIVAR	9
43	30	98	1	35	Demi-combinaison d’apiculture avec masque ovale intégré	9
44	31	25	1	24	Cadre en bois	9
45	31	7	1	123	Cire de cadre 5 kg	9
46	31	17	1	10	Brosse à abeilles en nylon manche bois	9
47	31	36	1	15	Gants en cuir qualité supérieure	9
48	31	93	1	60	Enfumoir apicole LYSON en inox avec protection thermique	9
49	31	15	1	25	Lève-cadres pince	9
50	31	1	1	25	Botte apiculture 	9
51	31	99	1	85	Demi-combinaison d’apiculture avec masque rond intégré	9
52	31	66	1	24	Gants d'apiculture jaunes	9
53	31	75	1	120	Ruche en bois double hausse 	9
54	32	79	1	75	APIVAR	9
55	33	102	1	130	Promotor L Apis 1 litre	9
56	34	64	1	10	Picking de greffage icko lamelle souple avec ressort amortisseur	9
57	34	50	1	35	CHARME D'ABEILLE ABEJAR SPRAY	9
58	34	54	1	64	cadre d'elvage	9
59	35	34	1	330	Presse-miel manuel 	9
60	36	79	2	75	APIVAR	9
61	36	85	2	20	Pate jaune	9
62	37	46	2	19	Grille rein en fer	9
63	37	100	1	45	Combinaison complète locale d’apiculteur avec masque ovale	9
64	37	15	1	25	Lève-cadres pince	9
65	37	45	2	8	Grille rein plastique 	9
66	37	75	1	120	Ruche en bois double hausse 	9
67	38	97	2	170	Combinaison d’apiculteur en maille aérée	9
68	38	1	1	25	Botte apiculture 	9
69	38	36	2	15	Gants en cuir qualité supérieure	9
70	38	10	1	30	Enfumoir grand taille	9
80	45	98	1	139	Demi-combinaison d’apiculture avec masque ovale intégré	9
81	46	95	1	229	kit débutant 	9
87	50	89	8	13	Support de ruche métallique pliable	9
88	51	34	1	330	Presse-miel manuel 	15
89	52	97	1	170	Combinaison d’apiculteur en maille aérée	9
90	53	79	1	75	APIVAR	9
91	53	119	1	15	Brosse à abeilles bois	9
92	53	3	1	43	Housse Riche 	9
93	54	58	1	30	seau en plastique avec robinet 40 kg 	9
94	54	117	1	20	Lève Cadre Pince bois	9
95	54	115	10	1.5	Cage à reine blanc	9
96	54	63	1	20	Zigzages fils cadre 	9
97	54	121	20	3	Cadre plastique incassable	9
98	54	47	1	35	Charme d'abeille Abejar	9
99	54	59	1	18	Tube à piston pour marquage de reine	9
100	54	57	1	7	Pince reine	9
101	54	83	1	20	Lève-cadres multifonction 	9
102	55	78	2	109	BOOSTER BEE	9
103	55	122	3	30	Ruchette Polystyrène	9
104	56	38	1	75	Lot de 3 hausse 	9
105	56	52	2	3	Porte d'entreé glissant	9
106	56	45	3	8	Grille rein plastique 	9
107	56	18	1	20	Toit en tôle h. 80mm Dadant 10 cadres	9
108	56	86	2	13	Plateau plastique 	9
109	56	108	1	6	Fil d'acier inoxydable 	9
110	56	7	1	109	Cire de cadre 5 kg 1ere choix	9
111	57	129	1	30	Gants Professionnels d’Apiculture en Cuir	9
112	57	120	10	8	Nourriseur cadre transparent GM	9
113	57	7	1	109	Cire de cadre 5 kg 1ere choix	9
114	57	10	1	30	Enfumoir grand taille	9
115	58	142	1	55	Charme Abeilles Thomas france	9
116	59	103	2	99	Ruche complet avec demi hausse 	15
117	59	7	1	109	Cire de cadre 5 kg 1ere choix	9
118	59	95	1	229	kit débutant 	19
119	60	78	1	109	BOOSTER BEE	9
120	60	66	1	24	Gants d'apiculture jaunes	9
121	60	131	1	59	Combinaison avec Voile Intégré	9
122	61	23	1	40	 Ruchette à tenons Dadant 6 cadres	9
123	61	76	1	30	Hausse à tenons Dadant 10 cadres	9
124	61	131	1	59	Combinaison avec Voile Intégré	9
125	61	9	1	23	Enfumoir pour apiculteur	9
126	61	115	1	1.5	Cage à reine blanc	9
127	61	45	2	8	Grille rein plastique 	9
128	62	100	1	45	Combinaison complète locale avec masque ovale	9
129	62	129	1	30	Gants Professionnels d’Apiculture en Cuir	9
130	62	131	1	59	Combinaison avec Voile Intégré	9
131	62	93	1	60	Enfumoir apicole LYSON en inox avec protection thermique	9
132	62	118	1	15	Lève-cadre pour ruche	9
133	63	1	1	25	Botte apiculture 	9
134	63	62	1	65	Tarmis inox 	9
135	63	25	1	24	Cadre en bois	9
136	63	53	1	55	Transformateur soude cire	9
142	67	58	3	30	seau en plastique avec robinet 40 kg 	9
147	70	43	1	20	Masque rond 	9
148	70	121	10	3	Cadre plastique incassable	9
137	64	78	1	109	BOOSTER BEE	9
138	65	130	1	59	Pack essaims spray	9
139	66	3	2	43	Housse Riche 	9
140	66	9	1	23	Enfumoir pour apiculteur	9
141	66	133	1	30	Combnaison Demi avec Voile Carré	9
143	68	118	1	15	Lève-cadre pour ruche	9
144	68	93	1	60	Enfumoir apicole LYSON en inox avec protection thermique	9
145	68	104	1	35	Demi combinaison carré 	9
146	69	121	10	3	Cadre plastique incassable	9
149	71	144	2	4	Porte d’entrée réglable	9
150	71	75	1	120	Ruche en bois double hausse	15
151	71	57	1	7	Pince reine	9
152	71	45	2	8	Grille rein plastique 	9
153	71	134	1	5.5	Nourisseur d'entrée pro	9
154	71	100	1	45	Combinaison complète locale avec masque ovale	9
155	71	95	1	229	kit débutant 	19
156	71	36	1	15	Gants en cuir qualité supérieure	9
157	71	17	1	10	Brosse à abeilles plastique 	9
158	72	132	1	45	Combinaison  Intégrale avec Voile Carré	9
159	73	100	1	45	Combinaison complète locale avec masque ovale	9
160	73	91	4	2.5	Nourrisseur à bouteille	9
161	73	118	1	15	Lève-cadre pour ruche	9
162	73	83	1	20	Lève-cadres multifonction 	9
163	74	144	1	4	Porte d’entrée réglable	9
164	74	75	1	120	Ruche en bois double hausse	15
165	74	45	1	8	Grille rein plastique 	9
166	75	85	1	20	Pate jaune	9
167	75	115	2	1.5	Cage à reine blanc	9
168	75	153	1	20	Thym kill varreo	9
169	75	36	1	15	Gants en cuir qualité supérieure	9
170	75	147	1	45	Combinaison Intégrale avec Voile Ovale Haute Visibilité	9
171	75	83	1	20	Lève-cadres multifonction 	9
172	75	118	1	15	Lève-cadre pour ruche	9
173	75	67	1	15	Herse 	9
174	75	57	1	7	Pince reine	9
175	75	91	4	2.5	Nourrisseur à bouteille	9
176	75	55	2	8.5	block a reine 	9
177	75	17	1	10	Brosse à abeilles plastique 	9
178	75	101	1	30	MEVABEES FORT 	9
179	76	43	1	20	Masque rond 	9
180	77	150	1	35	Varroa +	9
181	78	44	1	35	trappeuse poullen plastique	9
182	79	147	1	45	Combinaison Intégrale avec Voile Ovale Haute Visibilité	9
183	80	45	1	8	Grille rein plastique 	9
184	80	145	1	3.5	Cages à reine transparentes avec bouchon	9
185	80	112	1	30	Charme Abeilles Limon – Grand Modèle	9
186	80	100	1	45	Combinaison complète locale avec masque ovale	9
187	80	29	7	1.3	pot verre 1kg avec capsule 	9
188	80	101	1	30	MEVABEES FORT 	9
189	81	82	4	25	Apiguard 	9
190	82	75	5	120	Ruche en bois double hausse	15
191	82	48	1	30	Charme d'abeille tube Tomas 	9
192	82	85	2	20	Pate jaune	9
193	82	7	2	109	Cire de cadre 5 kg 1ere choix	9
194	82	62	1	65	Tarmis inox 	9
195	83	25	2	24	Cadre en bois	9
196	83	121	1	3	Cadre plastique incassable	9
197	84	144	1	4	Porte d’entrée réglable	9
198	84	52	2	3	Porte d'entreé 	9
199	84	101	1	30	MEVABEES FORT 	9
200	85	129	2	30	Gants Professionnels d’Apiculture en Cuir	9
201	85	156	2	209	Combinaison carree d'apiculteur en maille aérée 	9
202	85	1	2	25	Botte apiculture 	9
203	86	17	1	10	Brosse à abeilles plastique 	9
204	86	9	1	23	Enfumoir pour apiculteur	9
205	86	112	1	30	Charme Abeilles Limon – Grand Modèle	9
206	86	14	1	15	Lève cadre avec crochet	9
207	86	132	2	45	Combinaison  Intégrale avec Voile Carré	9
208	87	64	1	10	Picking de greffage	9
209	87	100	1	45	Combinaison complète locale avec masque ovale	9
210	87	115	4	1.5	Cage à reine blanc	9
211	87	36	1	15	Gants en cuir qualité supérieure	9
212	87	56	1	5.5	Bloc rein plastique 	9
213	87	60	1	30	Marqueur Pour Reine Des Abeilles	9
214	87	43	1	20	Masque rond 	9
215	87	53	1	55	Transformateur soude cire	9
216	88	157	1	32	Djn soft botte 	9
217	89	43	1	20	Masque rond 	9
218	90	104	1	35	Demi combinaison carré 	9
219	91	78	1	109	BOOSTER BEE	9
220	92	89	5	15	Support de ruche métallique pliable	9
221	92	77	10	1.8	POT 290ML HEX AC DOREE	9
222	92	123	3	25	ruchette d'élevage reine plastique alimentaire	9
223	93	43	1	20	Masque rond 	9
224	94	103	2	110	Ruche complet avec demi hausse 	15
225	94	45	3	8	Grille rein plastique 	9
226	94	3	3	43	Housse Riche 	9
227	94	47	1	25	Charme d'abeille Abejar	9
228	94	73	2	9	Nourisseur cadre 	9
229	95	141	2	15	Le Charme des Abeilles tunisienne 	9
230	96	121	1	3	Cadre plastique incassable	9
231	96	134	1	5.5	Nourisseur d'entrée pro	9
232	96	53	1	55	Transformateur soude cire	9
233	96	91	1	2.5	Nourrisseur à bouteille	9
240	99	111	1	69	Pack essaims 	9
234	97	9	1	23	Enfumoir pour apiculteur	9
235	97	100	1	45	Combinaison complète locale avec masque ovale	9
236	98	89	4	16	Support de ruche métallique pliable	9
237	98	14	1	15	Lève cadre avec crochet	9
238	98	77	4	1.8	POT 290ML HEX AC DOREE	9
239	98	123	2	25	ruchette d'élevage reine plastique alimentaire	9
241	100	89	1	14	Support de ruche métallique pliable	9
242	100	52	1	3	Porte d'entreé 	9
243	100	145	1	3.5	Cages à reine transparentes avec bouchon	9
244	100	119	1	15	Brosse à abeilles bois	9
245	100	111	1	69	Pack essaims 	9
246	100	7	1	105	Cire de cadre 5 kg 1ere choix	9
247	100	85	1	22	Pate jaune	9
248	100	53	1	55	Transformateur soude cire	9
249	100	69	1	15	Lève-cadres	9
250	100	129	1	30	Gants Professionnels d’Apiculture en Cuir	9
251	100	93	1	60	Enfumoir apicole LYSON en inox avec protection thermique	9
252	100	132	1	45	Combinaison  Intégrale avec Voile Carré	9
253	100	1	1	25	Botte apiculture 	9
254	100	103	1	110	Ruche complet avec demi hausse 	15
255	101	44	1	35	trappeuse poullen plastique	9
256	101	131	1	59	Combinaison avec Voile Intégré	9
257	101	66	1	24	Gants d'apiculture jaunes	9
258	101	119	1	15	Brosse à abeilles bois	9
259	101	83	1	20	Lève-cadres multifonction 	9
260	101	146	1	35	Enfumoir Apicole – Grand Modèle	9
261	101	113	1	20	Charme Abeilles Limon – Petit Modèle	9
262	101	144	1	4	Porte d’entrée réglable	9
263	101	71	1	55	Ruchette 6 cadres	9
264	102	151	2	43	Thymol 100 gr	9
265	102	129	1	30	Gants Professionnels d’Apiculture en Cuir	9
267	104	119	1	15	Brosse à abeilles bois	9
268	104	46	2	19	Grille rein en fer	9
269	104	72	2	16	Nourrisseur bois avec seul coffre	9
271	106	127	1	39	Combinaison Apiculture Demi-Ovale	9
272	106	116	1	25	Leve cadre pince 	9
273	106	91	5	2.5	Nourrisseur à bouteille	9
274	107	97	1	209	Combinaison d’apiculteur en maille aérée	9
275	107	129	1	30	Gants Professionnels d’Apiculture en Cuir	9
276	108	106	1	35	 ruchette d'élevage reine 	9
277	108	134	2	5.5	Nourisseur d'entrée pro	9
278	108	30	1	10	Couvre-cadres bois Dadant 10 cadres	9
279	108	122	1	30	Ruchette Polystyrène	9
280	108	121	1	3	Cadre plastique incassable	9
281	108	72	2	16	Nourrisseur bois avec seul coffre	9
282	108	91	1	2.5	Nourrisseur à bouteille	9
283	108	118	1	15	Lève-cadre pour ruche	9
284	109	112	1	30	Charme Abeilles Limon – Grand Modèle	9
285	109	141	1	15	Le Charme des Abeilles tunisienne 	9
288	111	119	1	15	Brosse à abeilles bois	9
289	111	67	1	15	Herse 	9
290	111	121	1	3	Cadre plastique incassable	9
291	111	73	1	9	Nourisseur cadre 	9
292	111	53	1	50	Transformateur soude cire	9
293	112	33	1	790	extracteur 4 cadres 	9
294	113	17	1	10	Brosse à abeilles plastique 	9
295	113	80	2	10	Solution sucrée pour les abeilles	9
296	113	117	1	20	Lève Cadre Pince bois	9
297	113	120	1	7.5	Nourriseur cadre transparent GM	9
298	113	36	1	15	Gants en cuir qualité supérieure	9
299	113	85	1	22	Pate jaune	9
300	113	159	1	15	Léve cadre jaune 	9
301	113	133	1	35	Combnaison Demi avec Voile Carré	9
302	114	100	1	45	Combinaison complète locale avec masque ovale	9
303	114	134	1	5.5	Nourisseur d'entrée pro	9
304	115	121	10	2.7	Cadre plastique incassable	9
305	115	104	1	25	Demi combinaison carré 	9
306	116	98	1	159	Demi-combinaison d’apiculture avec masque ovale intégré	9
307	116	36	1	15	Gants en cuir qualité supérieure	9
308	116	9	1	23	Enfumoir pour apiculteur	9
309	117	134	4	5.5	Nourisseur d'entrée pro	9
310	117	100	1	45	Combinaison complète locale avec masque ovale	9
311	117	36	1	15	Gants en cuir qualité supérieure	9
312	117	10	1	30	Enfumoir grand taille	9
313	117	104	1	25	Demi combinaison carré 	9
314	117	83	1	20	Lève-cadres multifonction 	9
315	118	100	1	45	Combinaison complète locale avec masque ovale	9
316	118	66	1	24	Gants d'apiculture jaunes	9
317	119	88	1	450	 Promotor L Apis 5L	9
318	120	78	1	109	BOOSTER BEE	9
319	121	43	1	18	Masque rond 	9
320	121	57	3	7	Pince reine	9
321	121	146	1	35	Enfumoir Apicole – Grand Modèle	9
322	121	150	1	35	Varroa +	9
323	121	107	40	1.5	Cadre d’élevage de reine	9
324	121	46	1	16	Grille rein en fer	9
325	121	151	3	43	Thymol 100 gr	9
327	123	80	5	10	Solution sucrée pour les abeilles	9
328	124	80	1	10	Solution sucrée pour les abeilles	9
329	124	134	2	5.5	Nourisseur d'entrée pro	9
330	125	60	1	20	Marqueur Pour Reine Des Abeilles	9
331	126	129	1	30	Gants Professionnels d’Apiculture en Cuir	9
332	126	146	1	35	Enfumoir Apicole – Grand Modèle	9
333	126	17	2	10	Brosse à abeilles plastique 	9
334	126	69	1	15	Lève-cadres	9
335	126	108	1	7.5	Fil d'acier inoxydable 	9
336	126	7	1	105	Cire de cadre 5 kg 1ere choix	9
337	126	63	1	20	Zigzages fils cadre 	9
338	126	132	1	35	Combinaison  Intégrale avec Voile Carré	9
339	126	45	1	6.5	Grille rein plastique 	9
340	126	155	1	15	NOURRISSEUR EN BOIS DOUBLE COFFRE	9
341	126	91	1	2.5	Nourrisseur à bouteille	9
342	127	45	5	6.5	Grille rein plastique 	9
343	127	72	5	16	Nourrisseur bois avec seul coffre	9
344	128	83	1	20	Lève-cadres multifonction 	9
345	128	86	3	13	Plateau plastique 	9
346	128	18	2	20	Toit en tôle h. 80mm Dadant 10 cadres	9
347	128	71	2	55	Ruchette 6 cadres	9
348	128	79	2	75	APIVAR	9
349	129	150	1	35	Varroa +	9
350	129	115	5	1	Cage à reine blanc	9
351	129	85	1	22	Pate jaune	9
352	129	56	1	5.5	Bloc rein plastique 	9
353	129	60	1	20	Marqueur Pour Reine Des Abeilles	9
354	129	152	1	30	Hero bio anti-varreo 	9
355	130	98	1	159	Demi-combinaison d’apiculture avec masque ovale intégré	9
356	130	93	1	60	Enfumoir apicole LYSON en inox avec protection thermique	9
357	131	129	1	30	Gants Professionnels d’Apiculture en Cuir	9
358	131	99	1	109	Demi-combinaison d’apiculture avec masque rond intégré	9
359	131	14	1	15	Lève cadre avec crochet	9
360	131	153	1	30	Thym kill varreo	9
361	131	119	1	15	Brosse à abeilles bois	9
362	131	60	1	20	Marqueur Pour Reine Des Abeilles	9
363	132	100	1	45	Combinaison complète locale avec masque ovale	9
364	132	129	1	30	Gants Professionnels d’Apiculture en Cuir	9
365	132	1	1	25	Botte apiculture 	9
366	133	59	1	15	Tube à piston pour marquage de reine	9
367	133	64	1	10	Picking de greffage	9
368	133	56	7	5.5	Bloc rein plastique 	9
369	133	60	1	20	Marqueur Pour Reine Des Abeilles	9
370	133	45	2	6.5	Grille rein plastique 	9
371	133	144	2	2.5	Porte d’entrée réglable	9
372	133	123	1	25	ruchette d'élevage reine plastique alimentaire	9
373	133	115	3	1	Cage à reine blanc	9
374	133	165	1	21	Lève-cadre et pince cadre multifonction	9
375	134	59	1	15	Tube à piston pour marquage de reine	9
376	134	45	2	6.5	Grille rein plastique 	9
377	134	64	1	10	Picking de greffage	9
378	134	144	2	2.5	Porte d’entrée réglable	9
379	134	56	1	5.5	Bloc rein plastique 	9
380	135	101	1	30	MEVABEES FORT 	9
381	135	59	1	15	Tube à piston pour marquage de reine	9
382	136	57	1	7	Pince reine	9
383	136	59	1	15	Tube à piston pour marquage de reine	9
384	136	64	1	10	Picking de greffage	9
385	136	115	5	1	Cage à reine blanc	9
386	136	50	1	34	CHARME D'ABEILLE ABEJAR SPRAY espagne	9
387	136	45	1	6.5	Grille rein plastique 	9
388	136	56	1	2.5	Bloc rein plastique 	9
389	137	123	2	25	ruchette d'élevage reine plastique alimentaire	9
390	137	115	10	1	Cage à reine blanc	9
391	137	60	1	20	Marqueur Pour Reine Des Abeilles	9
392	138	104	1	25	Demi combinaison carré 	9
393	138	165	1	21	Lève-cadre et pince cadre multifonction	9
394	138	93	1	60	Enfumoir apicole LYSON en inox avec protection thermique	9
395	138	142	1	55	Charme Abeilles Thomas france	9
396	139	119	1	15	Brosse à abeilles bois	9
397	139	115	1	1	Cage à reine blanc	9
398	139	93	1	60	Enfumoir apicole LYSON en inox avec protection thermique	9
399	139	100	1	45	Combinaison complète locale avec masque ovale	9
400	139	47	1	24	Charme d'abeille Abejar	9
401	139	144	4	2.5	Porte d’entrée réglable	9
402	139	23	1	45	 Ruchette à tenons Dadant 5 cadres	9
403	139	46	2	16	Grille rein en fer	9
404	140	132	1	35	Combinaison  Intégrale avec Voile Carré	9
405	140	123	2	25	ruchette d'élevage reine plastique alimentaire	9
406	140	165	1	21	Lève-cadre et pince cadre multifonction	9
407	140	56	3	2.5	Bloc rein plastique 	9
408	140	52	3	3	Porte d'entreé 	9
409	140	42	1	15	Masque caree 	9
410	140	36	1	15	Gants en cuir qualité supérieure	9
411	141	37	1	200	Extracteur de miel économique 2 cadres	9
412	141	117	1	20	Lève Cadre Pince bois	9
413	141	146	1	35	Enfumoir Apicole – Grand Modèle	9
414	142	112	1	30	Charme Abeilles Limon – Grand Modèle	9
415	142	69	1	15	Lève-cadres	9
416	142	67	1	15	Herse 	9
417	142	70	1	460	Maturateur inox miel fond plat 100 kg	15
418	143	72	4	16	Nourrisseur bois avec seul coffre	9
419	144	31	1	460	Extracteur 2 cadre 	9
420	144	67	1	15	Herse 	9
421	145	144	5	3	Porte d’entrée réglable	9
422	145	76	2	30	Hausse à tenons Dadant 10 cadres	9
423	145	80	2	10	Solution sucrée pour les abeilles	9
424	145	29	20	1.3	pot verre 1kg avec capsule 	9
425	145	122	1	30	Ruchette Polystyrène	9
426	145	44	1	35	trappeuse poullen plastique	9
427	146	37	1	200	Extracteur de miel économique 2 cadres	9
428	147	37	1	200	Extracteur de miel économique 2 cadres	9
429	147	121	20	2.7	Cadre plastique incassable	9
430	147	162	1	13	Tapis propolis 	9
431	147	115	2	1	Cage à reine blanc	9
432	147	134	1	5.5	Nourisseur d'entrée pro	9
433	147	57	1	7	Pince reine	9
434	147	165	1	21	Lève-cadre et pince cadre multifonction	9
435	148	37	1	200	Extracteur de miel économique 2 cadres	9
436	149	37	1	200	Extracteur de miel économique 2 cadres	15
437	150	113	1	20	Charme Abeilles Limon – Petit Modèle	9
438	150	23	1	45	 Ruchette à tenons Dadant 5 cadres	9
439	151	132	1	35	Combinaison  Intégrale avec Voile Carré	9
440	152	30	1	10	Couvre-cadres bois Dadant 10 cadres	9
441	152	72	2	16	Nourrisseur bois avec seul coffre	9
442	152	134	5	5.5	Nourisseur d'entrée pro	9
443	152	85	1	22	Pate jaune	9
444	152	26	1	15	Plateau Ruches 	9
445	152	55	2	8.5	block a reine 	9
446	152	18	1	20	Toit en tôle h. 80mm Dadant 10 cadres	9
447	152	71	3	55	Ruchette 6 cadres	9
448	152	155	2	15	NOURRISSEUR EN BOIS DOUBLE COFFRE	9
449	153	36	1	15	Gants en cuir qualité supérieure	9
450	153	132	1	35	Combinaison  Intégrale avec Voile Carré	9
451	154	45	1	6.5	Grille rein plastique 	9
452	154	30	1	10	Couvre-cadres bois Dadant 10 cadres	9
453	154	72	1	16	Nourrisseur bois avec seul coffre	9
454	154	55	2	8.5	block a reine 	9
455	154	134	7	5.5	Nourisseur d'entrée pro	9
456	154	71	3	55	Ruchette 6 cadres	9
457	154	155	2	15	NOURRISSEUR EN BOIS DOUBLE COFFRE	9
458	154	85	1	22	Pate jaune	9
459	155	48	1	27	Charme d'abeille tube Tomas 	9
460	155	67	1	15	Herse 	9
461	155	14	1	15	Lève cadre avec crochet	9
462	155	52	4	3	Porte d'entreé 	9
463	155	103	1	110	Ruche complet avec demi hausse 	15
464	155	17	1	10	Brosse à abeilles plastique 	9
465	156	37	1	200	Extracteur de miel économique 2 cadres	15
466	156	67	1	15	Herse 	9
467	156	55	3	8.5	block a reine 	9
468	157	57	1	7	Pince reine	9
469	157	37	1	200	Extracteur de miel économique 2 cadres	15
470	157	55	2	8.5	block a reine 	9
471	157	115	2	1	Cage à reine blanc	9
472	158	156	1	209	Combinaison carree d'apiculteur en maille aérée 	9
473	159	157	1	32	Djn soft botte 	9
474	159	100	1	45	Combinaison complète locale avec masque ovale	9
475	159	69	1	15	Lève-cadres	9
476	159	36	1	15	Gants en cuir qualité supérieure	9
477	160	78	1	109	BOOSTER BEE	9
478	161	84	3	12	Robinet en plastique avec écrou	9
479	162	37	1	200	Extracteur de miel économique 2 cadres	15
480	163	42	1	15	Masque caree 	9
481	163	77	11	1.8	POT 290ML HEX AC DOREE	9
482	163	29	30	1.3	pot verre 1kg avec capsule 	9
483	163	158	1	25	Chapeau d'abeille Mode Chapeau de cowboy apiculteur	9
484	164	63	1	20	Zigzages fils cadre 	9
485	165	100	1	45	Combinaison complète locale avec masque ovale	9
486	166	31	1	460	Extracteur 2 cadre 	15
487	166	29	20	1.3	pot verre 1kg avec capsule 	9
488	167	144	10	2.5	Porte d’entrée réglable	9
489	167	60	1	20	Marqueur Pour Reine Des Abeilles	9
490	167	52	10	3	Porte d'entreé 	9
491	168	76	2	30	Hausse à tenons Dadant 10 cadres	9
492	169	37	1	230	Extracteur de miel économique 2 cadres	15
493	170	37	1	230	Extracteur de miel économique 2 cadres	15
494	171	37	1	230	Extracteur de miel économique 2 cadres	15
495	172	121	20	2.7	Cadre plastique incassable	9
496	172	29	20	1.3	pot verre 1kg avec capsule 	9
497	172	69	1	15	Lève-cadres	9
498	172	46	2	16	Grille rein en fer	9
499	173	121	20	2.7	Cadre plastique incassable	9
500	173	29	20	1.3	pot verre 1kg avec capsule 	9
501	173	67	1	15	Herse 	9
502	173	46	2	16	Grille rein en fer	9
503	173	15	1	25	Lève-cadres pince	9
504	174	156	1	209	Combinaison carree d'apiculteur en maille aérée 	9
505	175	97	1	209	Combinaison d’apiculteur en maille aérée	9
506	175	79	1	75	APIVAR	9
512	178	156	1	209	Combinaison carree d'apiculteur en maille aérée 	9
519	180	164	1	22	Enfumoir chinois petit modèle	9
520	180	14	1	15	Lève cadre avec crochet	9
521	180	134	2	5.5	Nourisseur d'entrée pro	9
522	180	119	1	15	Brosse à abeilles bois	9
523	180	104	1	25	Demi combinaison carré 	9
524	180	108	1	7.5	Fil d'acier inoxydable 	9
525	180	25	1	24	Cadre en bois	9
526	180	121	1	2.7	Cadre plastique incassable	9
532	182	121	30	2.7	Cadre plastique incassable	9
533	182	3	1	34	Hausse Riche 	9
534	182	100	1	45	Combinaison complète locale avec masque ovale	9
535	182	94	1	2.5	Cuillère à miel en bois – Doseur de miel	9
536	182	36	2	15	Gants en cuir qualité supérieure	9
537	182	131	1	59	Combinaison avec Voile Intégré	9
556	194	45	5	6.5	Grille rein plastique 	9
557	194	144	5	2.5	Porte d’entrée réglable	9
558	194	108	1	7.5	Fil d'acier inoxydable 	9
559	194	121	5	2.7	Cadre plastique incassable	9
560	194	131	1	59	Combinaison avec Voile Intégré	9
561	194	14	1	15	Lève cadre avec crochet	9
562	194	36	1	15	Gants en cuir qualité supérieure	9
563	194	7	1	105	Cire de cadre 5 kg 1ere choix	9
564	195	83	1	20	Lève-cadres multifonction 	9
565	195	59	1	15	Tube à piston pour marquage de reine	9
566	195	119	1	15	Brosse à abeilles bois	9
567	195	144	1	2.5	Porte d’entrée réglable	9
568	195	73	1	9	Nourisseur cadre 	9
507	176	156	1	209	Combinaison carree d'apiculteur en maille aérée 	9
538	183	45	1	6.5	Grille rein plastique 	9
539	183	63	1	20	Zigzages fils cadre 	9
540	183	97	1	209	Combinaison d’apiculteur en maille aérée	9
541	183	78	1	109	BOOSTER BEE	9
508	177	37	1	230	Extracteur de miel économique 2 cadres	15
509	177	17	1	10	Brosse à abeilles plastique 	9
510	177	67	1	15	Herse 	9
511	177	155	1	15	NOURRISSEUR EN BOIS DOUBLE COFFRE	9
513	179	77	5	1.8	POT 290ML HEX AC DOREE	9
514	179	115	1	1	Cage à reine blanc	9
515	179	144	5	2.5	Porte d’entrée réglable	9
516	179	123	2	25	Nucleus en plastique alimentaire 	9
517	179	60	1	20	Marqueur Pour Reine Des Abeilles	9
518	179	121	5	2.7	Cadre plastique incassable	9
527	181	45	1	6.5	Grille rein plastique 	9
528	181	144	1	2.5	Porte d’entrée réglable	9
529	181	38	1	63	Lot de 3 hausse 	9
530	181	23	1	45	 Ruchette à tenons Dadant 5 cadres	9
531	181	121	2	2.7	Cadre plastique incassable	9
542	184	97	1	209	Combinaison d’apiculteur en maille aérée	9
543	184	129	1	30	Gants Professionnels d’Apiculture en Cuir	9
544	185	115	20	1	Cage à reine blanc	9
545	185	55	2	8.5	block a reine 	9
546	186	42	1	15	Masque caree 	9
547	187	69	1	15	Lève-cadres	9
548	187	3	2	34	Hausse Riche 	9
549	188	34	1	320	Presse-miel manuel 	15
550	189	31	1	400	Extracteur 2 cadre 	15
551	190	32	1	450	Extracteur 3 cadre	15
552	191	89	3	16	Support de ruche métallique pliable	9
553	192	150	1	35	Varroa +	9
554	192	131	1	59	Combinaison avec Voile Intégré	9
555	193	144	20	2.5	Porte d’entrée réglable	9
569	196	144	2	2.5	Porte d’entrée réglable	9
570	196	73	1	9	Nourisseur cadre 	9
571	196	121	4	2.7	Cadre plastique incassable	9
572	196	95	1	229	kit débutant 	19
573	196	45	1	6.5	Grille rein plastique 	9
574	196	17	1	10	Brosse à abeilles plastique 	9
575	196	30	1	10	Couvre-cadres bois Dadant 10 cadres	9
576	196	115	1	1	Cage à reine blanc	9
577	196	38	1	63	Lot de 3 hausse 	9
578	196	90	1	5	Nourrisseur cadre transparent 1kg	9
579	196	18	1	20	Toit en tôle h. 80mm Dadant 10 cadres	9
580	196	24	1	15	Nourrisseur couvre-cadres	9
581	196	86	1	13	Plateau plastique 	9
582	197	62	1	50	Tarmis inox 	9
583	197	58	1	30	seau en plastique avec robinet 40 kg 	9
584	197	52	5	3	Porte d'entreé 	9
585	198	107	10	1.5	Cadre d’élevage de reine	9
586	199	32	1	450	Extracteur 3 cadre	15
587	200	37	1	200	Extracteur de miel économique 2 cadres	15
588	201	45	10	5	Grille rein plastique 	9
589	202	37	1	200	Extracteur de miel économique 2 cadres	15
590	203	1	1	25	Botte apiculture 	9
591	204	33	1	600	extracteur 4 cadres 	9
592	204	62	1	65	Tarmis inox 	9
593	204	79	1	75	APIVAR	9
594	204	29	30	1.3	pot verre 1kg avec capsule 	9
595	204	57	1	7	Pince reine	9
596	204	14	1	15	Lève cadre avec crochet	9
597	204	99	1	109	Demi-combinaison d’apiculture avec masque rond intégré	9
598	205	23	2	45	 Ruchette à tenons Dadant 5 cadres	9
599	205	59	1	13	Tube à piston pour marquage de reine	9
600	205	45	2	5	Grille rein plastique 	9
601	205	42	1	10	Masque caree 	9
602	205	155	1	15	NOURRISSEUR EN BOIS DOUBLE COFFRE	9
603	205	77	5	1.8	POT 290ML HEX AC DOREE	9
604	206	31	1	400	Extracteur 2 cadre 	15
605	206	131	1	59	Combinaison avec Voile Intégré	9
606	206	81	1	8	Soufleur d'enfumoir 	9
607	206	36	1	15	Gants en cuir qualité supérieure	9
608	206	67	1	15	Herse 	9
609	206	133	1	35	Combnaison Demi avec Voile Carré	9
610	207	62	1	50	Tarmis inox 	9
611	208	32	1	450	Extracteur 3 cadre	15
612	209	93	1	60	Enfumoir apicole LYSON en inox avec protection thermique	9
613	209	83	1	18	Lève-cadres multifonction 	9
614	209	28	5	2.5	 Pots en verre carré 250 g (314 ml) 	9
615	209	119	1	15	Brosse à abeilles bois	9
616	210	38	1	63	Lot de 3 hausse 	9
617	210	18	3	20	Toit en tôle h. 80mm Dadant 10 cadres	9
618	210	26	3	15	Plateau Ruches 	9
619	210	72	3	14	Nourrisseur bois avec seul coffre	9
620	211	46	4	15	Grille rein en fer	9
621	212	37	1	200	Extracteur de miel économique 2 cadres	15
622	212	224	7	3.5	Porte d’entrée réglable	9
623	212	17	1	10	Brosse à abeilles plastique 	9
624	212	43	1	15	Masque rond 	9
625	212	29	20	1.3	pot verre 1kg avec capsule 	9
626	213	1	1	25	Botte apiculture 	9
627	213	133	1	35	Combnaison Demi avec Voile Carré	9
628	213	36	1	15	Gants en cuir qualité supérieure	9
629	213	134	2	4	Nourisseur d'entrée pro	9
630	213	164	1	25	Enfumoir chinois petit modèle	9
631	214	76	2	30	Hausse à tenons Dadant 10 cadres	9
632	214	89	3	16	Support de ruche métallique pliable	9
633	215	58	1	30	seau en plastique avec robinet 40 kg 	9
634	215	37	1	200	Extracteur de miel économique 2 cadres	15
635	215	29	42	1.3	pot verre 1kg avec capsule 	9
636	215	45	3	5	Grille rein plastique 	9
637	216	46	3	15	Grille rein en fer	9
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: apiculturefromtn
--

COPY public.orders (id, total_amount, status, created_at, username, email, telephone, location, payment_method, payed, code, vip_code) FROM stdin;
9	951.6700000000001	PENDING	2025-08-04 10:39:21.93975	Amir	abdelbassetgalai3@gmail.com	55716454	Bembla 	cod	check	57820-44375-56024-21667	\N
10	59.17	PENDING	2025-09-06 06:46:08.768134	Test	abdelbassetgalai3@gmail.com	55716454	Bembla	cod	check	17856-65289-58017-28627	\N
12	55.6	PENDING	2025-10-14 09:28:41.903344	Abdelbasset Galai	abdelbassetgalai3@gmail.com	55716454	monastir	cod	check	32326-33849-57446-29988	\N
13	304.31	PENDING	2025-10-17 16:16:36.419523	Mohamed amine boukhalet	amine.boukhalet@gmail.com	53445555	Malek centre - centre urbain nord	cod	check	39664-99924-23180-41116	\N
15	650.6	PENDING	2025-10-24 14:53:21.173088	Abdelbasset Galai	abdelbassetgalai3@gmail.com	55716454	MONAS	cod	check	40086-86320-30701-57892	\N
16	304.31	PENDING	2025-10-24 14:55:15.678252	AMIRAA TEST 	jomaaamira9@gmail.com	54673163	bkalta 	cod	check	12660-30122-49485-72478	\N
19	31	PENDING	2025-10-27 07:57:55.34195	Abdelbasset Galai	abdelbassetgalai3@gmail.com	55716454	monastir	cod	check	73045-66954-68916-45086	\N
20	648.22	PENDING	2025-11-10 07:57:30.284389	Abdelbasset Galai	abdelbassetgalai3@gmail.com	55716454	Bembla	cod	check	42593-98093-11271-51226	\N
21	1112.32	PENDING	2025-11-16 22:08:19.556595	galai abdelbasset	abdelbassetgalai3@gmail.com	55716454	monastir 	cod	check	16615-95268-66916-99677	\N
23	10.618	PENDING	2025-12-01 13:13:26.629803	Abdelbasset Galai	abdelbassetgalai3@gmail.com	55716454	Bembla	cod	check	98613-31338-96604-99801	\N
30	43	PENDING	2026-01-14 12:09:21.350649	Moez riahi	riahimoez@gmail.com	99089162	Medjez el beb	cod	check	31279-97324-40382-94144	\N
31	519	PENDING	2026-01-15 12:31:39.605821	Bilel Saad	bilelsaad0888@gmail.com	28858401	Tozeur	cod	check	73602-81597-26973-75207	\N
33	138	PENDING	2026-01-20 20:22:43.162212	Oueriemmi naoufel 	oueriemmi.naoufel@gmail.com	29181619	Bureau emploi de zarzis 	cod	check	72590-13941-78620-15745	\N
34	117	PENDING	2026-01-23 09:32:03.295788	Arroum heni	Heniarroum71@gmail.com	50962583	Lethleth-korba	cod	check	69796-56083-88840-14068	\N
35	338	PENDING	2026-01-23 13:19:42.199898	الطاعر واجه	tahar_ouaja@yahoo.fr	58359588	قابس الجنوبية-قابس	cod	check	45589-29706-32834-72870	\N
50	113	PENDING	2026-02-12 16:05:35.600185	Beldi achraf	achrefbeldi1@gmail.com	97627956	Bousalem 	cod	check	20136-30479-28706-96424	\N
55	308	PENDING	2026-02-15 22:50:04.308415	Baligh Mohamed	baligh.mohamed@gmail.com	23611017	7110 nebeur ,el Kef	cod	check	79799-43960-91400-38156	\N
52	179	PENDING	2026-02-14 20:15:29.48939	Haykel sahli	hkl.sahli@hotmail.fr	20205820	Beni khalled	cod	check	39648-69330-80028-37841	\N
46	238	DELIVERED	2026-02-09 19:50:35.192727	Gouider MSALLEM	msallem.g@gmail.com	25452028	Carthage, Tunis 	cod	check	82678-48480-84732-41884	\N
45	148	DELIVERED	2026-02-09 13:05:28.061773	Riahi moez	riahimoez@gmail.com	99089162	Medjez el beb	cod	check	39994-20658-15413-35431	\N
38	433	DELIVERED	2026-02-02 12:43:30.951655	Amel assoudi 	assoudi.amel27@gmail.com	26469404	Café montana rue 14 janvier Kasserine 	cod	check	62761-17742-97638-14378	\N
37	252	DELIVERED	2026-01-28 19:44:10.392145	Mohamed Ayari	ayarimouhamed38@gmail.com	94904762	Cité Brikel Battan Manouba	cod	check	34591-31291-64282-82787	\N
36	198	DELIVERED	2026-01-26 10:06:39.64198	محمد بنحسن	mouhamedbenhassen5@gmail.com	27812993	Tbag Korba 8070	cod	check	92844-62109-93903-13884	\N
32	83	DELIVERED	2026-01-20 20:12:13.34269	Naoufel	oueriemmi.naoufel@gmail.com	29181619	Bureau emploi de zarzis 	cod	check	11384-75357-36121-24763	\N
26	83	DELIVERED	2026-01-05 19:51:41.370441	Anis BEN MEFTEH 	anis.benmefteh1978@gmail.com	96914908	Tunis	cod	check	77043-34290-80099-42793	\N
25	68	DELIVERED	2025-12-25 14:46:49.098586	STE UNIVERSAL LIGHTING	NABILAYARI77@GMAIL.COM	56714571	8099 ZAOUIET JDIDI	cod	check	64444-12224-95010-41262	\N
53	142	PENDING	2026-02-15 13:16:13.970505	أحمد بنرمضان	ahmed@limamcompta.com	20446289	الجم عمارة جليوس	cod	check	65093-54176-63522-52927	\N
54	234	PENDING	2026-02-15 13:41:34.005791	Bouraoui mohamed	optimeubles.tn@gmail.com	51002211	Sidi daoud la marsa	cod	check	50068-51305-34277-19854	\N
56	266	PENDING	2026-02-17 09:53:09.925128	Bentalebrami	bentalebrami44@gmail.com	54562988	Elhaouria 	cod	check	33000-72849-35512-47896	\N
57	258	PENDING	2026-02-18 09:48:34.017429	Rhaim Mohamed Salah	rhaimmed@gmail.com	94607700	الدهماني الكاف	cod	check	78661-19680-55596-78784	\N
58	64	PENDING	2026-02-18 20:11:04.550072	Chikhaoui ali	chikhaouia46@gmail.com	22569706	Monastir massjed aissa	cod	check	15149-34544-96278-58593	\N
59	536	PENDING	2026-02-22 14:36:04.424623	Alaa Eddine H'ram	hramalaa65@gmail.com	28524693	Rouhia-siliana 	cod	check	91781-41523-51716-46579	\N
60	201	PENDING	2026-02-23 18:53:32.502069	houcem jaballah	houcemfinance@gmail.com	22099025	Kairouan	cod	check	92792-32929-88526-89338	\N
61	178.5	PENDING	2026-02-24 00:36:09.073012	Hrichi Ali	hrichiali23@gmail.com	29901270	Skhira sfax	cod	check	76233-76681-85715-51296	\N
62	218	PENDING	2026-02-24 01:06:59.070533	Ferdaous benyounes	ferdaouesbenyounes@gmail.com	25977636	Mourouj 6 ben arous	cod	check	79962-37765-58419-65074	\N
63	178	PENDING	2026-02-24 11:44:17.823535	Gharsallah Mohamed	gharsallahmohamed@yahoo.fr	23304030	El mourouj 1 carrefour medicale labo	cod	check	38367-79150-58454-23544	\N
64	118	PENDING	2026-02-24 22:34:13.883375	mediadh khedhri	mediadh.khedhri29@gmail.com	29763633	ariana	cod	check	31739-99182-43123-16286	\N
65	68	PENDING	2026-02-27 18:58:03.344494	Rached Said	rachedsaid58@gmail.com	97643747	Darbelouaer enfidha sousse	cod	check	57819-12462-42959-24978	\N
66	148	PENDING	2026-02-28 14:24:57.430767	Jamel Rhimi	jamelrhimi66@gmail.com	58865476	Kabbarya Tunisie 	cod	check	48031-38646-85543-35215	\N
67	99	PENDING	2026-02-28 16:34:51.535852	Hamza Zheni	hamzazheni55@gmail.com	54536866	Cité chebbi tebourba manouba 	cod	check	41319-19394-62749-97597	\N
68	119	PENDING	2026-02-28 21:45:11.541889	Yassin hadj amor 	yassi.jaidi@gmail.com	20786933	Douar hadj amor saouaf zaghouan 	cod	check	20169-63821-12578-63619	\N
70	59	PENDING	2026-03-01 00:55:34.916453	Miled raddaoui 	rdmiled@gmail.com	29841193	Ksar gfsa	cod	check	72107-53853-48929-40621	\N
71	455.5	PENDING	2026-03-02 06:22:50.462156	nefla aladin	neflaaladin@gmail.com	97061147	Souassi	cod	check	98591-97665-58086-63991	\N
72	54	PENDING	2026-03-02 19:59:24.939236	Imed Ayeb	ayebimed060@gmail.com	52253798	Rue 20 mars Sidi alouane mahdia 	cod	check	78592-62050-36171-16185	\N
73	99	PENDING	2026-03-02 23:55:00.099786	Mahdi ben ali	mahdibenali2013@gmail.com	21005580	Chebba مغازة الخير حومة السوسي	cod	check	18450-99807-48349-98006	\N
69	39	DELIVERED	2026-03-01 00:48:20.923347	Miled Raddaoui	rdmiled@gmail.com	29841193	Ksar gfsa	cod	check	69706-22011-80694-36348	\N
74	147	DELIVERED	2026-03-03 01:43:51.4571	nefla aladin	neflaaladin@gmail.com	97061147	Souassi	cod	check	79781-45588-52056-63845	\N
104	94	DELIVERED	2026-03-20 22:43:44.133296	Mortadha rabaaoui 	mortadha403@gmail.com	25071975	Al-Miknassi	cod	check	56356-41732-10875-15268	\N
111	101	DELIVERED	2026-03-24 09:02:06.7256	Feriel Weslati	feriel.weslati00@icloud.com	24699173	Denden manouba 	cod	check	78600-19396-27364-18822	\N
109	54	DELIVERED	2026-03-23 11:08:48.750293	Sami chabene	salut.ben.2005@gmail.com	98201988	Boumhel el bassatine	cod	check	63733-58965-21986-25724	\N
108	147.5	DELIVERED	2026-03-23 06:55:02.203677	nefla aladin	neflaaladin@gmail.com	97061147	Souassi	cod	check	53013-64208-99189-47492	\N
107	248	DELIVERED	2026-03-22 14:32:05.961319	Taieb Louhichi	taieblouhichi.yt@gmail.com	52522201	Grombalia 	cod	check	61182-99128-95607-82614	\N
106	85.5	DELIVERED	2026-03-21 18:32:32.200036	Bessem ben amor	bessemamor123@gmail.com	20970588	Mahdia boumerdes kerker	cod	check	19610-46787-66387-35237	\N
101	267	DELIVERED	2026-03-18 14:11:28.91336	Mohamed zied Naghmouchi	naghmouchizied@gmail.com	56752004	Jendouba	cod	check	25941-84774-94570-35249	\N
102	125	DELIVERED	2026-03-19 22:21:31.571233	فوزي العابد	faouzi20107@gmail.com	29348433	حي الانس سليانة 	cod	check	70582-52281-41385-25228	\N
100	571.5	DELIVERED	2026-03-18 13:58:38.345467	Nihel Ben sedrine	nihelbensedrine@gmail.com	55377502	La marsa 	cod	check	60710-17515-70997-12767	\N
99	78	DELIVERED	2026-03-18 09:56:05.613945	Fathallah	fathallaharafet6@gmail.com	27731186	Zaouite El magaiez haouaria 	cod	check	97535-53466-59949-23102	\N
98	145.2	DELIVERED	2026-03-17 21:45:48.688483	ahmed Allani	ahmedmiiii007@gmail.com	54856431	Kairouan	cod	check	47111-97790-88704-94132	\N
97	77	DELIVERED	2026-03-16 20:23:27.413792	Chayma abidi	chaymaabidi406@gmail.com	96806170	Tunis, El fattah, sidi hassine 	cod	check	78710-18246-20789-47711	\N
120	118	DELIVERED	2026-03-25 20:14:31.085562	Abidelli nabil 	abidellinabil@gmail.com	97519336	GAÂFOUR, Siliana 	cod	check	46624-12830-89222-57402	\N
121	314	DELIVERED	2026-03-26 07:41:18.874708	sabeh anis	alloaniscia@gmail.com	97961554	Citée El Ons. Le Kef. Tunisie 	cod	check	38901-69556-32205-63295	\N
119	450	DELIVERED	2026-03-25 18:40:14.980016	Jarray Abdelbasset	infojarray@gmail.com	93324407	Jouaouda sidi Abdallah belhaj, chbika, kairouan 	cod	check	91552-53516-36185-84338	\N
118	78	DELIVERED	2026-03-25 17:17:39.334235	مهدي الكسراوي	mahdikasraoui123@gmail.com	92571224	عين بوسعدية برڨو سليانة	cod	check	68569-47255-37230-74711	\N
117	166	DELIVERED	2026-03-25 14:03:08.809768	Zied amaimia	ziedamaimia20@gmail.com	93004930	Sidi aich gafsa	cod	check	31729-62458-57227-18598	\N
116	206	DELIVERED	2026-03-25 13:21:37.033341	makrem	makremzouavi@gmail.com	29525796	siliana 	cod	check	23386-94811-37908-17445	\N
115	61	DELIVERED	2026-03-25 11:21:37.168702	Samir Ben hmouda	samirbenahmed66@gmail.com	28525031	Agareb	cod	check	94608-39501-44814-43328	\N
114	59.5	DELIVERED	2026-03-24 23:43:56.377944	zarai maher	zaraimaher21@gmail.com	50313481	sidi bouzid -souk jdid - rmilya	cod	check	32627-43998-64789-30476	\N
113	153.5	DELIVERED	2026-03-24 21:36:15.231961	Kaies Grami	gramikaies2@gmail.com	22145045	Bouarada 	cod	check	17162-60690-50790-78947	\N
112	790	DELIVERED	2026-03-24 18:47:14.290791	حاتم بن محمد	hatemhichri2022@gmail.com	28867648	55 wed kharoub bouficha sousse	cod	check	16995-66984-39458-59691	\N
96	75	DELIVERED	2026-03-16 11:49:13.836326	Feriel Weslati	feriel.weslati00@icloud.com	24699173	Rue Taha houssine denden manouba 	cod	check	83317-29071-19887-96227	\N
95	39	DELIVERED	2026-03-15 15:27:18.595028	Khaled BELAID 	khaledbelaid262@gmail.com	97133205	Avenue l'olivier kalaa kebira	cod	check	83232-30386-18072-89546	\N
94	416	DELIVERED	2026-03-13 22:43:20.460547	Mouhamed Ayari	ayarimouhamed38@gmail.com	94904762	Cité Brik El Battan Manouba	cod	check	11976-39466-34437-13247	\N
93	29	DELIVERED	2026-03-13 07:34:50.172784	Askri Borni	askribo@outlook.com	27623935	Route de l'aeroport 8112 ain sobah  Tabarka	cod	check	19669-86439-23169-59648	\N
91	118	DELIVERED	2026-03-11 19:05:47.082104	Yassine Ferchichi 	yassineferchichi99@gmail.com	54546493	Mateur bizerte	cod	check	61229-16650-57634-10675	\N
92	177	DELIVERED	2026-03-11 19:56:34.440305	Ahmed Allani	ahmedmiiii007@gmail.com	54856431	Kairouan pres mosquée el gofran	cod	check	68458-91995-31554-39330	\N
123	59	PENDING	2026-03-27 21:11:09.292832	Nour	nourgayess.1989@gmail.com	50816248	El Mourouj	cod	check	29616-73815-95665-28646	\N
89	29	DELIVERED	2026-03-10 11:45:02.228253	Tebourbi Hamadi	hamadi.tebourbi.2005@gmail.com	54442390	La manouba : Al battan rue zouitina : ferme haj khlass	cod	check	82772-50674-10213-95052	\N
88	41	DELIVERED	2026-03-10 08:57:52.116683	Mohamed belhaj	mohamedhawaria10@gmail.com	29136097	Tebourba	cod	check	38132-39733-39725-98548	\N
87	195.5	DELIVERED	2026-03-10 00:16:20.265613	Maher sassi	mahercapitaine@gmail.comcapitaine	55000180	Kssibet sousse 	cod	check	22085-89599-34209-85899	\N
86	177	DELIVERED	2026-03-09 18:24:31.460976	Tamim bensmida	bensmidatamim@gmail.com	54542667	Ariana la sokra rue matar	cod	check	87188-24556-88847-29810	\N
85	528	DELIVERED	2026-03-09 08:41:38.641359	zmerli khaled	elbaha.vet@planet.tn	26730730	Sidi-Thabet ; Ariana	cod	check	81614-25806-13214-30509	\N
84	49	DELIVERED	2026-03-08 10:06:32.756427	Abdelaziz 	a.lakhoua@gmail.com	20505555	Sidi Bou Said - impasse Hassen Zmerli 	cod	check	28744-43163-69172-51867	\N
83	60	DELIVERED	2026-03-07 16:16:27.154703	محمد بن جدو	benjeddoumouhamed37@gmail.com	92895097	Béja touboursouk dougga 	cod	check	46300-51749-68580-91410	\N
82	953	DELIVERED	2026-03-07 13:34:19.689395	Aymen Bachrouch	salvafor.valestra@gmail.com	58948977	Tunis 	cod	check	60102-59336-42133-26085	\N
81	109	DELIVERED	2026-03-06 18:03:20.999945	Mohamed ali boshkati	yassine.kaab@gmail.com	24224935	Saheb el jebel el hawaria Nabeul 	cod	check	71041-63054-26768-33262	\N
124	30	DELIVERED	2026-03-28 06:45:58.366493	Chiheb bn laden 	chihebkf0@gmail.com	52014802	Bir lahfay sidi bouzid 	cod	check	33240-35795-95979-90677	\N
80	134.6	DELIVERED	2026-03-05 11:52:04.377116	Mehdi B A	mahdibenali2013@gmail.com	21005580	Chebba مغازة الخير حومة السوسي	cod	check	64840-99481-72473-90997	\N
75	236	DELIVERED	2026-03-03 09:23:16.541419	Mahdi ben ali	mahdibenali2013@gmail.com	21005580	Chebba مغازة الخير  عڨيب  حومة السوسي	cod	check	50080-26881-74302-24290	\N
77	44	DELIVERED	2026-03-04 10:29:51.314105	Houcin zouari	houcinzojari@gmail.com	22911940	Mdhilla gafsa	cod	check	28099-57873-99959-43396	\N
76	29	DELIVERED	2026-03-03 22:10:19.920022	Hamdi tha	taha.hamdi001@gmail.com	29787858	Borj el amri 	cod	check	85596-16844-81189-53648	\N
79	54	DELIVERED	2026-03-05 09:48:27.144728	Malek ghraibi	malekghraibi67@gmail.com	23575244	Béja centre vile	cod	check	49003-89830-47569-94095	\N
78	44	DELIVERED	2026-03-04 23:15:35.259147	Saidi Assem	assemsaidi08@gmail.com	27704398	Sidi smail béja	cod	check	82123-32174-54044-58422	\N
90	44	DELIVERED	2026-03-10 19:02:49.960512	فوزي العباسي	faouziabbassi78@gmail.com	53089797	شعبةالحوت سجنان بنزرت 	cod	check	42054-81132-76444-30293	\N
127	121.5	DELIVERED	2026-03-29 22:08:48.132673	Oussama ajmi	Oussamaajmi.2000@gmail.com	21538852	Souassi,mahdia 	cod	check	47004-30798-94250-34842	\N
126	291.5	DELIVERED	2026-03-29 19:30:13.559368	Charfeddine Jaouadi	charfijay4444@gmail.com	29403087	2 rue mustapha khrayef megrine ben arous	cod	check	41917-11309-86923-67040	\N
125	29	DELIVERED	2026-03-28 18:02:29.656871	Aymen Amri	Aymen_atn@hotmail.fr	20836024	Rue sidi zid l'aouina Tunis	cod	check	73098-35863-80582-77127	\N
135	54	DELIVERED	2026-04-01 15:37:30.617574	Hassen Toumi	mdevcht@gmail.com	98109049	Debosville - Tunisie	cod	check	40299-67004-96612-16269	\N
146	209	DELIVERED	2026-04-07 12:12:12.218573	Yahyaoui Abdellatif	abdellatifyahyaoui@yahoo.fr	98212011	Barrage mallegue nebeur ElKef	cod	check	86545-18446-73810-82307	\N
136	89	DELIVERED	2026-04-01 22:58:06.358065	احمد بالحاج صالح	ahmedbhs1991@gmail.com	95928511	حمام الاغزاز	cod	check	64521-40076-32323-74265	\N
134	57.5	DELIVERED	2026-03-31 22:03:48.3859	nefla aladin	neflaaladin@gmail.com	97061147	Souassi	cod	check	50304-74264-14742-10072	\N
133	159.5	DELIVERED	2026-03-31 21:14:08.192903	nefla aladin	neflaaladin@gmail.com	97061147	Souassi	cod	check	68117-48342-12594-36503	\N
132	109	DELIVERED	2026-03-31 19:46:26.916983	Nabil Sellami	sellaminabil502@gmail.com	25716498	Thibar	cod	check	46868-54982-15923-14226	\N
131	228	DELIVERED	2026-03-31 18:04:50.136907	Anas Akrimi	akrimianass@gmail.com	20286153	Mornaguia tunis	cod	check	69493-75128-50639-59534	\N
130	228	DELIVERED	2026-03-31 16:51:40.956785	Najiba abdrabah	najibaabdrabah5@gmail.com	44415569	Béja, téboursouk	cod	check	62567-31863-83578-45470	\N
128	359	DELIVERED	2026-03-31 08:46:47.805159	محمد بن سعيد	mdsmido@yahoo.com	29471147	كروسية .سيدي الهاني .سوسة	cod	check	47101-57300-59403-44730	\N
51	330	PROCESSING	2026-02-13 07:57:31.988942	nourdine mathl	clientreserveunpressearivage@gmail.com	99442724	verfier avec client	cod	check	95682-66641-19160-67399	\N
145	195	DELIVERED	2026-04-06 23:50:50.006704	Abdelmajid Djebali	abdelbali212@gmail.com	27688598	Ain Mrad Teboursouk, Beja 9040 ( a coté de Mosque Ain Mrad	cod	check	77877-42031-98177-20547	\N
142	520	DELIVERED	2026-04-05 15:21:56.833707	Bouza Houssem	bouzahoussem@hotmail.com	90497915	Hamem sousse	cod	check	22188-24317-83279-62709	\N
143	73	DELIVERED	2026-04-06 10:01:42.540388	Oussama ajmi	Oussamaajmi.2000@gmail.com	21538852	Souassi,mahdia 	cod	check	80198-32878-89332-27209	\N
141	255	DELIVERED	2026-04-04 19:51:10.742104	Abdallah bouallagui	abidalkeita10@gmail.com	92912823	Sidi bouzid centre ville 	cod	check	77914-26901-57499-69861	\N
140	161.5	DELIVERED	2026-04-04 14:59:12.233472	nefla aladin	neflaaladin@gmail.com	97061147	Souassi	cod	check	59644-48764-82410-26757	\N
137	89	DELIVERED	2026-04-03 11:50:32.206575	Hichri Hafedh	hafedhhichri7@gmail.com	22423223	Bni Mechkel boujrida korba Nabeul 	cod	check	94130-23686-75378-31715	\N
129	126.5	DELIVERED	2026-03-31 13:51:59.289915	Hrichi Ali	ali.hrichi23@gmail.com	29901270	Skhira sfax	cod	check	85343-89054-85090-81721	\N
144	475	DELIVERED	2026-04-06 16:04:52.02781	جهاد جماعي	jihedjmai2002@gmail.com	51622134	jirba houmet soug bazim	cod	check	49390-29919-63446-33259	\N
147	302.5	DELIVERED	2026-04-07 16:54:03.331908	Zekri Maher	maherzekri@hotmail.com	98500411	Route de mahdia km10 rue makbarat yaich  après mosquée  sfax 	cod	check	28911-75143-11554-66346	\N
139	241	DELIVERED	2026-04-04 12:44:28.619412	Nader Belhadj salah	naderbhsb5@gmail.com	50752753	Hammam el ghzez	cod	check	86403-95827-34936-57364	\N
138	170	DELIVERED	2026-04-03 15:41:29.747725	sami zaibi	samizaibi@gmail.com	99204595	Nefza Béja 	cod	check	33950-28927-33169-88091	\N
148	209	DELIVERED	2026-04-08 06:14:49.166312	Haithem	haithamkhlif84@gmail.com	92735920	sfax route mharza km1	cod	check	20033-90322-63589-32065	\N
158	218	DELIVERED	2026-04-12 14:02:55.956447	Nour	nourgayess.1989@gmail.com	50816248	El Mourouj	cod	check	69059-78189-40988-46972	\N
157	241	DELIVERED	2026-04-11 20:56:35.522081	Mabrouk Khalil	kmabrouk827@gmail.com	27111461	Nfidha 	cod	check	24607-72942-36644-36184	\N
159	116	DELIVERED	2026-04-12 15:21:18.888318	Guesmi marouen	guesmimarouen9@gmail.com	58044476	Centre Farah Lake , lac2 . Tunis 	cod	check	21855-43866-51405-55189	\N
156	255.5	DELIVERED	2026-04-11 13:58:15.549246	صابر الشاهد	mansourjamali@gmail.com	21922679	بوكريم الهوارية نابل 	cod	check	23607-58534-78370-12315	\N
155	204	DELIVERED	2026-04-11 11:04:43.893425	Fatma maztouri	tictakprint@gmail.com	53722722	Jerba	cod	check	29115-94044-43732-71429	\N
154	305	DELIVERED	2026-04-10 22:41:15.191217	nefla aladin	neflaaladin@gmail.com	97061147	Souassi	cod	check	63787-81988-42069-72616	\N
153	59	DELIVERED	2026-04-10 22:31:58.626163	khalifa boughanmi	boughanmi.khalifa@live.fr	98285423	Cité zitouna Tajerouine le kef	cod	check	99101-19955-94591-55343	\N
152	338.5	DELIVERED	2026-04-10 13:46:01.313592	nefla aladin	neflaaladin@gmail.com	97061147	Souassi	cod	check	99567-46494-16812-19646	\N
151	44	DELIVERED	2026-04-10 10:18:26.024362	Hafedh Abbassi	Abbassi.hafedh@ins.tn	25660870	Hajeb Laâyoune 	cod	check	86429-84280-85966-81565	\N
150	74	DELIVERED	2026-04-09 22:36:15.870608	Elyes Ezzine	ilyesezzine05@gmail.com	28483360	Bizerte	cod	check	73487-39993-13448-90802	\N
149	215	DELIVERED	2026-04-09 21:03:34.105045	سامي بلعيد 	Belaidsami45@gmail.com	98983750	القلعة الكبرى ولاية سوسة 	cod	check	24105-36201-93335-31626	\N
169	245	DELIVERED	2026-04-17 22:12:44.720007	Ounallah	karimtechnicien@hotmail.com	20335927	Beni KHL led rue jeuness	cod	check	71813-60154-38375-31129	\N
167	84	DELIVERED	2026-04-15 14:53:23.73714	Feres darouich	feres.darouich@supcom.ucar.tn	93542215	Rue bni hassen-jemmel-monastir	cod	check	13499-25053-71988-77103	\N
166	486	DELIVERED	2026-04-15 12:48:35.444815	Bani jalel	banijalel31@gmail.com	55204548	Korba	cod	check	79454-30297-60596-50751	\N
165	54	DELIVERED	2026-04-15 11:27:04.666215	Kamel Krichen	kamel.krichenihec@gmail.com	25858504	Route l'afrane km 4,5 sfax	cod	check	71231-66760-25833-36872	\N
164	29	DELIVERED	2026-04-15 07:10:14.062896	خميس الترايكي	kamustraiki@gmail.com	50751597	سليانة	cod	check	43943-99440-76443-86515	\N
163	107.8	DELIVERED	2026-04-14 16:27:43.09603	Chennaoui hedya	chennaoui.hedia.cm@gmail.com	20516910	Ben arous Mhamedia cité nassim rue antakia 	cod	check	57535-21339-11781-74574	\N
162	215	DELIVERED	2026-04-14 13:31:26.450623	Ben Jeddou Mouhamed	benjeddoumouhamed37@gmail.com	92895097	Teboursouk dougga 	cod	check	78125-61523-61959-63978	\N
161	45	DELIVERED	2026-04-14 00:26:06.791992	Charfeddine Jaouadi	charfijay4444@gmail.com	29403087	2 rue mostfa khrayef Megrine ben Arous 	cod	check	96614-11136-82635-60168	\N
160	118	DELIVERED	2026-04-13 22:52:47.301272	Mechergui dhia	mecherguidhia026@gmail.com	26289055	Sejnen 	cod	check	55040-57422-53426-95529	\N
168	69	DELIVERED	2026-04-17 17:30:35.855558	Galai Abdelbasset	abdelbassetgalai3@gmail.com	55716454	Bembla	cod	check	45073-87427-18295-78313	\N
172	136	DELIVERED	2026-04-18 21:56:44.569787	Gares Mohamed 	garesmohmmedi@gmail.com	98981843	M'saken 	cod	check	70256-67633-91087-91394	\N
177	270	DELIVERED	2026-04-20 08:45:32.675298	Jalel Hizi	hizijalel383@gmail.com	99609383	Bouderyes-foussana-kasserine	cod	check	85596-24444-66300-53806	\N
179	115	DELIVERED	2026-04-20 13:46:29.917131	ahmed Allani	ahmedmiiii007@gmail.com	54856431	Kairouan	cod	check	97086-34413-94643-40530	\N
173	161	DELIVERED	2026-04-19 08:11:31.738649	Gares Mohamed 	garesmohammedi@gmail.com	98981843	154,rue rokeb M'saken 	cod	check	59953-78234-83087-23215	\N
175	284	DELIVERED	2026-04-19 14:20:44.324277	Slim Grombalia	grombalia2023@gmail.com	21920920	Km 40 turki grombalia 	cod	check	85707-71996-85414-28974	\N
176	218	DELIVERED	2026-04-19 21:11:41.848182	Nadia khaldi	ynflystone@gmail.com	53220728	Bizerte corniche	cod	check	95274-21042-37126-92296	\N
178	218	DELIVERED	2026-04-20 09:49:20.166238	nefzi karima	saidanefzi661@gmail.com	53687752	5 rue ibn abi dhief den den municipalite den den 	cod	check	71564-60556-29691-38930	\N
180	131.2	DELIVERED	2026-04-22 09:52:05.901727	ملاك خذراني	malekhadrani@gmail.com	93668114	Mahassen nebeur kef 7110	cod	check	86926-92863-94668-54505	\N
182	251.5	DELIVERED	2026-04-22 19:26:35.017433	Boughanmi Houssem	housso1212@gmail.com	98823971	Kef centre ville 	cod	check	81216-22030-84777-72929	\N
183	344.5	DELIVERED	2026-04-23 05:51:15.543535	Nizar douiri	d.nizat@hotmail.fr	22801808	Tunis-lac 1	cod	check	49569-14921-69223-93762	\N
195	70.5	DELIVERED	2026-05-05 12:30:03.228421	Sami Nacer	samy.osch@gmail.com	97859128	Rue taher hadded chenini-gabes 6041	cod	check	48953-81056-12206-58208	\N
194	260	DELIVERED	2026-05-05 07:20:43.414806	Bilel	bilelhamdaoui1920@gmail.com	51464645	Tunis lac3 a côté de l'ambassade suisse 	cod	check	18004-76482-75347-99548	\N
170	245	DELIVERED	2026-04-17 22:22:12.721002	Ounallah	karimtechnicien@hotmail.com	20335927	Beni khled rue jeuness	cod	check	72998-53925-48495-49849	\N
171	245	DELIVERED	2026-04-17 23:50:38.061985	karim	karimtechnicien@hotmail.com	20335927	Beni khled rue jeuness	cod	check	56157-35316-10553-41432	\N
174	218	DELIVERED	2026-04-19 13:04:59.342341	messaoudi mokrane	messaoudi.mokrane1988@gmail.com	50203970	akbou wilaya bejaia algerie	cod	check	62743-98063-96042-86138	\N
181	131.4	DELIVERED	2026-04-22 18:56:36.942057	Ayman Allouch	aymanallouch@gmail.com	25102098	Sfax sidi mansour klm 10 el mansoura residence baya  	cod	check	18188-80124-43349-71961	\N
184	248	DELIVERED	2026-04-27 20:48:48.469004	Nabil Guetat	nabil.guetat@gmail.com	97269438	Route Mahdia km 2,5 Sfax	cod	check	59757-46430-98838-30540	\N
185	46	DELIVERED	2026-04-28 00:15:49.482105	Mechergui dhia	mecherguidhia026@gmail.com	26289055	Sejnen 	cod	check	79115-79185-85333-29702	\N
186	24	DELIVERED	2026-04-29 10:04:51.04043	samar abidi	samar.labidi92@gmail.com	94183416	Tunis	cod	check	23599-85393-81209-18810	\N
187	92	DELIVERED	2026-04-29 12:40:10.238528	nefla aladin	neflaaladin@gmail.com	97061147	Souassi	cod	check	76961-39394-15393-71565	\N
188	320	DELIVERED	2026-04-30 05:00:20.354113	Ben mohamed	omarmed6@gmail.com	27608563	Gabes 	cod	check	81520-94347-94433-87869	\N
189	400	DELIVERED	2026-04-30 19:22:45.309655	Chamssdine 	chamssdinelabidi@gmail.com	98176934	Carrefour Marsa 	cod	check	38166-89225-91793-28700	\N
199	450	DELIVERED	2026-05-08 11:03:44.91899	Med ammar Bellalah	mammarbellalah@gmail.com	93304633	Dar chabben el fehri , nabeul 	cod	check	37632-96203-45008-51809	\N
201	59	DELIVERED	2026-05-09 16:31:22.725036	achref benkacem	ashrefbenkassem@gmail.com	58744236	zaghoaun, zriba hammam	cod	check	27029-68049-27028-88536	\N
200	215	DELIVERED	2026-05-08 14:07:30.139063	Alaa dridi	aladaind@gmail.com	24047352	Tunis montplaisir	cod	check	82936-96750-27424-98372	\N
208	450	PENDING	2026-05-15 12:56:48.908788	temim	cherni_temim@yahoo.fr	93666988	tunis	cod	check	78531-73475-22729-87906	\N
209	114.5	PENDING	2026-05-15 13:18:15.172822	ben taieb hatem	bthattem@hotmail.fr	53255757	medjez el bab	cod	check	57790-73405-59563-74426	\N
197	104	DELIVERED	2026-05-06 13:19:39.485235	Nour Gayess	nourgayess.1989@gmail.com	50816248	Mourouj 1	cod	check	78461-60993-89392-70133	\N
196	397.3	DELIVERED	2026-05-05 16:40:22.295071	chokri ferchichi	chokri.ferchichi.carthage@gmail.com	94518215	Grand tunis	cod	check	44468-94993-41158-99541	\N
193	59	DELIVERED	2026-05-03 16:18:16.160619	Nour	nourgayess.1989@gmail.com	50816248	El Mourouj	cod	check	54256-45302-71199-82006	\N
192	103	DELIVERED	2026-05-03 15:09:15.748354	marouen belakhel	marouen.belakhel@gmail.com	53218398	Borj cedria 	cod	check	95921-93251-17466-49304	\N
202	215	DELIVERED	2026-05-09 19:10:11.032109	Bachir jlassi	zouhayra1120@icloud.com	97161814	Rahma menzelbouzelfa nebeul	cod	check	65619-71861-68017-72871	\N
191	57	DELIVERED	2026-05-01 20:25:32.088155	Samia fathalli 	fathallisamia@yahoo.fr	94294949	Tunis Lafayette 	cod	check	78729-96539-72253-79838	\N
190	450	DELIVERED	2026-05-01 13:38:37.233236	Ben chikh abdelaziz	bchikhazouz@gmail.com	29306506	Sfax ville	cod	check	27620-85095-14513-26856	\N
198	24	DELIVERED	2026-05-07 17:57:29.412648	Houcine Elhammedi	houcine.ha@gmail.com	97747081	Zaghouan 	cod	check	80178-78750-96802-85319	\N
203	34	DELIVERED	2026-05-09 20:33:57.025344	Hasni	hvtc83@gmail.com	98636864	Jendouba centre ville	cod	check	75137-17675-85777-92879	\N
204	910	DELIVERED	2026-05-11 23:16:35.182322	mohamed salah gargouri	gargouri2001@gmail.com	21617726	26. av de l ere nouvelle . el nasr 2, 1000 - tunis	cod	check	60331-74438-86433-95418	\N
205	156	DELIVERED	2026-05-12 09:05:49.670892	ahmed Allani	ahmedmiiii007@gmail.com	54856431	Kairouan	cod	check	80061-62775-29716-47131	\N
206	532	DELIVERED	2026-05-12 19:00:50.286181	HAMDI ADEL	ebf.adel@gmail.com	95084338	FOUCHANA Ben arous cité elhidhab	cod	check	40467-26277-24007-41896	\N
207	59	DELIVERED	2026-05-12 21:56:31.646984	galai	apiculturegalai@gmail.com	55716454	bembla	cod	check	86275-96974-87073-14001	\N
210	219	PENDING	2026-05-15 17:42:47.815591	Ridha ghorbali 	ridhaghorbali88@gmail.com	97367780	Siliana	cod	check	44457-75609-50669-54673	\N
211	69	PENDING	2026-05-17 19:33:35.457702	amine zidi	amin.zidi07@gmail.com	99783281	الحويض (اوتيك بنزرت)	cod	check	70085-27757-64878-96627	\N
212	275.5	PENDING	2026-05-19 19:45:28.819627	Alaa Ben saad	mcwalid136@gmail.com	48069629	بوعشير/ حمام الزريبة/ زغوان	cod	check	91650-24464-17109-98062	\N
213	117	PENDING	2026-05-21 08:04:54.425385	Ahmed Mhiri	mhiri@sac-marquage.com	29787427	Route de tunis Km 5, sakiet ezzit , sfax	cod	check	52371-14424-92974-46121	\N
214	117	PENDING	2026-05-21 09:12:14.855133	Jawhar Belaiba	jawharbelaiba1@gmail.com	22796779	La chebba	cod	check	29796-25997-88252-72892	\N
215	299.6	PENDING	2026-05-22 13:02:20.900988	Hamadi MEJRI	hamadi.mejri1@gmail.com	24012780	Bizerte	cod	check	10055-46264-21403-53709	\N
216	54	PENDING	2026-05-24 16:10:15.291667	Saidani Helmi	helmisaidani97@gmail.com	29051064	Bousalem	cod	check	59717-94388-69499-11789	\N
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: apiculturefromtn
--

COPY public.products (id, name, description, price, stock_quantity, category_id, discounted_price, image_url, image2_url, image3_url, image4_url, promo, buzzent, rating, num_ratings, slug, shipping_cost, subcategory_id, vip_price) FROM stdin;
112	Charme Abeilles Limon – Grand Modèle	Le Charme Abeilles Limon Spray est un attractif naturel spécialement conçu pour attirer les abeilles et faciliter leur regroupement lors des opérations apicoles. Sa formule à base d’arôme citronné imite les phéromones naturelles, ce qui aide à calmer les abeilles et orienter leur comportement sans stress.\n\nIdéal pour la capture d’essaims, l’introduction dans les ruches ou ruchettes, et les interventions de routine. Son format spray permet une application rapide, précise et économique.\n\n✅ Attractif efficace pour abeilles\n✅ Arôme citronné (limon)\n✅ Facilite la capture et l’installation des essaims\n✅ Utilisation simple et sécurisée\n✅ Indispensable pour apiculteurs amateurs et professionnels\n\nMode d’utilisation :\nVaporiser légèrement à l’intérieur de la ruche, ruchette ou sur les zones ciblées avant l’introduction des abeilles.	30	-4	8	0	https://api.apiculturegalai.tn/uploads/Capture%20d%E2%80%99%C3%A9cran_23-1-2026_93627_.jpeg	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_p6mkhdp6mkhdp6mk.png	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_n18lndn18lndn18l.png		t		5	33	charme-abeilles-limon-–-grand-modèle	9	\N	0
167	Combinaison ovale complet 	Combinaison ovale complète de haute qualité, idéale pour la protection lors des travaux d’apiculture. Confortable et résistante, elle assure une excellente protection contre les piqûres d’abeilles. Parfaite pour les apiculteurs débutants et professionnels.	40	15	5	0	https://api.apiculturegalai.tn/uploads/660438740_948310984832582_6855761094226281227_n.jpg	https://api.apiculturegalai.tn/uploads/661478177_948311584832522_7954591644985365841_n.jpg			f		5	10	combinaison-ovale-complet-	9	\N	0
59	Tube à piston pour marquage de reine	Tube à piston\nPour marquage de reines	13	13	1	0	https://www.mat-apiculture.fr/1334-large_default/tube-a-piston-pour-greffage-de-reine-outil-elevage-de-reine-abeilles.jpg	https://www.mat-apiculture.fr/1335-large_default/tube-a-piston-pour-greffage-de-reine-outil-elevage-de-reine-abeilles.jpg	https://www.mat-apiculture.fr/1336-large_default/tube-a-piston-pour-greffage-de-reine-outil-elevage-de-reine-abeilles.jpg	https://www.mat-apiculture.fr/1337-large_default/tube-a-piston-pour-greffage-de-reine-outil-elevage-de-reine-abeilles.jpg	t		4	19	tube-à-piston-pour-marquage-de-reine	9	\N	0
31	Extracteur 2 cadre 	L’extracteur de miel manuel tangentiel Mini est un équipement essentiel pour les apiculteurs souhaitant récolter leur miel de manière simple et efficace. Il peut contenir jusqu’à 2 cadres de corps Dadant ou 4 cadres de hausse Dadant, offrant une solution pratique pour les petites et moyennes exploitations apicoles.\n\nConçu avec une cuve en acier inoxydable de diamètre 380 mm, cet extracteur garantit une excellente résistance à la corrosion et une hygiène optimale. Son fonctionnement manuel avec manivelle latérale et système de sécurité anti-rotation assure une utilisation fluide et sécurisée.\n\nÉquipé d’un couvercle en plexiglass pour un contrôle visuel facile, d’une cage inox robuste et d’un robinet de vidange, il permet une extraction propre et rapide du miel.\n\nComposition :\n\nCuve inox fond plat Ø 380 mm\nCouvercle en plexiglass\nCage inox rectangulaire\nManivelle latérale avec sécurité\nEngrenage en acier sous carter\nRobinet de vidange en plastique\n\nPoints forts :\n\nCompatible cadres Dadant (corps et hausse)\nExtraction simple et efficace\nMatériaux robustes et durables\nIdéal pour apiculteurs débutants et professionnels en Tunisie	470	-3	7	400	https://m.media-amazon.com/images/I/616o4VVg2NL._AC_SX679_.jpg	https://m.media-amazon.com/images/I/81mZJq-HSHL._AC_SX679_.jpg	https://m.media-amazon.com/images/I/71ooiKiOYAL._AC_SL1500_.jpg	https://m.media-amazon.com/images/I/71+6qaBHo8L._AC_SL1500_.jpg	f		4	48	extracteur-2-cadre-	15	5	0
88	 Promotor L Apis 5L	Le Promotor est un complément alimentaire abeille, à très haute concentration en vitamines hydrosolubles et composé de 19 acides aminés sous forme lévogyre hautement digestes, qui augmente les paramètres de production des abeilles en stimulant la ponte de la reine et le développement du couvain.	550	7	8	450	https://i0.wp.com/centralpharma.fr/wp-content/uploads/2024/03/Promotor-L-apis-5lt.jpeg?fit=800%2C800&ssl=1				f	new 	5	8	-promotor-l-apis-5l	9	\N	0
76	Hausse à tenons Dadant 10 cadres	Ce pack comprend une hausse Dadant 10 cadres, prêts à recevoir vos feuilles de cire gaufrée. Fabriquée en bois, avec un assemblage à tenons robuste, cette hausse est idéale pour les apiculteurs à la recherche de matériel simple, durable et efficace pour produire leur propre miel.	34	46	1	30	https://thumbs.nosto.com/quick/prestashop-0deac90a/8/7263/aa4cbd8a10663df9edd232d8494c704d78698f2a42debb500b71ef96d25a80bd/A				f		5	29	hausse-à-tenons-dadant-10-cadres	9	\N	0
78	BOOSTER BEE	Booster Bee est un aliment complémentaire destiné à renforcer la vitalité des colonies d’abeilles.\nIl est riche en protéines, vitamines, minéraux et sucres, favorisant le développement du couvain et le renforcement des abeilles, notamment en périodes de stress, de disette ou de reprise de ponte.	160	7	8	109	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_p8nnldp8nnldp8nn%20(1).png	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_k2cllck2cllck2cl.png			t		4	39	booster-bee	9	\N	0
45	Grille rein plastique 	Cette grille à reine injectée en matière plastique alimentaire recyclable est idéale pour préserver vos cadres de hausse de tout couvain. Elle s'adapte sur n'importe quel type de ruche Dadant Blatt à 10 cadres (bois ou plastique)	5	251	1	0	https://m.media-amazon.com/images/I/61aveGvD5nL._SX466_.jpg	https://m.media-amazon.com/images/I/61nbjlUDtFL.jpg	https://www.latiendadelapicultor.com/5432/grille-reine-nicot-plastique-moule-dadant-blatt-10.jpg		f		\N	\N	grille-rein-plastique-	9	\N	0
141	Le Charme des Abeilles tunisienne 	L’attire-essaim pour abeilles est une préparation odorante puissante qui imite les phéromones naturelles des abeilles éclaireuses. Il augmente considérablement les chances d’installation d’un essaim dans une ruche neuve ou une ruchette piège.\n\nGrâce à son format pratique en tube, l’application est simple, propre et rapide.\n\n🔎 Caractéristiques techniques\n\n🐝 Type : Attire-essaim pour apiculture\n\n📦 Format : Tube pratique et hermétique\n\n🌿 Utilisation : Ruches neuves, ruchettes pièges, cadres\n\n⏳ Action : Attraction rapide des essaims\n\n🇹🇳 Disponible en Tunisie – Livraison rapide\n\n🛠️ Mode d’utilisation\n\nAppliquer une petite quantité à l’intérieur de la ruche ou sur les cadres.\n\nPlacer la ruchette dans une zone stratégique (hauteur recommandée).\n\nRenouveler l’application si nécessaire.\n\n🎯 Pourquoi choisir notre attire-essaim ?\n\n✔️ Idéal pour la capture d’essaim d’abeilles\n\n✔️ Produit essentiel pour la saison d’essaimage\n\n✔️ Convient aux apiculteurs débutants et professionnels\n\n✔️ Excellent rapport qualité/prix	10	-3	8	0	https://api.apiculturegalai.tn/uploads/Le%20tube%20de%20dentifrice%20et%20l'abeille.png				f		5	99	le-charme-des-abeilles-tunisienne-	9	\N	0
54	cadre d'elvage	Le cadre d’élevage en bois est un équipement essentiel pour la production de reines et l’élevage des larves royales. Robuste et pratique, il s’introduit facilement dans un essaim orphelin afin de favoriser le développement des cellules royales dans des conditions optimales.\n\nConçu pour soutenir efficacement les barrettes de cellules, ce cadre permet une manipulation simple grâce à un système d’accroche et de détachement rapide. Son nourrisseur intégré dans la partie supérieure offre un apport constant en alimentation, réduisant l’effort des abeilles et stimulant ainsi la production de larves royales.\n\nIdéal pour les apiculteurs en Tunisie souhaitant améliorer la qualité et la productivité de leur élevage de reines.\n\nPoints forts :\n\nIdéal pour élevage de reines\nCompatible avec essaims orphelins\nBarrettes faciles à fixer et retirer\nNourrisseur intégré pour stimuler la production\nStructure solide et durable	64	28	4	0	https://www.bienen-meier.ch/shop/resources/product_images_klein/1618_kl.jpg				t		4	44	cadre-d'elvage	9	\N	0
243	Maturateur 50 KG 	Ce maturateur à miel en acier inoxydable de 50 KG est l’équipement idéal pour les apiculteurs souhaitant stocker et maturer leur miel dans des conditions optimales. Conçu avec des matériaux de qualité alimentaire, il garantit une excellente conservation du miel tout en facilitant le remplissage des pots grâce à son robinet pratique.\n\nCaractéristiques :\nCapacité : 50 KG de miel\nFabrication en acier inoxydable haute qualité\nRobinet alimentaire pour un écoulement précis et propre\nCouvercle avec fermeture sécurisée\nRésistant à la rouille et facile à nettoyer\nStructure solide et durable\n\nAvantages :\nAssure une maturation parfaite du miel\nPréserve la qualité, l’arôme et la pureté du miel\nUtilisation pratique pour les apiculteurs professionnels et amateurs\nIdéal pour le stockage avant la mise en pot\nUtilisation :\nLe maturateur permet au miel de reposer après extraction afin de séparer naturellement les impuretés et les bulles d’air avant le conditionnement.	300	3	7	250	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2016%20mai%202026,%2023_22_59.png				t	NEW	4	33	maturateur-50-kg-	9	6	0
84	Robinet en plastique avec écrou	Ce robinet en plastique jaune, diamètre 40 x 49 avec filetage mâle, joint et écrou de serrage assure un parfait écoulement de votre miel. Il s'installe sur un maturateur, extracteur ou tout équipement de miellerie non équipé d'un manchon. Il est adapté au contact alimentaire.	10	-3	7	0	https://api.apiculturegalai.tn/uploads/82-scaled.webp				t	new 	4	22	robinet-en-plastique-avec-écrou	9	\N	0
80	Solution sucrée pour les abeilles	La solution sucrée pour les abeilles est un aliment liquide spécialement formulé pour nourrir les colonies d’abeilles, en particulier lorsque le nectar naturel est insuffisant. Elle fournit l’énergie nécessaire pour le maintien de la ruche, le développement des larves et la production de miel. Facile à administrer, cette solution contribue à renforcer la santé des abeilles et à soutenir leur activité pollinisatrice.	10	45	8	0	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_st7jfast7jfast7j.png				f		4	33	solution-sucrée-pour-les-abeilles	9	\N	0
82	Apiguard 	Traitement efficace contre les acariens\nApiguard assure un contrôle fiable des acariens Varroa, réduisant les infestations et favorisant des populations d'abeilles saines, garantissant ainsi aux apiculteurs des ruches productives.	25	8	11	0	https://m.media-amazon.com/images/I/71p97YBqnAL._AC_SL1500_.jpg	https://m.media-amazon.com/images/I/81bFDwhq+cL._AC_SL1500_.jpg	https://m.media-amazon.com/images/I/81REDrnMdfL._AC_SL1500_.jpg	https://m.media-amazon.com/images/I/71A4DfPIAPL._AC_SL1500_.jpg	f		5	88	apiguard-	9	\N	0
176	Extracteur 6 cadre électrique 	Optimisez votre récolte de miel avec cet extracteur électrique 6 cadres, conçu pour les apiculteurs exigeants. Grâce à son moteur puissant et silencieux, il permet une extraction rapide et efficace tout en préservant la qualité du miel et des cadres.\n\nFabriqué en acier inoxydable de haute qualité, cet extracteur garantit une excellente durabilité, une hygiène parfaite et un nettoyage facile. Sa capacité de 6 cadres en fait un équipement idéal pour les exploitations de taille moyenne, offrant un gain de temps considérable lors de la récolte.\n\nDoté d’un système de contrôle simple et sécurisé, il assure une utilisation confortable même pour les débutants. Sa conception stable et ergonomique permet un fonctionnement sans vibrations excessives.\n\nCaractéristiques principales :\n\nCapacité : 6 cadres\nMoteur électrique performant\nStructure en acier inoxydable\nExtraction rapide et homogène\nFacile à nettoyer et à utiliser\n\nUn outil indispensable pour améliorer votre productivité et obtenir un miel de qualité supérieure.	2250	3	7	0	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_8vr0rn8vr0rn8vr0.png				t	NEW	5	66	extracteur-6-cadre-électrique-	19	5	0
127	Combinaison Apiculture Demi-Ovale	La combinaison d’apiculture demi-ovale est spécialement conçue pour offrir une protection optimale contre les piqûres d’abeilles tout en garantissant confort et visibilité maximale. Idéale pour les apiculteurs débutants et professionnels en Tunisie.\n\n✅ Protection efficace et sécurité maximale\n\nÉquipée d’un voile demi-ovale en maille résistante, cette combinaison assure une excellente visibilité tout en empêchant le passage des abeilles. La fermeture éclair frontale robuste facilite l’enfilage et le retrait en toute sécurité.\n\n✅ Confort et praticité\n\nFabriquée en tissu blanc épais et respirant, elle protège contre la chaleur et permet de travailler plusieurs heures sans gêne. Sa coupe ergonomique garantit une grande liberté de mouvement.\n\n✅ Caractéristiques techniques :\n\nVoile demi-ovale avec large champ de vision\nMaille renforcée anti-intrusion\nFermeture éclair solide et durable\nPoche frontale pratique pour petits outils\nTissu résistant et confortable	35	4	5	0	https://api.apiculturegalai.tn/uploads/1000044904.png				f		4	33	combinaison-apiculture-demi-ovale	9	3	0
244	Maturateur 30 KG 	Le maturateur à miel inox 30 KG est un équipement indispensable pour les apiculteurs souhaitant assurer une maturation et un stockage optimal du miel après extraction. Fabriqué en acier inoxydable alimentaire de haute qualité, il garantit une excellente hygiène, une grande résistance à la corrosion et une longue durée de vie.\n\nGrâce à son robinet alimentaire intégré, le conditionnement du miel devient simple, propre et précis. Son couvercle avec fermeture sécurisée protège efficacement le miel contre les impuretés et l’humidité, tout en préservant sa qualité naturelle et ses arômes.\n\nCaractéristiques :\nCapacité : 30 KG\nMatière : Inox alimentaire haute qualité\nRobinet alimentaire pratique\nFermeture sécurisée avec clips\nFacile à nettoyer\nRobuste et durable\nUtilisation :\n\nIdéal pour la maturation, le stockage et la mise en pot du miel après extraction.\n\nAvantages :\nPréserve la pureté et la qualité du miel\nHygiénique et résistant à la rouille\nConvient aux apiculteurs professionnels et amateurs\nDesign pratique et professionnel pour une utilisation quotidienne	200	0	7	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2016%20mai%202026,%2023_38_44.png				f	NEW	4	10	maturateur-30-kg-	9	6	0
164	Enfumoir chinois petit modèle	Un enfumoir chinois petit modèle est un outil d’apiculture utilisé pour produire de la fumée afin de calmer les abeilles lors des interventions sur la ruche. Compact et léger, il est facile à manipuler et adapté aux petites exploitations ou aux débutants. Il fonctionne en brûlant des matériaux naturels (comme du carton, des aiguilles de pin ou de la paille) pour générer une fumée douce qui réduit l’agressivité des abeilles et facilite le travail de l’apiculteur.	25	3	5	0	https://api.apiculturegalai.tn/uploads/Fumoir%20d'apiculteur%20en%20inox.png				f		5	10	enfumoir-chinois-petit-modèle	9	\N	0
177	Moteur 6 vitesse RuBee® Germany	Caractéristiques Techniques :\nMarque : RuBee® (Ingénierie allemande).\n\nContrôle Précis : Équipé d'un levier de réglage à 10 vitesses permettant une accélération progressive pour protéger vos rayons de cire.\n\nDouble Sens de Rotation : Inverseur de marche intégré (Position L et R) pour extraire le miel des deux côtés sans effort.\n\nRobustesse : Carter moteur renforcé avec finition rouge haute résistance, conçu pour un usage intensif en milieu apicole.\n\nInstallation Facile : Livré avec son raccord d'axe métallique pour une adaptation rapide sur votre extracteur manuel ou automatique.\n\nAlimentation : Standard 230V avec prise secteur incluse.	1450	1	7	0	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_465q1x465q1x465q.png	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_hedlnjhedlnjhedl.png			f	NEW	5	3	moteur-6-vitesse-rubee®-germany	9	5	0
55	block a reine 	En apiculture, le "bloc à reine" est un dispositif destiné à l’élevage et à la gestion des reines d’abeilles. Il peut prendre plusieurs formes — comme un bloc à cupules ou une cage à reine — et intervient à différentes étapes du processus d’élevage.	7	86	1	0	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_gsjxt7gsjxt7gsjx.png	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_hbniv7hbniv7hbni%20(1).png			f		\N	\N	block-a-reine-	9	\N	0
89	Support de ruche métallique pliable	Le support de ruche métallique pliable est un accessoire indispensable pour tous les apiculteurs, alliant solidité, facilité de transport et confort de travail. Conçu pour offrir une stabilité maximale à vos ruches tout en permettant un rangement aisé, ce support est idéal pour une utilisation en extérieur, même dans les conditions les plus difficiles.	16	29	1	0	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_milhlumilhlumilh.png				f		4	22	support-de-ruche-métallique-pliable	9	\N	0
100	Combinaison complète locale avec masque ovale	Protégez-vous efficacement lors de vos interventions au rucher grâce à cette combinaison d’apiculteur professionnelle. Conçue pour offrir une protection maximale contre les piqûres d’abeilles, elle assure confort et sécurité tout au long de vos activités apicoles.\n\nLe masque ovale de type astronaute avec structure rigide complète et maille de protection protège le visage tout en garantissant une visibilité optimale. Les charnières et protections coulissantes renforcent la sécurité du cou, limitant tout risque de piqûre.\n\nPratique et fonctionnelle, cette tenue d’apiculture est équipée de poignets et chevilles élastiques pour un maintien parfait et est lavable en machine, ce qui facilite son entretien après chaque utilisation.\n\nMots-clés SEO intégrés : combinaison apiculteur, protection abeilles, masque astronaute apiculteur, tenue apiculture, sécurité rucher, équipement apiculture, vêtements apiculteur.	45	-16	5	0	https://api.apiculturegalai.tn/uploads/666345030_948296854833995_7420154368957539571_n.jpg	https://api.apiculturegalai.tn/uploads/662327279_948296884833992_3561959168639842467_n.jpg	https://api.apiculturegalai.tn/uploads/666793002_948296968167317_1746300425920541559_n.jpg		f		5	33	combinaison-complète-locale-avec-masque-ovale	9	3	0
146	Enfumoir Apicole – Grand Modèle	Enfumoir apicole grand modèle en inox, idéal pour les apiculteurs débutants et professionnels. Conçu pour produire une fumée efficace afin de calmer les abeilles pendant la visite des ruches.\n\n✅ Grand volume – Autonomie de fumée plus longue\n✅ Acier inoxydable – Résistant à la chaleur et à la rouille\n✅ Soufflet solide – Production de fumée rapide et efficace\n✅ Grille de protection – Sécurité contre les brûlures\n✅ Facile à utiliser et à nettoyer	35	-4	5	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%201%20mars%202026,%2023_41_41.png				t		4	54	enfumoir-apicole-–-grand-modèle	9	\N	0
182	Mécanisme d’Extracteur de Miel SAF Italie	Améliorez les performances de votre extracteur avec ce mécanisme d’origine SAF Italie, reconnu pour sa fiabilité et sa robustesse dans le domaine apicole professionnel.\n\nConçu pour assurer une rotation fluide et régulière, ce mécanisme permet une extraction efficace du miel tout en réduisant l’effort manuel. Sa fabrication en matériaux résistants, incluant un axe en acier inoxydable et un système d’engrenage renforcé, garantit une longue durée de vie même en usage intensif.\n\nIdéal pour remplacer un mécanisme usé ou améliorer votre extracteur existant.	320	3	7	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2028%20avr.%202026,%2021_21_20.png	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2028%20avr.%202026,%2021_24_07.png	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2028%20avr.%202026,%2021_27_57.png		f		5	0	mécanisme-d’extracteur-de-miel-saf-italie	9	5	0
245	Maturateur 100 KG	Le maturateur à miel inox 100 KG est spécialement conçu pour les apiculteurs professionnels et amateurs recherchant une solution fiable pour la maturation, le stockage et la conservation du miel. Fabriqué en acier inoxydable alimentaire haute qualité, il garantit une hygiène parfaite, une excellente résistance à la corrosion et une longue durée de vie.\n\nGrâce à sa grande capacité de 100 KG, ce maturateur permet de conserver le miel dans des conditions optimales après extraction, tout en préservant sa pureté, sa texture et ses qualités naturelles. Son robinet alimentaire facilite la mise en pot de manière propre et pratique, tandis que son système de fermeture sécurisé assure une protection efficace contre les impuretés.\n\nCaractéristiques :\nCapacité : 100 KG\nInox alimentaire haute qualité\nRobinet alimentaire pratique\nFermeture sécurisée avec clips inox\nPoignées renforcées pour un transport facile\nFacile à nettoyer et à entretenir\nStructure robuste et durable\nUtilisation :\n\nIdéal pour la maturation, le stockage et le conditionnement du miel avant la mise en pot.\n\nAvantages :\nPréserve la qualité et la pureté du miel\nHygiénique et résistant à la rouille\nGrande capacité adaptée aux exploitations apicoles\nDesign professionnel et pratique pour une utilisation quotidienne	350	0	7	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2016%20mai%202026,%2023_52_14.png				f	Best seller	5	0	maturateur-100-kg	9	6	0
231	Maturateur 120 kg avec filtre en acier inoxydable	Le filtre intégré s'adapte parfaitement au diamètre du maturateur.\n\nIl possède également :\n\n- 1 Fond courbé incliné vers la sortie\n\n- 1 Couvercle en acier inoxydable\n\n- 1 Robinet en plastique\n\nDiamètre : 390 mm\n\nHauteur : 790 mm\n\nUne fois le miel extrait, il est filtré et transvasé dans le maturateur, afin que les minuscules bulles d'air, les pelotes de pollen, les fragments de cire et les très fines impuretés qui se sont échappées du tamis remontent à la surface. Il faut tenir compte du fait qu'au cours de la décantation, le miel cristallise plus ou moins rapidement, selon la température et le type de nectar dont il provient. 	600	0	7	0	https://www.latiendadelapicultor.com/519-large_default/maturateur-120-kg-avec-filtre-en-acier-inoxydable.webp				f		5	0	maturateur-120-kg-avec-filtre-en-acier-inoxydable	9	6	0
130	Pack essaims spray	Vous souhaitez rassembler votre essaim facilement et sans effort ?\nLe spray Charme Abeilles + Abejar vous aide à attirer les abeilles et à stabiliser l’essaim rapidement et efficacement 👌\n\n💰 Prix : 59 Dinars seulement\n\n⏳⚠️ Offre valable seulement 2 jours !\nNe manquez pas cette opportunité 😉	75	9	9	59	https://api.apiculturegalai.tn/uploads/A%C3%A9rosols%20pour%20attirer%20les%20abeilles.png				f		5	8	pack-essaims-spray	9	\N	0
71	Ruchette 6 cadres	La ruchette 6 cadres en bois est un équipement indispensable pour les apiculteurs souhaitant créer, transporter ou développer de nouveaux essaims d’abeilles. Conçue avec du bois de qualité et une structure solide, cette ruchette offre un environnement optimal pour le développement des colonies.\n\nGrâce à sa capacité de 6 cadres, elle permet une meilleure gestion des essaims, que ce soit pour l’élevage de reines, la capture d’essaims ou le démarrage de nouvelles colonies. Son design pratique facilite l’inspection et la manipulation par l’apiculteur.\n\nCette ruchette est idéale pour les professionnels comme pour les apiculteurs amateurs qui recherchent une solution durable, pratique et efficace pour la gestion de leurs ruches.\n\nCaractéristiques :\n\nRuchette apicole 6 cadres\n\nFabrication en bois robuste et durable\n\nIdéale pour capture d’essaims et élevage d’abeilles\n\nCompatible avec cadres standards\n\nFacile à transporter et à manipuler\n\nAvantages :\n\nFavorise le développement rapide des colonies\n\nBonne isolation pour protéger les abeilles\n\nMatériaux solides pour une longue durée de vie\n\nParfaite pour l’apiculture professionnelle et amateur	55	1	1	\N	https://api.apiculturegalai.tn/uploads/Ruche%20en%20bois%20sur%20fond%20blanc%20(1).png	https://api.apiculturegalai.tn/uploads/Boîtes%20à%20ruches%20avec%20cadres%20en%20bois.png			f	New	5	9	ruchette-6-cadres	9	\N	0
75	Ruche en bois double hausse	Idéale pour tous les apiculteurs, du débutant au professionnel, la ruche 10 cadres est assez répandue, vous trouverez facilement tous les accessoires et éléments nécessaires pour la conduite de votre rucher.\n\nCette ruche Tradition vous garantit un produit de qualité.\n\nAlliant robustesse et esthétisme, vos abeilles pourront y travailler en toute sérénité	130	30	1	120	https://www.thomas-apiculture.com/29805-thickbox_default/ruche-langstroth-2-corps-tradition-toit-plat-cadres-files.jpg	https://www.thomas-apiculture.com/29804-thickbox_default/ruche-langstroth-2-corps-tradition-toit-plat-cadres-files.jpg			f		5	9	ruche-en-bois-double-hausse	15	\N	0
94	Cuillère à miel en bois – Doseur de miel	Cuillère à miel en bois naturel, conçue spécialement pour servir et doser le miel facilement sans en renverser. Grâce à ses rainures, elle permet de prélever le miel et de le verser lentement et proprement sur le pain, les crêpes, les desserts ou dans les boissons chaudes.\nÉcologique, réutilisable et sans danger pour les aliments, elle préserve le goût naturel du miel et convient parfaitement à un usage domestique ou professionnel en apiculture.	2.5	87	7	0	https://api.apiculturegalai.tn/uploads/naberacka-n-21-03.jpg				f		5	10	cuillère-à-miel-en-bois-–-doseur-de-miel	9	\N	0
93	Enfumoir apicole LYSON en inox avec protection thermique	Dans notre offre, vous trouverez également des outils BeeTools. L’enfumoir avec bouclier thermique est un accessoire indispensable dans tout rucher. Sa conception et sa fabrication sont particulièrement robustes. Les outils produits par cette marque se distinguent par leur très haute qualité.	69	0	5	60	https://api.apiculturegalai.tn/uploads/SKV09915.webp	https://api.apiculturegalai.tn/uploads/SKV09917.webp			f		4	8	enfumoir-apicole-lyson-en-inox-avec-protection-thermique	9	\N	0
98	Demi-combinaison d’apiculture avec masque ovale intégré	Cette combinaison d’apiculteur est spécialement conçue pour offrir une protection efficace contre les piqûres d’abeilles lors de toutes les interventions au rucher. Elle assure sécurité et confort aussi bien aux apiculteurs professionnels qu’aux apiculteurs amateurs.\n\nÉquipée d’un masque ovale de type astronaute avec structure rigide intégrale, elle intègre une maille de protection résistante garantissant une excellente visibilité et une sécurité renforcée du visage. Les charnières et protections coulissantes assurent une protection optimale du cou, même lors des mouvements prolongés.\nLes poignets et chevilles élastiques offrent un ajustement sûr, limitant toute intrusion d’abeilles. Facile d’entretien, cette tenue d’apiculture est lavable en machine, idéale pour une utilisation régulière au rucher.	159	8	5	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2014%20janv.%202026,%2011_54_05.png				f		4	18	demi-combinaison-d’apiculture-avec-masque-ovale-intégré	9	4	0
104	Demi combinaison carré 	La demi-combinaison carrée d’apiculteur assure une protection efficace du haut du corps lors des travaux au rucher. Conçue en toile résistante et confortable, elle protège contre les piqûres tout en garantissant une bonne liberté de mouvement. Son voile carré avec armature rigide offre une excellente visibilité et empêche tout contact avec le visage. Facile à enfiler, elle est idéale pour les interventions rapides et convient aussi bien aux apiculteurs débutants qu’aux professionnels.\n\n👉 Idéale pour un usage quotidien au rucher\n👉 Protection, confort et praticité réunis	25	-5	5	0	https://api.apiculturegalai.tn/uploads/618637689_885245551139126_3234246718674819081_n.webp	https://api.apiculturegalai.tn/uploads/617890644_885245611139120_832880652414320808_n.webp			f		5	10	demi-combinaison-carré-	9	3	0
246	Le maturateur inox 350 KG	Le maturateur à miel inox 350 KG est un équipement professionnel conçu pour la maturation, le stockage et la conservation du miel dans des conditions optimales. Grâce à sa grande capacité, il est parfaitement adapté aux exploitations apicoles de moyenne et grande production.\n\nFabriqué en acier inoxydable alimentaire haute qualité, ce maturateur garantit une excellente hygiène, une forte résistance à la corrosion et une longue durée de vie. Son robinet alimentaire intégré facilite le soutirage et la mise en pot du miel de manière propre et pratique.\n\nÉquipé de fermetures sécurisées et de poignées renforcées, il assure une manipulation facile et une protection efficace du miel contre les impuretés et l’humidité.\n\nCaractéristiques :\nCapacité : 350 KG\nAcier inoxydable alimentaire haute qualité\nRobinet alimentaire robuste\nFermeture sécurisée avec clips inox\nGrande résistance à la corrosion\nFacile à nettoyer et à entretenir\nStructure solide et durable\nUtilisation :\n\nIdéal pour la maturation, le stockage et le conditionnement du miel avant la mise en pot.\n\nAvantages :\nPréserve la qualité, la pureté et les arômes naturels du miel\nSolution hygiénique et professionnelle\nGrande capacité adaptée aux apiculteurs professionnels\nUtilisation pratique et durable au quotidien\nDesign professionnel pour une apiculture moderne et efficace	850	1	7	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2017%20mai%202026,%2012_29_36.png				f	NEW	4	32	le-maturateur-inox-350-kg	9	6	0
91	Nourrisseur à bouteille	Le nourrisseur à bouteille est un équipement apicole conçu pour l’alimentation des abeilles au sirop. Compatible avec les bouteilles standards à pas de vis, il s’installe directement à l’entrée (trou de vol) de la ruche. Ce dispositif permet un apport de nourriture liquide sans ouverture de la ruche, réduisant ainsi le stress et les perturbations de la colonie. Il est particulièrement recommandé pour le nourrissement de stimulation, notamment au début du printemps.	2.5	83	5	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2031%20d%C3%A9c.%202025,%2010_39_59.png	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2031%20d%C3%A9c.%202025,%2010_45_07.png			f		5	10	nourrisseur-à-bouteille	9	\N	0
147	Combinaison Intégrale avec Voile Ovale Haute Visibilité	Protection Totale : Conception monobloc (combinaison complète) en coton robuste et épais, résistant aux piqûres tout en restant respirant.\n\nVoile Ovale Panoramique : Contrairement aux modèles classiques, le masque de forme ovale offre un dégagement optimal autour du visage, évitant tout contact entre le grillage et la peau, tout en assurant une vue dégagée à 360°.\n\nDesign Ergonomique : Fermetures éclair renforcées de couleur jaune vif pour une meilleure visibilité et une manipulation aisée, même avec des gants.\n\nAjustement Parfait : Poignets et chevilles élastiqués pour empêcher toute intrusion d'abeilles.\n\nPraticité : Équipée de poches multiples pour garder vos outils de ruche à portée de main.	45	8	5	0	https://api.apiculturegalai.tn/uploads/unnamed.jpg				t	new	5	41	combinaison-intégrale-avec-voile-ovale-haute-visibilité	9	\N	0
149	Varroa Killer	Protégez vos colonies d'abeilles avec Varroa Killer, la solution de référence pour lutter efficacement contre l'acarien Varroa destructor. Formulé à partir d'ingrédients 100% naturels, ce traitement garantit une protection optimale de vos ruches sans compromettre la qualité de votre miel. Simple d'utilisation et respectueux de l'environnement apicole.	20	0	11	0	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_9fgpro9fgpro9fgp.png	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_4cce3i4cce3i4cce.png			f	NEW	5	9	varroa-killer	9	\N	0
178	Extracteur de Miel Électrique 5 Cadres – Qualité Turquie 🇹🇷	Passez à la vitesse supérieure avec ce modèle 5 cadres, offrant le parfait équilibre entre compacité et rendement. Conçu pour les apiculteurs qui recherchent un matériel professionnel robuste, cet extracteur garantit une extraction propre et efficace.\n\nFiche Technique :\nCapacité : Conçu pour accueillir simultanément 5 cadres (format standard), idéal pour les ruchers de taille moyenne.\n\nMotorisation Supérieure : Moteur électrique fiable monté sur traverse, facilitant l'accès à la cuve.\n\nVariateur de Vitesse : Boîtier électronique précis pour une accélération progressive, protégeant vos cires de la casse.\n\nInox Alimentaire : Cuve et mécanisme intérieur en acier inoxydable haute qualité pour une pureté totale du miel.\n\nStructure Renforcée : Pieds robustes surélevés permettant de placer un maturateur directement sous le robinet de sortie.\n\nLes Avantages Galai Apiculture :\nEfficacité accrue : Extraire 5 cadres à la fois réduit considérablement votre temps de travail en miellerie.\n\nFiabilité Turque : Un savoir-faire reconnu pour sa robustesse mécanique et sa longévité.\n\nPrêt à l'emploi : Montage simple et entretien facile pour une hygiène irréprochable.	3500	1	7	0	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_eyx85teyx85teyx8.png				f	NEW	5	\N	extracteur-de-miel-électrique-5-cadres-–-qualité-turquie-🇹🇷	30	5	0
9	Enfumoir pour apiculteur	Enfumoir pour apiculteur de petite taille, idéal pour calmer les abeilles lors des interventions en ruche.	23	7	5	23	https://apiculture-remuaux.fr/3988-large_default/grand-enfumoir-avec-protection.jpg	https://apiculture-remuaux.fr/3989-large_default/grand-enfumoir-avec-protection.jpg	https://www.mat-apiculture.fr/1081-home_default/enfumoir-inox-avec-protection-outil-apiculteur.jpg	\N	t		100	5	enfumoir-pour-apiculteur	9	\N	0
77	POT 290ML HEX AC DOREE	Code : POT 290 HEX AC DOREE\nVolume : 290 ml\nCarton : 75 unités	1.8	963	6	0	https://api.apiculturegalai.tn/uploads/1000038231.jpg				f		5	10	pot-290ml-hex-ac-doree	9	\N	0
129	Gants Professionnels d’Apiculture en Cuir	Découvrez nos gants d’apiculture professionnels conçus pour offrir une protection maximale contre les piqûres d’abeilles tout en garantissant confort et souplesse lors du travail au rucher.\n\nFabriqués avec une paume en cuir naturel résistant, ces gants assurent une excellente prise en main des cadres, enfumoirs et outils apicoles. La manchette longue en tissu épais blanc protège efficacement l’avant-bras, tandis que la bande en maille respirante améliore la ventilation et réduit la transpiration.\n\nCes gants sont idéals pour :\n\nApiculteurs professionnels\n\nDébutants en apiculture\n\nExploitations apicoles en Tunisie\n\n🔹 Matériaux durables\n🔹 Confort longue durée\n🔹 Sécurité optimale au rucher	30	-7	5	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2012%20f%C3%A9vr.%202026,%2013_41_43.png	https://api.apiculturegalai.tn/uploads/Gants%20d'apiculture%20sur%20fond%20blanc.png			f		4	49	gants-professionnels-d’apiculture-en-cuir	9	\N	0
95	kit débutant 	🐝 عدة تربية النحل كاملة – عرض استثنائي 🐝\n\nإذا كنت مبتدئ في تربية النحل أو تحب تكون مجهز بمعدات ذات جودة عالية،\nهذه عدة تربية النحل الكاملة هي الحل الأمثل \n📦 محتويات العدة:\n✔️ خلية نحل كاملة (2 Hausses)\n✔️ قفازات مستوردة ذات جودة عالية\n✔️ بدلة تربية نحل كاملة – جودة ممتازة\n✔️ أحذية متوفرة بالمقاسات 42 / 43 / 44\n✔️ رافعة إطارات احترافية\n✔️ مدخّن نحل عادي	300	0	9	229	https://api.apiculturegalai.tn/uploads/613516590_876710291992652_6463818242934857976_n.jpg				f		5	10	kit-débutant-	19	\N	0
74	Cadre Dadant hausse droit	Le cadre déjà filé est prêt à recevoir la feuille de cire gaufrée.\n\nAprès avoir garni votre cadre de cire gaufrée, il pourra être utilisé directement dans les ruches.\nLa tête du cadre est rainurée sur le dessus et sur le dessous. Au-dessus, la rainure permet de passer le fil inox. En dessous, elle sert à positionner la feuille de cire.\nLorsque votre feuille de cire sera usagée et ne sera plus utilisable dans vos ruches, vous pourrez réutiliser le cadre bois, y remettre du fil et une nouvelle feuille de cire gaufrée Thomas.	1.3	299	4	0	https://www.thomas-apiculture.com/26602-thickbox_default/cadre-dadant-hausse-droit-mi-bois-file-horizontal.jpg				f		5	10	cadre-dadant-hausse-droit	9	\N	0
14	Lève cadre avec crochet	Lève-cadre avec crochet, outil simple pour soulever les cadres des ruches sans les casser.	15	42	5	\N	https://api.apiculturegalai.tn/uploads/51XIYVLCh9L._AC_UF894,1000_QL80_.jpg		\N	\N	t		\N	\N	lève-cadre-avec-crochet	9	\N	0
247	Engrenage pour Extracteur 4 Cadres SAF	Cet engrenage de transmission est spécialement conçu pour les extracteurs de miel 4 cadres SAF. Fabriqué avec des matériaux résistants et durables, il assure une rotation fluide et une excellente transmission du mouvement pour un fonctionnement efficace de votre extracteur.\n\n✅ Compatible avec extracteur 4 cadres SAF\n✅ Métal robuste et résistant à l’usure\n✅ Rotation stable et performante\n✅ Installation simple et rapide\n✅ Idéal pour remplacer les engrenages usés ou endommagés\n\n🔧 Cette pièce garantit un fonctionnement optimal de votre extracteur et prolonge sa durée de vie, même en utilisation intensive pendant la saison de récolte.\n\n🐝 Convient parfaitement aux apiculteurs professionnels et amateurs recherchant fiabilité et qualité.	99	2	7	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2018%20mai%202026,%2022_43_36.png				f		4	2	engrenage-pour-extracteur-4-cadres-saf	9	5	0
117	Lève Cadre Pince bois	Le lève-cadre pour abeilles est un outil essentiel pour tous les apiculteurs, débutants comme professionnels. Conçu pour saisir, soulever et retirer facilement les cadres de ruche, il permet de travailler avec précision tout en réduisant l’effort et le risque d’écrasement des abeilles.\n\nDoté de poignées ergonomiques antidérapantes bois et d’une structure en acier galvanisé résistant, ce lève-cadre assure une excellente prise en main et une longue durée de vie, même en usage intensif. Son mécanisme de serrage automatique garantit une manipulation stable et sécurisée des cadres chargés de miel.\n\nIdéal pour l’inspection des ruches, la récolte du miel et l’entretien régulier, cet outil améliore le confort de travail et la productivité de l’apiculteur.	20	-3	5	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2031%20janv.%202026,%2018_30_37.png				f		5	10	lève-cadre-pince-bois	9	\N	0
142	Charme Abeilles Thomas france	Le plus connu et le plus efficace des attrapes essaim !\n\nLa recette exclusive, élaborée par Thomas Apiculture, est reconnue et continue de satisfaire ses utilisateurs dans le monde entier. \n\nLe parfum obtenu à base d'essences naturelles attire et dirige les essaims vers le lieu qui leur est préparé. \n\nAvantages du produit\n\nGrand format 500 ml : idéal pour une gestion intensive des captures.\nFormule exclusive Thomas Apiculture : gage de qualité et de fiabilité depuis plus d’un siècle.\nUtilisation simple et rapide : aérosol prêt à l’emploi.\nConvient aussi bien aux débutants qu’aux professionnels exigeants.\nPourquoi l’utiliser ?\n\nLors de la période d’essaimage, augmentez vos chances de capture grâce à une forte attractivité diffusée par l’aérosol.\nLe format 500 ml est parfaitement adapté pour les ruchers de taille moyenne / grande, pour les installations multi-pièges ou itinérantes.\nMode d’emploi :\n\nPositionnez votre ruchette-piège en hauteur, sur une assise stable, à l’abri des heures chaudes du jour.\nVaporisez légèrement l’entrée de la ruchette et quelques cadres à l’intérieur.\nRenouvelez l’application tous les 8 jours jusqu’à la capture.\nUne fois l’essaim installé, transférez-le vers votre rucher principal après vérification sanitaire et traitement.\nNote : n’installez pas vos pièges trop près de ruchers qui ne vous appartiennent pas.	55	31	8	0	https://www.thomas-apiculture.com/28362-large_default/charme-abeilles-500-ml-aerosol.jpg	https://www.thomas-apiculture.com/28361-large_default/charme-abeilles-500-ml-aerosol.jpg	https://www.thomas-apiculture.com/30234-thickbox_default/charme-abeilles-500-ml-aerosol.jpg		f		5	10	charme-abeilles-thomas-france	9	\N	0
86	Plateau plastique 	Le plateau plastique brun est un accessoire indispensable pour les apiculteurs souhaitant optimiser la gestion des ruchettes d’élevage et améliorer l’organisation interne de la colonie. Conçu en plastique robuste et durable, ce plateau assure une excellente résistance aux conditions apicoles tout en garantissant une utilisation longue durée.\nIdéal pour les ruchettes d’élevage de reines, ce plateau permet un support stable et pratique pour l’aménagement intérieur. Sa structure renforcée facilite la manipulation, l’entretien et contribue à une meilleure hygiène dans la ruche.\nGrâce à sa fabrication en matériau de qualité, il s’intègre parfaitement dans les équipements modernes d’apiculture et convient aussi bien aux professionnels qu’aux apiculteurs amateurs.\n\n✅ Caractéristiques principales :\n\nPlateau en plastique brun solide et résistant\nCompatible avec ruchettes d’élevage reine\nMatériau durable, facile à nettoyer\nConception renforcée pour une meilleure stabilité	13	59	1	0	https://api.apiculturegalai.tn/uploads/Cadre%20de%20reproduction%20de%20reine%20en%20plastique.png				f	new	5	10	plateau-plastique-	9	\N	0
66	Gants d'apiculture jaunes	Gants d'apiculture taille XL/M/l de qualité supérieure en cuir de chèvre\nConçu pour protéger vos mains des piqûres d'abeilles et des morsures\nFabriqué avec précision pour plus de durabilité et de dextérité\nParfait pour l'apiculture et le travail en plein air\nCoupe confortable et design élégant	20	43	5	0	https://m.media-amazon.com/images/I/51E059ksQ5L._SL1024_.jpg	https://m.media-amazon.com/images/I/51dB4sDyZnL._SL1024_.jpg	https://m.media-amazon.com/images/I/71D38ML7QDL._SL1024_.jpg	https://m.media-amazon.com/images/I/418cTy71sML._SL1024_.jpg	f		\N	\N	gants-d'apiculture-jaunes	9	\N	0
148	Unique anti-varrao	UNIQUE : La Solution Experte pour le Contrôle du Varroa\nProtégez durablement la santé de vos colonies d'abeilles avec UNIQUE, un traitement miticide de pointe conçu pour une gestion efficace et simplifiée du parasite Varroa destructor. Alliant innovation technique et facilité d'utilisation, ce produit est le partenaire indispensable des apiculteurs soucieux de la vitalité de leur cheptel.\n\nPourquoi choisir les lanières UNIQUE ?\nEfficacité Supérieure : Développé par UNIQUE Enterprises, ce produit est reconnu pour sa haute efficacité dans l'élimination des acariens varroa.\n\nTechnologie Amide : Formulé avec 20 lanières imprégnées (Amide strips), il assure une diffusion constante et ciblée au cœur de la ruche.\n\nQualité Certifiée : Considéré comme l'un des meilleurs pesticides apicoles, il bénéficie d'une synthèse rigoureuse pour garantir des résultats optimaux.\n\nFormat Pratique : Le paquet contient 20 lanières, offrant une solution complète pour le traitement de vos ruches.	50	3	11	0	https://api.apiculturegalai.tn/uploads/Traitement%20Varroa%20UNIQUE%20-%20Paquet%20argenté.png	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_eq2heleq2heleq2h.png			f	New 	4	3	unique-anti-varrao	9	\N	0
101	MEVABEES FORT 	MEVABEES FORT est une suspension orale riche en vitamines, minéraux et glucides, spécialement formulée pour renforcer la vitalité et la performance des abeilles. Ce complément nutritionnel soutient efficacement le développement des colonies, améliore l’énergie des abeilles et favorise une meilleure activité lors de la collecte du pollen.\n\nGrâce à sa composition équilibrée en vitamines (A, D3, E, C et complexe B) et en oligo-éléments essentiels, MEVABEES FORT contribue à renforcer l’immunité, à réduire le stress et à améliorer la résistance des abeilles, notamment durant les périodes de faibles ressources ou de forte activité.	45	-4	8	30	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2017%20janv.%202026,%2009_41_47.png	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2017%20janv.%202026,%2009_46_21.png			f		4	39	mevabees-fort-	9	\N	0
248	Maturateur INOX 200 KG 	Le maturateur 200 KG est conçu pour le stockage et la maturation du miel dans des conditions optimales. Fabriqué en acier inoxydable alimentaire de haute qualité, il garantit une excellente hygiène, une grande résistance à la corrosion et une longue durée de vie.\n\nGrâce à sa grande capacité, il convient parfaitement aux apiculteurs professionnels et aux exploitations apicoles de moyenne et grande taille. Son couvercle hermétique avec fermeture sécurisée permet de préserver la qualité du miel tout en évitant l’humidité et les impuretés.\n\nCaractéristiques :\nCapacité : 200 KG\nAcier inoxydable alimentaire\nCouvercle avec fermeture sécurisée\nPoignées renforcées pour un transport facile\nSurface lisse facile à nettoyer\nRésistant à la corrosion\nIdéal pour la maturation et le stockage du miel\n\nParfait pour une utilisation professionnelle en apiculture.	420	3	7	0	https://api.apiculturegalai.tn/uploads/c58ca799-0b1f-4e12-975b-3fac40c1b308-wm.png				f	NEW 	5	2	maturateur-inox-200-kg-	9	6	0
150	Varroa +	Assurez la santé de votre rucher avec Varroa +, une solution puissante spécialement formulée pour éradiquer l'acarien Varroa destructor. Basé sur l'action de l'acide formique, ce traitement agit efficacement à l'intérieur de la ruche pour protéger vos colonies.\nPrincipe Actif Reconnu : Contient 684 mg d'acide formique par unité pour une action ciblée.\n\nSécurité pour le Miel : Conçu avec un temps d'attente "Null" pour la récolte de miel (selon les conditions d'utilisation).\n\nApplication Ciblée : Traitement spécifiquement destiné à une utilisation dans la ruche.\n\n📋 Conseils d'Utilisation (Balise H2)\nApplication : Produit destiné à être utilisé dans la ruche.\n\nPrécautions : Il est impératif de lire attentivement la notice d'emballage avant toute utilisation pour garantir l'efficacité et la sécurité.\n\nConservation : À conserver hors de portée des enfants et dans un endroit approprié.\n	35	-1	11	0	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_xy1rgtxy1rgtxy1r%20(1).png	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_3d5ghk3d5ghk3d5g.png			f		4	33	varroa-+	9	\N	0
111	Pack essaims 	1️⃣ Description\nLe Pack Capture d’Essaims est une solution complète conçue pour attirer et fixer les essaims d’abeilles de manière naturelle et efficace.\n\n2️⃣ Composition\nIl se compose du Spray ABEJAR, de la Pâte ABEJAR et du Gel Le Charme des Abeilles, formulés pour reproduire l’odeur naturelle de la ruche.\n\n3️⃣ Efficacité\nCe pack offre une efficacité élevée, favorisant l’attraction rapide des essaims et leur installation durable dans la ruche.\n\n4️⃣ Utilisation\nIl s’utilise facilement en appliquant une petite quantité du produit à l’intérieur de la ruche ou sur les cadres avant la mise en place.\n\n5️⃣ Cible\nAdapté aux apiculteurs professionnels comme aux amateurs, il est particulièrement recommandé pendant la période de capture des essaims.	120	11	9	69	https://api.apiculturegalai.tn/uploads/617534448_887726540891027_422454257855647418_n.jpg	https://www.latiendadelapicultor.com/4604-large_default/appat-essaim-abejar-spray.webp	https://www.latiendadelapicultor.com/4608-large_default/appat-essaim-abejar-pate.webp	https://www.latiendadelapicultor.com/1818-large_default/attire-essaims-charme-des-abeilles-en-pommade.webp	f		5	88	pack-essaims-	9	\N	0
103	Ruche complet avec demi hausse 	Plateau (plancher) en bois\nAssure une bonne stabilité de la ruche et une ventilation optimale.\n\nHausse complète avec cadres\nDestinée à la production de miel, facile à manipuler et compatible avec les standards apicoles.\n\nDemi-hausse avec demi-cadres\nIdéale pour la récolte du miel avec un poids réduit, facilitant le transport et la manipulation.\n\nToit avec tôle galvanisée\nProtection efficace contre la pluie, l’humidité et les fortes chaleurs.	120	48	1	110	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2019%20janv.%202026,%2014_01_53.png				f		5	10	ruche-complet-avec-demi-hausse-	15	\N	0
232	Extracteur Electrique 4 cadres SAF 	Première grosse miellée de romarin, tu soulèves le couvre-cadres et tu vois les hausses operculées de bord à bord. Tu sais qu’il y a là 100 à 150 kg de miel qui t’attendent. Si tu travailles encore avec un extracteur tangentiel 4–6 cadres (ou manuel), tu connais déjà le film: désoperculer, charger, attendre, retourner les cadres, relancer, re-attendre. À partir de 20–30 ruches en production, le goulot d’étranglement n’est plus au rucher, il est clairement dans la miellerie.\n\nCet extracteur radial électrique Ø640 pour 18 hausses est conçu justement pour ce stade. Ce n’est pas une machine d’initiation, mais un outil pour passer à un rythme de travail plus professionnel et continuer à augmenter le nombre de ruches sans que l’extraction ne te prenne des journées entières.\n\nRadial vs tangentiel: la clé, c’est le nombre de cadres par heure\n\nSur un tangentiel, les cadres sont parallèles à l’axe: la force centrifuge vide d’abord une face, puis tu dois arrêter, retourner chaque cadre à 180° et relancer le cycle. Ici, le système change: les 18 cadres de hausse (environ 48×16 cm) sont disposés comme les rayons d’une roue, en radial. Le miel sort des deux faces en même temps. Tu charges la cage, tu fermes le couvercle de sécurité, tu règles la vitesse et tu peux te consacrer à la désoperculation du lot suivant.\n\nImportant: un radial n’a pas forcément un cycle plus court qu’un tangentiel. Le programme peut durer autant, voire un peu plus si tu travailles en douceur pour protéger la cire. L’avantage réel, c’est que tu fais tourner beaucoup plus de cadres à chaque cycle sans jamais les retourner. En pratique, un cycle de 8–10 minutes vide 18 cadres. Pour traiter le même volume avec un tangentiel 6 cadres, il te faut trois charges et le temps perdu à retourner les cadres. Quand tu extrais 200–300 kg dans la journée, la différence ne se compte plus en minutes mais en heures.\n\nFace à un tangentiel réversible: productivité et prix\n\nPour qu’un tangentiel soit vraiment confortable, il doit être réversible avec une commande électronique qui inverse automatiquement le sens de rotation. Cela évite de retourner les cadres à la main, mais la mécanique et l’électronique font grimper le prix. Si tu compares des machines de même gamme, un radial 18 hausses comme celui-ci est souvent au même niveau, voire moins cher, qu’un bon tangentiel réversible, tout en offrant plus de cadres par cycle et moins de manipulations.\n\nAvantages clairs, mais aussi des limites à connaître\n\n• Encombrement: avec un diamètre de 640 mm et ses pieds, il demande une miellerie avec un minimum d’espace. C’est une machine faite pour une installation fixe, pas pour être montée et démontée dans un petit fourgon.\n• Nettoyage plus minutieux: la cage radiale 18 cadres comporte plus de recoins qu’un simple tambour tangentiel. Le lavage de fin de saison demande un peu plus de temps.\n• Investissement supérieur à un petit tangentiel: par rapport à un tangentiel électrique basique 4–6 cadres, l’investissement est plus important. En dessous d’une vingtaine de ruches, l’amortissement est difficile.\n• Format ciblé: optimisé pour des hausses d’environ 16 cm de hauteur (type Dadant, Langstroth ou équivalent). Si tu travailles surtout en cadres de corps, Layens, etc., il vaut mieux regarder un modèle dédié.\n\nMiels durs, miels fluides: à chaque système son terrain de jeu\n\nAvec des miels fluides ou classiquement visqueux (romarin, acacia, tilleul, miellat encore liquide, polyfloral de printemps), le radial fonctionne très bien avec des programmes standard: vidange rapide, peu de casse de cire, flux continu de travail.\n\nPour les miels très denses ou déjà à moitié cristallisés, ceux que tu passes au chauffage ou à la piqueuse chauffante, il faut être honnête: le radial n’est pas la solution idéale si le miel arrive froid et déjà très dur. Dans ce cas, un bon tangentiel, surtout réversible, permet d’insister davantage sur chaque face et de récupérer ce que le radial laisserait collé aux alvéoles. Si ta production principale, c’est colza dur, bruyère très compacte ou miels déjà cristallisés, le tangentiel reste souvent le meilleur choix.\n\nÀ partir de quand ça devient rentable ?\n\nCet extracteur prend tout son sens à partir d’environ 30 à 100 ruches en production, avec des récoltes annuelles autour de 500 à 1000 kg de miel. Le gain est double: temps d’extraction réduit et fatigue physique nettement moindre.\n\nMoteur ECO 200 W: la puissance suffisante, sans surdimensionner\n\nL’appareil est équipé d’un moteur ECO 200 W, 230 V. Le diamètre de 640 mm permet une extraction efficace à vitesse moyenne, avec un démarrage progressif qui ménage la cire. Résultat: consommation électrique modérée, peu de casse dans les rayons neufs et compatibilité avec un petit groupe électrogène en miellerie mobile.\n\nAstuce pour les miels denses mais encore fluides\n\nSur des miels épais mais non cristallisés (bruyère, eucalyptus, certains miellats), un schéma qui marche bien: 2–3 minutes à basse vitesse pour évacuer la phase la plus fluide près des opercules, puis montée progressive jusqu’à la vitesse maximale pour le “séchage” final. Tu diminues ainsi les risques de casse de cire et de déséquilibre de la cage. Si le miel est déjà pratiquement solide, il est préférable de le tempérer avant, ou de travailler avec un tangentiel adapté.\n\nFabrication européenne, pensée pour durer\n\nLe tambour est en acier inoxydable alimentaire AISI 304 (0H18N9), résistant à l’acidité du miel et au nettoyage à l’eau chaude ou sous pression. Le fond conique guide naturellement le miel vers le robinet à guillotine en plastique alimentaire 6/4", sans avoir à incliner l’extracteur ni laisser de kilos de miel dans les coins. Le couvercle en méthacrylate transparent de 4 mm permet de suivre le cycle à l’œil et le système de sécurité empêche le moteur de démarrer couvercle ouvert.\n\nL’ensemble est fabriqué en Europe, dans des ateliers spécialisés en matériel apicole, sous norme CE. Cela se retrouve dans la qualité des soudures, l’équilibrage de la cage, la stabilité en fonctionnement et la disponibilité des pièces de rechange à long terme.\n\nLes pieds métalliques peint époxy donnent une hauteur de travail d’environ 113 cm, confortable pour charger et décharger les cadres et pour placer en dessous des seaux ou fûts de 25–30 kg.\n\nCaractéristiques techniques principales\n\n• Type d’extracteur: radial électrique pour hausses\n• Capacité: 18 cadres de hausse (env. 48×16 cm)\n• Diamètre du tambour: 640 mm\n• Hauteur totale: env. 113 cm\n• Moteur: ECO 200 W, 230 V\n• Sortie de miel: robinet à guillotine plastique alimentaire 6/4"\n• Cuve: acier inoxydable alimentaire AISI 304 (0H18N9)\n• Pieds: métalliques, peinture époxy, dégagement suffisant pour les fûts\n• Couvercle: méthacrylate transparent avec sécurité\n• Fabrication: européenne, conforme CE\n• Garantie fabricant: 24 mois\n\nEst-ce l’extracteur qu’il te faut ?\n\nProfil idéal:\n• Environ 30 à 100 ruches en production\n• Récoltes annuelles de 500 à 1500 kg de miel\n• Miellerie fixe ou au moins 2×2 m d’espace de travail\n• Miels plutôt fluides ou moyennement denses la plupart de la saison\n\nÀ éviter si:\n• Tu as moins de 20 ruches et de petites récoltes\n• Tu travailles quasi exclusivement en cadres de corps ou en ruches couchées\n• Tes principaux miels sont très durs, cristallisés, que tu extrais à la piqueuse et au chauffage fort\n• Ton budget est très serré et qu’un petit tangentiel couvre déjà ton besoin\n\nSi tu es dans la bonne fourchette, cet extracteur radial se rembourse en une ou deux saisons, non pas parce qu’il fabrique plus de miel, mais parce qu’il te permet de traiter tes hausses beaucoup plus vite, avec moins d’efforts et une organisation nettement plus fluide. Et par rapport à un tangentiel réversible de même gamme, tu gardes une productivité plus élevée par cycle pour un coût souvent plus contenu.	2900	0	7	0	https://www.latiendadelapicultor.com/9505-large_default/extracteur-radial-electrique-carrera-o640-pour-18-hausses.webp	https://www.latiendadelapicultor.com/9509-large_default/extracteur-radial-electrique-carrera-o640-pour-18-hausses.webp	https://www.latiendadelapicultor.com/9508-large_default/extracteur-radial-electrique-carrera-o640-pour-18-hausses.webp	https://www.latiendadelapicultor.com/9507-large_default/extracteur-radial-electrique-carrera-o640-pour-18-hausses.webp	f		5	0	extracteur-electrique-4-cadres-saf-	9	5	0
113	Charme Abeilles Limon – Petit Modèle	Le Charme Abeilles Limon – Petit Modèle est un spray attractif naturel conçu pour attirer et orienter les abeilles lors des interventions apicoles. Grâce à son arôme citronné (limon), il reproduit les phéromones naturelles et aide à réduire le stress des abeilles tout en facilitant leur regroupement.\n\nSon format compact est idéal pour les apiculteurs qui recherchent une solution pratique, facile à transporter et économique, parfaite pour les petites interventions, la capture d’essaims ou l’introduction en ruchette.\n\n✅ Attractif efficace pour abeilles\n✅ Arôme citronné (limon)\n✅ Format pratique – petit modèle\n✅ Application simple et précise\n✅ Convient aux apiculteurs amateurs et professionnels	20	3	8	0	https://api.apiculturegalai.tn/uploads/Capture%20d%E2%80%99%C3%A9cran_23-1-2026_93641_.jpeg	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_hxq1ckhxq1ckhxq1.png			f		5	88	charme-abeilles-limon-–-petit-modèle	9	\N	0
122	Ruchette Polystyrène	La ruchette polystyrène est une solution moderne et performante pour l’élevage des essaims, la division des colonies et l’élevage de reines. Fabriquée en polystyrène haute densité, elle offre une excellente isolation thermique, protégeant les abeilles du froid en hiver et de la chaleur en été.\n\nGrâce à sa légèreté, la ruchette en polystyrène est facile à transporter et à manipuler, tout en restant résistante à l’humidité et aux conditions climatiques difficiles. Elle favorise le bon développement du couvain et améliore la vitalité de la colonie, ce qui en fait un choix idéal pour l’apiculture professionnelle et amateur.\n\nContrairement aux ruchettes en bois, la ruchette polystyrène pour abeilles assure une meilleure hygiène, une longévité accrue et une consommation réduite de nourriture par les abeilles grâce à son pouvoir isolant. Elle est compatible avec les cadres standards et convient parfaitement aux apiculteurs débutants comme expérimentés.\n\nAvantages de la ruchette polystyrène :\n\n✅ Isolation thermique optimale\n✅ Légère et facile à transporter\n✅ Résistante à l’humidité et aux intempéries\n✅ Idéale pour l’élevage des essaims et des reines\n✅ Compatible avec cadres standards	30	14	1	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%203%20févr.%202026,%2020_17_30.png				f		5	9	ruchette-polystyrène	9	\N	0
119	Brosse à abeilles bois	Une brosse à abeille douce, idéale pour les apiculteurs qui débutent et souhaitent s'équiper à moindre coût, pour brosser les abeilles hors des cadres pendant la récolte des hausses ou pour examiner les cadres de ruche.	15	-1	5	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2031%20janv.%202026,%2021_29_35.png	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2031%20janv.%202026,%2020_53_30.png			f		4	29	brosse-à-abeilles-bois	9	\N	0
143	Attire-essaims Charme Abeilles Thomas 200 ml	Le plus connu et le plus efficace des attrapes essaim !\n\nLa recette exclusive, élaborée par Thomas Apiculture, est reconnue et continue de satisfaire ses utilisateurs dans le monde entier.\n\nLe parfum obtenu à base d'essences naturelles attire et dirige les essaims vers le lieu qui leur est préparé.\n\nLes avantages du produit\n\nFormule exclusive Thomas Apiculture, spécial essaims.\nFormat prêt à l’emploi, sans gaz, respectueux de l’environnement.\nTrès simple d’utilisation, adapté aux débutants.\nPermet d’optimiser vos captures dans votre installation apicole.\nPourquoi l’utiliser ?\n\nLors d’un essaim sauvage ou adopté, ce spray permet de diriger les abeilles vers un piège ou rucher : vaporisez légèrement la porte d’entrée et quelques cadres de la ruchette-piège.\nEn renouvelant l’application tous les 8 jours, vous augmentez les chances de capture.\nSi vous disposez de vieux rayons bâtis, glissez-les dans le piège pour renforcer l’attractivité.\nMode d’emploi :\n\nPlacez votre ruchette-piège en hauteur, sur assise stable, à l’abri des heures les plus chaudes (éviter le plein soleil).\nVaporisez légèrement à 30 cm les parois, les cadres et la porte d’entrée de la ruchette.\nTous les 8 jours, renouvelez l’opération jusqu’à la capture.\nUne fois l’essaim capturé, transférez-le dans un rucher de quarantaine pour vérifier son état sanitaire et prévoir un traitement varroa.\nImportant : n’installez pas vos pièges à proximité d’un autre rucher que celui que vous exploitez.	45	0	8	0	https://www.thomas-apiculture.com/28360-thickbox_default/attire-essaims-charme-abeilles-thomas-vaporisateur-sans-gaz-200-ml.jpg	https://www.thomas-apiculture.com/28359-thickbox_default/attire-essaims-charme-abeilles-thomas-vaporisateur-sans-gaz-200-ml.jpg	https://www.thomas-apiculture.com/30198-thickbox_default/attire-essaims-charme-abeilles-thomas-vaporisateur-sans-gaz-200-ml.jpg		f		5	10	attire-essaims-charme-abeilles-thomas-200-ml	9	\N	0
223	Vaporisateur acide oxalique	🔶 Solution rapide et efficace contre le varroa\nLe vaporisateur d’acide oxalique est un équipement apicole indispensable pour le traitement des ruches. Il chauffe rapidement et permet de traiter une ruche en moins de 3 minutes, améliorant ainsi la productivité et la gestion de votre exploitation apicole.\n\n🔶 Qualité professionnelle et durabilité\nFabriqué en cuivre à haute conductivité thermique, plastique résistant et composants électroniques fiables, ce vaporisateur garantit une diffusion homogène de l’acide oxalique et une longue durée de vie, même en usage intensif.\n\n🔶 Améliore la santé des abeilles\nIdéal pour lutter contre le varroa, ce traitement contribue à assainir la ruche, renforcer la colonie et augmenter la production ainsi que la qualité du miel.\n\n🔶 Alimentation 12V pratique\nFonctionne avec une batterie 12V (voiture, moto, tracteur…), parfait pour une utilisation mobile sur le terrain.	280	1	11	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%206%20mai%202026,%2000_49_28.png	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%206%20mai%202026,%2000_47_59.png	https://api.apiculturegalai.tn/uploads/vaporisateur-acide-oxalique-scaled.webp		t	NEW	5	1	vaporisateur-acide-oxalique	9	\N	0
46	Grille rein en fer	râce à une grille à reine en métal que vous placez entre le corps et la hausse, vous empêchez votre reine de monter dans les cadres de hausses pour pondre. L’espacement de la grille à reine permet tout de même à vos ouvrières de circuler, seule la reine est  bloquée dans le corps.	15	-18	1	0	https://www.naturapi.com/media/catalog/product/cache/4f4313cdc60c7aede3fd454543dea906/_/d/_dsc5435_1.jpg	https://thumbs.nosto.com/quick/prestashop-0deac90a/8/2890/1df83d8c586063bbba0c0a32f6b0cd9a8bf30f3b1bc776e3666d81679d64416f/A		\N	f		\N	\N	grille-rein-en-fer	9	\N	0
115	Cage à reine blanc	Cette cage d’introduction pour reine abeille en plastique recyclable translucide est idéale pour le transport, l’expédition et l’introduction sécurisée des reines dans une colonie. Grâce à son format extra-plat, elle se glisse facilement entre deux cadres sans perturber la ruche.\n\nFabriquée en France, cette cage est robuste, facile à nettoyer et réutilisable, offrant une solution durable et pratique pour les apiculteurs professionnels comme amateurs. Un accessoire indispensable pour une gestion efficace des reines au rucher.	1	-12	5	0	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_k52kh0k52kh0k52k.png				f		5	10	cage-à-reine-blanc	9	\N	0
184	Extracteur de miel  2 cadres SAF	Extracteur de miel tangentiel 2 cadres Ø420 mm, cadre : D, manuel – SAXO\nAvec un tambour de 420 mm de diamètre et 600 mm de hauteur, l’appareil est parfait pour les petits ruchers fixes. Équipé de pieds stables (à assembler soi-même), l’extracteur de miel conserve une forme compacte tout en offrant une hauteur de travail confortable. Dans les modèles tangentiels, après l’extraction d’un côté du cadre, il faut le retourner pour extraire l’autre côté. L'entraînement manuel permet également de travailler en conditions de terrain, sans accès à l’électricité.	900	0	7	0	https://lyson.eu/7623-large_default/tangential-honey-extractor-2-frame-o420-mm-frame-db-manual-saxo.jpg	https://lyson.eu/7622-large_default/tangential-honey-extractor-2-frame-o420-mm-frame-db-manual-saxo.jpg	https://lyson.eu/7625-large_default/tangential-honey-extractor-2-frame-o420-mm-frame-db-manual-saxo.jpg	https://photo.lyson.com.pl/produkty/safnatura/SN_365-kosz.jpg	f		5	55	extracteur-de-miel--2-cadres-saf	9	5	0
81	Soufleur d'enfumoir 	Le souffleur d’enfumoir est une pièce essentielle de l’enfumoir utilisé en apiculture.\nIl sert à souffler l’air pour activer la combustion du combustible et produire de la fumée.\n\nLa fumée permet de calmer les abeilles, de réduire leur agressivité et de faciliter le travail de l’apiculteur lors des visites de la ruche (inspection, récolte du miel, entretien).	8	21	5	0	https://apicolalospedroches.com/images/maaah_003r-1.jpg				f		5	12	soufleur-d'enfumoir-	9	\N	0
183	Extracteur 4 électrique 	Cet extracteur de miel électrique est conçu pour les apiculteurs professionnels et amateurs exigeants. Fabriqué en acier inoxydable 304 (qualité alimentaire 18/10), il garantit une extraction hygiénique, rapide et sans altération de la qualité du miel.\n\nGrâce à son moteur puissant avec variateur de vitesse, cet extracteur offre un contrôle précis du processus d’extraction, permettant d’adapter la rotation selon le type de cadres et la viscosité du miel.\n\nSon design robuste avec renforts métalliques assure une excellente stabilité pendant l’utilisation, tandis que la cuve en inox poli facilite le nettoyage et prolonge la durée de vie de l’équipement.\n\n✅ Caractéristiques principales :\n✔️ Cuve en inox 304 alimentaire (anti-rouille)\n✔️ Moteur électrique performant avec contrôle de vitesse\n✔️ Structure renforcée pour plus de stabilité\n✔️ Extraction rapide et efficace du miel\n✔️ Entretien facile et hygiène garantie\n✔️ Idéal pour apiculteurs professionnels et amateurs\n🎯 Avantages :\nPréserve la qualité naturelle du miel\nGain de temps lors de la récolte\nUtilisation simple et sécurisée\nRésistant à l’humidité et à la corrosion	1250	4	7	900	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2030%20avr.%202026,%2010_21_05.png	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2030%20avr.%202026,%2010_21_13.png	https://api.apiculturegalai.tn/uploads/052ea059-4def-4c3f-802d-96c637cc7742.png	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_498k12498k12498k.png	t	NEW 	5	8	extracteur-4-électrique-	30	5	0
1	Botte apiculture 	Bottes jaunes en PVC pour rucher ou potager	24	11	5	25	https://api.apiculturegalai.tn/uploads/3d76abcc-be7a-4b15-bfdb-619ff63fa637.png	https://api.apiculturegalai.tn/uploads/Botte%20de%20travail%20blanche%20et%20jaune.png			t	New	5	66	botte-apiculture-	9	\N	0
152	Hero bio anti-varreo 	Protégez vos colonies avec HERO, la solution de référence pour le traitement de la varroase. Conçu spécifiquement pour la santé des abeilles, HERO garantit une efficacité maximale contre le Varroa tout en respectant l'intégrité de la ruche et la qualité du miel."	20	4	11	\N	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_1aalw41aalw41aal.png	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_ovh8elovh8elovh8.png			f	New	5	8	hero-bio-anti-varreo-	9	\N	0
154	Trappe à pollen avec plateau	La trappe à pollen avec plateau est un accessoire pratique pour la récolte du pollen tout en assurant le bon fonctionnement de la ruche. Elle se compose d’un cadre en bois solide, d’une grille perforée en plastique et d’un plateau amovible pour récupérer le pollen proprement.\n\nLa grille permet de détacher délicatement les pelotes de pollen des pattes des abeilles à l’entrée de la ruche, tandis que le plateau inférieur collecte le pollen en le protégeant de l’humidité et des impuretés. Le fond grillagé assure une bonne ventilation et empêche les abeilles d’accéder au pollen récolté.\n\nCaractéristiques :\n\nCadre en bois résistant\n\nGrille à pollen en plastique solide\n\nPlateau amovible facile à nettoyer\n\nBonne ventilation grâce au fond grillagé\n\nInstallation simple à l’entrée de la ruche\n\nAvantages :\n\nRécolte efficace du pollen\n\nProtection du pollen contre les saletés\n\nFacile à utiliser et à entretenir\n\nAdapté aux ruches standards\n\nUtilisation :\nInstaller la trappe à pollen à l’entrée ou sous la ruche. Le pollen tombe dans le plateau amovible qu’il suffit de retirer régulièrement pour la récolte.	48	30	1	0	https://api.apiculturegalai.tn/uploads/Composants%20d'apiculture%20sur%20fond%20clair.png	https://api.apiculturegalai.tn/uploads/Panneau%20de%20ventilation%20pour%20ruche.png	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%204%20mars%202026,%2020_43_03.png	https://api.apiculturegalai.tn/	f		5	105	trappe-à-pollen-avec-plateau	9	\N	0
27	Pot en verre carré (212ml)	Ce pot en verre 212 ml de forme carrée mettra en valeur votre production de miel, vos confitures et préparations culinaires. Il se ferme par une élégante capsule TO 66.	2.2	99	6	0	https://api.apiculturegalai.tn/uploads/1000038230.avif	https://api.apiculturegalai.tn/uploads/1000038228.avif	https://api.apiculturegalai.tn/uploads/1000038222.jpg	\N	f		4	30	pot-en-verre-carre-212ml	9	\N	0
120	Nourriseur cadre transparent GM	"Nourrisseur couvre-cadres Anel en plastique transparent – pratique pour nourrir vos abeilles sans ouvrir la ruche. Compatible avec les ruches Dadant et Langstroth, il facilite l’alimentation et le bien-être de vos colonies."	7.5	-11	1	0	https://api.apiculturegalai.tn/uploads/unnamed%20(1).jpg				f		5	88	nourriseur-cadre-transparent-gm	9	\N	0
90	Nourrisseur cadre transparent 1kg	Nourrisseur d’entrée PM en plastique avec réservoir 1 kg. Installation facile, visibilité du niveau de sirop, idéal pour les petites colonies. Ce nourrisseur d’entrée PM pour ruchette va vous simplifier la vie ! Facile à vérifier la contenance, cet objet vous aidera grandement.	5	9	1	\N	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_1ob6ca1ob6ca1ob6.png	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_muxyvxmuxyvxmuxy%20(2).png			f	New	4	8	nourrisseur-cadre-transparent-1kg	9	\N	0
116	Leve cadre pince 	Entièrement fabriqué en acier chromé haute résistance, ce lève-cadres pince apicole se distingue par sa solidité et sa durabilité. Son design ergonomique assure une prise en main confortable et permet de saisir, soulever et décoller facilement les cadres souvent collés aux parois de la ruche par la propolis.\n\nIndispensable pour les travaux de visite et de récolte, cet outil facilite la manipulation des cadres tout en réduisant l’effort. Un accessoire essentiel pour une apiculture pratique, efficace et agréable, adapté aussi bien aux apiculteurs débutants qu’aux professionnels.	25	-1	5	0	https://api.apiculturegalai.tn/uploads/9if7eflxsimcyym57z.png				f		5	10	leve-cadre-pince-	9	\N	0
107	Cadre d’élevage de reine	Idéal pour l'élevage de reines, ce cadron en bois Ruchéco est conçu pour le nucléi de fécondation Mini Plus.L'armature est indispensable pour soutenir la cire gaufrée. Le cadron est composé de fil inox.\nDeux cadres peuvent s'assembler pour n'en former qu'un seul grand.	1.5	49	4	0	https://catusse-apiculture.com/786-thickbox_default/cadre-d-elevage-dadant.jpg	https://rucherdelaurore.be/wp-content/uploads/2023/05/cadre-pour-mini-plus-file-emboitable-e1683441459161.jpg			f		5	10	cadre-d’élevage-de-reine	9	\N	0
85	Pate jaune	La « pâte jaune » dans l’apiculture peut faire référence à plusieurs choses : le pollen rapporté par les abeilles sur leurs pattes, la propolis une substance résineuse de couleur jaune ou brune, ou encore une pâte sucrée comme le candi, un aliment préparé pour nourrir les abeilles. Il peut aussi s’agir du frelon asiatique (Vespa velutina), bien qu’il soit généralement plus sombre et que ses pattes soient jaunes.	22	178	8	0	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_raeh4hraeh4hraeh.png				f		5	33	pate-jaune	9	\N	0
36	Gants en cuir qualité supérieure	Agréable et résistante, cette paire de gants en cuir de qualité supérieure est idéale pour la manipulation de vos ruches.\nLes gants sont constitués de cuir de vache et le manchon est en coton pour une finition parfaite.	15	82	5	0	https://www.apiculture.net/9742-large_default/gants-en-cuir-qualit-sup-rieure.jpg				t		5	12	gants-en-cuir-qualite-superieure	9	\N	0
25	Cadre en bois		24	995	4	0	https://www.apiculture.net/22204/x12-cadres-langstroth-hoffmann-avec-fils-horizontaux.jpg.pagespeed.ic.mSC9tYRWA2.jpg	https://apiculture-remuaux.fr/584-large_default/cadre-langstroth-hoffmann-file-horizontaux.webp	https://apiculture-remuaux.fr/584-home_default/cadre-langstroth-hoffmann-file-horizontaux.jpg	\N	f		4	88	cadre-en-bois	9	\N	0
108	Fil d'acier inoxydable 	Fil d'acier inoxydable pour l'outil de base de cadres de ruche d'abeille d'apiculture, fil d'équipement d'apiculture 0.5mm 250G	7.5	7	4	0	https://www.latiendadelapicultor.com/2743/bobine-de-fil-galvanise-1kg.jpg	https://cdn.manomano.com/images/images_products/22880890/P/128932850_2.jpg			f		5	10	fil-d'acier-inoxydable-	9	\N	0
7	Cire gaufrée d’abeille	La cire gaufrée d’abeille naturelle est un élément essentiel en apiculture moderne. Fabriquée à partir de cire d’abeille pure, elle présente un motif hexagonal précis qui sert de base aux cadres de ruche. Elle permet aux abeilles de construire rapidement des rayons solides pour le stockage du miel, du pollen et du couvain. Grâce à la cire gaufrée, la productivité de la ruche est améliorée et le travail de l’apiculteur est facilité, garantissant une meilleure gestion et un rendement optimal.	135	91	4	105	https://api.apiculturegalai.tn/uploads/Cire%20d'Abeille%20pure%20en%20détail.png	https://api.apiculturegalai.tn/uploads/Feuille%20de%20cire%20d'abeille%20en%20lumière.png		\N	t		4	30	cire-gaufrée-d’abeille	9	\N	0
32	Extracteur 3 cadre	Cet extracteur de miel manuel est conçu pour offrir une extraction simple, rapide et efficace du miel. Grâce à sa cuve en inox de diamètre 380 mm avec fond plat, il garantit une bonne stabilité et une hygiène optimale lors de l’utilisation.\n\nÉquipé d’une cage en inox robuste, il permet de maintenir les cadres en toute sécurité pendant l’extraction. Son couvercle en plexiglass offre une visibilité directe du processus, tandis que la manivelle supérieure assure une manipulation facile et fluide.\n\nLe système d’engrenage solide garantit une bonne transmission du mouvement, et le robinet en plastique permet une vidange propre et contrôlée du miel.\n\nCe modèle est vendu sans pieds, ce qui permet de le poser facilement sur une table ou un support stable selon vos besoins. Facile à utiliser et à nettoyer, il convient parfaitement aux apiculteurs débutants comme professionnels en Tunisie.\n\nComposition :\n\nCuve inox Ø380 mm à fond plat\nCouvercle en plexiglass\nCage en inox\nManivelle supérieure\nEngrenage résistant\nRobinet en plastique\n\nPoints forts :\n\nCompact et facile à installer\nUtilisation simple et rapide\nNettoyage facile\nIdéal pour petits ruchers\nAdapté aux apiculteurs en Tunisie	570	-1	7	450	https://api.apiculturegalai.tn/uploads/Design%20sans%20titre%20(22).png	https://api.apiculturegalai.tn/uploads/Design%20sans%20titre%20(24).png	https://api.apiculturegalai.tn/uploads/Design%20sans%20titre%20(21).png	https://api.apiculturegalai.tn/uploads/Design%20sans%20titre%20(33).png	f		4	20	extracteur-3-cadre	15	5	0
56	Bloc rein plastique 	 ce kit de cage de reine à tambour est conçu pour un kit complet d'alimentation de la reine des abeilles pour élever les abeilles facilement et efficacement.	2.5	286	5	0	https://m.media-amazon.com/images/I/41WhieNliQL._AC_SL500_.jpg	https://api.apiculturegalai.tn/uploads/cage-a-reine-ronde-outil-elevage-de-reine-abeilles.jpg			f		\N	\N	bloc-rein-plastique-	9	\N	0
10	Enfumoir grand taille	Enfumoir pour apiculteur de grande taille, conçu pour une utilisation prolongée et efficace lors des visites de ruches importantes.	30	46	5	0	https://s.alicdn.com/@sc04/kf/Hf4425c51327945aeb98f959fdc1a80e0q.jpg?avif=close&webp=close	https://s.alicdn.com/@sc04/kf/H1c324eaf43fe442b89a2ef3aabbfcbd3n.jpg?avif=close&webp=close	https://s.alicdn.com/@sc04/kf/H0a29f505645a44dd8e4b3f878990ec362.jpg?avif=close&webp=close	https://s.alicdn.com/@sc04/kf/He31a858d9bc4407095a4df72c9ec9761B.png?avif=close&webp=close	f		\N	\N	enfumoir-grand-taille	9	\N	0
133	Combnaison Demi avec Voile Carré	La veste d’apiculture blanche avec voile carré intégré est la solution idéale pour les apiculteurs recherchant une protection efficace et confortable lors des visites de ruches. Pratique et légère, elle permet de travailler en toute sécurité tout en gardant une excellente liberté de mouvement.\n\n🛡️ Protection optimale du haut du corps\n\nCette veste apicole protège la tête, le visage, le cou et le haut du corps contre les piqûres d’abeilles.\nLe voile carré renforcé avec cadre rigide assure une visibilité claire et une bonne ventilation pendant le travail au rucher.\n\nLes poignets élastiques empêchent l’intrusion des abeilles et garantissent une protection maximale.\n\n👨‍🌾 Confort et praticité\n\nCoupe ample et confortable\n\nGrande poche frontale pratique pour outils\n\nTissu résistant et respirant\n\nFacile à enfiler et à retirer\n\nIdéale pour climat chaud en Tunisie\n\n🎯 Idéale pour :\n\n✔ Visite rapide des ruches\n✔ Récolte du miel\n✔ Intervention légère au rucher\n✔ Apiculteurs amateurs et professionnels	35	-4	5	0	https://api.apiculturegalai.tn/uploads/631814490_906889502308064_2291659796444828696_n.jpg				f		4	33	combnaison-demi-avec-voile-carré	9	3	0
153	Thym kill varreo	"Thym Kill Varroa" est une solution innovante et naturelle conçue spécifiquement pour la lutte intégrée contre le parasite Varroa destructor dans les ruches. Formulée à base d'extraits naturels de thym (thymol) et d'autres huiles essentielles rigoureusement sélectionnées, cette solution offre une alternative efficace aux traitements chimiques conventionnels.	30	1	11	0	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_1fixxk1fixxk1fix.png	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_mk8wh0mk8wh0mk8w.png			f	New	4	33	thym-kill-varreo	9	\N	0
165	Lève-cadre et pince cadre multifonction	Le lève-cadre et pince cadre multifonction est un outil essentiel pour tout apiculteur, débutant ou professionnel. Cet outil 2 en 1 est spécialement conçu pour faciliter la manipulation des cadres dans la ruche en toute sécurité.\n\nGrâce à sa double fonction, il permet de :\ndécoller facilement les cadres collés par la cire ou la propolis\nsaisir les cadres fermement sans les abîmer\ntravailler avec plus de précision et moins d’effort\n\nFabriqué en acier inoxydable de haute qualité, ce lève-cadre garantit une excellente résistance à la corrosion et une longue durée de vie, même en utilisation intensive.\nSa conception ergonomique offre une prise en main confortable, idéale pour un travail efficace au rucher.\nAvantages du produit :\nOutil multifonction 2 en 1 (lève-cadre + pince cadre)\nMatériau robuste et durable (acier inoxydable)\nFacilite le travail de l’apiculteur\nAdapté à tous types de ruches\nGain de temps et meilleure efficacité	21	46	5	0	https://api.apiculturegalai.tn/uploads/Outil%20de%20préhension%20métallique%20sur%20fond%20blanc.png	https://api.apiculturegalai.tn/uploads/Support%20de%20réchaud%20portable%20en%20acier%20inoxydable%20(1).png			t	New	4	55	lève-cadre-et-pince-cadre-multifonction	9	\N	0
106	Nucleus d'élevage reine 	La ruchette d’élevage de reine est un équipement apicole spécialement conçu pour la production, la fécondation et le démarrage de jeunes reines. De petite taille et facile à manipuler, elle permet de créer un environnement contrôlé et stable favorisant l’acceptation des cellules royales et le bon développement de la reine.\n\nFabriquée généralement en bois, polystyrène ou plastique alimentaire, la ruchette assure une bonne isolation thermique et une ventilation adaptée. Elle peut contenir quelques cadres (souvent 2 à 6) ou des compartiments séparés, ce qui permet d’élever plusieurs reines simultanément tout en optimisant la gestion du cheptel.\n\nIdéale pour les apiculteurs professionnels et amateurs, la ruchette d’élevage de reine contribue à améliorer la qualité des colonies, renouveler les reines et renforcer la productivité du rucher. 🐝	35	9	1	0	https://api.apiculturegalai.tn/uploads/WhatsApp%20Image%202026-01-20%20at%2016.54.01%20(1).jpeg	https://api.apiculturegalai.tn/uploads/97d3868e-7568-4bfd-93c2-de331896ed89.jpg	https://api.apiculturegalai.tn/uploads/a0a9b603-eeba-43f4-9d6b-e6ab42da4f12.jpg		f		5	10	nucleus-d'élevage-reine-	9	\N	0
185	Extracteur de miel cadres SAF	Extracteur de miel tangentiel, 3 cadres, Ø525mm, cadre : DWP, manuel – REGATTA\nExtracteur de miel manuel conçu pour être utilisé avec des cadres Dadant et Warszawski poszerzany. Grâce à un tambour de 525 mm de diamètre et de 600 mm de hauteur, il convient aussi bien aux petites ruchers qu’aux apiculteurs plus expérimentés. Des pieds stables (à monter soi-même) assurent un travail confortable et sûr. Dans les modèles tangentiels, les cadres doivent être retournés pour extraire le miel des deux côtés. L’entraînement manuel permet une autonomie totale – même sur le terrain, sans accès à l’électricité.	1050	0	7	0	https://lyson.eu/7630-large_default/tangential-honey-extractor-3-frame-o525-mm-frame-db-layens-manual-regata.jpg	https://lyson.eu/7631-large_default/tangential-honey-extractor-3-frame-o525-mm-frame-db-layens-manual-regata.jpg	https://lyson.eu/7632-large_default/tangential-honey-extractor-3-frame-o525-mm-frame-db-layens-manual-regata.jpg	https://photo.lyson.com.pl/produkty/safnatura/SN_74B-kosz.jpg	f		5	44	extracteur-de-miel-cadres-saf	9	5	0
249	Cadre Patisse new 2026 	Cadre de ruche déjà construit et prêt à l’utilisation, spécialement conçu pour aider les apiculteurs à accélérer la collecte du miel 🍯\n\n✅ Cadre vide de miel\n✅ Structure naturelle déjà formée par les abeilles\n✅ Facilite le remplissage rapide du miel\n✅ Gain de temps pour l’apiculteur\n✅ Idéal pour développer rapidement la production	5.5	100	4	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2021%20mai%202026,%2012_17_12.png	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2021%20mai%202026,%2012_18_16.png			f	NEW	5	73	cadre-patisse-new-2026-	9	\N	0
26	Plateau Ruches 	Parfaitement adapté à nos régions tempérées, ce fond de ruche Warré contribue à isoler la colonie des variations de température, des courants d'air et de l'humidité. Ce plateau de ruche est réversible avec un côté hiver et un côté été.	15	96	1	0	https://www.latiendadelapicultor.com/5781/plancher-fond-en-bois.jpg	https://thumbs.nosto.com/quick/prestashop-0deac90a/8/5298/5f7f2b0e781641bb786689b2d3580af3ce8f5ec64dc0695112d62850aabb8bd2/A	https://propolis-etc.ca/wp-content/uploads/2023/11/RB-1120-propolis-etc-plateau-de-fond-parrafine-reversible-bottom-board-waxed-1024x1024-2.jpg	\N	f		\N	\N	plateau-ruches	9	\N	0
151	Thymol 100 gr	La poudre de thymol, essences naturelles, est présente dans les arômes essentiels du thym.\nLe thymol se caractérise par son pouvoir désinfectant et fongicide.\nCet évaporateur de thymol en plastique est utilisé pour aromatiser avec du thymol en poudre .\n\nDisponible en paquets de 100gr en vrac et en boîtes de 60 unités.\n\nAvertissement.\nLe thymol appliqué en poudre ou en comprimés n'est pas autorisé en Espagne pour le traitement du varroa, contrairement au Thymovar, etc.\n\nApícola los pedroches décline toute responsabilité en cas d'utilisation incorrecte de ce produit.\n\nAvant toute utilisation, nous vous invitons à demander conseil à votre association d'apiculteurs la plus proche ou à consulter la législation de votre communauté autonome ou de votre pays.\n\nLe thymol ne doit être appliqué qu'en tant qu'arôme ou essence naturel, désinfectant ou fongicide	38	0	11	0	https://apicolalospedroches.com/images/image002.jpg	https://apicolalospedroches.com/images/timol-100-gr-apidroches.jpg	https://apicolalospedroches.com/images/comprar-timol-100-gr-apidroches.jpg	https://apicolalospedroches.com/images/tienda-timol-100-gr-apidroches.jpg	f	New	4	72	thymol-100-gr	9	\N	0
47	Charme d'abeille Abejar		20	6	8	0	https://apicolasalsol.com/sec_din/archivos/imgs/16045051345991.jpg	https://api.apiculturegalai.tn/uploads/charme-d-abeille-abejar.jpg	\N	\N	f		\N	\N	charme-d'abeille-abejar	9	\N	0
24	Nourrisseur couvre-cadres	Prêt à l’emploi, ce nourrisseur couvre-cadres permettra à vos abeilles de s'approvisionner pendant l’hiver.\n\nÉconomique et léger ce nourrisseur couvre-cadres en plastique comprend deux bacs séparés pour une capacité de 7 litres au total. Ils vous permettront d’utiliser de la nourriture liquide ou solide	13	99	1	0	https://www.apiculture.net/9888-thickbox_default/nourrisseur-couvre-cadres-nicot-dadant-10-cadres.jpg	\N	\N	\N	f		4.5	50	nourrisseur-couvre-cadres	9	\N	0
38	Lot de 3 hausse 	lot de 3 hausse offre une solidité remarquable grâce à un assemblage à tenons. Conçu avec des finitions soignées et en bois de pin maritime non traité, il assure un environnement naturel pour vos abeilles et est prêt à l'emploi avec crémaillères et bande intercadre.	63	293	1	0	https://www.apiculture.net/22131-large_default/lot-de-3-corps-warre-fabriques-en-france-tenons.jpg	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_fpvqztfpvqztfpvq.png	\N	\N	f		\N	\N	lot-de-3-hausse-	9	\N	0
186	Moteur 4 cadre chinois	🐝 Moteur Extracteur de Miel 4 Cadres – Vitesse Réglable (Modèle Chinois)\n\nAméliorez votre production de miel avec ce moteur électrique pour extracteur 4 cadres, conçu pour offrir une extraction rapide, efficace et sans effort. Équipé d’un variateur de vitesse, il permet un contrôle précis pour protéger les cadres et garantir un rendement optimal.\n\nIdéal pour les apiculteurs professionnels et amateurs en Tunisie, ce moteur est robuste, fiable et facile à installer sur la plupart des extracteurs de miel.\n\n✅ Caractéristiques :\n\n✔️ Compatible avec extracteur 4 cadres\n✔️ Variateur de vitesse intégré\n✔️ Fonctionnement stable et silencieux\n✔️ Installation rapide et facile\n✔️ Excellent rapport qualité/prix\n\n📦 Utilisation :\n\nParfait pour l’extraction du miel dans les exploitations apicoles de petite et moyenne taille.	550	1	7	450	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%204%20mai%202026,%2023_24_36.png				f		5	0	moteur-4-cadre-chinois	9	5	0
73	Nourisseur cadre 	Ce nourrisseur en plastique remplace un cadre de hausse Dadant. Sa matière en plastique permet de d'approvisionner les abeilles en nourriture pendant l'hiver.\n\nCe modèle de nourrisseur est idéal afin d'éviter le pillage de la nourriture et d'économiser l'énergie des abeilles.	7	-5	5	0	https://api.apiculturegalai.tn/uploads/NOURISSEUR%20CADRE.webp				f		4	48	nourisseur-cadre-	9	\N	0
224	Porte d’entrée réglable	Une porte d’entrée réglable est équipée de gonds (charnières) tridimensionnels permettant un ajustement précis en hauteur, en largeur et en profondeur. Ce système de réglage assure un alignement parfait de la porte et une fermeture fluide.\n\nGrâce à des vis de réglage accessibles avec une clé Allen, il est possible de corriger facilement les défauts d’installation ou d’usure, tels que :\n\nfrottement de la porte contre le cadre\nmauvaise étanchéité et courants d’air\ndifficulté de fermeture\n\n🔧 Avantages :\n\nAjustement rapide et précis\nAmélioration de l’isolation thermique et phonique\nFermeture souple et sécurisée\nSolution durable sans démontage\n\n💡 Idéal pour : portes d’entrée modernes, rénovation, optimisation de l’étanchéité et du confort intérieur.	3.5	92	1	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%206%20mai%202026,%2023_27_45.png	https://api.apiculturegalai.tn/uploads/115-scaled.webp			f	NEW	5	88	porte-d’entrée-réglable	9	\N	0
118	Lève-cadre pour ruche	Le lève-cadre pour abeilles est un outil essentiel pour tous les apiculteurs, débutants comme professionnels. Conçu pour saisir, soulever et retirer facilement les cadres de ruche, il permet de travailler avec précision tout en réduisant l’effort et le risque d’écrasement des abeilles.\n\nDoté de poignées ergonomiques antidérapantes plastique et d’une structure en acier galvanisé résistant, ce lève-cadre assure une excellente prise en main et une longue durée de vie, même en usage intensif. Son mécanisme de serrage automatique garantit une manipulation stable et sécurisée des cadres chargés de miel.\n\nIdéal pour l’inspection des ruches, la récolte du miel et l’entretien régulier, cet outil améliore le confort de travail et la productivité de l’apiculteur.	15	5	5	0	https://api.apiculturegalai.tn/uploads/Outil%20de%20prise%20de%20cadre%20apicole.png				f		4	19	lève-cadre-pour-ruche	9	\N	0
37	Extracteur de miel économique 2 cadres	Découvrez la solution parfaite pour les apiculteurs débutants avec quelques ruches, avec notre option la plus économique, l'extracteur de miel manuel en plastique, spécialement conçu pour 2 cadres . Cet extracteur, idéal pour les budgets serrés, combine efficacité et simplicité, vous permettant d'obtenir du miel pur avec un effort minimal.	200	2	7	0	https://www.naturapi.com/media/catalog/product/cache/1b5e2909c45d3528b0f63e74a3d78eb0/6/3/631008.jpg	https://www.naturapi.com/media/catalog/product/cache/1b5e2909c45d3528b0f63e74a3d78eb0/6/3/631008-2.jpg	https://www.naturapi.com/media/catalog/product/cache/1b5e2909c45d3528b0f63e74a3d78eb0/6/3/631008-3.jpg	https://www.naturapi.com/media/catalog/product/cache/1b5e2909c45d3528b0f63e74a3d78eb0/6/3/631008-4.jpg	t		4	22	extracteur-de-miel-économique-2-cadres	15	5	0
70	Maturateur inox miel fond plat 100 kg	MATURATEUR INOX\n\ncapacité Kg.100\navec soudures au TIG\nen acier inoxydable aisi 304\ncouvercle en polycarbonate avec bouton\nrobinet alimentaire en nylon vis en acier inoxydable 40 mm joints en silicone Art.11\nDiamètre 370 mm	560	2	7	460	https://api.apiculturegalai.tn/uploads/1.jpg	https://api.apiculturegalai.tn/uploads/2.jpg	https://api.apiculturegalai.tn/uploads/3.jpg		t		5	10	maturateur-inox-miel-fond-plat-100-kg	15	6	0
44	trappeuse poullen plastique	Trappe à pollen en plastique pour les ruches : fixes en bois, en plastique ANEL ou les ruches en polystyrène Paradise. Elle n’est pas adaptée aux ruches de transhumance en bois.	32	27	1	0	https://www.latiendadelapicultor.com/7554/trappe-a-pollen-en-plastique.jpg				f		\N	\N	trappeuse-poullen-plastique	9	\N	0
15	Lève-cadres pince	Entièrement fabriqué en acier chromé et d'une grande solidité, ce lève-cadres pince, au design favorisant une excellente prise en main, saisie et détache sans efforts les cadres collés sur les parois de la ruche.\nC'est un outil apicole qui contribue à l'exercice d'une apiculture pratique et agréable.	25	5	5	0	https://www.apiculture.net/10975-thickbox_default/leve-cadres-pince.jpg	https://api.apiculturegalai.tn/uploads/leve-cadres-pince-swienty-premium.jpg	\N	\N	f		\N	\N	leve-cadres-pince	9	\N	0
63	Zigzages fils cadre 	Le tendeur de fil pour cadres de ruches est un outil indispensable pour les apiculteurs souhaitant améliorer la tension et la stabilité des fils dans leurs cadres, garantissant des résultats propres et professionnels. Fabriqué avec des matériaux légers mais durables, il se compose d’un corps en plastique résistant, de pignons en alliage d’aluminium et d’un ressort en acier à compression, idéal pour obtenir une tension précise sur tout type de cadre : Layens, Langstroth, Dadant Blatt ou même hausses.	20	25	5	0	https://www.latiendadelapicultor.com/2752-large_default/tendeur-de-fil-de-cadres-en-plastique.webp	https://www.latiendadelapicultor.com/2753-large_default/tendeur-de-fil-de-cadres-en-plastique.webp	https://www.latiendadelapicultor.com/4906-large_default/tendeur-de-fil-de-cadres-en-plastique.webp	\N	f		\N	\N	zigzages-fils-cadre-	9	\N	0
97	Combinaison d’apiculteur en maille aérée	Cette combinaison d’apiculteur en maille ventilée est conçue pour offrir une protection optimale contre les piqûres d’abeilles tout en garantissant un confort maximal au rucher. Fabriquée en maille respirante de haute qualité, elle permet une excellente circulation de l’air, idéale pour les travaux d’apiculture en été ou lors des longues interventions.\n\nLe voile intégral intégré avec armature assure une visibilité claire et une protection efficace du visage et du cou. Les poignets et la taille ajustables offrent un maintien sécurisé et une adaptation parfaite à toutes les morphologies. Cette tenue d’apiculture professionnelle convient aussi bien aux apiculteurs débutants qu’aux apiculteurs confirmés, pour la gestion des ruches, la récolte du miel et l’entretien du rucher.\n\nMots-clés intégrés : combinaison apiculteur, combinaison d’apiculture, tenue apiculture, protection apiculteur, combinaison abeilles, voile apiculteur, équipement apiculture, vêtements apiculteur.	209	7	5	\N	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_vepo85vepo85vepo.png				f		4	5	combinaison-d’apiculteur-en-maille-aérée	9	4	0
225	Enfumoir Inox avec souffleur plastique 	L’enfumoir apicole inox est un équipement indispensable pour tout apiculteur professionnel ou amateur. Conçu en acier inoxydable de haute qualité, cet enfumoir pour abeilles permet de produire une fumée efficace afin de calmer les abeilles pendant les visites de ruches, la récolte du miel ou l’entretien des colonies.\n\nGrâce à son soufflet ergonomique renforcé, cet enfumoir assure une excellente circulation de l’air et une combustion durable. Sa grille de protection métallique réduit les risques de brûlure et améliore la sécurité d’utilisation.\n\nCaractéristiques :\nFabrication en acier inoxydable résistante à la chaleur\nSoufflet robuste haute qualité\nProtection extérieure anti-brûlure\nProduction de fumée régulière et efficace\nFacile à utiliser et à nettoyer\nConvient aux ruches modernes et traditionnelles\nUtilisation :\n\nCet enfumoir apicole professionnel est idéal pour :\n\nInspection des ruches\nRécolte du miel\nEntretien des abeilles\nTravaux d’apiculture en toute sécurité\nPourquoi choisir cet enfumoir ?\n\nCet accessoire d’apiculture combine durabilité, confort et performance. Sa conception solide garantit une longue durée de vie, même avec une utilisation intensive. Il convient parfaitement aux apiculteurs en Tunisie recherchant un matériel apicole fiable et efficace.	40	33	5	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%206%20mai%202026,%2023_34_04.png	https://api.apiculturegalai.tn/uploads/Enfumoir-Inox-scaled.webp			f	NEW	5	3	enfumoir-inox-avec-souffleur-plastique-	9	\N	0
144	Porte d’entrée réglable	Une porte d’entrée réglable est une porte équipée de gonds tridimensionnels (ou fiches réglables 3D) permettant un ajustement précis de l’alignement, de la hauteur et de la compression des joints d’étanchéité. Grâce à un système de vis accessible avec une clé Allen, il est possible de régler facilement la porte pour corriger un affaissement, supprimer les frottements contre le cadre ou améliorer la fermeture.\n\nCe type de réglage optimise l’isolation thermique et phonique, réduit les courants d’air et prolonge la durée de vie de la porte d’entrée. La porte d’entrée réglable constitue ainsi une solution efficace pour garantir une fermeture fluide, une meilleure étanchéité et un confort optimal au quotidien.	2.5	37	1	0	https://www.cdiscount.com/pdt2/6/2/7/1/700x700/vge7369908852627/rw/garde-coulissante-de-porte-d-abeille-2-pieces-abei.jpg	https://m.media-amazon.com/images/I/61lbTlQ+OaL._AC_UF1000,1000_QL80_.jpg	https://m.media-amazon.com/images/I/61v3C4XPdML._AC_SX569_.jpg	https://m.media-amazon.com/images/I/71cJMLmMF5L._AC_SX569_.jpg	f		5	10	porte-d’entrée-réglable	9	\N	0
52	Porte d'entreé 	MATÉRIAU PLASTIQUE: Le protège-porte de la ruche est fait d'un excellent plastique, léger et , résistant à la corrosion et aux rayures.\nDOUBLE PORTE COULISSANTE: La porte de protection de la ruche est conçue avec deux portes coulissantes, ce qui la rend facile à utiliser et offre une meilleure protection.\nInstallation facile : y compris 2 protections d'entrée de ruche, avec un design raisonnable, facile à installer et à démonter, simple et pratique.\nTAILLE RAISONNABLE: Le protège-ruche a une longueur suffisante avec une largeur de 4 cm, facile à installer et à retirer, a une structure stable et fiable.\nOBJECTIF PRINCIPAL: Les protections coulissantes de la ruche sont principalement utilisées pour contrôler les abeilles intérieures et extérieures, aidant à empêcher les abeilles de s'échapper.	3	21	1	0	https://www.icko-apiculture.com/media/catalog/product/image/10853f898/porte-d-entree-en-plastique-reversible-420x50-mm.jpg	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_w24lvnw24lvnw24l%20(1).png			f		\N	\N	porte-d'entreé-	9	\N	0
166	Demi combinaison avec voile ovale – Importée du Pakistan 🇵🇰	Demi combinaison apiculture avec voile ovale – Importée du Pakistan 🇵🇰\n\nCette demi combinaison d’apiculture est idéale pour les apiculteurs à la recherche de confort et de protection au quotidien. Conçue avec un tissu léger et مقاوم، elle offre une excellente liberté de mouvement tout en assurant une protection efficace contre les piqûres.\n\nLe voile ovale garantit une visibilité claire et un espace confortable autour du visage, réduisant le contact direct avec le filet. Son design pratique avec fermeture éclair solide et poches frontales facilite l’utilisation sur le terrain.\n\nLes poignets élastiques avec attache au doigt assurent un maintien optimal et empêchent l’entrée des abeilles, pour une sécurité maximale pendant le travail.\n\nCaractéristiques :\n\nVoile ovale pour meilleure visibilité\nTissu léger et résistant\nFermeture éclair robuste\nPoches pratiques\nPoignets élastiques avec maintien\n\nOrigine : Importé du Pakistan 🇵🇰	119	10	5	0	https://api.apiculturegalai.tn/uploads/Costume%20apicole%20sur%20mannequin%20blanc.png	https://api.apiculturegalai.tn/uploads/Costume%20d'apiculture%20sur%20mannequin.png	https://api.apiculturegalai.tn/uploads/Mannequin%20en%20combinaison%20de%20protection%20apicole.png	https://api.apiculturegalai.tn/uploads/Photo%20produit%20d'une%20veste%20blanche.png	f	New	5	39	demi-combinaison-avec-voile-ovale-–-importée-du-pakistan-🇵🇰	9	4	0
158	Chapeau d'abeille Mode Chapeau de cowboy apiculteur	Protégez-vous efficacement lors de vos travaux apicoles grâce à ce chapeau d’apiculteur avec voile de protection intégré. Conçu pour offrir sécurité, confort et visibilité optimale, il est un accessoire indispensable pour tous les apiculteurs, débutants comme professionnels.\n\nLe chapeau est fabriqué en matière légère et respirante, permettant une bonne circulation de l’air pendant le travail au rucher. Son voile en maille fine protège efficacement le visage et le cou contre les piqûres d’abeilles tout en garantissant une excellente visibilité.\n\nGrâce à sa structure rigide autour du visage, le voile reste bien éloigné de la peau pour éviter tout contact avec les abeilles. La fermeture ajustable en bas permet de fixer facilement le voile à une combinaison ou un vêtement de protection.\n\nCaractéristiques :\n\nChapeau d’apiculture avec voile de protection complet\n\nMaille fine pour une protection maximale contre les abeilles\n\nBonne visibilité pendant le travail\n\nMatière légère et confortable\n\nStructure rigide pour maintenir le voile loin du visage\n\nSystème de fixation pratique en bas\n\nUtilisation :\nIdéal pour l’inspection des ruches, la récolte du miel et toutes les activités liées à l’apiculture.\n\n✔ Protection efficace\n✔ Confort optimal\n✔ Accessoire essentiel pour apiculteurs	25	-1	5	0	https://api.apiculturegalai.tn/uploads/Capture%20d’écran%202026-03-10%20234322.png	https://api.apiculturegalai.tn/uploads/Capture%20d’écran%202026-03-10%20234335.png	https://api.apiculturegalai.tn/uploads/Capture%20d’écran%202026-03-10%20234406.png	https://api.apiculturegalai.tn/uploads/Capture%20d’écran%202026-03-10%20234446.png	t	New	4	9	chapeau-d'abeille-mode-chapeau-de-cowboy-apiculteur	9	\N	0
62	Tarmis inox 	Obtenez un miel clair et pur grâce à ce filtre à miel à double tamis, l’outil indispensable de tout apiculteur. Sa fabrication en acier inoxydable de haute qualité garantit une grande résistance et une efficacité optimale, que vous soyez débutant ou professionnel.	50	-5	7	0	https://www.mat-apiculture.fr/1902-large_default/tamis-inox-a-coulisse-double-filtration-du-miel.jpg	https://m.media-amazon.com/images/I/91DKkcicfDL._AC_SX679_.jpg	\N	\N	f		\N	\N	tarmis-inox-	9	\N	0
159	Léve cadre jaune 	Le lève-cadre est un outil essentiel pour tout apiculteur. Fabriqué en métal solide avec un revêtement résistant, il permet de décoller facilement les cadres collés par la propolis et de manipuler les éléments de la ruche en toute sécurité. Grâce à sa forme ergonomique et son crochet pratique, il facilite le soulèvement des cadres sans abîmer la ruche ni déranger excessivement les abeilles.\n\nCet outil est conçu pour offrir force, précision et durabilité, ce qui le rend idéal pour les travaux d’inspection, de récolte de miel et d’entretien des ruches.	15	9	5	0	https://api.apiculturegalai.tn/uploads/Crochet%20mural%20jaune%20sur%20fond%20blanc.png				f		5	10	léve-cadre-jaune-	9	\N	0
168	Combinaison ovale complet 	Combinaison ovale complète de haute qualité, idéale pour la protection lors des travaux d’apiculture. Confortable et résistante, elle assure une excellente protection contre les piqûres d’abeilles. Parfaite pour les apiculteurs débutants et professionnels.	40	15	5	0	https://api.apiculturegalai.tn/uploads/660438740_948310984832582_6855761094226281227_n.jpg	https://api.apiculturegalai.tn/uploads/661478177_948311584832522_7954591644985365841_n.jpg			f		88	5	combinaison-ovale-complet-	9	3	0
226	 Porte d’entrée simple	Une porte d’entrée à charnières est une porte qui s’ouvre et se ferme grâce à un système de charnières, aussi appelées paumelles pour les portes extérieures. Ces éléments de quincaillerie relient solidement le vantail (la partie mobile de la porte) au dormant (le cadre fixe), assurant une rotation fluide autour d’un axe vertical.\n\nSelon le modèle, la porte peut être équipée de charnières invisibles pour un design moderne et élégant, ou de charnières renforcées et réglables offrant une meilleure sécurité, stabilité et durabilité. Ce type de porte combine esthétique, confort d’utilisation et protection optimale pour l’habitation.	3	44	1	0	https://api.apiculturegalai.tn/uploads/7e134673-4ba6-4cac-8738-6f2314ce965b.png	https://api.apiculturegalai.tn/uploads/146-scaled.webp			f	NEW	5	33	-porte-d’entrée-simple	9	\N	0
227	Zigzag fer	Le zigzag en fer est un accessoire métallique robuste conçu pour offrir une excellente résistance et une longue durée de vie. Grâce à sa forme en zigzag, il assure une fixation stable et un maintien efficace dans différentes utilisations industrielles, agricoles ou de construction. Fabriqué en acier de haute qualité, il résiste à la pression, à l’usure et aux conditions extérieures, tout en garantissant une installation simple et pratique	15	44	1	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%206%20mai%202026,%2010_35_13.png				f		5	0	zigzag-fer	9	\N	0
92	Réfractomètre à lecture directe	Garantissez la qualité de votre miel grâce au réfractomètre Analitik.\nCet appareil de haute précision, pratique et facile à utiliser, permet de mesurer instantanément le taux d’humidité du miel. Livré déjà étalonné, il est prêt à l’emploi dès la première utilisation. Indispensable pour tout apiculteur, il vous aide à assurer une bonne conservation et une cristallisation maîtrisée, en maintenant un taux d’humidité idéal inférieur à 17,5 %.	350	3	7	250	https://api.apiculturegalai.tn/uploads/61UwUnGMPwL._AC_CR0,0,0,0_SX480_SY360_.jpg	https://api.apiculturegalai.tn/uploads/61yPL-tynfL._AC_CR0,0,0,0_SX480_SY360_.jpg	https://api.apiculturegalai.tn/uploads/61h1trNNKEL._AC_CR0,0,0,0_SX480_SY360_.jpg	https://api.apiculturegalai.tn/uploads/71XTeU01N4L._AC_CR0,0,0,0_SX480_SY360_.jpg	f		4	8	réfractomètre-à-lecture-directe	9	\N	0
102	Promotor L Apis 1 litre	Le promoteur L 47 est un composé liquide contenant une multitude de vitamines et d'acides aminés sous forme solubilisée, qui agit comme un complément à ajouter au sirop pour stimuler la colonie	130	-1	8	0	https://api.apiculturegalai.tn/uploads/promotor-l-47-1-litre.webp				f		5	10	promotor-l-apis-1-litre	9	\N	0
124	Kit Jenter Complet pour Élevage de Reines	Le Kit Jenter d’élevage de reines est un système professionnel conçu pour faciliter la production de reines de haute qualité, sans manipulation directe des larves. Très apprécié par les apiculteurs, ce kit permet un élevage précis, propre et efficace, idéal pour améliorer la génétique des colonies et renforcer les ruchers.\n\nGrâce à sa méthode innovante, le système Jenter offre une alternative moderne au greffage traditionnel, en assurant une meilleure réussite dans la création de cellules royales.\n\nCe kit complet contient tous les accessoires nécessaires pour démarrer rapidement l’élevage : plaque de ponte, supports de cupules, tubes de protection et éléments de fixation. Il convient parfaitement aux apiculteurs amateurs comme professionnels.\n\n✅ Avantages du Kit Jenter :\n\nÉlevage de reines sans greffage manuel\nMéthode simple, propre et très efficace\nMatériel durable et réutilisable\nIdéal pour la sélection et multiplication des colonies\nKit complet prêt à l’emploi\n\n🎯 Utilisation recommandée :\n\nProduction de reines fécondes\nCréation de cellules royales\nRenforcement des essaims\nApiculture professionnelle et moderne	450	0	5	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%203%20févr.%202026,%2022_44_51.png	https://api.apiculturegalai.tn/uploads/49781.jpg			f		5	88	kit-jenter-complet-pour-élevage-de-reines	9	\N	0
114	Pack Boost Abeilles	🔥 OFFRE SPÉCIALE APICULTEURS 🔥\n\nBoostez la santé de vos colonies et facilitez le retour des abeilles à la ruche avec ce pack indispensable 🐝\n\n✅ BoosterBee – Complément nutritif pour renforcer les abeilles\n✅ Abejar – Spray olfactif pour aider les abeilles à retrouver leurs ruches\n\n💥 Prix promo : 139 DT seulement\n❌ Au lieu de 160 DT\n💰 Économisez 21 DT\n\n📦 Idéal pour :\n✔️ Renforcer les colonies\n✔️ Améliorer la vitalité des abeilles\n✔️ Optimiser la gestion du rucher	160	4	9	139	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2026%20janv.%202026,%2008_08_51.png				f		5	20	pack-boost-abeilles	9	\N	0
23	 Ruchette à tenons Dadant 5 cadres	La ruchette Dadant 6 cadres avec aération totale est idéale pour accueillir un essaim artificiel ou naturel. Elle offre un environnement sain et bien ventilé, assurant confort et sécurité à votre jeune colonie d'abeilles.	45	1	1	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%201%20avr.%202026,%2021_48_57.png	https://api.apiculturegalai.tn/uploads/Boîte%20en%20bois%20avec%20cadre%20naturel.png	https://api.apiculturegalai.tn/uploads/Boîte%20à%20ruche%20blanche%20et%20bois%20naturel.png	\N	f	New	5	52	-ruchette-à-tenons-dadant-5-cadres	9	\N	0
28	 Pots en verre carré 250 g (314 ml) 	Ce pot en verre 314 ml de forme carrée mettra en valeur votre production de miel, vos confitures et préparations culinaires. Il se ferme par une élégante capsule	2.5	1994	6	0	https://api.apiculturegalai.tn/uploads/1000038224.avif	https://api.apiculturegalai.tn/uploads/1000038225.avif	\N	\N	f		4	88	pots-en-verre-carre-250-g-314-ml	9	\N	0
3	Hausse Riche 	Housse en bois composant en 10 cadre 	43	44	1	34	https://ruchetadla.ma/wp-content/uploads/2024/06/Sans-titre-10.png	\N	\N	\N	t		\N	\N	hausse-riche-	9	\N	0
29	pot verre 1kg avec capsule 		1.3	1791	6	0	https://www.apiculture.net/11438-thickbox_default/12-pots-verre-500-g-370-ml-avec-couvercles-to-63.jpg	\N	\N	\N	f		3	109	pot-verre-1kg-avec-capsule	9	\N	0
42	Masque caree 	Masque de protection simple et doté d'une visière grillagée en métal\nSimple, il s'enfile comme une cagoule.\n\n2 élastiques de serrage \nTaille unique 	10	7	5	0	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_e1n8d4e1n8d4e1n8%20(1).png	https://www.triangle-outillage.fr/17232-thickbox_default/masque-de-protection.jpg		\N	f		5	89	masque-caree-	9	3	0
83	Lève-cadres multifonction 	Ce lève-cadres en acier inoxydable mutlifonction a été pensé et conçu pour toutes les étapes d'une visite au rucher. La partie courbée ainsi que la pointe vous permettent de détacher les cadres de vos corps ou vos hausses à la manière d'un pied de biche. Sur la tranche, la partie dentée vous sert à nettoyer vos grilles à reine rapidement et parfaitement.\n\nL'autre embout possède un arrache-clou, ce qui vient compléter le rôle de marteau du lève-cadres. Sur la tranche, le métal épouse parfaitement la tête de vos cadres, vous pouvez ainsi nettoyer efficacement ses rainures. Sur l'autre versant, le racloir vous débarrassera de la cire et la propolis accumulées sur les autres parties de vos cadres et de votre ruche. Le manche en bois cambré vous offre une confortable et bonne prise en main. \n\nInformations : \nLongueur : 267 mm \nPoids : 300g\n	18	11	5	0	https://www.naturapi.com/media/catalog/product/cache/4d82898af2700c44de9157a081d6452e/4/1/414028-2_1_.png	https://www.thomas-apiculture.com/27277-thickbox_default/leve-cadre-multifonctions-5-en-1.jpg	https://www.thomas-apiculture.com/27278-thickbox_default/leve-cadre-multifonctions-5-en-1.jpg		f	new 	5	15	lève-cadres-multifonction-	9	\N	0
43	Masque rond 	Masque d'apiculteur typique de forme ronde , masque moyen, avec lacets nouer sur le laboureur ou la chemise, calotte en cuir, grille en fibre de verre et veste en tissu blanc.\nIl travaille sur le marché de l’apiculture depuis plus de 20 ans.\nMasque spécifique à usage apicole . Taille unique	15	2	5	0	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_re19nrre19nrre19.png	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_nrw5a4nrw5a4nrw5.png			f		4	58	masque-rond-	9	3	0
53	Transformateur soude cire	Gagnez un temps précieux lors du cirage des cadres grâce à ce transformateur capable de fixer la cire rapidement !\nC'est un appareil soude-cire professionnel et protégé contre les courts-circuits qui, par impulsion électrique, chauffe très rapidement les fils étamés ou inox pour une mise en place parfaite de la cire gaufrée sur le cadre.	45	-5	5	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2031%20janv.%202026,%2017_51_34.png				f		55	4	transformateur-soude-cire	9	\N	0
60	Marqueur Pour Reine Des Abeilles	Marqueur D'apiculture | Stylo Marqueur Queen Bee, Stylos De Peinture Imperméables | Équipement D'apiculteur Apiculteurs Pour Marquer La Reine	20	-3	5	0	https://ae01.alicdn.com/kf/S98f63ed82205413f97b60035f4a41feeO.jpg_640x640q90.jpg	https://www.apiculture.net/10175-thickbox_default/5-marqueurs-posca.jpg	https://www.icko-apiculture.com/media/catalog/product/cache/6a8875c81b3660f8b5f5eacb288a0053/image/1485690c8/marqueur-posca-pour-marquage-des-reines.png	\N	t		\N	\N	marqueur-pour-reine-des-abeilles	9	\N	0
48	Charme d'abeille tube Tomas 	Le Charme d'Abeille en Tube est un attractif naturel à base d’huiles essentielles conçu pour attirer les essaims dans vos ruches. Son format pratique permet une application facile sur les cadres ou les ruches pièges.	27	28	8	0	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_cd8kx9cd8kx9cd8k.png	https://www.bijenhof.be/assets/img/dbpics/webshop_images/22120%20-%20Ariste%20zwermlokcreme%2030gr%202.jpg?&width=900&format=jpg&bgcolor=fff&watermark=BIJENHOF&color=fff&fontsize=30&fontfamily=Arial,Helvetica,sans-serif&fontopacity=40&dropshadow=true			f		\N	\N	charme-d'abeille-tube-tomas-	9	\N	0
50	CHARME D'ABEILLE ABEJAR SPRAY espagne	Aérosol Charme Abeille.\n\nPermet d'essayer de capturer des essaims d'abeilles.\n\nPulvériser légèrement les parois et les cadres de la ruche à 30 cm.\n\nRenouveler l'opération tous les 8 jours	35	27	8	34	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_i28h9ui28h9ui28h.png	https://apitienda.es/6348-large_default/abejar-atrayente-cazaenjambre-spray-300ml.jpg			f		\N	\N	charme-d'abeille-abejar-spray-espagne	9	\N	0
145	Cages à reine transparentes avec bouchon	Cage d’introduction pour reine d’abeille – Sécurité et adaptation optimale\n\nCette petite cage d’introduction pour reine d’abeille est spécialement conçue pour permettre à la reine de s’habituer progressivement à sa nouvelle colonie en toute sécurité.\n\nGrâce à son système pratique :\n\nLa petite sortie se bloque facilement avec le bouchon fourni.\n\nLa grande sortie se ferme avec de la pâte à sucre (candi), facilitant une introduction naturelle.\n\nLorsque la pâte à sucre est entièrement consommée par les abeilles, la reine est alors acceptée par la colonie, réduisant ainsi le risque de rejet et favorisant une intégration réussie dans la ruche.\n\n✅ Idéale pour apiculteurs débutants et professionnels\n✅ Introduction sécurisée de la reine\n✅ Méthode progressive et naturelle	1.5	-2	1	0	https://images.nexusapp.co/assets/00/91/4e/326282296.jpg	https://m.media-amazon.com/images/I/51wkfadc+lL._SL1001_.jpg	https://m.media-amazon.com/images/I/51wkfadc+lL._SL1001_.jpg		f		5	10	cages-à-reine-transparentes-avec-bouchon	9	\N	0
69	Lève-cadres	Pour bien isoler la ruche, les abeilles recouvrent la moindre ouverture de propolis, c’est pour cela que les cadres sont difficiles à détacher des parois. En utilisant votre lève-cadres à la manière d’un pied de biche, vous pourrez décoller les cadres.\n\nCoudé, il est muni d´une lame à chaque extrémité pour décoller les cadres des hausses et des corps des ruches.\nIl est aussi pourvu d´un système arrache-clou.\n\n \n\nOutils indispensable au quotidien pour tout les apiculteurs amateurs et professionels, vous ne pourrez plus vous en passez.\n\nLève-cadre de type Américain en inox.\n\nLongueur : 25cm\nColoris rouge 	12	13	5	\N	https://www.naturapi.com/media/catalog/product/cache/4d82898af2700c44de9157a081d6452e/4/1/414007-2019.jpg				f		5	25	lève-cadres	9	\N	0
34	Presse-miel manuel 	Presse-miel, machine de presse à miel manuelle domestique, extracteur de miel avec grande plaque de presse, machine de presse à miel d'abeille de 5 L, grand extracteur de presse à miel d'abeille	320	-2	7	0	https://m.media-amazon.com/images/I/41Csy4S9k6S._AC_SY780_.jpg	https://api.apiculturegalai.tn/uploads/61QCQwxOR0S._SX522_.jpg	https://api.apiculturegalai.tn/uploads/61lRLheDcnL._SL1001_.jpg	https://api.apiculturegalai.tn/uploads/61yTq2G-lIL._AC_SX679_-Photoroom.png	f		18	4	presse-miel-manuel-	15	5	0
67	Herse 	Exclusif web, cette herse à désoperculer facilite le travail de désoperculation des cadres, avant l'extraction du miel, en retirant les opercules de cire.\nElle permet de gratter dans les cadres ''en creux''.	15	2	7	0	https://api.apiculturegalai.tn/uploads/Shampooing%20Volumisant%20(3).png	https://www.apiculture.net/14917/herse-a-desoperculer.jpg		\N	f		\N	\N	herse-	9	\N	0
64	Picking de greffage	Le picking de greffage est un outil essentiel pour réussir l'élevage de vos reines. Spécialement conçu pour l'apiculteur, il simplifie le prélèvement délicat des larves. Sa lamelle souple et son ressort amortisseur permettent de récupérer la larve avec sa gelée royale, sans choc et en douceur. Cet accessoire augmente considérablement vos chances de succès pour un greffage efficace et serein.	8	0	5	0	https://besacierapiculture.com/wp-content/uploads/2022/12/1800130-rucher-elevage-reines-picking-traditionnel-chinois-bois-01-web.jpg		\N	\N	f		\N	\N	picking-de-greffage	9	\N	0
57	Pince reine	Pour capturer les reines d'abeilles. Permet d'isoler la reine lors d'une intervention dans la ruche ou de faire sécher son marquage sans risque d'agression	7.5	20	1	7	https://provence-apiculture.fr/965-thickbox_default/pince-a-reine.jpg			\N	f		50	4	pince-reine	9	\N	0
30	Couvre-cadres bois Dadant 10 cadres	Ce couvre-cadres en bois est conçu pour les ruches Dadant 10 cadres. Il sert à délimiter l’espace de la colonie et agit comme un tampon isolant entre l’habitacle des abeilles et le toit de la ruch	10	95	1	0	https://thumbs.nosto.com/quick/prestashop-0deac90a/8/2960/b051e999e7478aff61bac4b5d645b18d6c0edffd45d24ed0862aafc5a45765b4/A	https://lajocondienne.com/4297-home_default/couvre-cadres-dadant-10-cadres-en-pin-maritime-.jpg	https://thumbs.nosto.com/quick/icko-2023/8/11366/4a682882bdfffd3d35d01aa95c4d9c150ee4e2a4332b921930be84b230c96127/A	\N	f		\N	\N	couvre-cadres-bois-dadant-10-cadres	9	\N	0
17	Brosse à abeilles plastique 	Une brosse à abeille douce, idéale pour les apiculteurs qui débutent et souhaitent s'équiper à moindre coût, pour brosser les abeilles hors des cadres pendant la récolte des hausses ou pour examiner les cadres de ruche.	10	18	5	\N	https://api.apiculturegalai.tn/uploads/Brosse%20Adetal%20en%20emballage%20transparent.png		\N	\N	f		4	12	brosse-à-abeilles-plastique-	9	\N	0
162	Tapis propolis 	Un tapis de collecte de propolis est un accessoire utilisé en apiculture pour récupérer la propolis produite par les abeilles. Il est généralement fabriqué en plastique souple avec de petites fentes. Placé au-dessus des cadres de la ruche, il incite les abeilles à combler les ouvertures avec de la propolis. Une fois rempli, le tapis est retiré puis refroidi (souvent au congélateur) pour faciliter la récupération de la propolis, qui devient cassante et facile à détacher.	13	-1	5	0	https://api.apiculturegalai.tn/uploads/Tapis%20en%20maille%20verte%20avec%20bord%20bleu.png	https://api.apiculturegalai.tn/uploads/95b5aa3e-783e-4710-80e1-b8448bf98fdc.png	https://api.apiculturegalai.tn/uploads/Maille%20verte%20en%20gros%20plan.png		f		4	33	tapis-propolis-	9	\N	0
58	seau en plastique avec robinet 40 kg 	avec robinet\n 40 kg\nRobinet en nylon alimentaire\npoignée en acier et en plastique\ncouvrir avec bande de sécurité	30	4	7	\N	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_cktzrqcktzrqcktz%20(1).png	https://api.apiculturegalai.tn/uploads/Shampooing%20Volumisant.png			f		\N	\N	seau-en-plastique-avec-robinet-40-kg-	9	\N	0
163	Un chasse-abeilles à 8 sorties	Un chasse-abeilles à 8 sorties est un dispositif utilisé en apiculture pour vider les hausses de leurs abeilles sans les blesser. Il est généralement placé entre le corps de la ruche et la hausse. Grâce à ses huit sorties en forme de petits passages, il permet aux abeilles de descendre vers la ruche, mais les empêche de remonter. Après quelques heures, la hausse se retrouve presque sans abeilles, ce qui facilite la récolte du miel.	15	10	1	0	https://api.apiculturegalai.tn/uploads/Tapis%20de%20drainage%20jaune%20sur%20fond%20blanc.png				f	New	5	66	un-chasse-abeilles-à-8-sorties	9	\N	0
72	Nourrisseur bois avec seul coffre	Le nourrisseur en bois pour ruches Dadant 10 cadres est un équipement indispensable pour assurer une alimentation efficace des abeilles, notamment en période de disette ou de stimulation. Fabriqué en France à partir de bois issu de forêts gérées durablement, il allie qualité, robustesse et respect de l’environnement.\n\nAvec une capacité de 7 litres, ce nourrisseur permet de distribuer une quantité suffisante de sirop en une seule intervention, réduisant ainsi les manipulations et le stress des colonies. Son traitement à la paraffine non toxique garantit une excellente étanchéité tout en assurant la sécurité des abeilles.\n\nConçu pour résister aux conditions climatiques, il offre une grande durabilité et s’adapte parfaitement aux besoins des apiculteurs en Tunisie, qu’ils soient amateurs ou professionnels.\n\nPoints forts :\n\nCompatible ruches Dadant 10 cadres\nGrande capacité de 7 litres\nBois durable et fabrication française\nTraitement à la paraffine alimentaire non toxique\nRésistant aux intempéries\nIdéal pour nourrissement au sirop	14	14	1	0	https://api.apiculturegalai.tn/uploads/Boîte%20en%20bois%20pour%20production%20apicole.png	https://api.apiculturegalai.tn/uploads/Panneau%20en%20bois%20naturel%20sur%20fond%20blanc.png			f		4	28	nourrisseur-bois-avec-seul-coffre	9	\N	0
175	Maturateur de miel 200 kg SAF	Le maturateur de miel 200 kg marque SAF est un équipement essentiel pour les apiculteurs souhaitant garantir un miel pur et de haute qualité. Après l’extraction, il permet la maturation et la décantation du miel, afin de séparer naturellement les bulles d’air, les résidus de cire et les impuretés.\n\nAvec une capacité de 200 kg, ce maturateur est parfaitement adapté aux apiculteurs professionnels et semi-professionnels. Il facilite la conservation du miel dans des conditions hygiéniques optimales avant la mise en pot.\n\nConçu avec des matériaux résistants et adaptés au contact alimentaire, le maturateur SAF assure la sécurité du miel tout en permettant un remplissage facile des pots grâce à son robinet de vidange pratique.\n\nCaractéristiques du maturateur de miel 200 kg :\nCapacité : 200 kg de miel\nMarque : SAF\nUtilisation : maturation et décantation du miel après extraction\nRobinet de vidange pour remplissage facile des pots\nMatériau hygiénique adapté au contact alimentaire\nIdéal pour apiculteurs professionnels et amateurs\n\nLe maturateur apicole 200 kg est un équipement indispensable pour améliorer la qualité du miel et optimiser le processus de conditionnement dans toute activité d’apiculture.	650	10	7	0	https://www.latiendadelapicultor.com/8677-large_default/maturateur-de-miel-200-kg-saf.webp				t	NEW	5	18	maturateur-de-miel-200-kg-saf	15	6	0
157	Djn soft botte 	Cette botte de travail en caoutchouc est spécialement conçue pour les travaux agricoles, la chasse, la pêche et l’apiculture. Fabriquée en matériau PVC résistant, elle offre une excellente protection contre l’eau, la boue et les conditions difficiles. Sa semelle épaisse antidérapante assure une bonne stabilité sur les terrains humides et glissants.\nGrâce à sa conception ergonomique, cette botte garantit un confort optimal même lors d’une utilisation prolongée. Elle protège efficacement les pieds et les jambes contre l’humidité, la boue et les insectes.\n\nCaractéristiques :\nBotte imperméable 100 %\nMatière PVC solide et durable\nSemelle antidérapante pour terrains boueux\nIdéale pour l’agriculture, l’apiculture et les travaux extérieurs\nFacile à nettoyer et très résistante\nCette botte est un équipement indispensable pour les agriculteurs, les apiculteurs et toute personne travaillant en extérieur.	32	18	5	0	https://api.apiculturegalai.tn/uploads/Bottes%20de%20pluie%20DJIN%20SOFT%20élégantes.png	https://api.apiculturegalai.tn/uploads/Semelle%20de%20botte%20DJIN%20SOFT.png	https://api.apiculturegalai.tn/uploads/Détail%20du%20logo%20DJIN%20SOFT.png		f		5	11	djn-soft-botte-	9	\N	0
132	Combinaison  Intégrale avec Voile Carré	La combinaison apiculteur intégrale blanche avec voile carré est conçue pour garantir une protection maximale lors de la manipulation des ruches. Adaptée aux conditions climatiques en Tunisie, elle offre sécurité, confort et grande liberté de mouvement pour les apiculteurs débutants comme professionnels.\n\n🛡️ Protection complète et sécurisée\n\nCette combinaison de protection pour apiculture couvre entièrement le corps.\nLe voile carré rigide avec grille renforcée assure une excellente visibilité tout en protégeant efficacement le visage contre les piqûres d’abeilles.\n\nLes poignets et chevilles élastiques empêchent toute intrusion d’insectes, garantissant un travail en toute sérénité.\n\n👨‍🌾 Confort adapté au travail au rucher\n\nFermeture éclair frontale solide et pratique\n\nTissu résistant, durable et facile à entretenir\n\nCoupe ergonomique pour une meilleure mobilité\n\nIdéale pour longues interventions au rucher\n\n🎯 Idéale pour :\n\n✔ Visite et inspection des ruches\n✔ Récolte du miel\n✔ Manipulation des cadres\n✔ Formation en apiculture\n✔ Exploitations apicoles professionnelles	35	4	5	\N	https://api.apiculturegalai.tn/uploads/663157290_948302091500138_5521896235858140410_n.jpg	https://api.apiculturegalai.tn/uploads/663326606_948308471499500_7760417353921580319_n.jpg	https://api.apiculturegalai.tn/uploads/662201308_948302548166759_7695870521127454362_n.jpg		f		5	22	combinaison--intégrale-avec-voile-carré	9	3	0
18	Toit en tôle h. 80mm Dadant 10 cadres	Le toit en tôle pour ruche Dadant 10 cadres est une solution pratique et économique pour protéger efficacement vos ruches contre les intempéries et les intrusions. À la fois robuste et très léger, il assure une excellente protection tout en facilitant la manipulation lors des visites du rucher.\n\nGrâce à sa hauteur standard, ce toit est parfaitement adapté aux régions tempérées comme en Tunisie, offrant une bonne isolation contre la pluie, le vent et les variations climatiques. Sa conception en tôle garantit une longue durée de vie et une résistance accrue face aux conditions extérieures.\n\nIdéal pour les apiculteurs recherchant un équipement fiable, durable et accessible pour sécuriser leurs colonies.\n\nPoints forts :\n\nCompatible ruches Dadant 10 cadres\nLéger et facile à manipuler\nBonne protection contre les intempéries\nSolution économique et durable\nAdapté aux conditions climatiques en Tunisie	16	9	1	0	https://www.mat-apiculture.fr/931-medium_default/toit-bois-tole-dadant-10-cadres.jpg	https://apiculture-remuaux.fr/650-home_default/toit-bois-tole-dadant-10-cadres.jpg	https://www.routedor.fr/750401-home_default/toit-plat-bois-tole-voirnot.jpg		f		\N	\N	toit-en-tôle-h.-80mm-dadant-10-cadres	9	\N	0
181	Extracteur manuel  SAF 4 cadre 	Cet extracteur de miel manuel Mini de la marque SAF est une solution pensée pour les apiculteurs possédant quelques ruches ou démarrant leur activité. Alliant un budget maîtrisé à une conception de qualité, il permet de réaliser une extraction efficace et rapide. Son fonctionnement tangentiel est particulièrement apprécié pour sa capacité à extraire les miels les plus visqueux.\n\n \n\nUne conception robuste et polyvalente\nLa qualité de fabrication de cet extracteur est un atout majeur. Sa cuve en acier inoxydable 18/10 d'un diamètre de 380 mm, avec un fond conique, facilite l'écoulement complet du miel vers le robinet à clapet. La cage intérieure, également en inox, peut accueillir les formats de cadres les plus fréquents : 4 cadres de hausse Dadant ou 2 cadres de corps (Dadant, Langstroth, Warré, Voirnot).\n\nL'ergonomie n'est pas en reste. La manivelle latérale, équipée d'un engrenage en acier robuste, offre une excellente prise en main et une rotation fluide. Une sécurité anti-rotation est intégrée pour une utilisation en toute sérénité. L'ensemble est monté sur des pieds stables, positionnant l'extracteur à une hauteur de travail confortable.\n\n \n\nCaractéristiques techniques\nMarque :  \n SAF\nType d'extracteur :  \n Manuel, tangentiel\nCapacité :  \n 4 cadres Dadant hausse, 2 cadres Dadant corps, 2 cadres Langstroth, 2 cadres Warré, 2 cadres Voirnot\nMatériau de la cuve :  \n Inox 18/10\nDiamètre de la cuve :  \n 380 mm\nFond de la cuve :  \n Conique\nCage :  \n 2 cages rectangulaires en inox\nEngrenage :  \n Acier\nManivelle :  \n Latérale avec sécurité anti-rotation\nRobinet :  \n À clapet en plastique alimentaire 40/49\nCouvercle :  \n Plexiglas\nPieds :  \n Inclus	1350	0	7	0	https://www.latiendadelapicultor.com/545-large_default/extracteur-manuel-universel-fuego-4-cadres.webp	https://lyson.eu/7648-large_default/tangential-honey-extractor-4-frame-o640-mm-frame-4-layens-4-8-db-manual-fuego.jpg	https://lyson.eu/7649-large_default/tangential-honey-extractor-4-frame-o640-mm-frame-4-layens-4-8-db-manual-fuego.jpg	https://lyson.eu/7647-large_default/tangential-honey-extractor-4-frame-o640-mm-frame-4-layens-4-8-db-manual-fuego.jpg	f	New	5	3	extracteur-manuel--saf-4-cadre-	15	5	0
134	Nourisseur d'entrée pro	Le nourrisseur d’entrée est un accessoire indispensable en apiculture pour assurer une alimentation efficace de la colonie sans ouvrir la ruche. Conçu pour être placé directement à l’entrée, il permet de distribuer le sirop ou le candi facilement tout en limitant le dérangement des abeilles.\n\n✅ Pourquoi choisir un nourrisseur d’entrée ?\nAlimentation sans ouverture de ruche : réduit le stress de la colonie\nInstallation simple et rapide : s’insère directement à l’entrée\nContrôle facile du niveau de nourriture\nIdéal en période de disette ou de stimulation\n\n🔶 Composition du nourrisseur\nLe nourrisseur d’entrée se compose généralement de :\nUn plateau ou socle qui s’insère dans l’entrée de la ruche\nUn réservoir externe pour le sirop de sucre ou le candi\nUn système permettant aux abeilles d’accéder à la nourriture en toute sécurité\n🐝 Utilisation recommandée\n\nParfait pour :\nLe nourrissement de stimulation au printemps\nLe complément alimentaire en période de manque de nectar\nLe soutien des essaims ou colonies faibles\n📌 Avantages pour l’apiculteur\nGain de temps lors du nourrissement\nMoins de manipulation et moins de dérangement\nMeilleure gestion de l’alimentation des ruches	4	71	5	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2015%20févr.%202026,%2019_10_16.png				f		4	55	nourisseur-d'entrée-pro	9	\N	0
121	Cadre plastique incassable	Le cadre plastique pour abeille est un accessoire indispensable en apiculture moderne, conçu pour garantir solidité, hygiène et longévité. Fabriqué en plastique alimentaire de haute qualité, ce cadre résiste à l’humidité, aux variations de température et aux manipulations répétées dans la ruche.\n\nGrâce à sa conception précise, le cadre de ruche en plastique facilite la construction régulière des rayons par les abeilles, améliore la stabilité du couvain et optimise la production de miel. Contrairement aux cadres en bois, il ne se déforme pas et offre une excellente durabilité sur plusieurs saisons.\n\nFacile à nettoyer et à désinfecter, ce cadre apicole en plastique contribue à une meilleure hygiène de la ruche et réduit les risques de maladies. Il est compatible avec la majorité des ruches standards et convient aussi bien aux apiculteurs débutants qu’aux professionnels.\n\nAvantages du cadre plastique pour ruche :\n\n✅ Plastique alimentaire résistant et durable\n✅ Facile à nettoyer et réutilisable\n✅ Meilleure hygiène dans la ruche\n✅ Résistant à l’humidité et à la chaleur	2.7	39	4	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%203%20févr.%202026,%2020_11_24.png				f		4	82	cadre-plastique-incassable	9	\N	0
228	Bac a Désoperculer	Le bac à désoperculer en aluminium est un équipement essentiel pour les apiculteurs lors de l’extraction du miel. Conçu pour faciliter le travail de désoperculation, il permet de récupérer proprement la cire retirée des cadres tout en assurant une hygiène optimale.\n\nFabriqué en aluminium robuste et léger, il offre une excellente résistance à la corrosion et une longue durée de vie, même en utilisation intensive. Sa structure stable permet de poser facilement les cadres de ruche et de travailler confortablement lors de la découpe des opercules.\n\nIdéal pour les ruchers professionnels comme pour les apiculteurs amateurs, ce bac garantit un gain de temps, une meilleure organisation du travail et une propreté maximale lors de la récolte du miel.\n\nAvantages :\n\nAluminium alimentaire résistant et durable\nFacile à nettoyer et à entretenir\nLéger et pratique à transporter\nOptimise la désoperculation des cadres\nConvient à tous types d’extracteurs de miel\n\nUn outil indispensable pour améliorer l’efficacité et la qualité de votre production apicole.	300	3	7	0	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_56tf6956tf6956tf.png	https://api.apiculturegalai.tn/uploads/187-scaled.webp			f	NEW	5	0	bac-a-désoperculer	9	5	0
229	Agitateur électrique pour abeilles	La machine à secouer les abeilles à batterie Lithium 20V est un outil d’apiculture moderne conçu pour faciliter la récolte du miel et la manipulation des cadres de ruche. Grâce à son système de vibration performant, elle permet de retirer rapidement et efficacement les abeilles des cadres sans abîmer la cire ni stresser excessivement la colonie.\n\nÉquipée d’une batterie Lithium 20V haute performance de 2000 mAh, cette machine offre une excellente autonomie et une utilisation pratique sur le terrain. Son moteur puissant avec une vitesse de rotation allant jusqu’à 2700 tr/min garantit un travail rapide, précis et confortable pour les apiculteurs professionnels et amateurs.\n\nCompatible avec les cadres ayant une largeur de serrage de 25 à 30 mm et une épaisseur maximale de 22 mm, cet équipement apicole est idéal pour optimiser le temps de récolte et améliorer l’efficacité dans les ruchers.\n\nCaractéristiques techniques :\nNom du produit : Machine à secouer les abeilles à batterie Lithium\nType : Outil d’apiculture professionnel pour rucher et récolte du miel\nBatterie : Lithium 20V – 2000 mAh\nVitesse à vide : 0 à 2700 tr/min\nPlage de serrage : largeur 25-30 mm\nÉpaisseur compatible : ≤ 22 mm\nEmballage : Boîte robuste en plastique moulé par injection\nContenu disponible :\nMachine complète : 1 machine + 1 batterie\nEnsemble complet : 1 machine + 2 batteries + boîte d’emballage extérieure\nAvantages :\nRetrait rapide des abeilles des cadres\nGain de temps pendant la récolte du miel\nBatterie rechargeable longue autonomie\nLéger, pratique et facile à utiliser\nConvient aux apiculteurs professionnels et débutants\nMatériel apicole moderne et performant\n\nCette machine vibrante pour abeilles est la solution idéale pour améliorer la productivité du rucher tout en réduisant l’effort lors des travaux apicoles.	750	1	1	0	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_7n4zvj7n4zvj7n4z.png	https://api.apiculturegalai.tn/uploads/rechargeable-electric-bee-vibrating-machine44098293677.webp	https://api.apiculturegalai.tn/uploads/85acaf14-0c57-4bb6-ba53-3da1de0d1c00.jpg		f		5	0	agitateur-électrique-pour-abeilles	9	\N	0
156	Combinaison carree d'apiculteur en maille aérée 	La combinaison carrée d’apiculteur en maille aérée est l’équipement idéal pour travailler au rucher en toute sécurité. Conçue pour offrir une protection optimale contre les piqûres d’abeilles, elle permet également une excellente ventilation grâce à sa maille respirante, réduisant la chaleur et la transpiration pendant les longues interventions.\n\nSon voile carré intégré offre un espace confortable autour du visage tout en assurant une visibilité claire et dégagée, indispensable lors de l’inspection des ruches ou de la récolte du miel. Cette combinaison d’apiculture est adaptée aussi bien aux apiculteurs professionnels qu’aux débutants.\n\nFabriquée avec des matériaux résistants et légers, elle garantit durabilité, confort et sécurité. Les poignets et chevilles élastiques empêchent l’entrée des abeilles, tandis que la fermeture éclair robuste avec rabat de protection renforce la sécurité.\n\nCaractéristiques de la combinaison d’apiculteur\n\nMaille aérée triple couche pour une ventilation maximale\n\nVoile carré offrant visibilité et protection du visage\n\nTissu léger, respirant et résistant\n\nFermeture éclair solide avec système de protection\n\nPoignets et chevilles élastiques anti-intrusion\n\nConvient pour visite de ruches, récolte du miel et entretien du rucher\n\nCette combinaison d’apiculteur ventilée est un équipement indispensable pour toute personne pratiquant l’apiculture, garantissant sécurité, confort et efficacité lors du travail avec les abeilles.	209	2	5	0	https://api.apiculturegalai.tn/uploads/Mannequin%20en%20tenue%20de%20protection%20apicole%20(1).png	https://api.apiculturegalai.tn/uploads/Maillage%20jaune%20et%20ceinture%20élastique.png	https://api.apiculturegalai.tn/uploads/Tissu%20en%20maille%20jaune%20et%20fermeture%20éclair.png	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_9e5sm69e5sm69e5s.png	f	New	5	1	combinaison-carree-d'apiculteur-en-maille-aérée-	9	4	0
123	Nucleus en plastique alimentaire 	Optimisez votre élevage avec cette ruchette d’élevage de reine en plastique alimentaire, conçue spécialement pour les apiculteurs professionnels et amateurs exigeants. Fabriquée avec des matériaux résistants et sûrs, elle garantit une excellente durabilité et une utilisation hygiénique pour l’élevage des reines.\n\nCette ruchette est idéale pour la production de reines, la constitution de petits essaims, ou le transport sécurisé des cadres. Son plastique alimentaire assure une protection optimale des abeilles tout en facilitant le nettoyage et l’entretien.\nGrâce à son design pratique et robuste, cette ruchette permet une gestion efficace des colonies et améliore considérablement la réussite des élevages.\n\n✅ Caractéristiques principales :\n\nPlastique alimentaire de haute qualité\nRésistante aux chocs et aux conditions extérieures\nParfaite pour l’élevage des reines et la division des colonies\nFacile à nettoyer et réutilisable\nConception légère et pratique pour le transport	25	-12	1	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%203%20févr.%202026,%2022_18_53.png	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%203%20févr.%202026,%2022_19_44.png			f	NEW	4	1	nucleus-en-plastique-alimentaire-	9	\N	0
155	NOURRISSEUR EN BOIS DOUBLE COFFRE	Le nourrisseur en bois double coffre est un équipement essentiel pour assurer une alimentation efficace et sécurisée de vos colonies d’abeilles en Tunisie. Conçu spécialement pour les apiculteurs professionnels et débutants, ce nourrisseur garantit une distribution homogène du sirop ou du candi tout en réduisant le stress de la ruche.\n\n✅ Caractéristiques du nourrisseur double compartiment\n\n✔ Double coffre intégré : permet de nourrir avec deux compartiments séparés pour une meilleure gestion alimentaire.\n✔ Grande capacité : idéal pour le nourrissement d’automne, d’hiver et de stimulation au printemps.\n✔ Bois naturel résistant : excellente isolation thermique adaptée au climat tunisien.\n✔ Compatibilité ruche standard : installation simple au-dessus des cadres.\n✔ Réduction du pillage : limite les risques grâce à une conception sécurisée.\n\n🎯 Pourquoi choisir notre nourrisseur en bois ?\n\nChez Apiculture Galai, nous proposons du matériel apicole de qualité en Tunisie, conçu pour améliorer la productivité et la santé de vos abeilles.\n\nCe nourrisseur :\n\nFacilite l’alimentation sans ouvrir fréquemment la ruche\n\nProtège la colonie contre les variations climatiques\n\nOffre une longue durée de vie grâce à sa fabrication robuste\n\n📦 Idéal pour :\n\nApiculteurs débutants\n\nExploitations apicoles professionnelles\n\nNourrissement de stimulation et de réserve	15	-7	1	0	https://api.apiculturegalai.tn/uploads/Cadre%20en%20bois%20naturel%20détaillé.png	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%204%20mars%202026,%2021_12_56.png			f	NEW	4	3	nourrisseur-en-bois-double-coffre	9	\N	0
131	Combinaison avec Voile Intégré	La combinaison d’apiculture professionnelle blanche est un équipement essentiel pour tout apiculteur en Tunisie, qu’il soit débutant ou expérimenté. Conçue pour assurer une protection maximale contre les piqûres d’abeilles, elle offre un excellent niveau de sécurité tout en garantissant confort et liberté de mouvement lors des interventions au rucher.\n\nFabriquée à partir de matériaux résistants et respirants, cette combinaison permet de travailler dans des conditions optimales, même lors des longues sessions d’apiculture. Son design ergonomique facilite les déplacements et les manipulations, tout en assurant une protection intégrale du corps.\n\nIdéale pour l’entretien des ruches, la récolte du miel ou les inspections régulières, cette combinaison est un choix fiable pour améliorer votre productivité et travailler en toute sérénité.\n\nPoints forts :\n\nProtection efficace contre les piqûres\nTissu respirant et confortable\nLiberté de mouvement optimale\nAdaptée au climat en Tunisie\nConvient aux apiculteurs amateurs et professionnels\n✅ Protection optimale contre les piqûres\n\nFabriquée en tissu résistant et respirant, cette combinaison protège efficacement le corps grâce à sa conception intégrale. Le voile carré intégré avec fermeture sécurisée assure une visibilité claire tout en protégeant parfaitement le visage et la tête.\n\n✅ Confort et praticité\n\nFermeture éclair frontale robuste\n\nÉlastiques aux poignets et aux chevilles pour éviter toute intrusion\n\nCoupe ergonomique facilitant les mouvements\n\nTissu léger adapté au climat tunisien\n\n✅ Idéale pour tous les apiculteurs\n\nCette combinaison apicole est parfaite pour :\n\nLa visite des ruches\n\nLa récolte du miel\n\nL’entretien du rucher\n\nLes formations en apiculture\n\n🔎 Pourquoi choisir cette combinaison d’apiculture ?\n\n✔ Sécurité renforcée\n✔ Matériau durable\n✔ Facile à enfiler et à retirer\n✔ Adaptée à un usage professionnel et intensif	75	-8	5	59	https://api.apiculturegalai.tn/uploads/629795876_906889482308066_582124860493900643_n.jpg				f		4	14	combinaison-avec-voile-intégré	9	\N	0
230	Extracteur de miel 24 cadres avec moteur robuste	L’extracteur de miel 24 cadres est conçu pour les apiculteurs professionnels et les grandes exploitations apicoles recherchant performance, solidité et rapidité d’extraction. Fabriqué en acier inoxydable de haute qualité, il garantit une excellente résistance à la corrosion et une hygiène parfaite pour la récolte du miel.\n\nÉquipé d’un moteur puissant et robuste, cet extracteur assure une rotation stable et efficace même lors des longues sessions de travail. Son système électrique permet un contrôle précis de la vitesse afin de protéger les cadres tout en maximisant l’extraction du miel.\n\nCaractéristiques :\nCapacité : 24 cadres\nStructure en inox alimentaire\nMoteur électrique robuste et performant\nCommande électronique de vitesse\nFonctionnement stable et silencieux\nIdéal pour usage professionnel\nNettoyage facile et entretien réduit\n\nCet extracteur offre un excellent rendement pour les apiculteurs souhaitant gagner du temps et améliorer leur productivité durant la saison de récolte.	7900	0	7	0	https://api.apiculturegalai.tn/uploads/54d3a618-d5e2-4398-91e9-be882fe77e79%20(1).png	https://api.apiculturegalai.tn/uploads/Capture%20d%E2%80%99%C3%A9cran%202026-05-07%20232849.png	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%207%20mai%202026,%2023_55_54.png		f		5	0	extracteur-de-miel-24-cadres-avec-moteur-robuste	9	5	0
172	Maturateur miel 400 KG 	Le maturateur de miel 400 kg marque SAF est un équipement indispensable pour les apiculteurs professionnels et les exploitations apicoles souhaitant obtenir un miel pur et de haute qualité. Il permet la maturation et la décantation du miel après l’extraction, afin de séparer naturellement les bulles d’air, les particules de cire et les impuretés.\n\nGrâce à sa grande capacité de 400 kg, ce maturateur est idéal pour le traitement de grandes quantités de miel tout en garantissant une excellente hygiène et une conservation optimale. Sa conception robuste et son robinet de vidange pratique facilitent le remplissage des pots et le conditionnement du miel.\n\nFabriqué avec des matériaux de qualité alimentaire, le maturateur SAF assure la sécurité et la pureté du miel pendant toute la phase de maturation.\n\nCaractéristiques du maturateur de miel 400 kg :\nCapacité : 400 kg de miel\nMarque : SAF\nUtilisation : maturation et décantation du miel\nRobinet pratique pour remplissage facile des pots\nMatériau hygiénique adapté au contact alimentaire\nIdéal pour apiculteurs professionnels et mielleries\n\nCe maturateur apicole 400 kg est un équipement essentiel pour améliorer la qualité du miel et optimiser le processus de conditionnement dans toute activité d’apiculture.	1100	10	7	1050	https://www.latiendadelapicultor.com/8661-large_default/maturateur-400-kg-en-acier-inoxydable.webp				t	NEW 	5	17	maturateur-miel-400-kg-	20	6	0
179	Maturateur 100kg en inox saf	Le maturateur à miel 100 kg en acier inoxydable est un équipement essentiel pour garantir une décantation optimale et obtenir un miel pur, limpide et de haute qualité. Conçu pour répondre aux exigences des apiculteurs professionnels et amateurs, il assure une conservation parfaite du miel tout en respectant les normes d’hygiène alimentaire.\n\nDoté d’un couvercle hermétique anti-poussière, ce maturateur protège efficacement le miel contre les impuretés extérieures. Son robinet alimentaire facilite l’extraction et le conditionnement du miel en toute simplicité, sans perte ni contamination.\n\nRobuste, durable et facile à nettoyer, ce maturateur inox est idéal pour le stockage et la maturation du miel avant sa mise en pot.\n\nPoints forts :\n\nCapacité : 100 kg\nAcier inoxydable alimentaire de haute qualité\nRobinet pratique pour un écoulement contrôlé\nCouvercle sécurisé anti-impuretés\nFacile à entretenir et résistant à la corrosion\n\nIdéal pour : apiculteurs, mielleries, production artisanale et professionnelle.	470	0	7	0	https://www.latiendadelapicultor.com/8890-large_default/maturateur-en-acier-inoxydable-100kg.webp				f	New	5	8	maturateur-100kg-en-inox-saf	9	6	0
180	maturateur inox 30 L / 40 KG	Le maturateur à miel SAF 30 kg en acier inoxydable est spécialement conçu pour garantir une décantation naturelle du miel et obtenir un produit pur, limpide et prêt à la mise en pot. Adapté aux apiculteurs débutants comme aux professionnels, il constitue un équipement indispensable pour une miellerie efficace.\n\nFabriqué en inox alimentaire de haute qualité, ce maturateur assure une excellente conservation du miel tout en respectant les normes d’hygiène. Grâce à sa conception robuste et durable, il résiste parfaitement à la corrosion et offre une longue durée de vie.\n\nSon format compact est idéal pour les petites productions ou les ruchers de taille réduite, tout en permettant une manipulation facile lors des opérations de récolte et de soutirage. Le processus de maturation permet d’éliminer les bulles d’air et les impuretés pour un miel clair et homogène.\n\nCaractéristiques principales :\nCapacité : 30 kg de miel\nMatériau : acier inoxydable alimentaire\nDesign compact et robuste\nIdéal pour petites productions apicoles\nEntretien facile et hygiène optimale\nPourquoi choisir ce maturateur ?\n\n✔ Améliore la qualité et la pureté du miel\n✔ Parfait pour apiculteurs amateurs et professionnels\n✔ Durable, résistant et facile à utiliser\n✔ Optimisé pour la décantation naturelle du miel	370	0	7	0	https://api.apiculturegalai.tn/uploads/ok.webp				f	New	5	0	maturateur-inox-30-l-/-40-kg	9	6	0
235	Bio Nat	Bio Nat – Spray anti-varroa naturel pour ruches\n\nLe spray Bio Nat est une solution acaricide et insecticide naturelle spécialement conçue pour la protection des ruches contre le varroa. Formulé à base d’huiles essentielles 100 % naturelles, ce traitement aide à réduire la pression parasitaire tout en respectant la santé des abeilles et l’équilibre de la colonie.\n\nGrâce à sa formule pratique en spray, Bio Nat permet une application simple et rapide directement dans la ruche. Il contribue à maintenir des colonies fortes et productives durant toute la saison apicole.\n\nCaractéristiques :\nSpray anti-varroa pour ruches\nFormule 100 % naturelle\nÀ base d’huiles essentielles\nAction acaricide et insecticide\nApplication facile et rapide\nConvient aux apiculteurs professionnels et amateurs\nAvantages :\nAide à lutter efficacement contre le varroa\nRespecte les abeilles et la ruche\nFacile à utiliser\nSolution naturelle sans produits chimiques agressifs\nFavorise une meilleure santé des colonies\nConseils d’utilisation :\n\nPulvériser selon les recommandations d’utilisation en évitant les périodes de forte chaleur. Utiliser dans le cadre d’un programme de suivi sanitaire des ruches.\n\nSEO :\n\nspray anti varroa, traitement varroa naturel, produit apiculture Tunisie, acaricide pour abeilles, insecticide ruche, traitement naturel ruches, lutte contre varroa, matériel apiculture Tunisie, Bio Nat apiculture	0	0	11	0	https://api.apiculturegalai.tn/uploads/Bio-Naturel-scaled.webp				f	NEW	5	0	bio-nat	9	\N	0
233	AMITRAZ PLUS CONTRE VAREO 	Amitraz Plus – Spray acaricide et insecticide pour ruches\n\nLe spray Amitraz Plus est un traitement apicole conçu pour aider à lutter efficacement contre le varroa et les parasites qui menacent la santé des colonies d’abeilles. Grâce à son action acaricide et insecticide, il contribue à protéger les ruches et à maintenir des colonies fortes et productives.\n\nSa diffusion rapide permet une application simple et pratique directement dans la ruche. Utilisé selon les recommandations apicoles, Amitraz Plus aide à limiter la prolifération des parasites tout en améliorant la vitalité des abeilles.\n\nCaractéristiques :\nSpray acaricide et insecticide\nAide à combattre le varroa\nApplication rapide et facile\nProtection efficace des colonies\nConvient aux ruches modernes et traditionnelles\nUtilisation pratique pour les apiculteurs professionnels et amateurs\nAvantages :\nContribue à réduire la présence des parasites\nFavorise la santé et la vitalité des colonies\nApplication simple grâce au format spray\nAction rapide dans la ruche\nIdéal pour le suivi sanitaire des abeilles\nConseils d’utilisation :\n\nUtiliser selon les recommandations apicoles et respecter les doses conseillées. Éviter l’application pendant les fortes chaleurs et suivre un programme régulier de contrôle du varroa.	25	3	11	0	https://api.apiculturegalai.tn/uploads/Amitraz-Plus-scaled.webp				f	NEW	4	3	amitraz-plus-contre-vareo-	9	\N	0
236	TIMOL PLUS	Découvrez TIMOL PLUS, une solution efficace et naturelle à base de thymol pour protéger vos ruches contre le varroa. Conçu spécialement pour les apiculteurs professionnels et amateurs, ce traitement aide à maintenir des colonies fortes, saines et productives tout au long de la saison.\n\nGrâce à sa formule à base de thymol naturel, TIMOL PLUS agit rapidement contre les parasites varroa tout en respectant la santé des abeilles et l’équilibre de la ruche. Son format aérosol pratique permet une application simple, rapide et ciblée.\n\nAvantages de TIMOL PLUS\nTraitement efficace contre le varroa\nFormule naturelle à base de thymol\nCompatible avec l’apiculture durable\nFacile à utiliser grâce au format spray\nProtection des abeilles et des colonies\nRésultats rapides et durables\nCaractéristiques\nType : Traitement anti-varroa pour ruches\nUtilisation : Apiculture professionnelle et amateur\nFormat : Aérosol pratique\nComposition : Thymol naturel\nApplication : Simple et ciblée\nPourquoi choisir TIMOL PLUS ?\n\nTIMOL PLUS est le choix idéal pour les apiculteurs recherchant une solution naturelle contre le varroa sans compromettre la santé des abeilles. Son efficacité prouvée et sa facilité d’utilisation en font un produit incontournable pour l’entretien et la protection des ruches.	25	0	11	0	https://api.apiculturegalai.tn/uploads/7d75bb8b-52d9-4e6e-8bd2-b51422d00fc8.png				f	NEW	5	3	timol-plus	9	\N	0
237	Bobine de fil en inox 500g	La bobine de fil inox 500g est un accessoire indispensable en apiculture pour le montage et le renforcement des cadres de ruche. Elle sert à maintenir solidement les feuilles de cire gaufrée afin d’assurer une meilleure stabilité du cadre pendant l’extraction du miel.\n\nFabriqué en acier inoxydable de haute qualité, ce fil offre une excellente résistance à la corrosion et à l’humidité, garantissant une longue durée de vie même dans les conditions exigeantes des ruches. Conforme aux normes de contact alimentaire, il convient parfaitement à une utilisation apicole professionnelle et amateur.\n\nAvec un diamètre compris entre 0,40 mm et 0,45 mm, le fil assure une tension optimale et une grande solidité pour le maintien des cadres.\n\nCaractéristiques :\nBobine de fil inox pour apiculture\nPoids : 500 g\nDiamètre : 0,40 mm à 0,45 mm\nRésistant à la rouille et à la corrosion\nCompatible avec tous types de cadres de ruche\nConforme aux normes de contact alimentaire\nAvantages :\nMaintien efficace des feuilles de cire gaufrée\nGrande résistance lors de l’extraction du miel\nLongue durée de vie\nFacile à tendre et à installer\nIdéal pour apiculteurs amateurs et professionnels\nUtilisation :\n\nUtilisé pour le filage des cadres de ruche avant l’insertion des feuilles de cire gaufrée.	12	0	4	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%208%20mai%202026,%2011_18_14.png				f		4	33	bobine-de-fil-en-inox-500g	9	\N	0
238	Bobine de fil en inox 250g	La bobine de fil inox 250g est spécialement conçue pour les travaux d’apiculture et le montage des cadres de ruche. Elle permet de fixer solidement les feuilles de cire gaufrée afin d’assurer une meilleure stabilité des cadres lors de l’utilisation et de l’extraction du miel.\n\nFabriqué en acier inoxydable de haute qualité, ce fil offre une excellente résistance à la corrosion et à l’humidité. Conforme aux normes alimentaires européennes (directive 1935/2004/CE), il garantit une utilisation sûre et durable dans les ruches.\n\nAvec un diamètre de 0,40 mm à 0,45 mm et une longueur d’environ 200 mètres, ce fil assure une tension optimale et une grande solidité pour le maintien des cadres. Pour une installation efficace, il est recommandé d’utiliser une roulette zig-zag afin de tendre correctement le fil.\n\nCaractéristiques :\nBobine de fil inox pour apiculture\nPoids : 250 g\nDiamètre : 0,40 mm à 0,45 mm\nLongueur approximative : 200 mètres\nRésistant à la rouille et à la corrosion\nConforme aux normes alimentaires européennes \nCompatible avec tous types de cadres de ruche\nAvantages :\nMaintien solide des feuilles de cire gaufrée\nExcellente durabilité\nRésiste aux conditions humides des ruches\nFacile à installer et à tendre\nConvient aux apiculteurs professionnels et amateurs\nConseils d’utilisation :\n\nUtiliser une roulette zig-zag pour assurer une bonne tension du fil avant l’insertion de la cire gaufrée dans le cadre.	8	33	4	0	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%208%20mai%202026,%2011_21_32.png				f	NEW	5	0	bobine-de-fil-en-inox-250g	9	\N	0
242	Défigeur De Miel		570	0	7	0	https://www.api-bourgogne.fr/2251-large_default/defigeur-primio.jpg				f		5	3	défigeur-de-miel	9	\N	0
239	Bobine locale galvasiné 250g	La bobine de fil galvanisé 250g est un accessoire essentiel pour le montage des cadres de ruche en apiculture. Elle permet de maintenir efficacement les feuilles de cire gaufrée afin d’assurer une bonne stabilité des cadres pendant le développement de la colonie et l’extraction du miel.\n\nFabriqué en fil galvanisé résistant, ce produit offre une bonne solidité et une excellente tenue pour les travaux apicoles quotidiens. Son diamètre adapté facilite le filage des cadres tout en garantissant une tension optimale.\n\nCette bobine est idéale pour les apiculteurs recherchant une solution économique et pratique pour l’entretien et la préparation des ruches.\n\nCaractéristiques :\nBobine de fil galvanisé pour apiculture\nPoids : 250 g\nUtilisé pour le montage des cadres de ruche\nBonne résistance et solidité\nFacile à tendre et à installer\nCompatible avec différents types de cadres\nAvantages :\nMaintien efficace des feuilles de cire gaufrée\nSolution économique pour l’apiculture\nBonne résistance à l’utilisation\nPratique pour le filage des cadres\nConvient aux apiculteurs amateurs et professionnels\nUtilisation :\n\nUtilisé pour le filage des cadres avant l’installation de la cire gaufrée. Il est recommandé d’utiliser une roulette zig-zag pour assurer une tension correcte du fil.	4	0	4	0	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_wqgvzkwqgvzkwqgv.png				f		5	0	bobine-locale-galvasiné-250g	9	\N	0
33	extracteur 4 cadres 	L’extracteur de miel manuel  est un équipement indispensable pour les apiculteurs souhaitant une extraction efficace et propre du miel. Conçu en acier inoxydable de haute qualité, il garantit robustesse, hygiène et durabilité dans le temps.\n\nAvec une capacité de 4 cadres, cet extracteur permet de traiter plusieurs cadres simultanément, optimisant ainsi le temps de récolte. Son tambour de diamètre 49 cm et sa hauteur de 100 cm assurent une excellente stabilité et un confort d’utilisation optimal.\n\nÉquipé d’un trépied solide, il offre une position de travail stable et ergonomique. Son système manuel à manivelle permet une extraction douce qui préserve la qualité du miel et des rayons.\n\nIdéal pour les apiculteurs amateurs comme professionnels, cet extracteur est une solution fiable pour une production de miel efficace.\n\nCaractéristiques :\n\nMarque : Jago®\nCapacité : 4 cadres\nMatériau : acier inoxydable\nDiamètre : 49 cm\nHauteur : 100 cm\nAvec trépied stable\nFonctionnement manuel à manivelle\n\nPoints forts :\n\nExtraction efficace et douce du miel\nStructure inox résistante et hygiénique\nStable grâce au trépied\nAdapté aux apiculteurs débutants et professionnels\nFacile à utiliser et à nettoyer	700	-3	7	600	https://s.alicdn.com/@sc04/kf/Hbdbdcedc89de4008b50b8566eb3d2b4cR.jpg?avif=close&webp=close	https://s.alicdn.com/@sc04/kf/H4e63fcfcaec9444f8b5e6949c724a492c.jpg?avif=close&webp=close	https://s.alicdn.com/@sc04/kf/H84a34f0eedab4fe08e1209098116a114g.jpg?avif=close&webp=close	https://s.alicdn.com/@sc04/kf/H1954b5d216184d3a8e1418caf188fb3da.jpg?avif=close&webp=close	f		5	50	extracteur-4-cadres-	9	5	0
79	APIVAR	Action :\nSa substance active, l’amitraze, possède une activité insecticide et acaricide par contact. Elle inhibe la transmission neuronale, provoquant une neurotoxicité. Le parasite est paralysé puis éliminé naturellement par gravité dans l’environnement.\nApivar est indiqué pour la prévention et le traitement de la varroose des abeilles (Varroa jacobsoni ou Varroa destructor).\n\nUtilisation :\nUtiliser 2 bandes Apivar par ruche (10 cadres).\nSéparer la double bande et placer chaque bande entre deux cadres mobiles, en maintenant au moins une distance de deux cadres entre les bandes.\nSuspendre le traitement dans la chambre de couvain afin de permettre aux abeilles de circuler librement de chaque côté du couvain	75	13	11	\N	https://m.media-amazon.com/images/I/61ga5FlJcJL._AC_SL1246_.jpg	https://www.donegalbees.ie/cdn/shop/products/Apivar-Label-Product-Image_800x.png?v=1758030560			f		5	19	apivar	9	\N	0
99	Demi-combinaison d’apiculture avec masque rond intégré	Cette demi-combinaison d’apiculteur professionnelle en 100% coton offre une protection optimale contre les piqûres d’abeilles lors de toutes vos visites au rucher. Confortable et respirante, elle garantit une sécurité maximale tout en facilitant vos mouvements pendant l’entretien des ruches. Le chapeau rond intégré protège efficacement le visage et le cou, pour une expérience apicole sûre et agréable.	109	4	5	\N	https://api.apiculturegalai.tn/uploads/ChatGPT%20Image%2014%20janv.%202026,%2011_57_01.png				t		5	29	demi-combinaison-d’apiculture-avec-masque-rond-intégré	9	4	0
240	Bobine chinois 500g	La bobine de fil étamé chinois 500g est conçue pour les travaux de montage et de renforcement des cadres de ruche en apiculture. Elle permet de fixer solidement les feuilles de cire gaufrée afin d’assurer une bonne stabilité des cadres pendant le développement des colonies et l’extraction du miel.\n\nGrâce à son revêtement étamé, ce fil offre une bonne résistance à l’oxydation et une excellente conductivité pour les appareils de soudure de cire gaufrée. Souple et robuste à la fois, il facilite le filage des cadres tout en garantissant une tension efficace.\n\nCette bobine convient aussi bien aux apiculteurs amateurs qu’aux professionnels recherchant une solution pratique et économique pour l’équipement des ruches.\n\nCaractéristiques :\nBobine de fil étamé pour apiculture\nOrigine : Chine\nPoids : 500 g\nBonne résistance à l’oxydation\nCompatible avec les cadres de ruche standards\nAdapté au montage des feuilles de cire gaufrée\nAvantages :\nMaintien solide de la cire gaufrée\nBonne conductivité pour la soudure de cire\nFacile à tendre et à installer\nRésistant et durable\nExcellent rapport qualité/prix	8	0	4	0	https://api.apiculturegalai.tn/uploads/Gemini_Generated_Image_okfjxtokfjxtokfj.png				f		5	3	bobine-chinois-500g	9	\N	0
241	Défigeur De Miel		570	0	7	0	https://www.api-bourgogne.fr/2251-large_default/defigeur-primio.jpg				f		5	3	défigeur-de-miel	9	\N	0
\.


--
-- Data for Name: stories; Type: TABLE DATA; Schema: public; Owner: apiculturefromtn
--

COPY public.stories (id, title, platform, url, thumbnail, created_at, updated_at, periority) FROM stdin;
14		youtube	https://www.youtube.com/embed/vXiwjCfIuLo?autoplay=0	https://api.apiculturegalai.tn/uploads/Capture%20d’écran%202026-03-12%20104941.png	2026-03-12 09:48:55.58799	2026-03-25 12:07:20.317725	1
4	story2	tiktok	https://www.tiktok.com/embed/v2/7613678222693289237	https://api.apiculturegalai.tn/uploads/Screenshot_20260305_093124.png	2026-03-05 07:56:49.383823	2026-03-05 08:34:26.841953	3
7	story2	tiktok		https://api.apiculturegalai.tn/uploads/Screenshot_20260305_093711.png	2026-03-05 08:35:04.829006	2026-03-05 08:49:14.805126	4
8	booster bee	tiktok	https://www.tiktok.com/embed/v2/7613867102004366612	https://api.apiculturegalai.tn/uploads/Capture%20d’écran%202026-03-05%20212036.png	2026-03-05 20:15:00.704605	2026-03-05 20:22:17.436438	1
9		tiktok	https://www.tiktok.com/embed/v2/7613868908751179028	https://api.apiculturegalai.tn/uploads/Capture%20d’écran%202026-03-05%20212419.png	2026-03-05 20:24:29.461942	2026-03-05 20:25:31.001175	1
10		tiktok	https://www.tiktok.com/embed/v2/7613868835417902356	https://api.apiculturegalai.tn/uploads/Capture%20d’écran%202026-03-05%20212627.png	2026-03-05 20:28:58.656972	2026-03-05 20:29:48.208021	1
11		tiktok	https://www.tiktok.com/embed/v2/7616290684588297493	https://api.apiculturegalai.tn/uploads/Capture%20d’écran%202026-03-12%20102118.png	2026-03-12 09:23:29.572775	2026-03-12 09:24:22.082004	1
12		tiktok	https://www.tiktok.com/embed/v2/7616298763623140628	https://api.apiculturegalai.tn/uploads/Capture%20d’écran%202026-03-12%20103239.png	2026-03-12 09:33:42.446393	2026-03-12 09:35:11.130721	1
13		tiktok	https://www.tiktok.com/embed/v2/7592571954918493452	https://api.apiculturegalai.tn/uploads/Capture%20d’écran%202026-03-12%20103626.png	2026-03-12 09:47:10.517818	2026-03-12 09:47:33.600005	1
\.


--
-- Data for Name: subcategories; Type: TABLE DATA; Schema: public; Owner: apiculturefromtn
--

COPY public.subcategories (id, name, description, image_url, link, category_id) FROM stdin;
3	Combinaison tunisienne	Cette combinaison apicole est conçue pour offrir une protection optimale lors du travail avec les abeilles. Fabriquée en Tunisie, elle est réalisée avec un tissu résistant et confortable, adapté aux conditions climatiques locales.	\N	\N	5
4	Combinaison importé	Nos combinaisons importées offrent une excellente qualité, alliant confort, résistance et protection optimale pour un usage professionnel.\nElles sont conçues avec des matériaux durables, un design ergonomique et des finitions solides pour garantir une utilisation pratique et sécurisée.\nIdéales pour l’apiculture et les travaux extérieurs, elles représentent un choix fiable au meilleur prix en Tunisie.	\N	\N	5
5	Extracteur de miel 	L’extracteur de miel est un équipement indispensable en apiculture, permettant de récolter le miel de manière rapide, propre et efficace sans endommager les cadres. Conçu en acier inoxydable ou en matériaux résistants, il garantit une excellente durabilité ainsi qu’un respect total de l’hygiène alimentaire.\nDisponible en version manuelle ou électrique, l’extracteur s’adapte aussi bien aux apiculteurs débutants qu’aux professionnels. Son système de rotation performant permet d’extraire le miel en douceur tout en préservant la qualité des rayons et du produit final.	\N	\N	7
6	Maturateur miel 	Le maturateur de miel est un équipement essentiel dans le processus de transformation du miel après l’extraction. Il permet de laisser reposer le miel afin de séparer naturellement les impuretés, la cire et les bulles d’air, garantissant ainsi un miel plus pur, clair et de meilleure qualité avant la mise en pot.\n\nUtilisé par les apiculteurs professionnels et amateurs, le maturateur facilite la décantation et la maturation du miel dans des conditions hygiéniques optimales. Grâce à son robinet pratique, il permet un remplissage facile et propre des pots de miel.\n\nFabriqué avec des matériaux résistants et adaptés au contact alimentaire, le maturateur assure une excellente conservation du miel tout en respectant les normes d’hygiène de l’apiculture.\n\nChez Galai Apiculture, nous proposons plusieurs modèles de maturateurs de miel pour apiculture adaptés aux besoins des apiculteurs, permettant d’améliorer la qualité du miel et de simplifier les étapes de conditionnement.	\N	\N	7
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: apiculturefromtn
--

COPY public.users (id, username, email, hashed_password) FROM stdin;
1	admin@admin.com	admin@admin.com	$2b$12$2ehDfZy/wXt67pKwJrXKhuwFdTLskxly7SJox0soObNuW3DA8G9pO
\.


--
-- Data for Name: vip_cards; Type: TABLE DATA; Schema: public; Owner: apiculturefromtn
--

COPY public.vip_cards (id, customer_key, customer_name, email, telephone, code, approved, issued_at, created_at, updated_at) FROM stdin;
\.


--
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apiculturefromtn
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 1, false);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apiculturefromtn
--

SELECT pg_catalog.setval('public.categories_id_seq', 12, true);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apiculturefromtn
--

SELECT pg_catalog.setval('public.order_items_id_seq', 637, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apiculturefromtn
--

SELECT pg_catalog.setval('public.orders_id_seq', 216, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apiculturefromtn
--

SELECT pg_catalog.setval('public.products_id_seq', 249, true);


--
-- Name: stories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apiculturefromtn
--

SELECT pg_catalog.setval('public.stories_id_seq', 14, true);


--
-- Name: subcategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apiculturefromtn
--

SELECT pg_catalog.setval('public.subcategories_id_seq', 6, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apiculturefromtn
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: vip_cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apiculturefromtn
--

SELECT pg_catalog.setval('public.vip_cards_id_seq', 1, false);


--
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: stories stories_pkey; Type: CONSTRAINT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.stories
    ADD CONSTRAINT stories_pkey PRIMARY KEY (id);


--
-- Name: subcategories subcategories_pkey; Type: CONSTRAINT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: vip_cards vip_cards_pkey; Type: CONSTRAINT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.vip_cards
    ADD CONSTRAINT vip_cards_pkey PRIMARY KEY (id);


--
-- Name: ix_cart_items_id; Type: INDEX; Schema: public; Owner: apiculturefromtn
--

CREATE INDEX ix_cart_items_id ON public.cart_items USING btree (id);


--
-- Name: ix_categories_id; Type: INDEX; Schema: public; Owner: apiculturefromtn
--

CREATE INDEX ix_categories_id ON public.categories USING btree (id);


--
-- Name: ix_order_items_id; Type: INDEX; Schema: public; Owner: apiculturefromtn
--

CREATE INDEX ix_order_items_id ON public.order_items USING btree (id);


--
-- Name: ix_orders_id; Type: INDEX; Schema: public; Owner: apiculturefromtn
--

CREATE INDEX ix_orders_id ON public.orders USING btree (id);


--
-- Name: ix_products_id; Type: INDEX; Schema: public; Owner: apiculturefromtn
--

CREATE INDEX ix_products_id ON public.products USING btree (id);


--
-- Name: ix_stories_id; Type: INDEX; Schema: public; Owner: apiculturefromtn
--

CREATE INDEX ix_stories_id ON public.stories USING btree (id);


--
-- Name: ix_subcategories_id; Type: INDEX; Schema: public; Owner: apiculturefromtn
--

CREATE INDEX ix_subcategories_id ON public.subcategories USING btree (id);


--
-- Name: ix_users_id; Type: INDEX; Schema: public; Owner: apiculturefromtn
--

CREATE INDEX ix_users_id ON public.users USING btree (id);


--
-- Name: ix_users_username; Type: INDEX; Schema: public; Owner: apiculturefromtn
--

CREATE UNIQUE INDEX ix_users_username ON public.users USING btree (username);


--
-- Name: ix_vip_cards_code; Type: INDEX; Schema: public; Owner: apiculturefromtn
--

CREATE UNIQUE INDEX ix_vip_cards_code ON public.vip_cards USING btree (code);


--
-- Name: ix_vip_cards_customer_key; Type: INDEX; Schema: public; Owner: apiculturefromtn
--

CREATE UNIQUE INDEX ix_vip_cards_customer_key ON public.vip_cards USING btree (customer_key);


--
-- Name: ix_vip_cards_id; Type: INDEX; Schema: public; Owner: apiculturefromtn
--

CREATE INDEX ix_vip_cards_id ON public.vip_cards USING btree (id);


--
-- Name: cart_items cart_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: cart_items cart_items_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: products fk_subcategory; Type: FK CONSTRAINT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_subcategory FOREIGN KEY (subcategory_id) REFERENCES public.subcategories(id) ON DELETE SET NULL;


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: subcategories subcategories_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- PostgreSQL database dump complete
--