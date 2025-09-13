import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect, { collectionNames } from "./dbConntect";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await dbConnect(collectionNames.REGISTER).findOne({ email });
        if (!user) return null;

        const isPasswordOK = await bcrypt.compare(password, user.password);
        if (!isPasswordOK) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user", // optional extra field
        };
      },
    }),
  ],

  // 🔥 Callbacks
  callbacks: {
    async jwt({ token, user }) {
      // Runs on sign in and whenever token is checked
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role; // custom field if you need roles
      }
      return token;
    },

    async session({ session, token }) {
      // Control what gets sent to the client
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role; // expose role
      }
      return session;
    },
  },

  // Optional: customize session strategy
  session: {
    strategy: "jwt",
  },

pages: {
  signIn: "/login", // matches /app/login/page.jsx
},

};
