export interface EmployeesVM {
  iD: number;
  name: string;
  employmentDate: Date;
  unEmploymentDate: Date;
  phoneNumber: string;
  isActive: boolean;
}

export interface EmployeesSaveVM {
  iD: number;
  name: string;
  employmentDate: string;
  unEmploymentDate: string | null;
  phoneNumber: string;
  isActive: boolean;
}
