export function getPrerequisiteCards(
  prerequisiteCards: PrerequisiteCard[],
  prerequisiteStudents?: Student[]
): BFFPrerequisiteCard[] {
  //
  return prerequisiteCards.map((card) => {
    //
    const learningState =
      prerequisiteStudents &&
      prerequisiteStudents.find(
        (student) => student.lectureId === card.prerequisiteCardId
      )?.learningState;
    return {
      cardId: card.prerequisiteCardId,
      required: card.required,
      completed: learningState === "Passed",
    };
  });
}

export function getPassedCubeCount(
  learningCubes: LearningContent[],
  cubeStudents: Student[] = []
): number {
  //
  const cubeIds = learningCubes.map((learningCube) => learningCube.contentId);

  return cubeStudents
    .filter((student) => cubeIds.includes(student.lectureId))
    .filter((student) => student.learningState === "Passed").length;
}

export function getPassedBlendedChapterCount(
  blendedChapter: BlendedChapter[],
  cubeStudents: Student[] = []
): number {
  //
  const passedBlendedChapter = blendedChapter.filter((blendedChapter) => {
    return blendedChapter.blendedChapterContents.every((content) => {
      const targetStudent = cubeStudents.find(
        (student) => student.lectureId === content.contentId
      );
      return targetStudent && targetStudent.learningState === "Passed";
    });
  });
  return passedBlendedChapter.length;
}
