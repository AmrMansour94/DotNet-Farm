using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ChicksAppNew.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GeneralStocks",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TotalInitialChicksNum = table.Column<int>(type: "int", nullable: false),
                    TotalDeadChicksNum = table.Column<int>(type: "int", nullable: false),
                    TotalCurrentChicksNum = table.Column<int>(type: "int", nullable: false),
                    TotalFoodQuantity = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CurrentFoodQuantity = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalWoodDustQuantity = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CurrentWoodDustQuantity = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GeneralStocks", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "StockInsertionOperations",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AddedChicksNum = table.Column<int>(type: "int", nullable: false),
                    AddedFoodQuantity = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AddedWoodDustQuantity = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    InsertDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockInsertionOperations", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Wards",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Wards", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "WardInsertionOperations",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WardID = table.Column<int>(type: "int", nullable: false),
                    AddedChicksNum = table.Column<int>(type: "int", nullable: false),
                    DeadChicksNum = table.Column<int>(type: "int", nullable: false),
                    ConsumedFoodQuantityPerDay = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ConsumedWoodDustQuantityPerDay = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    InsertionDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WardInsertionOperations", x => x.ID);
                    table.ForeignKey(
                        name: "FK_WardInsertionOperations_Wards_WardID",
                        column: x => x.WardID,
                        principalTable: "Wards",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WardsStocks",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WardID = table.Column<int>(type: "int", nullable: false),
                    InitialNumOfChicks = table.Column<int>(type: "int", nullable: false),
                    DeadChicks = table.Column<int>(type: "int", nullable: false),
                    CurrentNumOfChicks = table.Column<int>(type: "int", nullable: false),
                    ConsumedFoodQuantity = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ConsumedWoodDust = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WardsStocks", x => x.ID);
                    table.ForeignKey(
                        name: "FK_WardsStocks_Wards_WardID",
                        column: x => x.WardID,
                        principalTable: "Wards",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WardInsertionOperations_WardID",
                table: "WardInsertionOperations",
                column: "WardID");

            migrationBuilder.CreateIndex(
                name: "IX_WardsStocks_WardID",
                table: "WardsStocks",
                column: "WardID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GeneralStocks");

            migrationBuilder.DropTable(
                name: "StockInsertionOperations");

            migrationBuilder.DropTable(
                name: "WardInsertionOperations");

            migrationBuilder.DropTable(
                name: "WardsStocks");

            migrationBuilder.DropTable(
                name: "Wards");
        }
    }
}
