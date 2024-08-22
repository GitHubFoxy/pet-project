import { db } from "@/drizzle/schema";
import { users } from "@/drizzle/schema"; // Import your schema
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const allUsers = await db.select().from(users);
    return NextResponse.json(allUsers);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const newUser = await db.insert(users).values(body);
    return NextResponse.json(newUser);
}
