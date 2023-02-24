import React, { useEffect, useState } from 'react';

import AppStore from './app-store';
import { AppStoreContext } from './context';

export const AppStoreProvider = ({ children }: any) => {

    const [appStore, setAppStore] = useState<AppStore>(null);

    useEffect(() => {
        setAppStore(new AppStore());
    }, []);

    return (
        appStore && <AppStoreContext.Provider value={appStore}>
            {children}
        </AppStoreContext.Provider>
    );
};
