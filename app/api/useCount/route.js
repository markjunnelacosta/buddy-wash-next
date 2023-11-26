import { connectToDB } from "@/utils/database";
import Machine from "@/models/machines";

export async function PATCH(request) {
    const id = request.nextUrl.searchParams.get("id");
    try {
      await connectToDB();
  
      await Machine.findByIdAndUpdate(id, { $inc: { useCount: 1 } });
  
      console.log(id);
      return NextResponse.json(
        { message: "useCount incremented successfully" },
        { status: 201 }
      );
    } catch (error) {
      return new Response(error, { status: 500 });
    }
  }
  