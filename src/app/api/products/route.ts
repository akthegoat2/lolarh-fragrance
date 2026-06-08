import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

function getDB() {
  if (!supabaseAdmin) return null;
  return supabaseAdmin.from("products");
}

export const dynamic = "force-dynamic";

export async function GET() {
  const db = getDB();
  if (!db) return NextResponse.json([]);
  const { data, error } = await db.select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const db = getDB();
  if (!db) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  const body = await request.json();
  const { data, error } = await db.insert([body]).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const db = getDB();
  if (!db) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  const body = await request.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });
  const { data, error } = await db.update(updates).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const db = getDB();
  if (!db) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });
  const { error } = await db.delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
