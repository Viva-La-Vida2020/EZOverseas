export async function requestToFetchProgramsForHeader() {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/programs/nav`,
  ).then((res) => {
    console.debug(res);
    return res.json();
  });
}
