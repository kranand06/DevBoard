export const fetchCodeforcesData = async (username) => {
  try {
    if (!username) {
      return { error: "Username is required" };
    }
    const url = `https://codeforces.com/api/user.info?handles=${username}`;
    const ratingurl = `https://codeforces.com/api/user.rating?handle=${username}`;
    const response = await fetch(url);
    const response2 = await fetch(ratingurl);
    const data = await response.json();
    const ratingData = await response2.json();
    // console.log("Codeforces data fetched:", data);
    console.log("Codeforces data fetched:", ratingData);

    if (data.status === "OK" && ratingData.status === "OK") {
      return { ...data.result[0], ratingData: ratingData.result };
    } else if (data.status === "OK") {
      return data.result[0];
    } else {
      return { error: "Error fetching Codeforces data", data: data };
    }
  } catch (error) {
    return { error: "Error fetching Codeforces data" };
  }
};
