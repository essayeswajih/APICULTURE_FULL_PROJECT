
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
      "chunk-URRVOD5N.js"
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
      "chunk-7NALTWGC.js"
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
    'index.csr.html': {size: 7353, hash: 'db73946f51a820126c8b95fd45e3e9eb64e0ffc2a0d3fac22ad8c40a3c76be26', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 3336, hash: '043e56129a6fb8217ebe42529f2c19fc905c973d8bc0ae54e5d1788d164fdc37', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'boutique/index.html': {size: 40619, hash: 'ba31d8822d6d7812d4b9679323e676cef765e844744a3b9e39c372f903092f9e', text: () => import('./assets-chunks/boutique_index_html.mjs').then(m => m.default)},
    'product/2/index.html': {size: 36928, hash: 'aa258d6937c82519cf2db2b6f0112d4d746f1f097c785d01f64c43993f37cbcf', text: () => import('./assets-chunks/product_2_index_html.mjs').then(m => m.default)},
    'product/4/index.html': {size: 36926, hash: '4ada84639a2329be01ba79a103b0d10ccd7cfff1a430b667b1f79464db405d29', text: () => import('./assets-chunks/product_4_index_html.mjs').then(m => m.default)},
    'a-propos/index.html': {size: 42805, hash: '31d7d4b8202fc704221014845f4e1dbb9abc1b324b7690c8dc5612fd0a1f148f', text: () => import('./assets-chunks/a-propos_index_html.mjs').then(m => m.default)},
    'index.html': {size: 51107, hash: '38d35e35ffd7605de05900fda994174734b87b876ca161908a72e4caf2083fab', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'client-order-view/index.html': {size: 41244, hash: '50834fb18b33e7fa151b202956e5fa6e90d5f15851ca9c5c4c39df34606bc418', text: () => import('./assets-chunks/client-order-view_index_html.mjs').then(m => m.default)},
    'panier/index.html': {size: 50540, hash: '97cbc75f813db7bd9ab6dcad11e958cd4ce668301df7aa8da8f5dfe2a969f919', text: () => import('./assets-chunks/panier_index_html.mjs').then(m => m.default)},
    'product/3/index.html': {size: 36926, hash: '284fe8df779df599349ff0aef570b1c59c530330ec027173934c6d7609422b20', text: () => import('./assets-chunks/product_3_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 38600, hash: '19e9ac54ee6fd12ad6cd67bd5a9a10b3e91be019a0402d65de5d8e405d403760', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'product/5/index.html': {size: 36926, hash: '4ada84639a2329be01ba79a103b0d10ccd7cfff1a430b667b1f79464db405d29', text: () => import('./assets-chunks/product_5_index_html.mjs').then(m => m.default)},
    'product/1/index.html': {size: 36928, hash: 'aa258d6937c82519cf2db2b6f0112d4d746f1f097c785d01f64c43993f37cbcf', text: () => import('./assets-chunks/product_1_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 44041, hash: '15d00f298fda451d57cb91492818fcb4bc5c4acf54c6edc189cc35a243ed644e', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'styles-BVJQD57C.css': {size: 230873, hash: 'YU+im7r2LDs', text: () => import('./assets-chunks/styles-BVJQD57C_css.mjs').then(m => m.default)}
  },
};
