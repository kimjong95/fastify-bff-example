import { MyCardRelatedStudentsRdo } from "@sku/data";
import axios from "axios";

export function findMyCardRelatedStudents_bff(
  headers: Record<string, string>,
  cardId: string
): Promise<MyCardRelatedStudentsRdo> {
  return (
    axios
      // .get(`http://lecture:8080/cards/${cardId}`, {
      .get(
        `https://stg.mysuni.sk.com/api/lecture/students/myCardRelatedStudents/${cardId}`,
        {
          headers,
        }
      )
      .then((res) => res && res.data)
      .catch((err) => console.log("##findMyCardRelatedStudents\n", err))
  );
}
