require("dotenv").config();
const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  process.env.NEO4J_URI, // Use Aura's connection URI
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const connectGraphDB = async () => {
  try {
    const session = driver.session();
    await session.run("RETURN 1"); // Test query
    session.close();
    console.log("Connected to Neo4j Aura database");
  } catch (error) {
    console.error("Neo4j connection error:", error);
  }
};

module.exports = { driver, connectGraphDB };
