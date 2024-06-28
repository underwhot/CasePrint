"use server";

import { db } from "@/db";
import { getUser } from "@workos-inc/authkit-nextjs";

export const getPaymentStatus = async (orderId:  string ) => {
  const { user } = await getUser();

  if (!user?.id || !user.email) {
    throw new Error("You need to be logged in");
  }

  const order = await db.order.findFirst({
    where: { id: orderId, userId: user.id },
    include: {
      configuration: true,
      billingAddress: true,
      shippingAddress: true,
      user: true,
    },
  });

  if (!order) {
    throw new Error("This order does not exist");
  }

  if (order.isPaid) {
    return order;
  } else {
    return false;
  }
};
