import { InquiryForm } from "../features/consult/consult";
import convertToStandardResponse from "../helper/methods/convertToStandardResponse";

export async function requestToFetchConsultingData() {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/consulting`,
  ).then((res) => {
    return convertToStandardResponse(res);
  });
}

export async function requestToSendInquiry(data: InquiryForm) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/consulting/inquiry`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt") || "",
      },
      body: JSON.stringify(data),
    },
  ).then((res) => {
    return res.json();
  });
}
