function makeRequest(location) {
  return new Promise((resolve, reject) => {
    console.log(`making request tp ${location}`);
    if (location === "Google") {
      resolve(`google say hi`);
    } else {
      reject("we can only talk to google");
    }
  });
}

function processRequest(response) {
  return new Promise((resolve, reject) => {
    console.log("Processing response");
    resolve(`Extra Information + ${response}`);
  });
}
