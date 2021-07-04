using ChicksApp.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChicksApp.Context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

       public DbSet<Ward> Wards { get; set; }
        public DbSet<WardsStock> WardsStocks { get; set; }
        public DbSet<GeneralStock> GeneralStocks { get; set; }
        public DbSet<StockInsertionOperation> StockInsertionOperations { get; set; }
        public DbSet<WardInsertionOperation> WardInsertionOperations { get; set; }
    }
}
