
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
      "chunk-3QS7XLQ4.js"
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
    'index.csr.html': {size: 7353, hash: '8092bbd6ae15f016bc2bce31cf15f867883817663ab37c1229e73fed84788379', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 3336, hash: 'a44eff360dc19ab0d69d90acfd38429dd3f6e315a00ad505d403b76cbe2b7c33', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 57841, hash: '01330074afa076ecd4a2e12f647d3dd7097fbf1756282aaf80720f9e45284293', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'boutique/index.html': {size: 49568, hash: 'eb1c5e1b4b449e6ffc04e31b6aa1da0e85c1d5cce7aca8bad46ef5421330f1a0', text: () => import('./assets-chunks/boutique_index_html.mjs').then(m => m.default)},
    'client-order-view/index.html': {size: 43843, hash: '17e2a85a02fb092eb2122b07d0cbf6cff48fc5ddee5a59fd64df5f627fcc6956', text: () => import('./assets-chunks/client-order-view_index_html.mjs').then(m => m.default)},
    'product/2/index.html': {size: 42275, hash: '1d2a27deff3de812325d07c7580de95e39f5bed7ed84a8621d2e975fb7637d9b', text: () => import('./assets-chunks/product_2_index_html.mjs').then(m => m.default)},
    'a-propos/index.html': {size: 44134, hash: '77a4d73d9324347adca2dfd39e2aac2c90908650df042ed5beeacf7a2c1d3ac3', text: () => import('./assets-chunks/a-propos_index_html.mjs').then(m => m.default)},
    'panier/index.html': {size: 51874, hash: '6f2edc938b22fa02208a1ede52017bdeef7d6bfbf35c285f5d7a26a2be077cab', text: () => import('./assets-chunks/panier_index_html.mjs').then(m => m.default)},
    'product/4/index.html': {size: 42457, hash: '53c92c62ac811580bcf4594cc2d1a15d9c71042f7715ec7eda15bab74a6c10bf', text: () => import('./assets-chunks/product_4_index_html.mjs').then(m => m.default)},
    'product/3/index.html': {size: 42512, hash: 'a052a96515e2a04fb9f923d1b23e991db317731dbe9d7c9a283bab07e9803c70', text: () => import('./assets-chunks/product_3_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 39929, hash: 'e53f013101e6359ba9e34d9e2d6416ff5f616109201ceb0b93104ee2945c2f52', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'product/5/index.html': {size: 42395, hash: 'fdfb4e78a630fb63b58c06e0cd0cb6e14cd15153f0c3c38a022598c71753982f', text: () => import('./assets-chunks/product_5_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 45372, hash: 'd4e0e76e7a5ee45bd1d35dd0ef93814848a8530e04d6964a29509d4103079cc3', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'product/1/index.html': {size: 42439, hash: '6f75fdc0c88e593258ec8b7169dda3fa3e2850ad380e74bfe69ba08bb68f8c8e', text: () => import('./assets-chunks/product_1_index_html.mjs').then(m => m.default)},
    'styles-BVJQD57C.css': {size: 230873, hash: 'YU+im7r2LDs', text: () => import('./assets-chunks/styles-BVJQD57C_css.mjs').then(m => m.default)}
  },
};
