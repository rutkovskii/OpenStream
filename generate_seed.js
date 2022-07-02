const TonWeb = require("tonweb");
function seed() {
    const seedBase64 = Buffer.from(TonWeb.utils.newSeed()).toString('base64');
    return (seedBase64)
}
console.log(seed());