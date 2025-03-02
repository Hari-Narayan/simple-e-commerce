require("dotenv").config();
const { disconnectDB } = require("../../config/connection");

const userSeeder = require("./userSeeder");
const productSeeder = require("./productSeeder");

const runSeeders = async () => {
  try {
    await Promise.all([userSeeder(), productSeeder()]); // Ensure both seeders complete
    await disconnectDB();
    console.info("Seeding completed and database disconnected.");
  } catch (error) {
    console.error("Error in seeding:", error);
    process.exit(1);
  }
};

runSeeders();
