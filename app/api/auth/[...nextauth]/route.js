import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectDB } from "@/Db/ConnectDb";
import User from "@/model/User.model";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                id: { label: "User ID", type: "text", placeholder: "ashish123" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                if (!credentials) {
                    console.log("No credentials provided");
                    return null;
                }

                const { id, password } = credentials;

                console.log("Login attempt - ID:", id);

                try {
                    // Connect to database
                    await connectDB();

                    // Find user by ID
                    const user = await User.findOne({ id, isActive: true });

                    if (!user) {
                        console.log("User not found:", id);
                        return null;
                    }

                    // Compare password with hashed password in database
                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (!passwordMatch) {
                        console.log("Invalid password for user:", id);
                        return null;
                    }

                    console.log("Authorization successful for user:", id);
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    };
                } catch (error) {
                    console.error("Authorization error:", error);
                    return null;
                }
            }
        })
    ],

    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.role = token.role;
            }
            return session;
        },
    },

    pages: {
        signIn: "/Login",
    },

    secret: process.env.NEXTAUTH_SECRET || "test-secret-key-change-in-production",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export { authOptions };
