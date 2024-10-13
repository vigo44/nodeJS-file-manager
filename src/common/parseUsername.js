export const parseUsername = () => {
  const args = process.argv.slice(2);
  const username =
    process.env.npm_config_username ??
    args
      .find((item) => item.startsWith("--username="))
      ?.split("--username=")
      ?.join("") ??
    "anonymous";
  return username;
};
