using ChicksApp.Context;
using ChicksApp.Domain;
using ChicksAppNew.VM;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace ChicksAppNew.Controllers
{
    
    public class StockController : ControllerBase
    {
        private readonly DataContext _context;

        public StockController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public StockContentVM GetStockContent()
        {
            var content = _context.GeneralStocks.Select(x => new StockContentVM { TotalChicksNum = x.TotalInitialChicksNum, CurrentChicksNum = x.TotalCurrentChicksNum, AvailableFoodQuantity = x.TotalFoodQuantity, AvailableWoodDust = x.TotalWoodDustQuantity }).FirstOrDefault();
            return content;
        }

        [HttpPost]
        public string SaveNewQuantities([FromBody] StockAddNewQuantitiesVM stock)
        {
            if (!(stock.addedChicksNum > 0 || stock.addedFoodQuantity > 0 || stock.addedWoodDustQuantity > 0))
            {
                return "عذرا لم يتم ادخال قيم لحفظها";
            }
            var result = "";
            try
            {
                var stockInsertOperation = new StockInsertionOperation
                {
                    ID = 0,
                    AddedChicksNum = stock.addedChicksNum,
                    AddedFoodQuantity = stock.addedFoodQuantity,
                    AddedWoodDustQuantity = stock.addedWoodDustQuantity,
                    InsertDate = DateTime.Now
                };
                var currentStock = _context.GeneralStocks.FirstOrDefault();
                currentStock.TotalFoodQuantity = stock.addedFoodQuantity + currentStock.TotalFoodQuantity;
                currentStock.CurrentFoodQuantity = currentStock.CurrentFoodQuantity + stock.addedFoodQuantity;
                currentStock.TotalWoodDustQuantity = stock.addedWoodDustQuantity + currentStock.TotalWoodDustQuantity;
                currentStock.CurrentWoodDustQuantity = stock.addedWoodDustQuantity + currentStock.CurrentWoodDustQuantity;
                currentStock.TotalInitialChicksNum = currentStock.TotalInitialChicksNum + stock.addedChicksNum;
                currentStock.TotalCurrentChicksNum = currentStock.TotalCurrentChicksNum + stock.addedChicksNum;


                _context.StockInsertionOperations.Add(stockInsertOperation);
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                result = e.Message;
            }
            return result;
        }
    }
}
