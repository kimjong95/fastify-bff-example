import { IncomingHttpHeaders } from "http2";

export function parseHeader(headers: IncomingHttpHeaders) {
  //
  return {
    cineroomids: (headers.cineroomids as string) || "",
    audienceid: (headers.audienceid as string) || "",
    Authorization: (headers.authorization as string) || "",
  };
}
