import { authOptions } from "@/app/lib/authOptions";
import dbConnect, { collectionNames } from "@/app/lib/dbConntect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";


export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const { id } = params;
    const applicationCollection = await dbConnect(collectionNames.APPLICATIONS);
    const app = await applicationCollection.findOne({ _id: new ObjectId(id) });

    if (!app) {
      return new Response(JSON.stringify({ message: "Application not found" }), { status: 404 });
    }

    if (app.email !== session.user.email) {
      return new Response(JSON.stringify({ message: "Forbidden" }), { status: 403 });
    }

    const result = await applicationCollection.deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ success: result.deletedCount === 1, message: "Application deleted" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
