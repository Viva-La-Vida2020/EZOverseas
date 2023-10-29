export async function requestToFetchAllPrograms() {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/programs/all`,
    {},
  ).then((res) => {
    console.debug(res);
    return res.json();
  });
}

export async function requestToFetchProgramByTitle(title: string) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/programs/${title}`,
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

export async function requestToSubmitProgramBooking(formData: any) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/program_bookmarks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt") || "",
      },
      body: JSON.stringify(formData),
    },
  ).then((res) => {
    console.log(res);
    return res.json();
  });
}

export async function requestToDeleteProgramBooking(formData: any) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/program_bookmarks/${formData.programId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt") || "",
      },
    },
  ).then((res) => {
    console.log(res);
    return res.json();
  });
}
