using Microsoft.EntityFrameworkCore.Migrations;

namespace ChicksAppNew.Migrations
{
    public partial class AddTotalFoodAndDustCostToStock : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "AddedFoodTotalCost",
                table: "StockInsertionOperations",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "AddedWoodDustTotalCost",
                table: "StockInsertionOperations",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalFoodCost",
                table: "GeneralStocks",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalWoodDustCost",
                table: "GeneralStocks",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddedFoodTotalCost",
                table: "StockInsertionOperations");

            migrationBuilder.DropColumn(
                name: "AddedWoodDustTotalCost",
                table: "StockInsertionOperations");

            migrationBuilder.DropColumn(
                name: "TotalFoodCost",
                table: "GeneralStocks");

            migrationBuilder.DropColumn(
                name: "TotalWoodDustCost",
                table: "GeneralStocks");
        }
    }
}
