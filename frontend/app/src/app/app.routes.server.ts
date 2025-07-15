import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
   {
    path: 'boutique/:category',
    renderMode: RenderMode.Prerender, // Ensure prerender is set here
    async getPrerenderParams() {
      const category = categories; // Import routes-ids correctly
      return category.map(category => ({ category })); // This will match the dynamic `:id` param
    },
  },
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
export const productIds = [1, 2, 3, 4, 5]; // Example product IDs for dynamic routes
