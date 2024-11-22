export default class StorageUtil {
    static get(key: string): any {
        return localStorage.getItem(key);
    }

    static set(key: string, value: any) {
        localStorage.setItem(key, value);
    }

    static remove(key: string) {
        localStorage.removeItem(key);
    }
}