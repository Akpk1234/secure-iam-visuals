// Storage utility for persisting data across navigation
export class PersistentStorage {
  private static getStorageKey(key: string): string {
    return `iam_${key}`;
  }

  static save<T>(key: string, data: T): void {
    try {
      localStorage.setItem(this.getStorageKey(key), JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  }

  static load<T>(key: string, defaultValue: T): T {
    try {
      const stored = localStorage.getItem(this.getStorageKey(key));
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.error('Failed to load data:', error);
      return defaultValue;
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(this.getStorageKey(key));
    } catch (error) {
      console.error('Failed to remove data:', error);
    }
  }

  static clear(): void {
    try {
      const keys = Object.keys(localStorage).filter(key => key.startsWith('iam_'));
      keys.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Failed to clear data:', error);
    }
  }
}