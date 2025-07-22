
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
      "chunk-ENMHEFB4.js"
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
      "chunk-3DJURGPW.js"
    ],
    "route": "/client-order-view"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-YJGIUPYX.js"
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
    'index.csr.html': {size: 9070, hash: 'a46776c92659074dde85611734d7e6b11e167f621c7c540701afe7feed6e429c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 5052, hash: 'c88b0ecce8c28bb4411aa1c919672d58f945328762683b715f97832229148377', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'boutique/index.html': {size: 46447, hash: '2c7ff64fe33d65f31d59000ba646707b6b044c74f106efd9bd3aa2197e187868', text: () => import('./assets-chunks/boutique_index_html.mjs').then(m => m.default)},
    'index.html': {size: 52841, hash: '6d2ae2db3ee961338d6b1922e66a705875a9136f0c77266bac2be3d549844fc9', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'product/2/index.html': {size: 41672, hash: '03301fd03b8cfce7862a7447dd27f5f7a98e7ab4496bb925f79e2ad5c7ca0852', text: () => import('./assets-chunks/product_2_index_html.mjs').then(m => m.default)},
    'client-order-view/index.html': {size: 45429, hash: 'd201a8df2d9480198f323843b1adde49cf81c548ae38ec44b3dc4edc2f585a1a', text: () => import('./assets-chunks/client-order-view_index_html.mjs').then(m => m.default)},
    'product/4/index.html': {size: 38615, hash: '92712bbf0562fc389dc3486784e67210204f14cae8cdc70dedd8d576060b33f4', text: () => import('./assets-chunks/product_4_index_html.mjs').then(m => m.default)},
    'a-propos/index.html': {size: 44454, hash: 'd40465663ae5a81fb15398662fd4a7a0bfc5c2de97ca832a2dfc776f6eef6adc', text: () => import('./assets-chunks/a-propos_index_html.mjs').then(m => m.default)},
    'panier/index.html': {size: 52189, hash: 'b7af61fd5eb136ba5f3bc30c2a14fe684b288f4ae86df329299449257cf61490', text: () => import('./assets-chunks/panier_index_html.mjs').then(m => m.default)},
    'product/3/index.html': {size: 38615, hash: '92712bbf0562fc389dc3486784e67210204f14cae8cdc70dedd8d576060b33f4', text: () => import('./assets-chunks/product_3_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 40289, hash: '586caa566f4e879823c3c3f8152e505808f533b195a3bbb8df899529db98ead9', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'product/5/index.html': {size: 38618, hash: 'dab3ff5b780a597c7246b2ef72039093141c702309de81d1cbcae2ff519c95c8', text: () => import('./assets-chunks/product_5_index_html.mjs').then(m => m.default)},
    'product/1/index.html': {size: 38615, hash: '92712bbf0562fc389dc3486784e67210204f14cae8cdc70dedd8d576060b33f4', text: () => import('./assets-chunks/product_1_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 45689, hash: '01db593e0932399db06b9300e766e0b68cab04c968f05896142d3df3cda081c5', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'styles-BVJQD57C.css': {size: 230873, hash: 'YU+im7r2LDs', text: () => import('./assets-chunks/styles-BVJQD57C_css.mjs').then(m => m.default)}
  },
};
