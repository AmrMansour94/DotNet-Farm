export interface MedicineVM {
  id: number;
  name: string;
  companyName: string;
  unit: string;
  unitCost: number;
  notes: string;
}

export interface MedicineSaveVM {
  ID: number;
  Name: string;
  CompanyName: string;
  Unit: string;
  UnitCost: number;
  Notes: string;
}

export interface SelectedMedicineDetails {
  medicineDetails: MedicineVM;
  medicineStock: MedicineStock;
}
export interface MedicineStock {
  id: number;
  medicineID: number;
  stockQuantity: number;
  stockCurrentMedicineValue: number;
}

export interface MedicineStockSaveVM {
  ID: number;
  MedicineID: number;
  InitialStockQuantity: number;
  CurrentStockQuantity: number;
  ConsumedQuantity: number;
  StockCurrentMedicineValue: number;
}

