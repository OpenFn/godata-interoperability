/** 
 * Example HealthSite Endpoints
 *     
 * 
    {
      "path": "/api/schema/",
      "description": "Schema list"
    },
    {
      "path": "/api/v2/facilities/",
      "description": "Returns a list of facilities with some filtering parameters."
    },
    {
      "path": "/api/v2/facilities/way/454875140",
      "description": "Returns a facility detail."
    },
    {
      "path": "/api/v2/facilities/by-uuid/08e91a3157734f7dbc4ccceade9294be",
      "description": "Get facility by uuid"
    },
    {
      "path": "/api/v2/facilities/count",
      "description": "Returns count of facilities with some filtering parameters."
    },
    {
      "path": "/api/v2/facilities/statistic",
      "description": "Returns statistic of facilities with some filtering parameters."
    }

 */

alterState((state) => {
  // Replace this endpoint with any of the examples above
  let endpoint = {
    path: "/api/v2/facilities/statistic",
    description:
      "Returns statistic of facilities with some filtering parameters.",
  };

  state["endpoint"] = endpoint;

  return state;
})(state);

get(
  `${state.configuration.hostUrl + state.endpoint.path}`,
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
    body: (state) => {
      let endpoint = state.endpoint;
      let data = { endpoint, ...state.data };
      return data;
    },
    headers: { "content-type": "application/json" },
  },
  function (state) {
    return state;
  }
);
