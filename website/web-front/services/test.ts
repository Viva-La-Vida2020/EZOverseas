import { OnEditAnswer } from "../pages/tests/holland-test/hollandTest";

export async function requestToFetchTestingByTitle(title: string) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/test/${title}`,
    {
      headers: {
        Authorization: localStorage.getItem("jwt") || "",
      },
    },
  ).then((res) => {
    console.debug(res);
    return res.json();
  });
}

export async function requestToSubmitHollandTest(formData: any) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/test/holland-test`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt") || "",
      },
      body: JSON.stringify(formData),
    },
  ).then((res) => {
    return res.json();
  });
}

export async function requestToSubmitHollandTestAndSendEmail(formData: any) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/test/holland-test-and-send-email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt") || "",
      },
      body: JSON.stringify(formData),
    },
  ).then((res) => {
    return res.json();
  });
}

export async function requestToFetchHollandTestResult(id: number) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/test/holland-test/result/${id}`,
    {
      headers: {
        Authorization: localStorage.getItem("jwt") || "",
      },
    },
  ).then((res) => {
    return res.json();
  });
}

export async function requestToSubmitDimensionTest(formData: any) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/test/dimension-test`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt") || "",
      },
      body: JSON.stringify(formData),
    },
  ).then((res) => {
    console.debug(res);
    return res.json();
  });
}

export async function requestToSubmitDimensionTestAndSendEmail(formData: any) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/test/dimension-test-and-send-email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt") || "",
      },
      body: JSON.stringify(formData),
    },
  ).then((res) => {
    console.debug(res);
    return res.json();
  });
}

export async function requestToFetchDimensionTestResult(id: number) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/test/dimension-test/result/${id}`,
    {
      headers: {
        Authorization: localStorage.getItem("jwt") || "",
      },
    },
  ).then((res) => {
    return res.json();
  });
}
