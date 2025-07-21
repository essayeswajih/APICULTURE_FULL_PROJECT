
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
      "chunk-FMT5UQG5.js"
    ],
    "route": "/panier"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-TJPJWTTI.js"
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
      "chunk-TSEPA53H.js"
    ],
    "route": "/client-order-view"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2RAQEZUP.js"
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
    'index.csr.html': {size: 7353, hash: 'c7c0f1479f6a55b8ebbb91e3cabb041b882e605341e2f1cd90de610645ed3b8f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 3336, hash: '1ba1fbee8fa660b5d1d7add6eda3cc40d03848f59957e0dea10f09832a9521fd', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'boutique/index.html': {size: 40616, hash: '2611a04dd59284b05d1cf5db85e18dbdf2486cd919ca9ee21ff1f816dafa856d', text: () => import('./assets-chunks/boutique_index_html.mjs').then(m => m.default)},
    'client-order-view/index.html': {size: 42514, hash: 'fc5bbaeaf29c0ee9b927dad414f9268703601de3f8edb53364816450a084764e', text: () => import('./assets-chunks/client-order-view_index_html.mjs').then(m => m.default)},
    'product/4/index.html': {size: 36923, hash: '9af405f58442d96cd653d502726585a618ebbbbab3aa39456dda5fa372113d09', text: () => import('./assets-chunks/product_4_index_html.mjs').then(m => m.default)},
    'product/2/index.html': {size: 36923, hash: '9af405f58442d96cd653d502726585a618ebbbbab3aa39456dda5fa372113d09', text: () => import('./assets-chunks/product_2_index_html.mjs').then(m => m.default)},
    'index.html': {size: 51149, hash: '92fe6d531b33e47289ccc11ef29950e1571f91751288fb125fd99aa8fb577287', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'a-propos/index.html': {size: 42802, hash: '94e8794b22b1a7255c67a0632f794655c097c50380c82b28a0aba5e21166c53f', text: () => import('./assets-chunks/a-propos_index_html.mjs').then(m => m.default)},
    'product/3/index.html': {size: 36923, hash: 'f4a7b5e5475169163cc9779186dde3b46aee8221e56051f5eb0ef96df59686fe', text: () => import('./assets-chunks/product_3_index_html.mjs').then(m => m.default)},
    'panier/index.html': {size: 50537, hash: 'f2524983efc95bc17f249a9a4e396b03c82967b1a06c03c86c40a8d73f18bc47', text: () => import('./assets-chunks/panier_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 38597, hash: '2e45e3b86f8c7dcca86df0c23f033c2cd3a7bc483597cbff2b75b7e886af3490', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 44040, hash: '10dfa1737ae4f456a4efc76d61d2721145ece70bdc501d7f62f6f07cb5396405', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'product/5/index.html': {size: 36923, hash: 'f4a7b5e5475169163cc9779186dde3b46aee8221e56051f5eb0ef96df59686fe', text: () => import('./assets-chunks/product_5_index_html.mjs').then(m => m.default)},
    'product/1/index.html': {size: 36923, hash: '9af405f58442d96cd653d502726585a618ebbbbab3aa39456dda5fa372113d09', text: () => import('./assets-chunks/product_1_index_html.mjs').then(m => m.default)},
    'styles-BVJQD57C.css': {size: 230873, hash: 'YU+im7r2LDs', text: () => import('./assets-chunks/styles-BVJQD57C_css.mjs').then(m => m.default)}
  },
};
