
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
      "chunk-4ZYXBONE.js"
    ],
    "route": "/panier"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-35V7ECTW.js"
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
      "chunk-L33DG3WZ.js"
    ],
    "route": "/debuter-en-apiculture"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-WSTA7XFL.js"
    ],
    "route": "/entretien-des-ruches"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-BTUSNBVX.js"
    ],
    "route": "/bienfaits-miel"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-S36SQC4X.js"
    ],
    "route": "/images"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-N3J7RVJ4.js"
    ],
    "route": "/client-order-view"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-5DDODT5G.js"
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
    'index.csr.html': {size: 9287, hash: 'c23498fd52033abb34bdb38eee83cd3b448be2d9d7cf31c3eecd6c1a2b24062c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 5269, hash: 'd89413389067118f99880b2990bcc9dd4902793af7a8aaa20acaa42234c89d92', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 57370, hash: '358131bbcfe368d7ce2c7bd8b410947e942d9e60c82620f7402d2c9f0296bb2f', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'a-propos/index.html': {size: 45186, hash: 'cfe128a25f8e51134a93b19b296843114895348da53945f7c976004efbe70ccd', text: () => import('./assets-chunks/a-propos_index_html.mjs').then(m => m.default)},
    'panier/index.html': {size: 52887, hash: '7ab16225daa9191b92fd4877b824f27aabe9cf88ef6c98e73d47909d4d95ad96', text: () => import('./assets-chunks/panier_index_html.mjs').then(m => m.default)},
    'product/2/index.html': {size: 42509, hash: '3fbc337bb7845390619dc1fdd4728f9a341567a3aa1b1a1a6a5d4932e07a1185', text: () => import('./assets-chunks/product_2_index_html.mjs').then(m => m.default)},
    'product/4/index.html': {size: 42509, hash: '3fbc337bb7845390619dc1fdd4728f9a341567a3aa1b1a1a6a5d4932e07a1185', text: () => import('./assets-chunks/product_4_index_html.mjs').then(m => m.default)},
    'debuter-en-apiculture/index.html': {size: 58558, hash: '5202a5753963700a4436c9356e3ed26d6b2679d7660705c71f015abddb0ba9cc', text: () => import('./assets-chunks/debuter-en-apiculture_index_html.mjs').then(m => m.default)},
    'bienfaits-miel/index.html': {size: 59185, hash: '4718b101dd445c61b9e575aa1d105320c5d7e27ff5121d9b92905515cd1de897', text: () => import('./assets-chunks/bienfaits-miel_index_html.mjs').then(m => m.default)},
    'client-order-view/index.html': {size: 42492, hash: 'df29118478e239a8e4141382be3b68a843ab142fd1d4f13375d74d45ef316909', text: () => import('./assets-chunks/client-order-view_index_html.mjs').then(m => m.default)},
    'boutique/index.html': {size: 42915, hash: 'c9c8cdc69ef4510b2a246268b2d171b9510636f8a5c541c0de9d36102adfad6a', text: () => import('./assets-chunks/boutique_index_html.mjs').then(m => m.default)},
    'product/1/index.html': {size: 42509, hash: '3fbc337bb7845390619dc1fdd4728f9a341567a3aa1b1a1a6a5d4932e07a1185', text: () => import('./assets-chunks/product_1_index_html.mjs').then(m => m.default)},
    'product/5/index.html': {size: 42509, hash: '3fbc337bb7845390619dc1fdd4728f9a341567a3aa1b1a1a6a5d4932e07a1185', text: () => import('./assets-chunks/product_5_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 46357, hash: 'a3be6cf836401c60a62205f0bdc2d998abffafc999b77f4d01f4b8df8b616b21', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'product/3/index.html': {size: 42509, hash: '3fbc337bb7845390619dc1fdd4728f9a341567a3aa1b1a1a6a5d4932e07a1185', text: () => import('./assets-chunks/product_3_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 40963, hash: '926eac88624e187f44142150bbafc1b3f6fce7f6fa85cda2fe78a477b03916c4', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'entretien-des-ruches/index.html': {size: 58985, hash: 'e69f64483581874eabafb7a9bed587557c2538e00a7758a9302967234ca1aa92', text: () => import('./assets-chunks/entretien-des-ruches_index_html.mjs').then(m => m.default)},
    'styles-JTUKHJ3N.css': {size: 236298, hash: 'tAzvSA1SQww', text: () => import('./assets-chunks/styles-JTUKHJ3N_css.mjs').then(m => m.default)}
  },
};
