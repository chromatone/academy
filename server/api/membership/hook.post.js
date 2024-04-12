import Stripe from "stripe";
import {
  createDirectus,
  rest,
  staticToken,
  readItems,
  readUser,
  readItem,
  createItem,
  updateItem,
  updateUser
} from "@directus/sdk";

let db;

// API version 2023-10-16

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  if (!db) {
    db = createDirectus(config.public.dbUrl)
      .with(rest())
      .with(staticToken(config.dbManagerKey));
  }

  const stripe = new Stripe(config.stripeSecretKey);

  const stripeEvent = await readRawBody(event);

  let msg;

  try {
    msg = stripe.webhooks.constructEvent(
      stripeEvent,
      getHeader(event, "stripe-signature"),
      config.stripeWebhookSecret
    );
  } catch (err) {
    console.log("signature not verified", err);
    return "Event signature not verified";
  }

  console.log(msg.type);

  if (msg.type == "customer.subscription.updated") {
    const sub = msg.data.object;

    console.log("sub", sub.id);

    const subs = await db.request(
      readItems("subscriptions", {
        filter: {
          stripe_subscription_id: {
            _eq: sub.id,
          },
        },
        fields: ["id", "status"],
      })
    );

    const subscription = await db.request(
      updateItem("subscriptions", subs?.[0]?.id, {
        status: sub.canceled_at ? "canceled" : "active",
        start_date: new Date(sub.start_date * 1000).toISOString(),
        ended_at: new Date(sub.ended_at * 1000).toISOString(),
        cancel_at: sub.cancel_at
          ? new Date(sub.cancel_at * 1000).toISOString()
          : null,
        canceled_at: sub.cancel_at
          ? new Date(sub.canceled_at * 1000).toISOString()
          : null,
        cancel_at_period_end: sub.cancel_at_period_end,
        cancellation_comment: sub.cancellation_details.comment,
        cancellation_feedback: sub.cancellation_details.feedback,
      })
    );

    // const member = await db.request(
    // 	updateItem("members", subscription.member, {
    // 		active: !!subs.find((s) => s.status == "active"),
    // 	})
    // );
    // console.log(member)
  }

  if (msg.type == "checkout.session.completed") {
    const ev = msg.data.object;

    const mem = await db.request(
      updateItem("members", ev.metadata?.member, {
        active: true,
        stripe_customer_id: ev.customer,
        role: 'student'
      })
    )

    const role = await db.request(readItem('roles', mem.role))

    const usr = await db.request(updateUser(mem.user, {
      role: role.user_role
    }))


    const stripe_sub = await stripe.subscriptions.retrieve(ev.subscription);

    try {
      const sub = await db.request(
        updateItem("subscriptions", ev.metadata?.subscription, {
          status: "active",
          stripe_subscription_id: ev.subscription,
          current_period_start: new Date(
            stripe_sub.current_period_start * 1000
          ).toISOString(),
          current_period_end: new Date(
            stripe_sub.current_period_end * 1000
          ).toISOString(),
          start_date: new Date(stripe_sub.start_date * 1000).toISOString(),
          amount_total: new Number(stripe_sub.plan.amount) / 100,
          currency: stripe_sub.currency,
        })
      );
    } catch (e) {
      console.log(e);
    }
  }

  return msg.type + " is ok";
});
