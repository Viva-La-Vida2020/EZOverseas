export async function requestToFetchRankingData() {
  return await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/ranking`, {
    headers: {
      Authorization: localStorage.getItem("jwt") || "",
    },
  }).then((res) => {
    return res.json();
  });
}

export async function requestToFetchProgramRankingDataByNameForRanking(payload: {
  name: string;
}) {
  return await fetch(
    `${
      process.env.NEXT_PUBLIC_API_SERVER_URL
    }/ranking/program_ranking?nameforranking=${encodeURIComponent(
      payload.name,
    )}`,
  ).then((res) => {
    return res.json();
  });
}

export async function requestToFetchProgramRankingDataBySchoolName(payload: {
  name: string;
}) {
  return await fetch(
    `${
      process.env.NEXT_PUBLIC_API_SERVER_URL
    }/ranking/program_ranking/${encodeURIComponent(payload.name)}`,
  ).then((res) => {
    return res.json();
  });
}
