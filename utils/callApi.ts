// export default async function callApi(
//   endpoint: string,
//   method: string = "GET",
//   revalidate: number = 0
// ) {
//   const dataTemp = await fetch(process.env.BASE_URL + endpoint, {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//       hujchu: "asdf",
//     },
//     next: {
//       revalidate,
//     },
//   });
//   const data = await dataTemp.json();
//   return data;
// }
