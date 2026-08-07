import "dotenv/config"
import app from "@/App";

const PORT = process.env.PORT!;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});