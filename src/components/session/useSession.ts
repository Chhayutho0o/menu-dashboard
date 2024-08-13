import {useContext} from 'react';
import SessionContext from './SessionContext';

export default function useSession() {
  const context = useContext(SessionContext);
  return context;
}
