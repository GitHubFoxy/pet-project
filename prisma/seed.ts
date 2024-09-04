import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";

async function up() {
    //generate users
    await prisma.user.createMany({
        data: [
            {
                fullName: 'User',
                email: 'user@gmail.com',
                password: hashSync('123123', 10),
                verified: new Date(),
                role: 'USER',
            },
            {
                fullName: 'Admin',
                email: 'admin@gmail.com',
                password: hashSync('123123', 10),
                verified: new Date(),
                role: 'ADMIN',
            }
        ]
    })
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
}

async function main() {
    try {
        await down()
        await up()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

main().then( async () => {
    await prisma.$disconnect();
}).catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
})

