import { create } from 'zustand';
// Define a Company type
interface Company {
  id: number;
  name: string;
}

interface CompanyStore {
  companyDatas: Company[];
  setCompanyDatas: (companyDatas: Company[]) => void;
}

const useCompanyStore = create<CompanyStore>((set) => ({
  companyDatas: [],
  setCompanyDatas: (companyDatas) => set({ companyDatas })
}));

export default useCompanyStore;
