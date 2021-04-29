const extractFilters = (httpQuery, allowedFilters) => {
  let filters = {};

  allowedFilters.forEach((filter) => {
    if (typeof filter === "string") {
      if (httpQuery[filter] !== undefined) filters[filter] = httpQuery[filter];
    } else if (typeof filter === "object") {
      const { name, key, convert } = filter;
      if (httpQuery[name] !== undefined) {
        if (convert) filters[key] = convert(httpQuery[name]);
        else filters[key] = httpQuery[name];
      }
    }
  });

  return filters;
};

module.exports = extractFilters;
