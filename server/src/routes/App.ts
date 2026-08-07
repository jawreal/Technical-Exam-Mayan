// import { db } from "@/db";
// import { usersTable, userPost } from '@/db/schema';
import queryRouter from "@/routers/query"
import express from "express";
const app = express();

app.use(express.json());
app.use("/query", queryRouter);
/*app.get("/", async (_: Request, res: Response) => {
  /* const user: typeof usersTable.$inferInsert = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
  };
  const result = await db.insert(usersTable).values(user);
  console.log('New user created!', result)
  const users = await db.select().from(usersTable);
  console.log('Getting all users from the database: ', users)
  
  res.json({
    message: "Success inserting", 
    ...users
  })
})*/

export default app;