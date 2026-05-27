import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

export async function POST(request: Request) {
  const { year, make, model, trim, groundClearance, tireSize, engineDisplacement } =
    await request.json();

  if (!year || !make || !model) {
    return Response.json({ error: "Vehicle info required." }, { status: 400 });
  }

  const vehicleName = trim
    ? `${year} ${make} ${model} ${trim}`
    : `${year} ${make} ${model}`;

  const specs = [
    groundClearance && `${groundClearance}" ground clearance`,
    tireSize && `${tireSize} tires`,
    engineDisplacement && `${engineDisplacement} engine`,
  ]
    .filter(Boolean)
    .join(", ");

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6-20250514",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: `You are an off-road vehicle expert. Generate content for a ${vehicleName}${specs ? ` (${specs})` : ""}. Return ONLY valid JSON, no markdown.

{
  "wrench": {
    "title": "Fix & maintain your ${vehicleName}",
    "items": [
      {
        "title": "<specific common issue or maintenance task>",
        "summary": "<2-3 sentences: what the problem is, symptoms, and the fix approach>",
        "difficulty": "<easy|moderate|hard>",
        "estimatedCost": "<dollar range like $50-150>",
        "estimatedTime": "<time like 1-2 hours>"
      }
    ]
  },
  "build": {
    "title": "Build paths for the ${vehicleName}",
    "stages": [
      {
        "stage": 1,
        "name": "<stage name like Daily driver+>",
        "description": "<1-2 sentences on what this stage achieves>",
        "mods": [
          {
            "name": "<specific mod>",
            "description": "<1 sentence why>",
            "estimatedCost": "<dollar range>"
          }
        ]
      }
    ]
  },
  "trails": {
    "title": "Trails for the ${vehicleName}",
    "recommendations": [
      {
        "name": "<real trail name>",
        "location": "<state or region>",
        "difficulty": "<easy|moderate|hard|expert>",
        "description": "<2-3 sentences: what makes it good for this vehicle, what to expect>",
        "minClearance": <inches needed as number>,
        "minTireSize": "<minimum tire size>"
      }
    ]
  },
  "dispatch": {
    "title": "${vehicleName} news & culture",
    "items": [
      {
        "title": "<relevant news headline>",
        "summary": "<2-3 sentences about this news item>",
        "category": "<product launch|regulation|recall|race coverage|land access>"
      }
    ]
  }
}

Rules:
- Generate exactly 4 items for wrench, 3 stages for build (each with 3-4 mods), 4 trail recommendations, and 3 dispatch items
- Use real trail names, real part brands, real specs — no made-up products
- Be specific to this exact vehicle — not generic off-road advice
- Honest difficulty and cost assessments
- 8th-9th grade reading level`,
      },
    ],
  });

  const text =
    message.content[0].type === "text" ? message.content[0].text : "";

  try {
    const content = JSON.parse(text);
    return Response.json({ vehicle: vehicleName, content });
  } catch {
    return Response.json(
      { error: "Failed to generate content.", raw: text },
      { status: 500 }
    );
  }
}
