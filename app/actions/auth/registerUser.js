"use server";

import dbConnect, { collectionNames } from "@/app/lib/dbConntect";
import bcrypt from "bcryptjs";

const registerUser = async (payload) => {
  // Hash password before saving
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const userToInsert = {
    ...payload,
    password: hashedPassword,
    createdAt: new Date(),
    role: "user",
  };

  const result = await dbConnect(collectionNames.REGISTER).insertOne(userToInsert);

  // Convert ObjectId to string for Client Components
  return {
    success: true,
    insertedId: result.insertedId.toString(),
  };
};

export default registerUser;
