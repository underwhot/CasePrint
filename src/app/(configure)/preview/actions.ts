"use server";

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { Order } from "@prisma/client";
import { getUser } from "@workos-inc/authkit-nextjs";

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string;
}) => {
  const configuration = await db.configuration.findUnique({
    where: {
      id: configId,
    },
  });

  if (!configuration) {
    throw new Error("Configuration not found");
  }

  const { user } = await getUser();

  if (!user) {
    throw new Error("You need to be logged in");
  }

  const { finish, material } = configuration;

  let price = BASE_PRICE;
  if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
  if (material === "polycarbonate")
    price += PRODUCT_PRICES.material.polycarbonate;

  let order: Order | undefined = undefined;

  const existingOrder = await db.order.findFirst({
    where: {
      userId: user.id,
      configurationId: configuration.id,
    },
  });

  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await db.order.create({
      data: {
        amount: price / 100,
        userId: user.id,
        configurationId: configuration.id,
      },
    });
  }

  const product = await stripe.products.create({
    name: "Custom Case",
    images: [configuration.imageUrl],
    default_price_data: {
      currency: "usd",
      unit_amount: price,
    },
  });

  const stripeSeccion = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLICK_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLICK_SERVER_URL}/preview?id=${configuration.id}`,
    payment_method_types: ["card", "paypal"],
    shipping_address_collection: { allowed_countries: ["US", "DE", "UA"] },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  });

  return { url: stripeSeccion.url };
};
