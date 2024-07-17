"use server";

import { prismadb } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function FetchAdminStatus() {
  try {
    const clerkUser = await currentUser()
    if (clerkUser) {
      const user = await prismadb.guest.findUnique({
        where: {
          email: clerkUser.emailAddresses[0].emailAddress,
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
