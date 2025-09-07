import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
export const checkUser = async () => {
    const user = await currentUser();

    if (!user) {
        return null;
    }

    try {
        const loggedInUser = await db.user.findUnique({
            where: {
                clerkUserId: user.id,
            },
        });

        if (loggedInUser) {
            return loggedInUser;
        }

        // Handle potential null/undefined name values
        const firstName = user.firstName || '';
        const lastName = user.lastName || '';
        const name = `${firstName} ${lastName}`.trim() || 'User';

        // Ensure email exists
        const email = user.emailAddresses?.[0]?.emailAddress;
        if (!email) {
            throw new Error('No email address found for user');
        }

        const newUser = await db.user.create({
            data: {
                clerkUserId: user.id,
                name,
                imageUrl: user.imageUrl,
                email,
            },
        });

        return newUser;
    } catch (error) {
        // Log the full error object for better debugging
        console.error("Error in checkUser:", error);
        throw error; // Optionally rethrow to propagate the error
    }
};