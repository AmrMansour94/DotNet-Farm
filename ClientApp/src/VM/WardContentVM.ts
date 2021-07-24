export interface WardContentVM {
    currentChicksNum : number,
    deadChicksNum : number
}

export interface SaveWardNewQuantitiesVM {
    wardID : number
    addedChicksNum: number,
    addedFoodQuantity: number,
    addedWoodDustQuantity: number,
    avgBirdWeight: number,
}