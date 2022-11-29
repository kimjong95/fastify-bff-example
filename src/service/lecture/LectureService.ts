import {
  BFFCard,
  BFFPrerequisiteCard,
  BlendedChapter,
  BlendedChapterContent,
  LearningContent,
} from "@sku/data";
import { findCubesByIds_bff } from "../../api/cube/cube/CubeApi";
import {
  findBlendedChapter,
  findCardById_bff,
} from "../../api/lecture/card/CardApi";
import { findMyCardRelatedStudents_bff } from "../../api/lecture/student/StudentApi";
import {
  getPassedBlendedChapterCount,
  getPassedCubeCount,
  getPrerequisiteCards,
} from "./lecture.util";

export async function getLearningContentsByCardId(
  headers: Record<string, string>,
  cardId: string
) {
  // data fetching
  const [cardResponse, studentResponse] = await Promise.all([
    findCardById_bff(headers, cardId),
    findMyCardRelatedStudents_bff(headers, cardId),
  ]);
  const { learningContents } = cardResponse.cardContents;

  const blendedChapters = await getBlendedChapters(
    headers,
    learningContents
      .filter(
        (learningContents) =>
          learningContents.learningContentType === "BlendedChapter"
      )
      .map((learningContent) => learningContent.contentId)
  );
  const cubeIds = await getCubeIdsInLearningContents(
    learningContents,
    blendedChapters.map((chapter) => chapter.blendedChapterContents).flat()
  );

  const cubesResponse = await findCubesByIds_bff(headers, cubeIds);

  /////// logic
  // 학습완료 갯수 체크
  const passedCubeCount = getPassedCubeCount(
    learningContents.filter(
      (content) => content.learningContentType === "Cube"
    ),
    studentResponse.cubeStudents
  );
  const passedBlendedChapterCount = getPassedBlendedChapterCount(
    blendedChapters,
    studentResponse.cubeStudents
  );
  console.log("##surveyStudents", studentResponse.studentSurveys);
  // 선수과정 체크
  const prerequisiteCards: BFFPrerequisiteCard[] =
    (cardResponse.cardContents.prerequisiteCards.length > 0 &&
      getPrerequisiteCards(
        cardResponse.cardContents.prerequisiteCards,
        studentResponse.prerequisiteCardStudents
      )) ||
    [];
  ///////

  return {
    cardId: cardResponse.card.id,
    cardName: cardResponse.card.name,
    totalLearningCount: cardResponse.cardContents.learningContents.length,

    prerequisiteCards,
  } as BFFCard;
}

async function getCubeIdsInLearningContents(
  learningContents: LearningContent[],
  blendedChapterContents?: BlendedChapterContent[]
): Promise<string[]> {
  //
  // Cube타입인 LearningContents에서 id 가져옴
  const cubeIds = learningContents
    .filter(
      (learningContents) => learningContents.learningContentType === "Cube"
    )
    .map((learningContent) => learningContent.contentId);

  // BlendedChapter 안의 컨텐츠에서 id가져옴

  if (blendedChapterContents) {
    const cubeIdsInBlendedChapter = blendedChapterContents.map(
      (content) => content.contentId
    );

    cubeIds.push(...cubeIdsInBlendedChapter);
  }

  return cubeIds;
}

export async function getBlendedChapters(
  headers: Record<string, string>,
  blendedChapterIds?: string[]
): Promise<BlendedChapter[]> {
  const blendedChapterResponse: BlendedChapter[] = [];
  if (blendedChapterIds && blendedChapterIds.length > 0) {
    const promiseCalls = blendedChapterIds.map((id) => {
      return findBlendedChapter(headers, id);
    });
    const blendedChapters = await Promise.all(promiseCalls);
    blendedChapterResponse.push(...blendedChapters);
  }

  return blendedChapterResponse;
}
