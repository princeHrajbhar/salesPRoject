import { connectToDatabase } from "@/lib/mongodb";
import MemberModel from "@/models/MemberSchema";
import { NextRequest, NextResponse } from "next/server";
import { UploadImage } from "@/lib/upload-image";

// Function to generate a new ecell_id
const generateEcellID = async (): Promise<string> => {
  // Fetch the last member in the database
  const lastMember = await MemberModel.findOne().sort({ createdAt: -1 });

  // Check if we have a last member and extract its ecell_id
  const lastID = lastMember?.ecell_id || "ECELL0000";  // Default to ECELL0000 if no member exists

  // Extract the number part after "ECELL" (i.e., the last 4 digits)
  const lastNumberString = lastID.replace("ECELL", "");
  const lastNumber = parseInt(lastNumberString, 10);  // Convert to number

  // If parseInt fails, it will return NaN, so we set the default to 0
  const newNumber = isNaN(lastNumber) ? 0 : lastNumber + 1;

  // Return the new ecell_id, ensuring the number is always 4 digits
  return `ECELL${newNumber.toString().padStart(4, "0")}`;
};

// POST function (for creating new members)
export const POST = async (req: NextRequest) => {
  try {
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
    if (!name || !email || !phone || !portfolio_url || !git_url || !linkdin_url || !image) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
    }

    // Validate Image Size
    if (image.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Image size must be less than 5MB" }, { status: 400 });
    }

    // Upload image to Cloudinary
    let uploadResponse;
    try {
      uploadResponse = await UploadImage(image, "ecell-members");
    } catch (uploadError) {
      console.error("Error uploading image:", uploadError);
      return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
    }

    // Generate ecell_id
    const ecell_id = await generateEcellID();

    // Save the new member to the database
    const newMember = await MemberModel.create({
      name,
      email,
      ecell_id,
      description,
      phone,
      position,
      portfolio_url,
      git_url,
      linkdin_url,
      image_url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    });

    return NextResponse.json(
      { message: "Member created successfully", data: newMember },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/member:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
};


// GET function (optimized with pagination and indexes)
export const GET = async (req: NextRequest) => {
  try {
    // Connect to MongoDB
    await  connectToDatabase ();

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "12", 10);

    // Fetch data with pagination
    const members = await MemberModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(); // `.lean()` for performance improvement (no Mongoose overhead)

    if (members.length === 0) {
      return NextResponse.json({ message: "No members found" }, { status: 404 });
    }

    return NextResponse.json({ data: members }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/member:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
};



