export const parseUsername = () => {
  const args = process.argv.slice(2);
  const username =
    args
      .find((item) => item.startsWith("--username="))
      ?.split("--username=")
      ?.join("") ?? "anonymous";
  return username;
};
