import { sendDiscordMsg } from "../discord";
import { checkJandi } from "../jandi";
import { sendSlackMessage } from "../slack";
import {
  getKStartupListInString,
  getWevityListInString,
} from "../slack/public";
import {
  getCAUListInString,
  getCNUListInString,
  getKUListInString,
} from "../slack/univ";

export const runCronJob = async () => {
  // 잔디 체크 로직을 매일 밤 11시 59분마다 실행
  try {
    const data = await checkJandi();
    const usersWithNoJandi = data
      .reduce((prev, curr) => {
        if (!curr.isJandi) {
          return prev.concat(`${curr.username}, `);
        }
        return prev;
      }, "")
      .slice(0, -2);
    sendDiscordMsg(`잔디 안 심은 사람: ${usersWithNoJandi}`);
  } catch (e: any) {
    console.error(e);
    sendDiscordMsg(
      `에러가 발생했습니다: ${e instanceof Error ? e.message : ""}`
    );
  }

  try {
    // 중대 창업 관련 정보 슬랙에 전송
    const cauResult = await getCAUListInString();
    sendSlackMessage(cauResult);

    // 고대 창업 관련 정보 슬랙에 전송
    const kuResult = await getKUListInString();
    sendSlackMessage(kuResult);

    // 충남대 창업 관련 정보 슬랙에 전송
    const cnuResult = await getCNUListInString();
    sendSlackMessage(cnuResult);

    // wevity 정보 슬랙에 전송
    const wevityResult = await getWevityListInString();
    sendSlackMessage(wevityResult);

    // kstartup 창업 관련 정보 슬랙에 전송
    const kStartupResult = await getKStartupListInString();
    sendSlackMessage(kStartupResult);
  } catch (e: any) {
    console.error(e);
    sendSlackMessage(
      `에러가 발생했습니다: ${e instanceof Error ? e.message : ""}`
    );
  }
};
