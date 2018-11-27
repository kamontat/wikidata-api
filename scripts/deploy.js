const pjson = "./package.json";

if (!pjson) throw new Error("package.json not found, try again");

console.log(pjson);
