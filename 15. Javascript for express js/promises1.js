const recordVideoOne = new Promise((resolve, reject) => {
  resolve("video 1 Recorded");
});

const recordVideoTwo = new Promise((resolve, reject) => {
  resolve("video 2 Recorded");
});

const recordVideoThree = new Promise((resolve, reject) => {
  resolve("video 3 Recorded");
});

Promise.all([recordVideoOne, recordVideoTwo, recordVideoThree]).then(
  (message) => {
    console.log(message);
  }
);

//<script src="promises1.js"></script>
