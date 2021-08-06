export interface WardContentVM {
    currentChicksNum : number,
    deadChicksNum : number
}

export interface SaveWardNewQuantitiesVM {
    wardID : number
    addedChicksNum: number,
    addedFoodQuantity: number,
    addedWoodDustQuantity: number,
    deadChicksNum : number,
    avgBirdWeight: number,
}


export interface wardDailyReportVM {
     iD : number
     wardID : number
     wardName : string
     addedChicksNum : number
     deadChicksNum : number
     consumedFoodQuantityPerDay :number
     consumedWoodDustQuantityPerDay :number
     insertionDate :Date
     deadRatio :number
     conversionFactor :number
     age :number
     totalFoodQuantity :number
     totalWoodDust :number
     TotalNumOfChicks : number
     totalFoodCost :number
     totalWoodDustCost : number
}