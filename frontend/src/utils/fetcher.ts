export const fetcher = (url: string) =>
  fetch(url, { credentials: "include" })
    .then((res) => res.json())
    .then((result) => {
      if (!result.ok) throw new Error("Server error");
      return result.result;
    });
