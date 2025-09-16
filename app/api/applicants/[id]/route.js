import dbConnect, { collectionNames } from "@/app/lib/dbConntect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params; // ✅ matches folder name
    const collection = await dbConnect(collectionNames.APPLICATIONS);

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });
    }

    const applicant = await collection.findOne({ _id: new ObjectId(id) });

    if (!applicant) {
      return NextResponse.json({ success: false, message: "Applicant not found" }, { status: 404 });
    }

    return NextResponse.json(applicant);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const collection = await dbConnect(collectionNames.APPLICATIONS);

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });
    }

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({
      success: result.deletedCount === 1,
      message: result.deletedCount === 1 ? "Deleted successfully" : "Not found",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
