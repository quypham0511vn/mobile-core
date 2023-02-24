import { makeObservable, observable } from 'mobx';

import { NetworkManager } from '@/managers/NetworkManager';
import { ApiServices } from '@/api';

class AppStore {

    @observable networkManager = new NetworkManager();

    apiServices = new ApiServices();

    constructor() {
        makeObservable(this);
    }

}

export type AppStoreType = AppStore;
export default AppStore;
