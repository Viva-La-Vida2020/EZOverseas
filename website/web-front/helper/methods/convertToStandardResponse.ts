import { StandardResponse } from "../../sagas/effect";

export default function convertToStandardResponse(response: any) {
  let standardResponse: StandardResponse = {
    success: false,
    message: "",
    code: 0,
    data: null,
  };

  if (!response) {
    return {
      success: false,
      message: "Connection failure - No response",
      code: "500",
      data: null,
    };
  }
  const statusCategory: string = response.status
    ? response.status.toString()
    : "";
  console.debug(response, response.status, statusCategory);
  switch (statusCategory) {
    case "401":
      standardResponse.message = "需要登录账号，请点击右上角登录。";
      standardResponse.code = response.status;
      standardResponse.data = null;
      break;
    case "500":
      standardResponse.message = "该请求无法被处理。";
      standardResponse.code = response.status;
      standardResponse.data = null;
    default:
      standardResponse = response.json();
      break;
  }
  console.debug(standardResponse);
  return standardResponse;
}
