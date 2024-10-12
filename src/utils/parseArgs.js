export function parseTwoArg(argsDirty) {
  const args = argsDirty.trim();
  if (args.split(" ").length === 1) {
    throw new Error("twoArgs");
  }
  if (args.split(" ").length === 2 && !args.includes('"')) {
    return args.split(" ");
  }
  const regexpArg1 = /(?<=^")\S.+?(?=" )/g;
  const regexpArg2 = /(?<= ")\S.+?(?=")/g;
  const args1 = args.match(regexpArg1) ?? [];
  const args2 = args.match(regexpArg2) ?? [];

  if (args1.length === 1 && args2.length === 1) {
    return [args1[0].trim(), args2[0].trim()];
  }
  if (args1.length === 1 && args2.length === 0) {
    const arg2 = args.split('" ')[1];
    return [args1[0].trim(), arg2.trim()];
  }
  if (args1.length === 0 && args2.length === 1) {
    const arg1 = args.split(' "')[0];
    return [arg1.trim(), args2[0].trim()];
  }
  throw new Error("needQuotation");
}

export function checkRequiredArg(path) {
  if (!path || path.trim().length === 0) {
    throw new Error("oneArg");
  }
}
