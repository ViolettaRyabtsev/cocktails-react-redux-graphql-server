const express = require("express");

const mysql = require("mysql2");
const { ApolloServer, gql } = require("apollo-server-express");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
// const typeDefs = require("./typeDefs");
// const resolvers = require("./resolvers");
const { conn } = require("./db");

const typeDefs = gql`
  type Cocktail {
    drink_id: Int!
    name: String!
    img: String!
    recipeBody: String!
    category: String!
  }

  type Query {
    cocktailList: [Cocktail!]!
  }
`;

const resolvers = {
  Query: {
    cocktailList: () => {
      const sql = "SELECT * FROM tblDrinks";
      return new Promise((res, rej) => {
        conn.query(sql, (err, result, fields) => {
          console.log(result, "cocktails");
          return res(result);
        });
      });
    },
  },
};

let PORT = 3060;

async function createServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground({ app })],
  });

  await server.start();

  server.applyMiddleware({ app });

  app.get("/graphql", (req, res) => {
    res.send("hello world");
  });

  app.listen(PORT, () => {
    console.log(`port listen on http://localhost:${PORT}/graphql`);
  });
}

createServer();
