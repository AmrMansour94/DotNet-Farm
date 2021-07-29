using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ChicksAppNew.Migrations
{
    public partial class LastAgeUpdateColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LastAgeUpdate",
                table: "GeneralStocks",
                type: "date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastAgeUpdate",
                table: "GeneralStocks");
        }
    }
}
