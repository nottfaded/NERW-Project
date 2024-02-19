using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class SessionTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "surname",
                table: "Accounts",
                newName: "Surname");

            migrationBuilder.RenameColumn(
                name: "repairCode",
                table: "Accounts",
                newName: "RepairCode");

            migrationBuilder.RenameColumn(
                name: "phone",
                table: "Accounts",
                newName: "Phone");

            migrationBuilder.RenameColumn(
                name: "password",
                table: "Accounts",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "notifySettings",
                table: "Accounts",
                newName: "NotifySettings");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Accounts",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "Accounts",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "createdCode",
                table: "Accounts",
                newName: "CreatedCode");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Accounts",
                newName: "Id");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Phone",
                keyValue: null,
                column: "Phone",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                table: "Accounts",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Sessions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    fk_client = table.Column<int>(type: "int", nullable: false),
                    fk_psycho = table.Column<int>(type: "int", nullable: false),
                    ClientPhone = table.Column<string>(type: "varchar(13)", maxLength: 13, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Date = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    CountMinutes = table.Column<int>(type: "int", nullable: false),
                    City = table.Column<string>(type: "varchar(168)", maxLength: 168, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Street = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Rating = table.Column<uint>(type: "int unsigned", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sessions_Accounts_fk_client",
                        column: x => x.fk_client,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Sessions_Accounts_fk_psycho",
                        column: x => x.fk_psycho,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_fk_client",
                table: "Sessions",
                column: "fk_client");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_fk_psycho",
                table: "Sessions",
                column: "fk_psycho");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Sessions");

            migrationBuilder.RenameColumn(
                name: "Surname",
                table: "Accounts",
                newName: "surname");

            migrationBuilder.RenameColumn(
                name: "RepairCode",
                table: "Accounts",
                newName: "repairCode");

            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "Accounts",
                newName: "phone");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Accounts",
                newName: "password");

            migrationBuilder.RenameColumn(
                name: "NotifySettings",
                table: "Accounts",
                newName: "notifySettings");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Accounts",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Accounts",
                newName: "email");

            migrationBuilder.RenameColumn(
                name: "CreatedCode",
                table: "Accounts",
                newName: "createdCode");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Accounts",
                newName: "id");

            migrationBuilder.AlterColumn<string>(
                name: "phone",
                table: "Accounts",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }
    }
}
