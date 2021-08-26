using Microsoft.EntityFrameworkCore.Migrations;

namespace ChicksAppNew.Migrations
{
    public partial class updateUsersTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Users",
                newName: "UserName");

            migrationBuilder.Sql(@"INSERT INTO [dbo].[Users]
           ([UserName]
           ,[Password])
     VALUES
           ('Admin'
           ,'admin@123')
GO");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "Users",
                newName: "Name");
        }
    }
}
