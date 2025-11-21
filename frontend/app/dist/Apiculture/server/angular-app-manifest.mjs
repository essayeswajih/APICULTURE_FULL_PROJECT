
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
      "chunk-XHHVZ23J.js"
    ],
    "route": "/panier"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-TBCQMA6R.js"
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
      "chunk-UEUFEYXY.js"
    ],
    "route": "/debuter-en-apiculture"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-XTZRTH6X.js"
    ],
    "route": "/entretien-des-ruches"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-RURUVTXD.js"
    ],
    "route": "/bienfaits-miel"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-Y6RWCEF3.js"
    ],
    "route": "/images"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-CBBYUJKK.js"
    ],
    "route": "/client-order-view"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-RNJPUJJT.js"
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
    'index.csr.html': {size: 70027, hash: '43406c293c3aff43bca4c38e22d5b1d24b201f6611afcd595ac85d0ad60daf6f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 65301, hash: 'c3c3d81e894f1521977fd6ce87f66f1809f50defb3d9a283143532c782786427', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 215671, hash: '76686f60edb976fc0f228e8643445f3c4c92cf0d12b28798c89c00724d0561ba', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'boutique/index.html': {size: 202780, hash: '60cf4b8e8c62cb76bc7d8a35d830e0459e72323834a3cf4642c24700ddfbd54d', text: () => import('./assets-chunks/boutique_index_html.mjs').then(m => m.default)},
    'product/2/index.html': {size: 107288, hash: 'cc03a136d4cbcf6b23f19bcc805ad7726110a5cb2e252cc1a37f2857e96e6612', text: () => import('./assets-chunks/product_2_index_html.mjs').then(m => m.default)},
    'product/4/index.html': {size: 107288, hash: 'cc03a136d4cbcf6b23f19bcc805ad7726110a5cb2e252cc1a37f2857e96e6612', text: () => import('./assets-chunks/product_4_index_html.mjs').then(m => m.default)},
    'debuter-en-apiculture/index.html': {size: 123425, hash: 'ed10c68c41c23a36e0e8ac911cc5196b3d8096deb9d1dc5b7dc89db935565837', text: () => import('./assets-chunks/debuter-en-apiculture_index_html.mjs').then(m => m.default)},
    'client-order-view/index.html': {size: 107367, hash: '4d75c0b620a3c48d541278baa4ff4119de129874e1cb3c5ca3bfb2abacc06e14', text: () => import('./assets-chunks/client-order-view_index_html.mjs').then(m => m.default)},
    'bienfaits-miel/index.html': {size: 124052, hash: '67784334dc8b1c4eee32bcd0c8fda50a92c1a2e0391d06f3c24430d40d3afd5c', text: () => import('./assets-chunks/bienfaits-miel_index_html.mjs').then(m => m.default)},
    'panier/index.html': {size: 116756, hash: 'bc353f88f2150d10d267417fee9716247d06ab818619101d671efb262baab87b', text: () => import('./assets-chunks/panier_index_html.mjs').then(m => m.default)},
    'a-propos/index.html': {size: 110382, hash: '0160ceeed5e075647a404afa33e896e316a659ab6228770e63c5c96130ac9f34', text: () => import('./assets-chunks/a-propos_index_html.mjs').then(m => m.default)},
    'product/3/index.html': {size: 113158, hash: '3340015fe39fc2b56e279c28f20824e8359af2ec547c78aaf9cd00d4f7da1f4d', text: () => import('./assets-chunks/product_3_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 106176, hash: '2fd35e65c4c774f664954ad786e094404d57fd33d0d4381d0a906a085fb9e242', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'entretien-des-ruches/index.html': {size: 123852, hash: '49deeb94735a0ea74d71542b98b2f5c344fa31faba3fcfcca9cbb1327bfcd7db', text: () => import('./assets-chunks/entretien-des-ruches_index_html.mjs').then(m => m.default)},
    'product/5/index.html': {size: 107291, hash: '9904eb6c1f587845fcbdae7b9c6ae4b3dc56bcec03791c72260f4fcec5197279', text: () => import('./assets-chunks/product_5_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 111507, hash: '77cff0a059d6ab427e74c02a9d9c6d377c1ec790df238f964c9b4f434b95241f', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'product/1/index.html': {size: 113957, hash: 'aaefb1eb66de8a3768b1be0dd6e28efed366f6bc20428bacb322fe7982843aa4', text: () => import('./assets-chunks/product_1_index_html.mjs').then(m => m.default)},
    'styles-D3JAG7AP.css': {size: 246563, hash: 'sKY6uVtZ050', text: () => import('./assets-chunks/styles-D3JAG7AP_css.mjs').then(m => m.default)}
  },
};
