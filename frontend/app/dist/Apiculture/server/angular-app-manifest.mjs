
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
      "chunk-U7Y56JJY.js"
    ],
    "route": "/panier"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ECP6L2RG.js"
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
      "chunk-7AZCBNVX.js"
    ],
    "route": "/client-order-view"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-AFQFDGIJ.js"
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
    'index.csr.html': {size: 9130, hash: '3672e1dd9b5ab887909296eff807cb3c43436354bd78f1d932faff2d111c72a5', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 5112, hash: '973d46e01472377178b1a9c4057f4973eef7f73ef6bedbf53a3965e39afff911', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 110713, hash: '2e493daee4c576ff52f2e1038a9922ba4413fc81939715955136cddca24362ee', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'boutique/index.html': {size: 42582, hash: '31c5263252a058eda6e4caa1b9e01831173a9ebe779763cfd63e8be8843a006c', text: () => import('./assets-chunks/boutique_index_html.mjs').then(m => m.default)},
    'product/2/index.html': {size: 42297, hash: 'ea9d2170d95e37595390bb325a5f06a80d927e86e5ec44343c093e16185a1fb9', text: () => import('./assets-chunks/product_2_index_html.mjs').then(m => m.default)},
    'product/4/index.html': {size: 45339, hash: 'bcf463a34807677953a7ce494c10f88f7a15ff7ae99e8986779143ea838f46b3', text: () => import('./assets-chunks/product_4_index_html.mjs').then(m => m.default)},
    'client-order-view/index.html': {size: 44802, hash: 'f09fdf46e948b31fbf4a46df8c63b8b9309449ea2e90ac57fc2bbf019ba693b0', text: () => import('./assets-chunks/client-order-view_index_html.mjs').then(m => m.default)},
    'a-propos/index.html': {size: 44973, hash: 'ce50e3de0c6c65963b289d2042b9c8ae361d4f0b329e3c0fc8b573adc9474d34', text: () => import('./assets-chunks/a-propos_index_html.mjs').then(m => m.default)},
    'panier/index.html': {size: 52655, hash: 'b19ebf73d2a106cb29c55133759f21569f6b6dacd0f8a0d5c3b6de4563b58c73', text: () => import('./assets-chunks/panier_index_html.mjs').then(m => m.default)},
    'product/3/index.html': {size: 42292, hash: 'deeac85a5d399e4eec30a0da483059a67f9edb73e7eb26e8e32c50179a01f8f9', text: () => import('./assets-chunks/product_3_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 40749, hash: 'b199348093dc8fbcb7fd84a977a8b16958f3035d993307942e12130dc329075a', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'product/5/index.html': {size: 42292, hash: '54ee71de9677ae146a2d8fc6f3dda7d01484189cf3fac955b7a7232296f6c5c9', text: () => import('./assets-chunks/product_5_index_html.mjs').then(m => m.default)},
    'product/1/index.html': {size: 42292, hash: 'deeac85a5d399e4eec30a0da483059a67f9edb73e7eb26e8e32c50179a01f8f9', text: () => import('./assets-chunks/product_1_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 46144, hash: '9ed3d677c7faf2f3484bf9ed021c0e47b59abdf5181cfcf6b94a80619fbfc0b9', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'styles-JTUKHJ3N.css': {size: 236298, hash: 'tAzvSA1SQww', text: () => import('./assets-chunks/styles-JTUKHJ3N_css.mjs').then(m => m.default)}
  },
};
