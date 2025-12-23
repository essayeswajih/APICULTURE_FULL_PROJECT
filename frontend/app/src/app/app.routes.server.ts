import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'product/:id',
    renderMode: RenderMode.Prerender, // Ensure prerender is set here
    async getPrerenderParams() {
      const productId = productIds; // Import routes-ids correctly
      return productIds.map(id => ({ id: id.toString() }));// This will match the dynamic `:id` param
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
// routes-categories.ts
export const categories = ['Ruches', 'Vêtements', 'Miellerie', 'Nourrisseurs', 'Produits de la ruche'];
export const productIds = ['cadre', 'ruche', 'miel']; // Example product IDs for dynamic routes
