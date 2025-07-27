import apiService from './api';

class BlogRepository {
  constructor() {
    this.endpoint = '/posts';
  }

  // Get all posts with pagination
  async getPosts(page = 1, pageSize = 10) {
    try {
      return await apiService.getPaginated(this.endpoint, page, pageSize, {
        'populate': ['author', 'category', 'featuredImage', 'tags'],
        'sort': 'publishedAt:desc'
      });
    } catch (error) {
      throw error;
    }
  }

  // Get a single post by ID with all relations
  async getPostById(id) {
    try {
      return await apiService.getWithPopulate(`${this.endpoint}/${id}`, [
        'author',
        'category', 
        'featuredImage',
        'tags',
        'seo'
      ]);
    } catch (error) {
      throw error;
    }
  }

  // Get posts by category
  async getPostsByCategory(categoryId, page = 1, pageSize = 10) {
    try {
      const filters = {
        'filters[category][id][$eq]': categoryId,
        'populate': ['author', 'category', 'featuredImage', 'tags'],
        'sort': 'publishedAt:desc'
      };
      
      return await apiService.getPaginated(this.endpoint, page, pageSize, filters);
    } catch (error) {
      throw error;
    }
  }

  // Get posts by author
  async getPostsByAuthor(authorId, page = 1, pageSize = 10) {
    try {
      const filters = {
        'filters[author][id][$eq]': authorId,
        'populate': ['author', 'category', 'featuredImage', 'tags'],
        'sort': 'publishedAt:desc'
      };
      
      return await apiService.getPaginated(this.endpoint, page, pageSize, filters);
    } catch (error) {
      throw error;
    }
  }

  // Get featured posts
  async getFeaturedPosts(limit = 3) {
    try {
      const filters = {
        'filters[featured][$eq]': true,
        'populate': ['author', 'category', 'featuredImage', 'tags'],
        'sort': 'publishedAt:desc',
        'pagination[limit]': limit
      };
      
      return await apiService.get(this.endpoint, filters);
    } catch (error) {
      throw error;
    }
  }

  // Search posts
  async searchPosts(query, page = 1, pageSize = 10) {
    try {
      const filters = {
        '$or': [
          { 'title': { '$containsi': query } },
          { 'content': { '$containsi': query } },
          { 'summary': { '$containsi': query } }
        ],
        'populate': ['author', 'category', 'featuredImage', 'tags'],
        'sort': 'publishedAt:desc'
      };
      
      return await apiService.getPaginated(this.endpoint, page, pageSize, filters);
    } catch (error) {
      throw error;
    }
  }

  // Get posts by tag
  async getPostsByTag(tagName, page = 1, pageSize = 10) {
    try {
      const filters = {
        'filters[tags][$containsi]': tagName,
        'populate': ['author', 'category', 'featuredImage', 'tags'],
        'sort': 'publishedAt:desc'
      };
      
      return await apiService.getPaginated(this.endpoint, page, pageSize, filters);
    } catch (error) {
      throw error;
    }
  }

  // Get recent posts
  async getRecentPosts(limit = 5) {
    try {
      const filters = {
        'populate': ['author', 'category', 'featuredImage'],
        'sort': 'publishedAt:desc',
        'pagination[limit]': limit
      };
      
      return await apiService.get(this.endpoint, filters);
    } catch (error) {
      throw error;
    }
  }

  // Get posts statistics
  async getPostsStats() {
    try {
      const [totalPosts, publishedPosts, draftPosts] = await Promise.all([
        apiService.get(`${this.endpoint}/count`),
        apiService.get(`${this.endpoint}/count`, { 'filters[publishedAt][$notNull]': true }),
        apiService.get(`${this.endpoint}/count`, { 'filters[publishedAt][$null]': true })
      ]);

      return {
        total: totalPosts,
        published: publishedPosts,
        drafts: draftPosts
      };
    } catch (error) {
      throw error;
    }
  }

  // Create new post (if you have admin functionality)
  async createPost(data) {
    try {
      return await apiService.post(this.endpoint, data);
    } catch (error) {
      throw error;
    }
  }

  // Update post (if you have admin functionality)
  async updatePost(id, data) {
    try {
      return await apiService.put(`${this.endpoint}/${id}`, data);
    } catch (error) {
      throw error;
    }
  }

  // Delete post (if you have admin functionality)
  async deletePost(id) {
    try {
      return await apiService.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      throw error;
    }
  }
}

export const blogRepository = new BlogRepository();
export default blogRepository;
