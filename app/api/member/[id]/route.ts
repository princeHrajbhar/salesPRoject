import {  connectToDatabase  } from "@/lib/mongodb";
import MemberModel from "@/models/MemberSchema";
import { NextRequest, NextResponse } from "next/server";
import { UploadImage, DeleteImage } from "@/lib/upload-image";
import { isValidObjectId } from "mongoose";


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  // Await params to resolve the value correctly
  const { id } = await params;  // Await the params before accessing

  // Validate if the provided ID is a valid ObjectId
  if (!isValidObjectId(id)) {
    return NextResponse.json({ message: "Invalid Member ID" }, { status: 400 });
  }

  try {
    // Connect to MongoDB (Mongoose connection)
    await  connectToDatabase ();

    // Use MemberModel to find the member by ID
    const member = await MemberModel.findById(id);

    if (!member) {
      return NextResponse.json({ message: "Member not found" }, { status: 404 });
    }

    return NextResponse.json(member);  // Return the member data as JSON
  } catch (error) {
    console.error("Error fetching member:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// PUT function (for updating existing members)
export const PUT = async (req: NextRequest, context: { params: { id: string } }) => {
  try {
    // Await the params before using them
    const { id } = await context.params;  // Await params here

    // Connect to MongoDB
    await  connectToDatabase ();

    // Parse request data
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const description = formData.get("description") as string;
    const phone = formData.get("phone") as string;
    const position = formData.get("position") as string;
    const portfolio_url = formData.get("portfolio_url") as string;
    const git_url = formData.get("git_url") as string;
    const linkdin_url = formData.get("linkdin_url") as string;
    const image = formData.get("image") as File | null;

    // Validate input
    if (!name || !email || !phone || !portfolio_url || !git_url || !linkdin_url) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
    }

    // Find the existing member by ID
    const existingMember = await MemberModel.findById(id);
    if (!existingMember) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    // If there's a new image, upload it to Cloudinary and delete the old one
    let imageUrl = existingMember.image_url;
    let publicId = existingMember.public_id;

    if (image) {
      // Validate Image Size
      if (image.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "Image size must be less than 5MB" }, { status: 400 });
      }

      // Upload new image to Cloudinary
      let uploadResponse;
      try {
        uploadResponse = await UploadImage(image, "ecell-members");
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
      }

      // If there's an old image, delete it from Cloudinary
      if (publicId) {
        try {
          const cloudinaryResult = await DeleteImage(publicId);
          if (cloudinaryResult.result !== "ok") {
            return NextResponse.json({ error: "Failed to delete image from Cloudinary." }, { status: 500 });
          }
        } catch (deleteError) {
          console.error("Error deleting old image:", deleteError);
          return NextResponse.json({ error: "Error deleting old image" }, { status: 500 });
        }
      }

      // Update image details
      imageUrl = uploadResponse.secure_url;
      publicId = uploadResponse.public_id;
    }

    // Update member details in the database
    const updatedMember = await MemberModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        description,
        phone,
        position,
        portfolio_url,
        git_url,
        linkdin_url,
        image_url: imageUrl,
        public_id: publicId,
      },
      { new: true } // Return the updated member
    );

    if (!updatedMember) {
      return NextResponse.json({ error: "Failed to update member" }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Member updated successfully", data: updatedMember },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PUT /api/member/[id]:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
};



export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    // Awaiting params to avoid the sync-dynamic-apis issue
    const { id } = await context.params; // Await the params

    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid Member ID." }, { status: 400 });
    }

    await  connectToDatabase ();

    const member = await MemberModel.findById(id);
    if (!member) {
      return NextResponse.json({ error: "Member not found." }, { status: 404 });
    }

    if (member.public_id) {
      try {
        const cloudinaryResult = await DeleteImage(member.public_id);
        if (cloudinaryResult.result !== "ok") {
          return NextResponse.json({ error: "Failed to delete image from Cloudinary." }, { status: 500 });
        }
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
        return NextResponse.json({ error: "Error deleting image from Cloudinary." }, { status: 500 });
      }
    }

    await MemberModel.findByIdAndDelete(id);

    return NextResponse.json({ message: "Member deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error in DELETE /api/member/[id]:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

