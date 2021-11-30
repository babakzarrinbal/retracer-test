const { boarding } = require("../models/boarding");
describe("testing boarding sorting", function () {
  it("sorted test data", (done) => {
    let mockdata = [
      {
        from: "amesterdam",
        to: "barselona",
      },
      {
        from: "dubai",
        to: "berlin",
      },
      {
        from: "barselona",
        to: "dubai",
      },
    ];

    let tickets = new boarding(mockdata);
    tickets.sort();
    if (
      tickets.boardingList.every((b, i, arr) =>
        !i ? true : b.from === arr[i - 1].to
      )
    ) {
      done();
    } else {
      done(new Error("sorting has problems"));
    }
  });
});
