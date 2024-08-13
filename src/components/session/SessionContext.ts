'use client';

import {createContext} from 'react';

const SessionContext = createContext<any>({
  setSession: () => {},
  clearSession: () => {},
  updateCoinWallet: () => {},
  setBadge: () => {},
  session: {},
  badge: 0,
});

export default SessionContext;
