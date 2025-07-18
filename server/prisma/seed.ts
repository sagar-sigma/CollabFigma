import bcrypt from "bcryptjs";
import prisma from "../src/db/prisma";

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      email: "demo@example.com",
      password: hashedPassword,
      name: "Demo User",
      verified: true,
      otp: null,
      otpExpiresAt: null,
    },
  });

  console.log(`✅ Seeded user: ${user.email}`);
}

main()
  .then(() => {
    console.log("🌱 Seed completed.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  });
