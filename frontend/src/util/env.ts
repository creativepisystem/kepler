export default function env(variable: string): string {
  const envVar = process.env[`REACT_APP_${variable.toUpperCase()}`];
  if (envVar !== undefined) {
    return envVar;
  }
  throw new Error(`variable ${variable.toUpperCase()} does not exist`);
}
