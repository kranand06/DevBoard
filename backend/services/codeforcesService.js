export const fetchCodeforcesData = async (username) => {
    try {
        if(!username) {
        return { error: "Username is required" };
    }
    const url = `https://codeforces.com/api/user.info?handles=${username}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === "OK") {
        return data.result[0];
    } else {
        return { error: "Error fetching Codeforces data", data: data };
    }
    } catch (error) {
        return { error: "Error fetching Codeforces data" };
    }
}