import axios from "axios";

export function findCubesByIds_bff(
  headers: Record<string, string>,
  cubeIds: string[]
): Promise<Cube[]> {
  //
  return axios
    .get(`http://lecture:8080/cards/${cardId}`, {
      headers,
      params: { ids: cubeIds },
      paramsSerializer,
    })
    .then((res) => res && res.data)
    .catch((err) => console.log("##findCardById\n", err));
}
