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
            var content = _context.GeneralStocks.Select(x => new StockContentVM 
            { 
            TotalChicksNum = x.TotalInitialChicksNum, 
            CurrentChicksNum = x.TotalCurrentChicksNum, 
            AvailableFoodQuantity = x.TotalFoodQuantity, 
            AvailableWoodDust = x.TotalWoodDustQuantity,
            CurrentAge = x.AgeInDays
            }).FirstOrDefault();
            return content;
        }

        [HttpGet]
        public int updateAge()
        {
            var content = _context.GeneralStocks.FirstOrDefault();
            if (content != null)
            {
                var days = Convert.ToInt32(Math.Floor((DateTime.Now.Date - content.LastAgeUpdate.Date).TotalDays));
                if (days >= 1)
                {
                    content.AgeInDays += days;
                    content.LastAgeUpdate = DateTime.Now.Date;
                    _context.SaveChanges();
                }
                return content.AgeInDays;
            }
            else { return 0; }

        }

        [HttpPost]
        public string SaveNewQuantities([FromForm] StockAddNewQuantitiesVM stock)
        {
            if (!(stock.addedChicksNum > 0 || stock.addedFoodQuantity > 0 || stock.addedWoodDustQuantity > 0))
            {
                return "عذرا لم يتم ادخال قيم لحفظها";
            }
            var result = "";
            try
            {
                var foodAndWoodUnitCost = _context.FoodAndDustUnitCost.FirstOrDefault();
                if (foodAndWoodUnitCost == null)
                    return "يرجي ادخال قيمة الوحدة من العلف والنشارة";

                var currentStock = _context.GeneralStocks.FirstOrDefault();
                if (currentStock != null)
                {
                    currentStock.TotalFoodQuantity = stock.addedFoodQuantity + currentStock.TotalFoodQuantity;
                    currentStock.CurrentFoodQuantity = currentStock.CurrentFoodQuantity + stock.addedFoodQuantity;
                    currentStock.TotalWoodDustQuantity = stock.addedWoodDustQuantity + currentStock.TotalWoodDustQuantity;
                    currentStock.CurrentWoodDustQuantity = stock.addedWoodDustQuantity + currentStock.CurrentWoodDustQuantity;
                    currentStock.TotalInitialChicksNum = currentStock.TotalInitialChicksNum + stock.addedChicksNum;
                    currentStock.TotalCurrentChicksNum = currentStock.TotalCurrentChicksNum + stock.addedChicksNum;
                    currentStock.TotalFoodCost = currentStock.TotalFoodCost + (stock.addedFoodQuantity * foodAndWoodUnitCost.FoodUnitCost);
                    currentStock.TotalWoodDustCost = currentStock.TotalWoodDustCost + (stock.addedWoodDustQuantity * foodAndWoodUnitCost.WoodDustUnitCost);
                }
                else
                {
                    if (stock.addedChicksNum == 0)
                        return "يرجي ادخال عدد الكتاكيت الابتدائي";
                    if (stock.AgeInDays == 0)
                        return "يرجي ادخال عمر الكتاكيت الابتدائي";
                    var newStock = new GeneralStock
                    {

                        ID = 0,
                        CurrentFoodQuantity = stock.addedFoodQuantity,
                        CurrentWoodDustQuantity = stock.addedWoodDustQuantity,
                        TotalFoodQuantity = stock.addedFoodQuantity,
                        TotalWoodDustQuantity = stock.addedWoodDustQuantity,
                        AgeInDays = stock.AgeInDays,
                        TotalCurrentChicksNum = stock.addedChicksNum,
                        TotalDeadChicksNum = 0,
                        TotalInitialChicksNum = stock.addedChicksNum,
                        LastAgeUpdate = DateTime.Now.Date,
                        TotalFoodCost = stock.addedFoodQuantity * foodAndWoodUnitCost.FoodUnitCost,
                        TotalWoodDustCost = stock.addedWoodDustQuantity * foodAndWoodUnitCost.WoodDustUnitCost,
                    };
                    _context.Add(newStock);

                }
                var todayInsertOp = _context.StockInsertionOperations.FirstOrDefault(x => x.InsertDate.Date == DateTime.Now.Date);
                
                if (todayInsertOp != null)
                {
                    todayInsertOp.AddedChicksNum = todayInsertOp.AddedChicksNum + stock.addedChicksNum;
                    todayInsertOp.AddedFoodQuantity = todayInsertOp.AddedFoodQuantity + stock.addedFoodQuantity;
                    todayInsertOp.AddedWoodDustQuantity = todayInsertOp.AddedWoodDustQuantity + stock.addedWoodDustQuantity;
                    todayInsertOp.AddedFoodTotalCost = todayInsertOp.AddedFoodTotalCost + (stock.addedFoodQuantity * foodAndWoodUnitCost.FoodUnitCost);
                    todayInsertOp.AddedWoodDustTotalCost = todayInsertOp.AddedWoodDustTotalCost + (stock.addedWoodDustQuantity * foodAndWoodUnitCost.WoodDustUnitCost);
                }
                else
                {
                    var stockInsertOperation = new StockInsertionOperation
                    {
                        ID = 0,
                        AddedChicksNum = stock.addedChicksNum,
                        AddedFoodQuantity = stock.addedFoodQuantity,
                        AddedWoodDustQuantity = stock.addedWoodDustQuantity,
                        InsertDate = DateTime.Now,
                        AddedWoodDustTotalCost = stock.addedWoodDustQuantity * foodAndWoodUnitCost.WoodDustUnitCost,
                        AddedFoodTotalCost = stock.addedFoodQuantity * foodAndWoodUnitCost.FoodUnitCost
                    };
                    _context.StockInsertionOperations.Add(stockInsertOperation);
                }

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
