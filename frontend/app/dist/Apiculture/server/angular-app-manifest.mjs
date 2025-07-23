
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
      "chunk-RAYEZMS3.js"
    ],
    "route": "/panier"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-CKCTZLC2.js"
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
      "chunk-P4S3W5XS.js"
    ],
    "route": "/client-order-view"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-WFZ3P7VB.js"
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
    'index.csr.html': {size: 9070, hash: 'd148e5f6ec8d6277c71684e396d30317c7bc050ac9171775d5df2a1c687ccb88', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 5052, hash: '5cd0ed88ac061164f8c01a2db9ecdc0442f516c5d430cbb53da3f90c87db2da3', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'boutique/index.html': {size: 74663, hash: '3e813cb9be50eb17e5b5d448ab4a37ddb172be681b6d80d423cef45fb8a6e64f', text: () => import('./assets-chunks/boutique_index_html.mjs').then(m => m.default)},
    'index.html': {size: 52841, hash: '08b3469f8ae43e7ba365b6fb80d1a3da60fb45e8e434df8654c559a5e43b0a8b', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'product/2/index.html': {size: 44528, hash: 'e481c3674b5a983cc6b625ef9792e3f53aa85ebc03e0f01fed3ce9982ee20976', text: () => import('./assets-chunks/product_2_index_html.mjs').then(m => m.default)},
    'product/4/index.html': {size: 44526, hash: 'dfea7f7b923200bd608bc269049b4c3a9a52743d4897c700a3f7edfc1e70d026', text: () => import('./assets-chunks/product_4_index_html.mjs').then(m => m.default)},
    'client-order-view/index.html': {size: 44203, hash: '1de23fd4f010a5eb0b303aa17ef64d851b6599f4f367f1a7d99ee7751feded4a', text: () => import('./assets-chunks/client-order-view_index_html.mjs').then(m => m.default)},
    'a-propos/index.html': {size: 44454, hash: '0a55bccd6f731bca869388132f7b6e77d4f34a689bf9c0373ab71c5d199ce582', text: () => import('./assets-chunks/a-propos_index_html.mjs').then(m => m.default)},
    'panier/index.html': {size: 52194, hash: 'd3f7c91c7a14d98445e32a06d91b18613b86ca3e880ee05fc2ac4aa38055358d', text: () => import('./assets-chunks/panier_index_html.mjs').then(m => m.default)},
    'product/3/index.html': {size: 41471, hash: '1f289ed47f8fee982498a3489829df9a6be714004649c3b127ad4ffaf6fe2445', text: () => import('./assets-chunks/product_3_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 40289, hash: '3e986e06fdb0bbde6d52a5cf2466cf31d663cffd5ce059077f5bf186a7911ce6', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'product/5/index.html': {size: 41469, hash: 'b4940b07a27ffa103e9ae408c3de712726078a3e6b0d13dbee9c73d874bebdc1', text: () => import('./assets-chunks/product_5_index_html.mjs').then(m => m.default)},
    'product/1/index.html': {size: 41471, hash: '1f289ed47f8fee982498a3489829df9a6be714004649c3b127ad4ffaf6fe2445', text: () => import('./assets-chunks/product_1_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 45688, hash: 'cd5d849f3d6790ca351f56680f528ef377404ae19b4b5697dbf835b900c96066', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'styles-BVJQD57C.css': {size: 230873, hash: 'YU+im7r2LDs', text: () => import('./assets-chunks/styles-BVJQD57C_css.mjs').then(m => m.default)}
  },
};
