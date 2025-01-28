import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { sendEmail } from "@/lib/workflow";
import { serve } from "@upstash/workflow/nextjs"
import { eq } from "drizzle-orm";

type UserState = "non-active" | "active";

type InitialData = {
  email: string,
  fullName: string,
}

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYs_IN_MS = 10 * THREE_DAYS_IN_MS;

const getUserState = async (email: string): Promise<UserState> => {
  // Implement user state logic here
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if(user.length === 0) return "non-active";
  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date();

  const timeDiff = now.getTime() - lastActivityDate.getTime();

  if(timeDiff > THIRTY_DAYs_IN_MS && timeDiff < THREE_DAYS_IN_MS) return "non-active";
  return "active";
}

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;
  
  // Welcome Email
  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      subject: "Welcome to the platform",
      message: `Welcome, ${fullName}!`,
    })
  })

  await context.sleep("wait-for-3-days", THREE_DAYS_IN_MS)

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email)
    })

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          subject : "Are you still here?",
          message : `Hey ${fullName}, we miss you!`
        })
      })
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          subject : "Welcome back!",
          message : `Hey ${fullName}, welcome back!`
        })
      })
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30)
  }
})