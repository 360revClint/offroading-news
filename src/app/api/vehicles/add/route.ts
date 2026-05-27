import Anthropic from "@anthropic-ai/sdk";
import { db } from "@/lib/db";

const anthropic = new Anthropic();

export async function POST(request: Request) {
  const body = await request.json();
  const { year, make, model, trim, categorySlug } = body;

  if (!year || !make || !model || !categorySlug) {
    return Response.json(
      { error: "Year, make, model, and category are required." },
      { status: 400 }
    );
  }

  const vehicleName = trim
    ? `${year} ${make} ${model} ${trim}`
    : `${year} ${make} ${model}`;

  const slug = vehicleName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const existing = await db.vehicle.findUnique({ where: { slug } });
  if (existing) {
    return Response.json({ vehicle: existing, source: "existing" });
  }

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 512,
    messages: [
      {
        role: "user",
        content: `You are a vehicle specs database. Return ONLY valid JSON for the ${vehicleName}. No markdown, no explanation.

{
  "groundClearance": <inches as number or null if unknown>,
  "tireSize": "<stock tire size string or null>",
  "engineDisplacement": "<displacement string or null>",
  "valid": <true if this is a real vehicle that exists, false if not>
}`,
      },
    ],
  });

  const text =
    message.content[0].type === "text" ? message.content[0].text : "";

  let specs: {
    groundClearance: number | null;
    tireSize: string | null;
    engineDisplacement: string | null;
    valid: boolean;
  };

  try {
    specs = JSON.parse(text);
  } catch {
    return Response.json(
      { error: "Failed to parse vehicle specs from AI." },
      { status: 500 }
    );
  }

  if (!specs.valid) {
    return Response.json(
      {
        error: `"${vehicleName}" doesn't appear to be a real vehicle. Check the year, make, and model.`,
      },
      { status: 400 }
    );
  }

  const category = await db.vehicleCategory.findUnique({
    where: { slug: categorySlug },
  });

  if (!category) {
    return Response.json({ error: "Invalid category." }, { status: 400 });
  }

  const vehicle = await db.vehicle.create({
    data: {
      year: parseInt(year, 10),
      make,
      model,
      trim: trim || null,
      slug,
      groundClearance: specs.groundClearance,
      tireSize: specs.tireSize,
      engineDisplacement: specs.engineDisplacement,
      categoryId: category.id,
    },
  });

  return Response.json({ vehicle, source: "created" });
}
