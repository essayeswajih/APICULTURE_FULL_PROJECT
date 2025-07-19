
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/boutique"
  },
  {
    "renderMode": 2,
    "route": "/a-propos"
  },
  {
    "renderMode": 2,
    "route": "/contact"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-IODEHIIB.js"
    ],
    "route": "/panier"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ZP3PHKD5.js"
    ],
    "route": "/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/categories"
  },
  {
    "renderMode": 2,
    "route": "/products"
  },
  {
    "renderMode": 2,
    "route": "/orders"
  },
  {
    "renderMode": 2,
    "route": "/product/1"
  },
  {
    "renderMode": 2,
    "route": "/product/2"
  },
  {
    "renderMode": 2,
    "route": "/product/3"
  },
  {
    "renderMode": 2,
    "route": "/product/4"
  },
  {
    "renderMode": 2,
    "route": "/product/5"
  },
  {
    "renderMode": 0,
    "route": "/product/*"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-SCNU7LUJ.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 7353, hash: 'e388660558033ee04181c96fbac4def4699d7f24c3810258bee89c3150eaed73', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 3336, hash: '7fe91c9fd5c3e573ddd5ea3bc52673af4a284069b183adc1a42dde702886e4fe', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'boutique/index.html': {size: 40550, hash: 'bd59cdac30686ce9b290ddff9d35926c3aa4033b29ecf5cbcd742b2bbd3a73e5', text: () => import('./assets-chunks/boutique_index_html.mjs').then(m => m.default)},
    'index.html': {size: 51094, hash: '8ee5590d350f5f1423e63bb32dffd69fae741db9892c57b09f817936fe20f109', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'product/2/index.html': {size: 36915, hash: '14b28af4ff5f35e7b875fae24fb61c7bbb6dca50c030d2f7f0cb7b76f9505356', text: () => import('./assets-chunks/product_2_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 44026, hash: '13f8d1462d4776e775484978888cf50446ff2ac1ec62fb4451ae6481484d247d', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'product/4/index.html': {size: 36913, hash: '9ba803ae8401dd44f19e2bbc86b588acea566997689fdaea29976c26281cff80', text: () => import('./assets-chunks/product_4_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 38587, hash: '9f885b957e395fb5b292677fbd637ea9e72cc78a9ef69f8b56b9f548dac1158a', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'product/1/index.html': {size: 36916, hash: '9c984742815ef68c052ef279d4c9180c570d7aacc3969b6f123b3fab37bfdcb3', text: () => import('./assets-chunks/product_1_index_html.mjs').then(m => m.default)},
    'panier/index.html': {size: 50526, hash: 'eca3b0b1846da47742707027977306cfea34133a69e3d8c90b4bf3454b2bf6e6', text: () => import('./assets-chunks/panier_index_html.mjs').then(m => m.default)},
    'product/5/index.html': {size: 36913, hash: '9ba803ae8401dd44f19e2bbc86b588acea566997689fdaea29976c26281cff80', text: () => import('./assets-chunks/product_5_index_html.mjs').then(m => m.default)},
    'product/3/index.html': {size: 36915, hash: '14b28af4ff5f35e7b875fae24fb61c7bbb6dca50c030d2f7f0cb7b76f9505356', text: () => import('./assets-chunks/product_3_index_html.mjs').then(m => m.default)},
    'a-propos/index.html': {size: 42792, hash: '28553b00fda46071401184e9f304ce011632722fe990b7f78b2d34e755a77e05', text: () => import('./assets-chunks/a-propos_index_html.mjs').then(m => m.default)},
    'styles-BVJQD57C.css': {size: 230873, hash: 'YU+im7r2LDs', text: () => import('./assets-chunks/styles-BVJQD57C_css.mjs').then(m => m.default)}
  },
};
