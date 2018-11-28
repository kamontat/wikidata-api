const exec = require("child_process").exec;
const pjson = require("../package.json");

if (!pjson) throw new Error("package.json not found, try again");

const name = pjson.name;
const version = pjson.version;

console.log(`Start deploy: ${name} on version ${version}`);
process.stdout.write(`Creating tag... `);

exec(`git tag ${version}`, function(e, stdout) {
  if (e) throw e;

  console.log("DONE");
});
