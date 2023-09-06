export function parsePassedTimeToString(timeStamp) {
  const passedTime = Date.now() - Date.parse(timeStamp);

  if (passedTime < 1000 * 60) return "방금전";
  if (passedTime < 1000 * 60 * 60)
    return Math.round(passedTime / (1000 * 60)).toString() + "분전";
  if (passedTime < 1000 * 60 * 60 * 24)
    return Math.round(passedTime / (1000 * 60 * 60)).toString() + "시간전";
  if (passedTime < 1000 * 60 * 60 * 24 * 7)
    return Math.round(passedTime / (1000 * 60 * 60 * 24)).toString() + "일전";
  if (passedTime < 1000 * 60 * 60 * 24 * 7 * 30)
    return (
      Math.round(passedTime / (1000 * 60 * 60 * 24 * 7)).toString() + "주전"
    );
  else return "오래 전";
}
