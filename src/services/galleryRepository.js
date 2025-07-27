import apiService from './api';

class GalleryRepository {
  constructor() {
    this.endpoint = '/gallery-items';
  }

  // Get all gallery items with images
  async getGalleryItems(page = 1, pageSize = 50) {
    try {
      return await apiService.getPaginated(this.endpoint, page, pageSize, {
        'populate': 'image',
        'sort': 'date:desc'
      });
    } catch (error) {
      throw error;
    }
  }

  // Get gallery items by year
  async getGalleryItemsByYear(year) {
    try {
      const startDate = `${year}-01-01`;
      const endDate = `${year}-12-31`;
      
      const filters = {
        'filters[date][$gte]': startDate,
        'filters[date][$lte]': endDate,
        'populate': 'image',
        'sort': 'date:desc'
      };
      
      return await apiService.get(this.endpoint, filters);
    } catch (error) {
      throw error;
    }
  }

  // Get recent gallery items (last 30 days)
  async getRecentGalleryItems() {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const filters = {
        'filters[date][$gte]': thirtyDaysAgo.toISOString().split('T')[0],
        'populate': 'image',
        'sort': 'date:desc'
      };
      
      return await apiService.get(this.endpoint, filters);
    } catch (error) {
      throw error;
    }
  }

  // Get gallery items by event/workshop
  async getGalleryItemsByEvent(eventId) {
    try {
      const filters = {
        'filters[event][id][$eq]': eventId,
        'populate': ['image', 'event'],
        'sort': 'date:desc'
      };
      
      return await apiService.get(this.endpoint, filters);
    } catch (error) {
      throw error;
    }
  }

  // Upload new gallery item
  async uploadGalleryItem(data) {
    try {
      return await apiService.post(this.endpoint, data);
    } catch (error) {
      throw error;
    }
  }

  // Delete gallery item
  async deleteGalleryItem(id) {
    try {
      return await apiService.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      throw error;
    }
  }
}

export const galleryRepository = new GalleryRepository();
export default galleryRepository;
