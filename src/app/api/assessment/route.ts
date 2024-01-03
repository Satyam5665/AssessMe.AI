import {
  createAssessmentSchema,
  updateAssessmentSchema,
  deleteAssessmentSchema,
} from "@/lib/validation/assessment";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db";
import { getEmbedding } from "@/lib/openai";
import { assessIndex } from "@/lib/pinecone";

export async function POST(req: Request) {
  try {
    const body = await req.json(); //data sent here.
    const result = createAssessmentSchema.safeParse(body);
    if (!result.success) {
      console.error(result.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }
    const {
      name,
      careerProfile,
      employmentTile,
      companyDetails,
      profileRequirements,
      questions,
    } = result.data;

    const { userId } = auth();
    if (!userId)
      return Response.json({ error: "Unauthorized" }, { status: 401 });

    const embedding = await getEmbeddingForAssessment(
      name,
      careerProfile,
      employmentTile,
      companyDetails,
      profileRequirements,
      questions
    );

    const assess = await prisma.$transaction(async (tx) => {
      const assess = await tx.profileInfo.create({
        data: {
          name,
          careerProfile,
          employmentTile,
          companyDetails,
          profileRequirements,
          questions,
          userId,
        },
      });

      await assessIndex.upsert([
        {
          id: assess.id,
          values: embedding,
          metadata: { userId },
        },
      ]);

      return assess;
    });

    return Response.json({ assess }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const parseResult = updateAssessmentSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const {
      id,
      name,
      careerProfile,
      employmentTile,
      companyDetails,
      profileRequirements,
      questions,
    } = parseResult.data;

    const assessment = await prisma.profileInfo.findUnique({ where: { id } });

    if (!assessment) {
      return Response.json({ error: "Assessment not found" }, { status: 404 });
    }

    const { userId } = auth();

    if (!userId || userId !== assessment.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const embedding = await getEmbeddingForAssessment(
      name,
      careerProfile,
      employmentTile,
      companyDetails,
      profileRequirements,
      questions
    );

    const updatedAssessment = await prisma.$transaction(async (tx) => {
      const updatedAssessment = await tx.profileInfo.update({
        where: { id },
        data: {
          name,
          careerProfile,
          employmentTile,
          companyDetails,
          profileRequirements,
          questions,
          userId,
        },
      });

      await assessIndex.upsert([
        {
          id,
          values: embedding,
          metadata: { userId },
        },
      ]);

      return updatedAssessment;
    });

    return Response.json({ updatedAssessment }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const parseResult = deleteAssessmentSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { id } = parseResult.data;

    const assessment = await prisma.profileInfo.findUnique({ where: { id } });

    if (!assessment) {
      return Response.json({ error: "Event not found" }, { status: 404 });
    }

    const { userId } = auth();

    if (!userId || userId !== assessment.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.profileInfo.delete({ where: { id } });
      await assessIndex.deleteOne(id);
    });

    return Response.json({ message: "Event deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function getEmbeddingForAssessment(
  name: string,
  careerProfile: string,
  employmentTile: string,
  companyDetails: string,
  profileRequirements: string,
  questions: string[]
) {
  return getEmbedding(
    name +
      "\n\n" +
      careerProfile +
      "\n\n" +
      employmentTile +
      "\n\n" +
      companyDetails +
      "\n\n" +
      profileRequirements +
      "\n\n" +
      questions
  );
}
