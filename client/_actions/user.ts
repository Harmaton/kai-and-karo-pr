"use server";

import { prismadb } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function CheckUser(email: string) {
  try {
    const { userId } = auth();
    if (email) {
      let user = await prismadb.guest.findUnique({
        where: {
          email: email,
        },
      });

      if (!user && userId) {
        user = await prismadb.guest.create({
          data: {
            clerkid: userId,
            email: email,
          },
        });
      }

      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
