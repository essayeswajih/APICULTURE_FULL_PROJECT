
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
      "chunk-FFOOFNKH.js"
    ],
    "route": "/panier"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-RP2BIXSU.js"
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
      "chunk-T3F7KOK5.js"
    ],
    "route": "/client-order-view"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-4IZWCT5B.js"
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
    'index.csr.html': {size: 9070, hash: '25232d34845a08554c2e3dbe1a502e5d8d209e4382728e406afd82cfbb99aa0c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 5052, hash: 'bc501f634d4370de13f53e2e7842505fea3b508af210e8887be526cdddeedeac', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'boutique/index.html': {size: 42545, hash: '5205b1127c4691f5c5651ce8881b034526531313a5cf1593eb8d0b67b56c3f37', text: () => import('./assets-chunks/boutique_index_html.mjs').then(m => m.default)},
    'index.html': {size: 53078, hash: '9fe587d95eb54a5e5bc397ab58e40774fe8a9ba4e4c1f4ec548d0f56d04c906a', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'product/2/index.html': {size: 45019, hash: '8419ab7bf93144cd01c2a08fe739ba0710c8410ab612bc4e288d99bf7046ac6d', text: () => import('./assets-chunks/product_2_index_html.mjs').then(m => m.default)},
    'product/4/index.html': {size: 45019, hash: '8419ab7bf93144cd01c2a08fe739ba0710c8410ab612bc4e288d99bf7046ac6d', text: () => import('./assets-chunks/product_4_index_html.mjs').then(m => m.default)},
    'client-order-view/index.html': {size: 44443, hash: '9ca3b10181a9fef8dbef23ed42b7c7467a028d6164dab605ace42393b87904d8', text: () => import('./assets-chunks/client-order-view_index_html.mjs').then(m => m.default)},
    'a-propos/index.html': {size: 44691, hash: 'cb52073ff39ed43cf466334c35c6c24c35f441aa3890508026a127e89c4b2c29', text: () => import('./assets-chunks/a-propos_index_html.mjs').then(m => m.default)},
    'panier/index.html': {size: 52426, hash: 'a80903f62f3acd3c8a63010556438ae991c4145ae9ee2fb40646f28ae664fd09', text: () => import('./assets-chunks/panier_index_html.mjs').then(m => m.default)},
    'product/3/index.html': {size: 41965, hash: '361b29715e86b34adff85ec09395b08722ecc0fa52b64671ce3d0d462bd242d2', text: () => import('./assets-chunks/product_3_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 40526, hash: 'cf38e35e47e6d8175295dae9ae23f9ad7b3aebd14697d5980e2ca60ca24e5247', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'product/5/index.html': {size: 41962, hash: 'dd782cdfdd90feed24528e11e441a73a9926fd3ede2a9213f3c8059b4460df9c', text: () => import('./assets-chunks/product_5_index_html.mjs').then(m => m.default)},
    'product/1/index.html': {size: 41965, hash: '361b29715e86b34adff85ec09395b08722ecc0fa52b64671ce3d0d462bd242d2', text: () => import('./assets-chunks/product_1_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 45926, hash: '7bffc72897d22bc3db5fc3f6cecaf69aa806853afbe05994266f4c59055e3b40', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'styles-JTUKHJ3N.css': {size: 236298, hash: 'tAzvSA1SQww', text: () => import('./assets-chunks/styles-JTUKHJ3N_css.mjs').then(m => m.default)}
  },
};
