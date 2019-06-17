import { UtilStoreService } from '@ukis/services-util-store';
import md5 from 'md5';

export class Cache {
    
    private store: UtilStoreService
    
    constructor() {
        this.store = new UtilStoreService();
    }

    get(request: any): any {
        const key = this.key(request);
        const response = this.store.local(key);
        if(response) console.log("found this in cache for key "+key+": ", response);
        else console.log("No cache hit for key "+key);
        return response;
    }

    set(request: any, response: any): void {
        const key = this.key(request);
        this.store.local(key, response);
        console.log("stored in cache for key" + key + ": ", response);
    }

    private key(request: any): string {
        return md5(JSON.stringify(request));
    }

}