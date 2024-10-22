export const dateUtils = {
    formatDate(date) {
      return new Date(date).toISOString().split('T')[0];
    },
  
    getStartOfMonth() {
      const date = new Date();
      return new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
    },
  
    getEndOfMonth() {
      const date = new Date();
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();
    }
  };