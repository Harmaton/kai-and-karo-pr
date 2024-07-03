const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function addAdmin() {
  try {
    await database.guest.update({
      where: {
        email: "njagiiharmaton@gmail.com",
      },
      data: {
        isAdmin: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

addAdmin();
