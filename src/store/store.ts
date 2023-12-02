import { create } from 'zustand';
import { ApiStoreActions, ApiStoreState} from './store.types';
import { mockedData, uahData } from '../constants/mockedData';

const useApiStore = create<ApiStoreState & ApiStoreActions>((set) => ({
   addExchangeRate: (data) =>
    set((state) => ({ exchangeRate: [uahData, ...data], currencyData: data })),
    
    exchangeRate: mockedData,
    currencyData: [uahData, ...mockedData],
   
}));

export default useApiStore;
