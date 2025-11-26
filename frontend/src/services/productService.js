import API from './api.js';

export const productService = {
  // Get all products with filters
  getProducts: async (filters = {}) => {
    const params = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        params.append(key, filters[key]);
      }
    });

    const response = await API.get(`/products?${params}`);
    return response;
  },

  // Get single product
  getProduct: async (id) => {
    const response = await API.get(`/products/${id}`);
    return response;
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await API.get('/products/featured');
    return response;
  },

  // Get products by category
  getProductsByCategory: async (categorySlug) => {
    const response = await API.get(`/products/category/${categorySlug}`);
    return response;
  },

  // Add product review
  addReview: async (productId, reviewData) => {
    const response = await API.post(`/products/${productId}/reviews`, reviewData);
    return response;
  },

  // Search products
  searchProducts: async (query, filters = {}) => {
    const params = new URLSearchParams({ search: query });
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null) {
        params.append(key, filters[key]);
      }
    });

    const response = await API.get(`/products?${params}`);
    return response;
  },
};

export default productService;