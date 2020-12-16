// get("/myendpoint", {
//     query: {foo: "bar", a: 1},
//     headers: {"content-type": "application/json"},
//     authentication: {username: "user", password: "pass"}
//   },
//   function(state) {
//     return state;
//   }
// )

alterState((state) => {
  console.log("state.configuration");
  return state;
});
