import app from "./app";
import { prisma } from "./lib/prisma";

const port = process.env.PORT || 8080;

async function main() {
    try {
        await prisma.$connect();
        console.log("Connected to the database successfully");

        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        })
    }
    catch (error) {
        console.log("An error accured ", error);
        await prisma.$disconnect();
        process.exit(1);
    }
}
main();