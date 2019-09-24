import { UtilStoreService } from '@ukis/services-util-store';
import md5 from 'md5';

export class Cache {
    
    private store: UtilStoreService
    
    constructor() {
        this.store = new UtilStoreService();
    }

    get(key: string): any {
        const response = this.store.local(key);
        //if(response) console.log("found this in cache for key "+key+": ", response);
        //else console.log("No cache hit for key "+key);
        return response;
    }

    set(key: string, response: any): void {
        this.store.local(key, response);
        //console.log("stored in cache for key " + key + ": ", response);
    }

    public makeKey(object: any): string {
        return md5(JSON.stringify(object));
    }

}