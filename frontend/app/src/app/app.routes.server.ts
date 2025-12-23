import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'product/:slug',
    renderMode: RenderMode.Prerender, // Ensure prerender is set here
    async getPrerenderParams() {
      // Return an array of objects with 'slug' as key to match route param
      return productIds
        .filter(slug => typeof slug === 'string' && slug.length > 0) // ensure valid slugs
        .map(slug => ({ slug }));
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
