using ChicksApp.Context;
using ChicksApp.VM;
using ChicksAppNew.VM;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using ChicksApp.Domain;
using System;

namespace ChicksApp.Controllers
{
    public class WardsController : ControllerBase
    {
        private readonly DataContext _context;

        public WardsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<KeyValuePairsVM> GetWards()
        {
            var Wards = _context.Wards.Select(x => new KeyValuePairsVM { ID = x.ID, Name = x.Name }).ToList();
            return Wards;
        }

        [HttpGet]
        public UserVM Login(string userName, string password)
        {
            var user = _context.Users.Where(x => x.UserName == userName && x.Password == password).Select(x => new UserVM { ID = x.ID, UserName = x.UserName }).FirstOrDefault();
            return user;

        }

        [HttpPost]
        public string SaveNewQuantities([FromForm] WardAddNewQuantitiesVM stock)
        {
            if (!(stock.addedChicksNum > 0 || stock.addedFoodQuantity > 0 || stock.addedWoodDustQuantity > 0 || stock.deadChicksNum > 0))
            {
                return "عذرا لم يتم ادخال قيم لحفظها";
            }
            var result = "";
            try
            {

                var currentStock = _context.GeneralStocks.FirstOrDefault();
                var currentWard = _context.WardsStocks.FirstOrDefault(x => x.WardID == stock.wardID);
                if (currentStock == null) return "لم يتم تهيئة المخزن اولا";
                if (currentWard != null)
                {
                    currentStock.CurrentFoodQuantity = currentStock.CurrentFoodQuantity - stock.addedFoodQuantity;
                    currentStock.CurrentWoodDustQuantity = currentStock.CurrentWoodDustQuantity - stock.addedWoodDustQuantity;
                    currentStock.TotalCurrentChicksNum = currentStock.TotalCurrentChicksNum - stock.addedChicksNum - stock.deadChicksNum;


                    currentWard.ConsumedFoodQuantity = currentWard.ConsumedFoodQuantity + stock.addedFoodQuantity;
                    currentWard.ConsumedWoodDust = currentWard.ConsumedWoodDust + stock.addedWoodDustQuantity;
                    currentWard.InitialNumOfChicks = currentWard.InitialNumOfChicks + stock.addedChicksNum;
                    currentWard.DeadChicks = currentWard.DeadChicks + stock.deadChicksNum;
                    currentWard.AgeInDays = currentStock.AgeInDays;
                    currentWard.CurrentNumOfChicks = currentWard.CurrentNumOfChicks + stock.addedChicksNum - stock.deadChicksNum;
                    currentWard.DeathRatio = (currentWard.DeadChicks / currentWard.InitialNumOfChicks) * 100;
                }
                else
                {
                    if (stock.addedChicksNum == 0)
                        return "يرجي ادخال عدد الكتاكيت الابتدائي للعنبر";
                    var newStock = new WardsStock
                    {

                        ID = 0,
                        ConsumedFoodQuantity = stock.addedFoodQuantity,
                        ConsumedWoodDust = stock.addedWoodDustQuantity,
                        InitialNumOfChicks = stock.addedChicksNum,
                        DeadChicks = stock.deadChicksNum,
                        AgeInDays = currentStock.AgeInDays,
                        CurrentNumOfChicks = stock.addedChicksNum,
                        DeathRatio = 0,
                        WardID = stock.wardID
                    };
                    _context.Add(newStock);
                    _context.SaveChanges();

                }
                currentWard = _context.WardsStocks.FirstOrDefault(x => x.WardID == stock.wardID);
                var todayInsertOp = _context.WardInsertionOperations.FirstOrDefault(x => x.InsertionDate.Date == DateTime.Now.Date && x.WardID == stock.wardID);
                if (todayInsertOp != null)
                {
                    todayInsertOp.AddedChicksNum = todayInsertOp.AddedChicksNum + stock.addedChicksNum;
                    todayInsertOp.DeadChicksNum = todayInsertOp.DeadChicksNum + stock.deadChicksNum;
                    todayInsertOp.ConsumedWoodDustQuantityPerDay = todayInsertOp.ConsumedWoodDustQuantityPerDay + stock.addedWoodDustQuantity;
                    todayInsertOp.ConsumedFoodQuantityPerDay = todayInsertOp.ConsumedFoodQuantityPerDay + stock.addedFoodQuantity;
                    todayInsertOp.TotalFoodQuantity = currentWard.ConsumedFoodQuantity;
                    todayInsertOp.TotalWoodDust = currentWard.ConsumedWoodDust;
                    todayInsertOp.ConversionFactor = ((todayInsertOp.ConversionFactor + stock.addedFoodQuantity) * 1000) / currentWard.CurrentNumOfChicks;
                    todayInsertOp.DeadRatio = currentWard.DeathRatio;
                }
                else
                {
                    var wardInsertOperation = new WardInsertionOperation
                    {
                        ID = 0,
                        AddedChicksNum = stock.addedChicksNum,
                        ConsumedFoodQuantityPerDay = stock.addedFoodQuantity,
                        ConsumedWoodDustQuantityPerDay = stock.addedWoodDustQuantity,
                        InsertionDate = DateTime.Now,
                        DeadChicksNum = stock.deadChicksNum,
                        WardID = stock.wardID,
                        ConversionFactor = ( stock.addedFoodQuantity * 1000 ) / currentWard.CurrentNumOfChicks,
                        DeadRatio = currentWard.DeathRatio,
                        Age = currentWard.AgeInDays,
                        TotalFoodQuantity = currentWard.ConsumedFoodQuantity,
                        TotalWoodDust = currentWard.ConsumedWoodDust
                    };
                    _context.WardInsertionOperations.Add(wardInsertOperation);
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
