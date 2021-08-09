export interface stockReportsVM {
  generalStock: GeneralStock[];
  insertionOpsReport: InsertionOpsReport[];
}

export interface GeneralStock {
  iD: number;
  totalInitialChicksNum: number;
  totalDeadChicksNum: number;
  totalCurrentChicksNum: number;
  totalFoodQuantity: number;
  currentFoodQuantity: number;
  totalWoodDustQuantity: number;
  currentWoodDustQuantity: number;
  ageInDays: number;
  totalFoodCost: number;
  totalWoodDustCost: number;
}

export interface InsertionOpsReport {
  ID: number;
  AddedChicksNum: number;
  AddedFoodQuantity: number;
  AddedWoodDustQuantity: number;
  InsertDate: Date;
  AddedFoodTotalCost: number;
  AddedWoodDustTotalCost: number;
}
