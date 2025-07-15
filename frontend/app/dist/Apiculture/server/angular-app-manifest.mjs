
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
      "chunk-6DULXJNN.js"
    ],
    "route": "/panier"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-V3EFPM56.js"
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
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 7251, hash: 'f7870c9dd35d3def8df6a39b00eab449e3fc1c9e41671813bdfc6a3d40232499', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 3234, hash: '785a403fe13c4b7c8dd06e9a150c1057c7a4840f0102ef188f6928775626ff45', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'boutique/Produits de la ruche/index.html': {size: 44311, hash: '3c0e70381bee60f1eaf310b3f1da67ca71a4abb65df936edc92a6bc63ea6147b', text: () => import('./assets-chunks/boutique_Produits de la ruche_index_html.mjs').then(m => m.default)},
    'boutique/Nourrisseurs/index.html': {size: 44323, hash: '4c84eeafb4f5808c54992cb2a96ffdb15f4c178e43409e3592468453dfa81750', text: () => import('./assets-chunks/boutique_Nourrisseurs_index_html.mjs').then(m => m.default)},
    'boutique/index.html': {size: 47004, hash: '054ecb27f62c971f34d7161e6fef1673115004865dfa44960bb082c0a43b3339', text: () => import('./assets-chunks/boutique_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 41213, hash: 'e05a01dd92a9175aae08a9de33eccdbb7c6eda9052c3c84639125427988f1825', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'boutique/Ruches/index.html': {size: 44358, hash: 'ef47b8a02958bf3e5f851cabc886cd36dbda8454efa73fb8f9e512f3af8d77b3', text: () => import('./assets-chunks/boutique_Ruches_index_html.mjs').then(m => m.default)},
    'boutique/Miellerie/index.html': {size: 44324, hash: 'c2c0770d26866a6358fd1995f4000157e79beb32b2dc32f9c6b99bf6897c534c', text: () => import('./assets-chunks/boutique_Miellerie_index_html.mjs').then(m => m.default)},
    'products/index.html': {size: 41908, hash: '0f561ea7960158f9141de14f6b45aab2d62c04290e060e180c316f2e12fd8f4f', text: () => import('./assets-chunks/products_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 45411, hash: 'c0b6a52a088de239d80bdc7f7283ae548b17b68462be0d790b9c79fcb5227600', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'index.html': {size: 60598, hash: 'b3ed26c59535d400e9acb1c60104663b2f9a0d26715a76ff272b3b15be61607b', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'categories/index.html': {size: 40386, hash: 'c8cecde3251d38bd795f2425868e4265a4b789a20216525dadb465ba745f9d56', text: () => import('./assets-chunks/categories_index_html.mjs').then(m => m.default)},
    'boutique/Vêtements/index.html': {size: 47004, hash: '054ecb27f62c971f34d7161e6fef1673115004865dfa44960bb082c0a43b3339', text: () => import('./assets-chunks/boutique_Vêtements_index_html.mjs').then(m => m.default)},
    'panier/index.html': {size: 49092, hash: '8681ed614648d3a3c71b28a8d03c792231f4a39423048595967a62d7487b835c', text: () => import('./assets-chunks/panier_index_html.mjs').then(m => m.default)},
    'a-propos/index.html': {size: 44416, hash: 'a182186a74c1aec14ed338135d57d0bd5e96d402040cc4ec580f621e9ccb2d0e', text: () => import('./assets-chunks/a-propos_index_html.mjs').then(m => m.default)},
    'orders/index.html': {size: 37138, hash: 'ba77d91a4015dffff197b95f802e0fb5203139afa18c3b0829c349600e374ff3', text: () => import('./assets-chunks/orders_index_html.mjs').then(m => m.default)},
    'styles-BVJQD57C.css': {size: 230873, hash: 'YU+im7r2LDs', text: () => import('./assets-chunks/styles-BVJQD57C_css.mjs').then(m => m.default)}
  },
};
