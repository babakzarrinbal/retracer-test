module.exports= {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ticket sorting Api",
      version: "0.1.0",
      description:
        "This is a sample api end point for sorting ticket based on source and destination",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Babak Zarrinbal",
        email: "babak.zarrinbal@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api/categories",
      },
    ],
  },
  apis: ["./routes/categories.js"],
};