import Anthropic from "@anthropic-ai/sdk";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { year, make, model, trim, categorySlug, groundClearance, tireSize, engineDisplacement } = body;

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

    let specs = {
      groundClearance: groundClearance ?? null,
      tireSize: tireSize ?? null,
      engineDisplacement: engineDisplacement ?? null,
    };

    const hasUserSpecs = groundClearance || tireSize || engineDisplacement;

    if (!hasUserSpecs && process.env.ANTHROPIC_API_KEY) {
      try {
        const anthropic = new Anthropic();
        const message = await anthropic.messages.create({
          model: "claude-sonnet-4-5-20241022",
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
        const aiSpecs = JSON.parse(text);

        if (aiSpecs.valid === false) {
          return Response.json(
            {
              error: `"${vehicleName}" doesn't appear to be a real vehicle. Check the year, make, and model.`,
            },
            { status: 400 }
          );
        }

        specs = {
          groundClearance: aiSpecs.groundClearance ?? null,
          tireSize: aiSpecs.tireSize ?? null,
          engineDisplacement: aiSpecs.engineDisplacement ?? null,
        };
      } catch {
        // AI lookup failed — continue with user-provided or null specs
      }
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
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
