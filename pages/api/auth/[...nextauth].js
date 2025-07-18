import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../lip/db";
import { verifyPassword } from "../../../lip/auth";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const userCollection = client.db().collection("users");
        const user = await userCollection.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found with the email");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Could not log you in!");
        }
        return {
          email: user.email,
          id: user._id.toString(),
        };

        client.close();
      },
    }),
  ],
});
