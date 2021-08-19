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
  iD: number;
  addedChicksNum: number;
  addedFoodQuantity: number;
  addedWoodDustQuantity: number;
  insertDate: Date;
  addedFoodTotalCost: number;
  addedWoodDustTotalCost: number;
}
