var typeorm = require("typeorm");
var EntitySchema = typeorm.EntitySchema;

const Users = require("./entity/Users")

typeorm.createConnection({
  name: "mysql",
  type: "mysql",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  synchronize: true,
  "logging": true,
  entities: [
    new EntitySchema(Users)
  ]
}).then(() => {

  const dbConnection = typeorm.getConnection('mysql')

  const repo = dbConnection.getRepository("Users")
  return repo
}).then((repo) => {


  console.log('Seeding 2 users to MySQL users table: Liran (role: user), Simon (role: admin')
  const inserts = [
    repo.insert({
      name: "Liran",
      address: "IL",
      role: "user"
    }),
    repo.insert({
      name: "Simon",
      address: "UK",
      role: "admin"
    })
  ];

  return Promise.all(inserts)
}).catch((err) => {
  console.error('failed connecting and seeding users to the MySQL database')
  console.error(err)
})