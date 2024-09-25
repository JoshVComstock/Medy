import { create, SetState } from "zustand";

interface EmployeeStore {
  employees: string[];
  setEmployees: (employees: string[]) => void;
  addEmployee: (employee: string) => void;
}

const useEmployeeStore = create<EmployeeStore>(
  (set: SetState<EmployeeStore>) => ({
    employees: [],

    setEmployees: (employees: string[]) => set({ employees }),

    addEmployee: (employee: string) =>
      set((state: EmployeeStore) => ({
        employees: [...state.employees, employee],
      })),
  })
);

export default useEmployeeStore;
