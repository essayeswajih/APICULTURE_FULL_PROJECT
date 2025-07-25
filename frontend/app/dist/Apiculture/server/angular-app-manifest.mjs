
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
      "chunk-IRELCDJZ.js"
    ],
    "route": "/panier"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-Y45DK5FP.js"
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
      "chunk-7RJVEWFE.js"
    ],
    "route": "/client-order-view"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-67GV7NUH.js"
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
    'index.csr.html': {size: 9070, hash: 'ec146b7ab223a932ee05e1986d7f6e03058484ac4bda6a49adaf99d88e3de33b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 5052, hash: '8c42be5fcf23ea53ce804039dc9ef38c4be925ae73235ea5f030b4d0a65dddd3', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'boutique/index.html': {size: 91942, hash: '2acc7e40d0a2a4e4dbb3c875066f7929bf5f6f1b009375b2edf107f5d9471d92', text: () => import('./assets-chunks/boutique_index_html.mjs').then(m => m.default)},
    'product/2/index.html': {size: 45535, hash: 'f79faa3eb19a56d36bb990c48828fbbe78538034d958c8795d6026061905f51f', text: () => import('./assets-chunks/product_2_index_html.mjs').then(m => m.default)},
    'client-order-view/index.html': {size: 47923, hash: 'faa3724f941c07b21fd51a3ebbd75d1d54e0ccfffd8d23aef3429e4394c27b2c', text: () => import('./assets-chunks/client-order-view_index_html.mjs').then(m => m.default)},
    'product/4/index.html': {size: 45531, hash: 'd73654e5bc1cf860e868edaec60a344bb03e0d8da7aefd57345a9c0cc5bdb5db', text: () => import('./assets-chunks/product_4_index_html.mjs').then(m => m.default)},
    'panier/index.html': {size: 55910, hash: 'ce277a69d1cb1671272848ef1968e365fb6b83abab786692f2c0ee1eac53b30c', text: () => import('./assets-chunks/panier_index_html.mjs').then(m => m.default)},
    'index.html': {size: 53590, hash: '1f842dfd2f721ea352cb4effc09da8285114f630efd78dee04592c66a4929e5c', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'a-propos/index.html': {size: 46338, hash: 'b492eebe2574b4c3c5960fd03aaa7a9d485f1e8ff10beaa3336f7166ac09c994', text: () => import('./assets-chunks/a-propos_index_html.mjs').then(m => m.default)},
    'product/3/index.html': {size: 45534, hash: '9cb007866602fefb4a49f5859ae3f90d4abebb0c44962bb62613f96eb4807a46', text: () => import('./assets-chunks/product_3_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 41038, hash: '4092450dca58c01d977368853d16f1131c9cdf06f9f300d73d75b0e99afa2f11', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'product/5/index.html': {size: 42474, hash: '41f7c08b6cf9ec4b7be264156b5d11873611c41269124869e280b04b7c9fadfa', text: () => import('./assets-chunks/product_5_index_html.mjs').then(m => m.default)},
    'product/1/index.html': {size: 42477, hash: 'be1194f336774949c50ad14af62f798b57b362b1d50ecc2384ef0a24aea019a5', text: () => import('./assets-chunks/product_1_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 46352, hash: '02bd8f0d9f36631bab8aa397231ce24b3319649c1322fa8952d9a8befe6b88be', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'styles-JTUKHJ3N.css': {size: 236298, hash: 'tAzvSA1SQww', text: () => import('./assets-chunks/styles-JTUKHJ3N_css.mjs').then(m => m.default)}
  },
};
