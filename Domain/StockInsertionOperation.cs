﻿using System;

namespace ChicksApp.Domain
{
    public class StockInsertionOperation
    {
        public int ID { get; set; }
        public int AddedChicksNum { get; set; }
        public decimal AddedFoodQuantity { get; set; }
        public decimal AddedWoodDustQuantity { get; set; }
        public DateTime InsertDate { get; set; }
    }
}
