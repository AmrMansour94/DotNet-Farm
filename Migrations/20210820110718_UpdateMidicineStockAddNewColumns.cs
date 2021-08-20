using Microsoft.EntityFrameworkCore.Migrations;

namespace ChicksAppNew.Migrations
{
    public partial class UpdateMidicineStockAddNewColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StockQuantity",
                table: "MedicineStock",
                newName: "InitialStockQuantity");

            migrationBuilder.AddColumn<decimal>(
                name: "ConsumedQuantity",
                table: "MedicineStock",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "CurrentStockQuantity",
                table: "MedicineStock",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConsumedQuantity",
                table: "MedicineStock");

            migrationBuilder.DropColumn(
                name: "CurrentStockQuantity",
                table: "MedicineStock");

            migrationBuilder.RenameColumn(
                name: "InitialStockQuantity",
                table: "MedicineStock",
                newName: "StockQuantity");
        }
    }
}
