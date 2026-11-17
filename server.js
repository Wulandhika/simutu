
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const pool = require("./config/database");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API SIMUTU UIS berjalan"
    });
});

app.get("/api/health", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT current_database() AS database"
        );

        res.json({
            success: true,
            message: "Database berhasil terhubung",
            database: result.rows[0].database
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            success: false,
            message: "Database gagal terhubung"
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`SIMUTU API berjalan di port ${PORT}`);
});
