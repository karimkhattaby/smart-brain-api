// @ts-nocheck

// Development DB Settings
/* const db_settings = {
    client: "pg",
    connection: {
        host: "127.0.0.1",
        user: "karimkhattaby",
        password: "",
        database: "smart-brain"
    }
}; */

// Deployment DB Settings
const db_settings = {
    client: "pg",
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
};

module.exports = {
    db_settings: db_settings
};