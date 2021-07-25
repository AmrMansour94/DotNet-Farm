using Microsoft.EntityFrameworkCore.Migrations;

namespace ChicksAppNew.Migrations
{
    public partial class UpdateWardInsertionOpsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "DeathRatio",
                table: "WardsStocks",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "WardInsertionOperations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "ConversionFactor",
                table: "WardInsertionOperations",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "DeadRatio",
                table: "WardInsertionOperations",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalFoodQuantity",
                table: "WardInsertionOperations",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalWoodDust",
                table: "WardInsertionOperations",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeathRatio",
                table: "WardsStocks");

            migrationBuilder.DropColumn(
                name: "Age",
                table: "WardInsertionOperations");

            migrationBuilder.DropColumn(
                name: "ConversionFactor",
                table: "WardInsertionOperations");

            migrationBuilder.DropColumn(
                name: "DeadRatio",
                table: "WardInsertionOperations");

            migrationBuilder.DropColumn(
                name: "TotalFoodQuantity",
                table: "WardInsertionOperations");

            migrationBuilder.DropColumn(
                name: "TotalWoodDust",
                table: "WardInsertionOperations");
        }
    }
}
