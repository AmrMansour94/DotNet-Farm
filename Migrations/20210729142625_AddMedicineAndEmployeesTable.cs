using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ChicksAppNew.Migrations
{
    public partial class AddMedicineAndEmployeesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GeneralExpenses_Wards_WardID",
                table: "GeneralExpenses");

            migrationBuilder.RenameColumn(
                name: "WardID",
                table: "GeneralExpenses",
                newName: "EmployeeID");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "GeneralExpenses",
                newName: "ExpenseDate");

            migrationBuilder.RenameIndex(
                name: "IX_GeneralExpenses_WardID",
                table: "GeneralExpenses",
                newName: "IX_GeneralExpenses_EmployeeID");

            migrationBuilder.AlterColumn<int>(
                name: "ConsumedWoodDust",
                table: "WardsStocks",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<int>(
                name: "TotalWoodDust",
                table: "WardInsertionOperations",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AddColumn<decimal>(
                name: "TotalFoodCost",
                table: "WardInsertionOperations",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalWoodDustCost",
                table: "WardInsertionOperations",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AlterColumn<int>(
                name: "TotalWoodDustQuantity",
                table: "GeneralStocks",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<int>(
                name: "CurrentWoodDustQuantity",
                table: "GeneralStocks",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmploymentDate = table.Column<DateTime>(type: "date", nullable: false),
                    UnEmploymentDate = table.Column<DateTime>(type: "date", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "FoodAndDustUnitCost",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FoodUnitCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    WoodDustUnitCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FoodAndDustUnitCost", x => x.ID);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_GeneralExpenses_Employees_EmployeeID",
                table: "GeneralExpenses",
                column: "EmployeeID",
                principalTable: "Employees",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GeneralExpenses_Employees_EmployeeID",
                table: "GeneralExpenses");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "FoodAndDustUnitCost");

            migrationBuilder.DropColumn(
                name: "TotalFoodCost",
                table: "WardInsertionOperations");

            migrationBuilder.DropColumn(
                name: "TotalWoodDustCost",
                table: "WardInsertionOperations");

            migrationBuilder.RenameColumn(
                name: "ExpenseDate",
                table: "GeneralExpenses",
                newName: "Date");

            migrationBuilder.RenameColumn(
                name: "EmployeeID",
                table: "GeneralExpenses",
                newName: "WardID");

            migrationBuilder.RenameIndex(
                name: "IX_GeneralExpenses_EmployeeID",
                table: "GeneralExpenses",
                newName: "IX_GeneralExpenses_WardID");

            migrationBuilder.AlterColumn<decimal>(
                name: "ConsumedWoodDust",
                table: "WardsStocks",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<decimal>(
                name: "TotalWoodDust",
                table: "WardInsertionOperations",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<decimal>(
                name: "TotalWoodDustQuantity",
                table: "GeneralStocks",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<decimal>(
                name: "CurrentWoodDustQuantity",
                table: "GeneralStocks",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_GeneralExpenses_Wards_WardID",
                table: "GeneralExpenses",
                column: "WardID",
                principalTable: "Wards",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
