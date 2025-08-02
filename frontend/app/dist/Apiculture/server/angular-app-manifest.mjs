
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
      "chunk-R5WRUN43.js"
    ],
    "route": "/panier"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-5PS3OJ3P.js"
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
      "chunk-WZAEWZVM.js"
    ],
    "route": "/images"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-GDNFTRR7.js"
    ],
    "route": "/client-order-view"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-BCWLXRO6.js"
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
    'index.csr.html': {size: 9232, hash: 'fa1e2977603bafb76705742593efb072439c7c9d424672367c903e7b653eacc1', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 5214, hash: '3742624af7de4d0fa365a79cb5d7bdd2ca1814742eb562ee92ca30c9ccb3a715', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'boutique/index.html': {size: 42801, hash: 'a8cd87ae3e422aaf9ad1ec6b63ab34bd3a7b637bc98709a0688ada1fed4e3f6f', text: () => import('./assets-chunks/boutique_index_html.mjs').then(m => m.default)},
    'index.html': {size: 57110, hash: '95de77dda3444cf64c2fe3be7b890cd96a2fa41167a456767971fd6d2a739564', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'product/2/index.html': {size: 42394, hash: '42b6c4da9bc1f509fbb99c8bcfe98f60ca427ca0a6bec2fc55a2c3d618f1ed90', text: () => import('./assets-chunks/product_2_index_html.mjs').then(m => m.default)},
    'product/4/index.html': {size: 42394, hash: '42b6c4da9bc1f509fbb99c8bcfe98f60ca427ca0a6bec2fc55a2c3d618f1ed90', text: () => import('./assets-chunks/product_4_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 40851, hash: '99e8a58fc75b25d0c4cd61626f048121247322b715084b6f031fd0939bb434b7', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 46245, hash: '99d45aac70d48530ee5f205f7a64b01591173d6dd461f4098b7ac4c005aaf69c', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'product/1/index.html': {size: 42394, hash: '42b6c4da9bc1f509fbb99c8bcfe98f60ca427ca0a6bec2fc55a2c3d618f1ed90', text: () => import('./assets-chunks/product_1_index_html.mjs').then(m => m.default)},
    'product/5/index.html': {size: 42396, hash: '55dc8e33b78873e90ff15752f68f2c9b9f4151dd0c299ca9926c44f1789804ba', text: () => import('./assets-chunks/product_5_index_html.mjs').then(m => m.default)},
    'a-propos/index.html': {size: 45075, hash: '7308fd9f5e5f2856aef6c1cab28bd08755966b8cdb5f17ca5cac70e761087559', text: () => import('./assets-chunks/a-propos_index_html.mjs').then(m => m.default)},
    'client-order-view/index.html': {size: 44904, hash: '9ef9f51dfdeda9bcd1fac332d33ce6a998c8547269d8ea3ec8926001e637c368', text: () => import('./assets-chunks/client-order-view_index_html.mjs').then(m => m.default)},
    'product/3/index.html': {size: 42396, hash: '55dc8e33b78873e90ff15752f68f2c9b9f4151dd0c299ca9926c44f1789804ba', text: () => import('./assets-chunks/product_3_index_html.mjs').then(m => m.default)},
    'panier/index.html': {size: 52756, hash: 'caa0a6df7f02c0d5b780189ccbf09ba6739534cfa236265e71c9f8495a5dd9e3', text: () => import('./assets-chunks/panier_index_html.mjs').then(m => m.default)},
    'styles-JTUKHJ3N.css': {size: 236298, hash: 'tAzvSA1SQww', text: () => import('./assets-chunks/styles-JTUKHJ3N_css.mjs').then(m => m.default)}
  },
};
