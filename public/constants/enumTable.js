export const riskEnumTable = {
  불편해요: "LOW",
  "조심!": "MEDIUM",
  위험해요: "HIGH",

  LOW: "불편해요",
  MEDIUM: "조심!",
  HIGH: "위험해요",
};

export const categoryEnumTable = {
  점자: "BRAILLE",
  "점자 보도블럭": "BRAILLE_SIDEWALK_BLOCK",
  유의구간: "CAUTION_SECTION",
  "시설물 오류": "FACILITY_ERROR",

  BRAILLE: "점자",
  BRAILLE_SIDEWALK_BLOCK: "점자 보도블럭",
  CAUTION_SECTION: "유의구간",
  FACILITY_ERROR: "시설물 오류",
};

export const specificTable = {
  점자: ["잘못된 정보", "내용 부실", "글자 또는 문법오류", "훼손"],
  "점자 보도블럭": ["잘못된 정보", "훼손"],
  유의구간: ["위험내용"],
  "시설물 오류": ["작동오류", "부정확한 정보"],
};
