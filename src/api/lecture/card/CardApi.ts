import { BlendedChapter, CardWithContentsAndRelatedCountRdo } from "@sku/data";
import axios from "axios";

export function findCardById_bff(
  headers: Record<string, string>,
  cardId: string
): Promise<CardWithContentsAndRelatedCountRdo> {
  //
  return (
    axios
      // .get(`http://lecture:8080/cards/${cardId}`, {
      .get(`https://stg.mysuni.sk.com/api/lecture/cards/${cardId}`, {
        headers,
      })
      .then((res) => res && res.data)
      .catch((err) => console.log("##findCardById\n", err))
  );
}

export function findBlendedChapter(
  headers: Record<string, string>,
  blendedChapterId: string
): Promise<BlendedChapter> {
  return (
    axios
      // .get(`http://lecture:8080/cards/${cardId}`, {
      .get(
        `https://stg.mysuni.sk.com/api/lecture/cards/blendedChapter/${blendedChapterId}`,
        {
          headers,
        }
      )
      .then((res) => res && res.data)
      .catch((err) => console.log("##findBlendedChapter\n", err))
  );
}
