
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
      "chunk-DHAMEK7G.js"
    ],
    "route": "/panier"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-IAYUW67P.js"
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
      "chunk-TMG7B23R.js"
    ],
    "route": "/client-order-view"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-GMA7P5PX.js"
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
    'index.csr.html': {size: 7353, hash: 'e9fd9a0b822664cd149415dedd9f75c0fad50483de4eaaef0c2996b619e0c1b4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 3336, hash: '9af46e48a70d11512fde5e0e945c0f6e6030677ad7713fa6bf4b4accd113187d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 57841, hash: '9afabd8d86013ece4d3dd275c871f3dfac0b7f53bd363f1be1695e423dd9f9fb', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'boutique/index.html': {size: 49568, hash: '5eac18b9b9fedcf046c17d9df3c2c1b103f6e2a3f9e5956bf84edb99dfb94d8f', text: () => import('./assets-chunks/boutique_index_html.mjs').then(m => m.default)},
    'a-propos/index.html': {size: 44134, hash: '26d01de3235966069ae5be33a369ce49f1580c1a8634a547a4688021285404a2', text: () => import('./assets-chunks/a-propos_index_html.mjs').then(m => m.default)},
    'product/2/index.html': {size: 42275, hash: '1bd8d528c6fc543d6c760bf1dd348c1ba16a6023b7546173f909848add69a357', text: () => import('./assets-chunks/product_2_index_html.mjs').then(m => m.default)},
    'client-order-view/index.html': {size: 43843, hash: 'b8a5d820b3928f5d34e1851f64c8062e84e7bdde85955fef17e5cf4359afd065', text: () => import('./assets-chunks/client-order-view_index_html.mjs').then(m => m.default)},
    'product/4/index.html': {size: 42457, hash: 'd9b7f461fb6eac85a3e477424674026bc109d1c8fdb1ad5255728e2ee645f823', text: () => import('./assets-chunks/product_4_index_html.mjs').then(m => m.default)},
    'panier/index.html': {size: 51872, hash: '58e9161e776cc6f8e55e86f942e73fba22bad79fd3012460528cf8dd8575169d', text: () => import('./assets-chunks/panier_index_html.mjs').then(m => m.default)},
    'product/3/index.html': {size: 42515, hash: 'e58bf93a16a32287671ffae03cc1ea7e94a4d87d6cf954663e66389d3642c31f', text: () => import('./assets-chunks/product_3_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 39929, hash: 'a72331e445c4f551ba36509d3023574928c2e3dc34d8f21d2a144564463f983f', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'product/1/index.html': {size: 42442, hash: 'fb1bb380bbf7a0e044a12d45082ec108a9c66bce8334685af807395b1ff8ffbe', text: () => import('./assets-chunks/product_1_index_html.mjs').then(m => m.default)},
    'product/5/index.html': {size: 42395, hash: '6e9066851729f52b80b6b4738c989efaaabcf6335056150c2dfb6e0593d03e33', text: () => import('./assets-chunks/product_5_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 45372, hash: 'c32bda56f01e717a40f997c3fa7365a9ade0e47da83ee98a47de1ae250e495de', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'styles-BVJQD57C.css': {size: 230873, hash: 'YU+im7r2LDs', text: () => import('./assets-chunks/styles-BVJQD57C_css.mjs').then(m => m.default)}
  },
};
