"use server";

import { prismadb } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function FetchAdminStatus() {
  try {
    const { userId } = auth();
    if (userId) {
      const user = await prismadb.guest.findUnique({
        where: {
          clerkid: userId,
        },
        select: {
          isAdmin: true,
        },
      });
      if (!user) {
        return false;
      }
      const res = user.isAdmin;

      return res;
    }
  } catch (error) {
    console.log(error);
  }
}
