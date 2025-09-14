import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect, { collectionNames } from "./dbConntect";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await dbConnect(collectionNames.REGISTER).findOne({
          email,
        });
        if (!user) return null;

        const isPasswordOK = await bcrypt.compare(password, user.password);
        if (!isPasswordOK) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user",
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    // Called whenever a user signs in
    async signIn({ user, account }) {
      if (account && account.provider === "google") {
        try {
          const payload = {
            providerAccountId: account.providerAccountId,
            provider: account.provider,
            email: user.email,
            image: user.image,
            name: user.name,
            role: "user",
          };

          const userCollection = await dbConnect(collectionNames.REGISTER);
          const isUserExist = await userCollection.findOne({
            providerAccountId: payload.providerAccountId,
          });

          if (!isUserExist) {
            await userCollection.insertOne(payload);
          }
        } catch (error) {
          console.log("Error saving Google user:", error);
          return false; // prevent login if DB fails
        }
      }

      return true; // allow login
    },

    // JWT callback
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role || "user";
      }
      return token;
    },

    // Session callback
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
};

const handler = (req, res) => NextAuth(req, res, authOptions);
export { handler as GET, handler as POST };
