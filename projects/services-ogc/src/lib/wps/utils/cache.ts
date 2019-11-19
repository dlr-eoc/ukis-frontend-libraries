import { UtilStoreService } from '@ukis/services-util-store';
import md5 from 'md5';

export class Cache {

    private store: UtilStoreService;

    constructor() {
        this.store = new UtilStoreService();
    }

    get(key: string): any {
        const response = this.store.local(key);
        return response;
    }

    set(key: string, response: any): void {
        this.store.local(key, response);
    }

    public makeKey(object: any): string {
        return md5(JSON.stringify(object));
    }

}