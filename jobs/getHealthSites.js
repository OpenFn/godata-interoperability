get(
  `${state.configuration.baseUrl}/api/v2/facilities/`,
  {
    query: {
      "api-key": state.configuration["api-key"],
      country: "Senegal",
      page: 1,
    },
    headers: { "content-type": "application/json" },
  },
  function (state) {
    return state;
  }
);

post(
  state.configuration.inboxUrl,
  {
    body: (state) => state.data,
    headers: { "content-type": "application/json" },
  },
  function (state) {
    return state;
  }
);
