export async function requestToFetchHomeSliders() {
  return await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/home/sliders`, {
    // headers: {
    //  'Access-Control-Allow-Origin': '*'
    // },
  }).then((res) => {
    console.debug(res);
    return res.json();
  });
}
