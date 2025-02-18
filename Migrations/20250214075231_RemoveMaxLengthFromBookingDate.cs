using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace E_Tour.Migrations
{
    /// <inheritdoc />
    public partial class RemoveMaxLengthFromBookingDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "bookingheader",
                columns: table => new
                {
                    bookingID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    bookingDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    bookingStatus = table.Column<string>(type: "enum('CANCELED','CONFIRMED','PENDING')", nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    customerId = table.Column<int>(type: "int", nullable: false),
                    customername = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    numberOfPassengers = table.Column<int>(type: "int", nullable: true),
                    paymentStatus = table.Column<string>(type: "enum('COMPLETED','FAILED','PENDING')", nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    totalAmount = table.Column<double>(type: "double", nullable: false),
                    tourAmount = table.Column<double>(type: "double", nullable: false),
                    tourId = table.Column<int>(type: "int", nullable: false),
                    tourname = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    transactionId = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    email = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.bookingID);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateTable(
                name: "categorymaster",
                columns: table => new
                {
                    categoryid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Category_Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Flag = table.Column<ulong>(type: "bit(1)", nullable: false),
                    subcategoryid = table.Column<int>(type: "int", nullable: false),
                    categoryImagePath = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.categoryid);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateTable(
                name: "customer",
                columns: table => new
                {
                    customerid = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    email = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    firstName = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    lastName = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    password = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    phoneNumber1 = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.customerid);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateTable(
                name: "subcategorymaster",
                columns: table => new
                {
                    subCatMasterId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    flag = table.Column<ulong>(type: "bit(1)", nullable: false),
                    subCatId = table.Column<string>(type: "varchar(3)", maxLength: 3, nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    subCatImagePath = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    subCatName = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    catMasterId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.subCatMasterId);
                    table.ForeignKey(
                        name: "FKdqaal5ktonkpbtrg032utwed1",
                        column: x => x.catMasterId,
                        principalTable: "categorymaster",
                        principalColumn: "categoryid");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateTable(
                name: "passenger",
                columns: table => new
                {
                    Paxid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    age = table.Column<int>(type: "int", nullable: true),
                    cost = table.Column<int>(type: "int", nullable: true),
                    firstName = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    lastName = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    passengerType = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    phoneNumber = table.Column<long>(type: "bigint", nullable: true),
                    customerid = table.Column<long>(type: "bigint", nullable: false),
                    Amount = table.Column<double>(type: "double", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.Paxid);
                    table.ForeignKey(
                        name: "FK94glo3g96s4casn80nqs3ibdu",
                        column: x => x.customerid,
                        principalTable: "customer",
                        principalColumn: "customerid");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateTable(
                name: "tours",
                columns: table => new
                {
                    tourid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    durationDays = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    durationNights = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    imageurl = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    place = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    price = table.Column<double>(type: "double", nullable: false),
                    tourname = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    subcategoryMaster = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.tourid);
                    table.ForeignKey(
                        name: "FKqvmqy6h525rs33m9cqt2a3rri",
                        column: x => x.subcategoryMaster,
                        principalTable: "subcategorymaster",
                        principalColumn: "subCatMasterId");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateTable(
                name: "costmaster",
                columns: table => new
                {
                    CostId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    TwinSharingcost = table.Column<int>(type: "int", nullable: false),
                    childWithBed = table.Column<int>(type: "int", nullable: false),
                    childWitoutBed = table.Column<int>(type: "int", nullable: false),
                    extraPersonCost = table.Column<int>(type: "int", nullable: false),
                    tourId = table.Column<int>(type: "int", nullable: false),
                    singlePersonCost = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.CostId);
                    table.ForeignKey(
                        name: "FK327r3j8n8q2o4jo4e0174mlbq",
                        column: x => x.tourId,
                        principalTable: "tours",
                        principalColumn: "tourid");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateTable(
                name: "departuredates",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    startdate = table.Column<DateTime>(type: "datetime(6)", maxLength: 6, nullable: true),
                    tour_id = table.Column<int>(type: "int", nullable: false),
                    enddate = table.Column<DateTime>(type: "datetime(6)", maxLength: 6, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                    table.ForeignKey(
                        name: "FKk3khu7tlq4njwvmkftfrkeuce",
                        column: x => x.tour_id,
                        principalTable: "tours",
                        principalColumn: "tourid");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateTable(
                name: "itenarymaster",
                columns: table => new
                {
                    ItenaryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    description = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    dayNo = table.Column<int>(type: "int", nullable: false),
                    images = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    tour_id = table.Column<int>(type: "int", nullable: false),
                    detailsEs = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: true, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    detailsFr = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: true, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    detailsHi = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: true, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    detailsMr = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: true, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ItenaryId);
                    table.ForeignKey(
                        name: "FK_tour_itenary",
                        column: x => x.tour_id,
                        principalTable: "tours",
                        principalColumn: "tourid");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateTable(
                name: "transactionsstatus",
                columns: table => new
                {
                    transactionId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    createdAt = table.Column<DateTime>(type: "datetime(6)", maxLength: 6, nullable: false),
                    packageName = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    transactionStatus = table.Column<string>(type: "enum('COMPLETED','FAILED','PENDING')", nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    updatedAt = table.Column<DateTime>(type: "datetime(6)", maxLength: 6, nullable: false),
                    bookingID = table.Column<int>(type: "int", nullable: false),
                    totalAmount = table.Column<int>(type: "int", nullable: false),
                    tourId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.transactionId);
                    table.ForeignKey(
                        name: "FKdk3alo9s6dc02mcefyj2gt79m",
                        column: x => x.totalAmount,
                        principalTable: "costmaster",
                        principalColumn: "CostId");
                    table.ForeignKey(
                        name: "FKjmq5o024vo6epjojp4fcf8dm0",
                        column: x => x.bookingID,
                        principalTable: "bookingheader",
                        principalColumn: "bookingID");
                    table.ForeignKey(
                        name: "FKrm93xk7265fy0xtaaf2jq185l",
                        column: x => x.tourId,
                        principalTable: "tours",
                        principalColumn: "tourid");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateIndex(
                name: "UK1qg4m2fi7wc915v9six8ivvn2",
                table: "costmaster",
                column: "tourId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "FKk3khu7tlq4njwvmkftfrkeuce",
                table: "departuredates",
                column: "tour_id");

            migrationBuilder.CreateIndex(
                name: "FK_tour_itenary",
                table: "itenarymaster",
                column: "tour_id");

            migrationBuilder.CreateIndex(
                name: "FK94glo3g96s4casn80nqs3ibdu",
                table: "passenger",
                column: "customerid");

            migrationBuilder.CreateIndex(
                name: "FKdqaal5ktonkpbtrg032utwed1",
                table: "subcategorymaster",
                column: "catMasterId");

            migrationBuilder.CreateIndex(
                name: "FKqvmqy6h525rs33m9cqt2a3rri",
                table: "tours",
                column: "subcategoryMaster");

            migrationBuilder.CreateIndex(
                name: "FKrm93xk7265fy0xtaaf2jq185l",
                table: "transactionsstatus",
                column: "tourId");

            migrationBuilder.CreateIndex(
                name: "UKl406erm0b04fpeijxrap2tu93",
                table: "transactionsstatus",
                column: "totalAmount",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UKs2i5dc1nhj0dbsdadsc1ku2s2",
                table: "transactionsstatus",
                column: "bookingID",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "departuredates");

            migrationBuilder.DropTable(
                name: "itenarymaster");

            migrationBuilder.DropTable(
                name: "passenger");

            migrationBuilder.DropTable(
                name: "transactionsstatus");

            migrationBuilder.DropTable(
                name: "customer");

            migrationBuilder.DropTable(
                name: "costmaster");

            migrationBuilder.DropTable(
                name: "bookingheader");

            migrationBuilder.DropTable(
                name: "tours");

            migrationBuilder.DropTable(
                name: "subcategorymaster");

            migrationBuilder.DropTable(
                name: "categorymaster");
        }
    }
}
