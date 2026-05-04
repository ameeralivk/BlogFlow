import dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
  await import("./server");
}
bootstrap();
