import { siteMove } from "../../lib/connectFourAi";

self.onmessage = ({ data: { board, requestId } }) => {
  const col = siteMove(board);
  self.postMessage({ col, requestId });
};
