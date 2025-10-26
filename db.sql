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
    'DELIVERED'
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
    description character varying
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
    name character varying
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
    code character varying NOT NULL
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
    buzzent text
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
-- Name: users id; Type: DEFAULT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: apiculturefromtn
--

COPY public.cart_items (id, user_id, product_id, quantity, name) FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: apiculturefromtn
--

COPY public.categories (id, name, description) FROM stdin;
4	Cadre & Cire	Découvrez notre sélection de produits : tous les cadres de ruches, les outils pour le montage des cadres et les cires
1	Ruches	Notre sélection d'articles pour acheter une ruche, entretenir une ruche et réparer une ruche.\nTous les modèles de ruche sont disponibles en pièces détachées
5	Equipement apicultrice	Matériels nécessaires pour le management des ruches.
6	Emballage miel 	Les emballages de miel sont conçus pour préserver la qualité et la pureté du produit, tout en facilitant son utilisation. Disponibles en verre, plastique ou en format "squeeze", ils allient praticité, hygiène et esthétisme.
7	équipement pour le miel 	L’équipement pour le miel comprend les outils indispensables à l’extraction et au conditionnement du miel, comme l’extracteur, le tamis et le maturateur. Ces équipements permettent de garantir un miel pur, bien filtré et prêt à être mis en pot dans des conditions hygiéniques
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: apiculturefromtn
--

COPY public.order_items (id, order_id, product_id, quantity, price, name) FROM stdin;
1	1	1	3	665	Kit Miellerie Extracteur Beetools
2	2	38	2	75	Lot de 3 hausse 
3	2	18	2	20	Toit en tôle h. 80mm Dadant 10 cadres
4	2	15	1	25	Lève-cadres pince
5	3	38	1	75	Lot de 3 hausse 
6	3	3	1	43	Housse Riche 
7	3	10	1	30	Enfumoir grand taille
8	3	9	1	23	Enfumoir pour apiculteur
9	4	18	1	20	Toit en tôle h. 80mm Dadant 10 cadres
10	4	3	1	43	Housse Riche 
11	4	14	1	15	Lève cadre avec crochet
12	4	17	1	10	Brosse à abeilles en nylon manche bois
13	5	37	1	85	Ruche abeille complète 
14	6	47	1	30	Charme d'abeille Abejar
15	6	14	1	15	Lève cadre avec crochet
16	7	37	1	85	Ruche abeille complète 
17	8	37	1	85	Ruche abeille complète 
18	9	30	1	10	Couvre-cadres bois Dadant 10 cadres
19	9	3	1	43	Housse Riche 
20	9	32	1	740	Extracteur 3 cadre
21	10	3	1	43	Housse Riche 
22	11	14	1	15	Lève cadre avec crochet
23	12	23	1	40	 Ruchette à tenons Dadant 6 cadres
24	13	34	1	249	Presse-miel manuel 
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: apiculturefromtn
--

COPY public.orders (id, total_amount, status, created_at, username, email, telephone, location, payment_method, payed, code) FROM stdin;
1	1995	PROCESSING	2025-07-15 16:30:44.719156	Mohamed Wajih 5021 Essayes	wajihsayes@gmail.com	27553981	Mnastir	cod	check	96031-46488-62741-77686
2	215	PENDING	2025-07-26 10:40:59.618218	Mohamed Wajih 5021 Essayes	wajih-essayes@outlook.fr	27553981	Mnastir	cod	check	43220-20861-58611-36138
3	171	PENDING	2025-07-26 10:50:41.341911	Mohamed Wajih Essayes	wajih-essayes@outlook.fr	27553981	Mnastir	cod	check	29400-21217-27086-38354
4	88	PENDING	2025-07-26 11:15:28.091043	Mohamed Wajih 5021 Essayes	wajih-essayes@outlook.fr	27553981	Mnastir	cod	check	41771-53750-19475-20397
5	85	PENDING	2025-07-27 18:01:47.919272	Ahhah	abdelbassetgalai3@gmail.com	55716454	Jsvsvdhs	cod	check	53454-68500-30511-58960
6	45	PENDING	2025-08-02 22:49:05.159729	amir	abdelbassetgalai3@gmail.com	55716454	monastir bembla	online	check	52957-75308-43448-32837
7	93	PENDING	2025-08-03 10:35:00.574624	Mohamed Wajih 5021 Essayes	wajihsayes@gmail.com	27553981	Mnastir	cod	check	90742-55550-88628-54507
8	109.15	PENDING	2025-08-03 10:53:10.802375	Mohamed Wajih 5021 Essayes	wajihsayes@gmail.com	27553981	Mnastir	cod	check	30641-93875-93232-28095
9	951.6700000000001	PENDING	2025-08-04 10:39:21.93975	Amir	abdelbassetgalai3@gmail.com	55716454	Bembla 	cod	check	57820-44375-56024-21667
10	59.17	PENDING	2025-09-06 06:46:08.768134	Test	abdelbassetgalai3@gmail.com	55716454	Bembla	cod	check	17856-65289-58017-28627
11	25.85	PENDING	2025-10-14 08:53:23.087784	Mohamed Wajih 5021 Essayes	wajihsayes@gmail.com	27553981	Mnastir	cod	check	51154-45281-40957-76238
12	55.6	PENDING	2025-10-14 09:28:41.903344	Abdelbasset Galai	abdelbassetgalai3@gmail.com	55716454	monastir	cod	check	32326-33849-57446-29988
13	304.31	PENDING	2025-10-17 16:16:36.419523	Mohamed amine boukhalet	amine.boukhalet@gmail.com	53445555	Malek centre - centre urbain nord	cod	check	39664-99924-23180-41116
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: apiculturefromtn
--

COPY public.products (id, name, description, price, stock_quantity, category_id, discounted_price, image_url, image2_url, image3_url, image4_url, promo, buzzent) FROM stdin;
23	 Ruchette à tenons Dadant 6 cadres	La ruchette Dadant 6 cadres avec aération totale est idéale pour accueillir un essaim artificiel ou naturel. Elle offre un environnement sain et bien ventilé, assurant confort et sécurité à votre jeune colonie d'abeilles.	40	7	1	0	https://www.apiculture.net/22108/ruchette-dadant-6-cadres-aeration-totale.jpg	\N	\N	\N	f	
3	Housse Riche 	Housse en bois composant en 10 cadre 	43	54	1	43	https://ruchetadla.ma/wp-content/uploads/2024/06/Sans-titre-10.png	\N	\N	\N	t	
14	Lève cadre avec crochet	Lève-cadre avec crochet, outil simple pour soulever les cadres des ruches sans les casser.	15	-3	5	\N	https://www.ducatillon.com/22389-large_default/leve-cadre-de-ruche-avec-crochet.jpg	\N	\N	\N	t	
34	Presse-miel manuel 	Presse-miel, machine de presse à miel manuelle domestique, extracteur de miel avec grande plaque de presse, machine de presse à miel d'abeille de 12,6 L, grand extracteur de presse à miel d'abeille	249	18	7	0	https://m.media-amazon.com/images/I/610TsrCxxjL._AC_SL1500_.jpg	\N	\N	\N	f	
33	extracteur 4 cadres 	Jago® Extracteur de Miel - Manuel, Trépied, 4 Cadres, en Acier Inoxydable, Diamètre 49 cm, Hauteur 100 cm - Machine à Miel, Séparateur, Centrifugeuse,...	928	0	7	828	https://m.media-amazon.com/images/I/619qeCmEMnL._SL1500_.jpg	\N	\N	\N	f	
24	Nourrisseur couvre-cadres	Prêt à l’emploi, ce nourrisseur couvre-cadres permettra à vos abeilles de s'approvisionner pendant l’hiver.\n\nÉconomique et léger ce nourrisseur couvre-cadres en plastique comprend deux bacs séparés pour une capacité de 7 litres au total. Ils vous permettront d’utiliser de la nourriture liquide ou solide	15	100	1	0	https://www.apiculture.net/9888-thickbox_default/nourrisseur-couvre-cadres-nicot-dadant-10-cadres.jpg	\N	\N	\N	f	
25	Cadre en bois avec fils horizontaux 		19.2	1000	4	0	https://www.apiculture.net/22204/x12-cadres-langstroth-hoffmann-avec-fils-horizontaux.jpg.pagespeed.ic.mSC9tYRWA2.jpg	\N	\N	\N	f	
26	Plateau Ruches 	Parfaitement adapté à nos régions tempérées, ce fond de ruche Warré contribue à isoler la colonie des variations de température, des courants d'air et de l'humidité. Ce plateau de ruche est réversible avec un côté hiver et un côté été.	15	100	1	0	https://www.latiendadelapicultor.com/5781/plancher-fond-en-bois.jpg	\N	\N	\N	f	
31	Extracteur 2 cadre 	Tirez le meilleur parti de votre apiculture avec cet extracteur de miel manuel robuste, conçu pour les apiculteurs qui souhaitent conserver la pureté de leur miel. Cet extracteur de miel manuel offre un moyen simple mais efficace d'extraire le miel de vos rayons, sans électricité et avec un contrôle total sur le processus	540	3	7	0	https://media.s-bol.com/JkQJ5jq190NJ/v2R24or/1032x1200.jpg	\N	\N	\N	f	
27	Pot en verre carré (212ml)	Ce pot en verre 212 ml de forme carrée mettra en valeur votre production de miel, vos confitures et préparations culinaires. Il se ferme par une élégante capsule TO 66.	2.2	100	6	0	https://www.icko-apiculture.com/media/catalog/product/cache/d802369170294dd4f6c54e59d4fa2c57/image/1085609f1/pot-en-verre-carre-212ml-to66.jpg	\N	\N	\N	f	
28	 Pots en verre carré 250 g (314 ml) 	Ce pot en verre 314 ml de forme carrée mettra en valeur votre production de miel, vos confitures et préparations culinaires. Il se ferme par une élégante capsule	2.5	2000	6	0	https://www.icko-apiculture.com/media/catalog/product/cache/d802369170294dd4f6c54e59d4fa2c57/image/133741d01/pack-de-6-pots-en-verre-carre-250-g-314-ml-to66.jpg	\N	\N	\N	f	
29	pot verre 1kg avec capsule 		1.3	2000	6	0	https://www.apiculture.net/11438-thickbox_default/12-pots-verre-500-g-370-ml-avec-couvercles-to-63.jpg	\N	\N	\N	f	
7	Cire de cadre 5 kg	5 kg de feuilles de cire d'abeille gaufrées Voirnot corps Sélection	135	100	4	123	https://www.apiculture.net/img/p/1/5/5/1/1/15511.jpg	\N	\N	\N	t	
15	Lève-cadres pince	Entièrement fabriqué en acier chromé et d'une grande solidité, ce lève-cadres pince, au design favorisant une excellente prise en main, saisie et détache sans efforts les cadres collés sur les parois de la ruche.\nC'est un outil apicole qui contribue à l'exercice d'une apiculture pratique et agréable.	25	9	5	0	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4wIUJbH94WDvRSShLKHjLYDQN4fenNe49zQ&s	\N	\N	\N	f	
9	Enfumoir pour apiculteur	Enfumoir pour apiculteur de petite taille, idéal pour calmer les abeilles lors des interventions en ruche.	23	14	5	15	https://cdn.manomano.com/images/images_products/1953565/P/94076911_1.jpg	\N	\N	\N	t	
10	Enfumoir grand taille	Enfumoir pour apiculteur de grande taille, conçu pour une utilisation prolongée et efficace lors des visites de ruches importantes.	30	49	5	0	https://www.apiculture.net/21427/xenfumoir-americain-grand-modele.jpg.pagespeed.ic.qjaeHCQf26.jpg	\N	\N	\N	f	
17	Brosse à abeilles en nylon manche bois	Une brosse à abeille douce, idéale pour les apiculteurs qui débutent et souhaitent s'équiper à moindre coût, pour brosser les abeilles hors des cadres pendant la récolte des hausses ou pour examiner les cadres de ruche.	10	29	5	\N	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzgQ0IkOKH7GNWYw2H1RQel2OCCiGSY-kAXQ&s	\N	\N	\N	f	
1	Botte apiculture 	Bottes jaunes en PVC pour rucher ou potager	24	20	5	663	https://m.media-amazon.com/images/I/51831OZd+IL._UF1000,1000_QL80_.jpg	\N	\N	\N	t	New
30	Couvre-cadres bois Dadant 10 cadres	Ce couvre-cadres en bois est conçu pour les ruches Dadant 10 cadres. Il sert à délimiter l’espace de la colonie et agit comme un tampon isolant entre l’habitacle des abeilles et le toit de la ruch	10	99	1	0	https://thumbs.nosto.com/quick/prestashop-0deac90a/8/2960/b051e999e7478aff61bac4b5d645b18d6c0edffd45d24ed0862aafc5a45765b4/A	\N	\N	\N	f	
32	Extracteur 3 cadre	Extracteur de miel à 3 cadres, extraction manuelle d'apiculture en acier inoxydable, spinner de tambour en nid d'abeille avec couvercle transparent, équipement de centrifugeuse de ruche	740	4	7	640	https://m.media-amazon.com/images/I/51rBZbElXrL._SL1500_.jpg	\N	\N	\N	f	
36	Gants en cuir qualité supérieure	Agréable et résistante, cette paire de gants en cuir de qualité supérieure est idéale pour la manipulation de vos ruches.\nLes gants sont constitués de cuir de vache et le manchon est en coton pour une finition parfaite.	15	100	5	\N	https://www.apiculture.net/9742-large_default/gants-en-cuir-qualit-sup-rieure.jpg				t	
38	Lot de 3 hausse 	lot de 3 hausse offre une solidité remarquable grâce à un assemblage à tenons. Conçu avec des finitions soignées et en bois de pin maritime non traité, il assure un environnement naturel pour vos abeilles et est prêt à l'emploi avec crémaillères et bande intercadre.	75	297	1	0	https://www.apiculture.net/22131-large_default/lot-de-3-corps-warre-fabriques-en-france-tenons.jpg	\N	\N	\N	f	
18	Toit en tôle h. 80mm Dadant 10 cadres	Robuste & très léger, ce toit en tôle est une solution bon marché pour isoler la ruche Dadant 10 cadres des intempéries & des pilleurs avec une hauteur standard qui sera idéale pour les régions tempérées.	20	17	1	0	https://www.apiculture.net/19821-thickbox_default/toit-en-tole-h-80-mm-dadant-10-cadres.jpg	\N	\N	\N	f	
41	kit rucher pour débutant 	Ce kit rucher est la solution idéale pour bénéficier d'outils apicoles de qualité à petit prix : combinaison apicole, gants, enfumoir avec lève-cadre et brosse !	148	20	5	100	https://m.media-amazon.com/images/I/61gw0VioLuL._AC_SL1500_.jpg	https://www.agri-dev.com/1228/leve-cadre-abeille-simple.jpg	https://www.lamaison.fr/media/catalog/product/0/3/0367661_0001_4a5773ec5f611d179dd0ef3.jpg?quality=80&fit=bounds&height=700&width=700&canvas=700:700		f	
42	Masque caree 	Masque de protection simple et doté d'une visière grillagée en métal\nSimple, il s'enfile comme une cagoule.\n\n2 élastiques de serrage \nTaille unique 	15	0	5	0	https://www.triangle-outillage.fr/17232-thickbox_default/masque-de-protection.jpg	\N	\N	\N	f	
43	Masque rond 	Masque d'apiculteur typique de forme ronde , masque moyen, avec lacets nouer sur le laboureur ou la chemise, calotte en cuir, grille en fibre de verre et veste en tissu blanc.\nIl travaille sur le marché de l’apiculture depuis plus de 20 ans.\nMasque spécifique à usage apicole . Taille unique	20	10	5	0	https://apicolalospedroches.com/images/careta-redonda-apicultor-gorro-skay.jpg				f	
50	CHARME D'ABEILLE ABEJAR SPRAY	Aérosol Charme Abeille.\n\nPermet d'essayer de capturer des essaims d'abeilles.\n\nPulvériser légèrement les parois et les cadres de la ruche à 30 cm.\n\nRenouveler l'opération tous les 8 jours	30	30	1	0	https://www.agri-dev.com/1253-tm_thickbox_default/charme-d-abeille-abejar-spray.jpg				f	
44	trappeuse poullen plastique	Trappe à pollen en plastique pour les ruches : fixes en bois, en plastique ANEL ou les ruches en polystyrène Paradise. Elle n’est pas adaptée aux ruches de transhumance en bois.	50	30	1	0	https://www.latiendadelapicultor.com/7554/trappe-a-pollen-en-plastique.jpg				f	
45	Grille rein plastique 	Cette grille à reine injectée en matière plastique alimentaire recyclable est idéale pour préserver vos cadres de hausse de tout couvain. Elle s'adapte sur n'importe quel type de ruche Dadant Blatt à 10 cadres (bois ou plastique)	8	300	1	0	https://www.latiendadelapicultor.com/5432/grille-reine-nicot-plastique-moule-dadant-blatt-10.jpg	\N	\N	\N	f	
46	Grille rein en fer	râce à une grille à reine en métal que vous placez entre le corps et la hausse, vous empêchez votre reine de monter dans les cadres de hausses pour pondre. L’espacement de la grille à reine permet tout de même à vos ouvrières de circuler, seule la reine est  bloquée dans le corps.	19	0	1	0	https://www.naturapi.com/media/catalog/product/cache/4f4313cdc60c7aede3fd454543dea906/_/d/_dsc5435_1.jpg	\N	\N	\N	f	
51	fil en acier pour cadre 	Bobine de fil en acier galvanisé pour le montage de vos cadres non filés. Le fil d'acier servira à maintenir vos feuilles de cire gaufrée dans les cadres en bois tout en apportant davantage de solidité	7	20	1	0	https://apiculturegalai.tn/uploads/Capture%20d%E2%80%99%C3%A9cran%202025-05-28%20185823.png				f	
47	Charme d'abeille Abejar		30	9	1	0	https://apicolasalsol.com/sec_din/archivos/imgs/16045051345991.jpg	\N	\N	\N	f	
48	Charme d'abeille tube 	Le Charme d'Abeille en Tube est un attractif naturel à base d’huiles essentielles conçu pour attirer les essaims dans vos ruches. Son format pratique permet une application facile sur les cadres ou les ruches pièges.	15	30	1	0	https://www.bijenhof.be/assets/img/dbpics/webshop_images/22120%20-%20Ariste%20zwermlokcreme%2030gr%202.jpg?&width=900&format=jpg&bgcolor=fff&watermark=BIJENHOF&color=fff&fontsize=30&fontfamily=Arial,Helvetica,sans-serif&fontopacity=40&dropshadow=true				f	
37	Ruche abeille complète 	Idéale pour tous les apiculteurs, du débutant au professionnel, la ruche Langstroth 10 cadres est assez répandue, vous trouverez facilement tous les accessoires et éléments nécessaires pour la conduite de votre rucher.	85	46	1	0	https://www.thomas-apiculture.com/29806-thickbox_default/ruche-langstroth-2-corps-tradition-toit-plat-sans-cadre.jpg	\N	\N	\N	f	
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: apiculturefromtn
--

COPY public.users (id, username, email, hashed_password) FROM stdin;
1	admin@admin.com	admin@admin.com	$2b$12$2ehDfZy/wXt67pKwJrXKhuwFdTLskxly7SJox0soObNuW3DA8G9pO
\.


--
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apiculturefromtn
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 1, false);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apiculturefromtn
--

SELECT pg_catalog.setval('public.categories_id_seq', 7, true);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apiculturefromtn
--

SELECT pg_catalog.setval('public.order_items_id_seq', 24, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apiculturefromtn
--

SELECT pg_catalog.setval('public.orders_id_seq', 13, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apiculturefromtn
--

SELECT pg_catalog.setval('public.products_id_seq', 51, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: apiculturefromtn
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


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
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: apiculturefromtn
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


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
-- Name: ix_users_id; Type: INDEX; Schema: public; Owner: apiculturefromtn
--

CREATE INDEX ix_users_id ON public.users USING btree (id);


--
-- Name: ix_users_username; Type: INDEX; Schema: public; Owner: apiculturefromtn
--

CREATE UNIQUE INDEX ix_users_username ON public.users USING btree (username);


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
-- PostgreSQL database dump complete
--


