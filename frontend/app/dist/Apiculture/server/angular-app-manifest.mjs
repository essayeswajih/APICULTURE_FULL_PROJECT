
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
    "route": "/boutique/Ruches"
  },
  {
    "renderMode": 2,
    "route": "/boutique/Vêtements"
  },
  {
    "renderMode": 2,
    "route": "/boutique/Miellerie"
  },
  {
    "renderMode": 2,
    "route": "/boutique/Nourrisseurs"
  },
  {
    "renderMode": 2,
    "route": "/boutique/Produits de la ruche"
  },
  {
    "renderMode": 0,
    "route": "/boutique/*"
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
      "chunk-RSLOIBMS.js"
    ],
    "route": "/panier"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-A3MP7FIQ.js"
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
      "chunk-BPECV5RF.js"
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
    'index.csr.html': {size: 7353, hash: 'a40c49041b733bd12126de57680877588551fa46f5ee1f7f93b0c25d8fd26dde', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 3336, hash: '6dd71f7e49925ea8984e927ac132d737ce509576035acc6847b1efdcfc22b991', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'boutique/Produits de la ruche/index.html': {size: 39045, hash: '4215df20f4943edc635ff98bedf6390889853ef7e2ab958671508513d8dcf750', text: () => import('./assets-chunks/boutique_Produits de la ruche_index_html.mjs').then(m => m.default)},
    'boutique/Nourrisseurs/index.html': {size: 39045, hash: '4215df20f4943edc635ff98bedf6390889853ef7e2ab958671508513d8dcf750', text: () => import('./assets-chunks/boutique_Nourrisseurs_index_html.mjs').then(m => m.default)},
    'index.html': {size: 51094, hash: '2c26cb1a73773fe44739605240bddf769223d02845c210a8820c7985bda3fc00', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'boutique/index.html': {size: 39045, hash: '4215df20f4943edc635ff98bedf6390889853ef7e2ab958671508513d8dcf750', text: () => import('./assets-chunks/boutique_index_html.mjs').then(m => m.default)},
    'product/1/index.html': {size: 36913, hash: '00ed79eed9058fa5140520f1c6515fcd3b68872f046d6307d45294eef9c43017', text: () => import('./assets-chunks/product_1_index_html.mjs').then(m => m.default)},
    'product/3/index.html': {size: 36913, hash: '00ed79eed9058fa5140520f1c6515fcd3b68872f046d6307d45294eef9c43017', text: () => import('./assets-chunks/product_3_index_html.mjs').then(m => m.default)},
    'product/5/index.html': {size: 36913, hash: '00ed79eed9058fa5140520f1c6515fcd3b68872f046d6307d45294eef9c43017', text: () => import('./assets-chunks/product_5_index_html.mjs').then(m => m.default)},
    'boutique/Miellerie/index.html': {size: 39045, hash: 'a4d0f5b7cb427c11d7e832181c125a04670c8931323669555676ce249eb72ec3', text: () => import('./assets-chunks/boutique_Miellerie_index_html.mjs').then(m => m.default)},
    'boutique/Ruches/index.html': {size: 39045, hash: '4215df20f4943edc635ff98bedf6390889853ef7e2ab958671508513d8dcf750', text: () => import('./assets-chunks/boutique_Ruches_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 44028, hash: '4cdad0b34a61920b0b00a132d25bf8cc4b2b643361b625f2994ed963757fed39', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 38587, hash: '969644960b3c7b3fa0d43f2040a18b5a1e1601d462a07371dfc50c7fea09d808', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'a-propos/index.html': {size: 42792, hash: '99635a3816a62e80fe2e0df53ab5cb00f7a5fee9761b579702bd53209392ae95', text: () => import('./assets-chunks/a-propos_index_html.mjs').then(m => m.default)},
    'product/2/index.html': {size: 36913, hash: '00ed79eed9058fa5140520f1c6515fcd3b68872f046d6307d45294eef9c43017', text: () => import('./assets-chunks/product_2_index_html.mjs').then(m => m.default)},
    'boutique/Vêtements/index.html': {size: 39045, hash: '4215df20f4943edc635ff98bedf6390889853ef7e2ab958671508513d8dcf750', text: () => import('./assets-chunks/boutique_Vêtements_index_html.mjs').then(m => m.default)},
    'product/4/index.html': {size: 36913, hash: '00ed79eed9058fa5140520f1c6515fcd3b68872f046d6307d45294eef9c43017', text: () => import('./assets-chunks/product_4_index_html.mjs').then(m => m.default)},
    'panier/index.html': {size: 50532, hash: '022b5ef50b47ceab9e65d1b72f77ae37b77fe73a7ad394ebf3325d0d0ee02c79', text: () => import('./assets-chunks/panier_index_html.mjs').then(m => m.default)},
    'styles-BVJQD57C.css': {size: 230873, hash: 'YU+im7r2LDs', text: () => import('./assets-chunks/styles-BVJQD57C_css.mjs').then(m => m.default)}
  },
};
