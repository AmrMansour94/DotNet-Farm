using ChicksApp.Context;
using ChicksApp.Domain;
using ChicksAppNew.VM;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using HttpPostAttribute = System.Web.Http.HttpPostAttribute;

namespace ChicksAppNew.Controllers
{
    public class StockController : ApiController
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
        public IHttpActionResult SaveNewQuantities(StockAddNewQuantitiesVM stock)
        {
            //var stock = JsonSerializer
            //    .Deserialize<StockAddNewQuantitiesVM>(HttpContext.Current.Request.Params["stock"]);
            if (!(stock.addedChicksNum > 0 || stock.addedFoodQuantity > 0 || stock.addedWoodDustQuantity > 0))
            {
                return Json("عذرا لم يتم ادخال قيم لحفظها");
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
            return Json(result);
        }
    }
}
