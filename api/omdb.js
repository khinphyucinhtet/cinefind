module.exports = async (req, res) => {
  const apiKey = process.env.OMDB_API_KEY;
  const query = typeof req.query.query === "string" ? req.query.query.trim() : "";

  if (!apiKey) {
    res.status(500).json({
      Response: "False",
      Error: "Missing OMDB_API_KEY server configuration.",
    });
    return;
  }

  if (!query) {
    res.status(400).json({
      Response: "False",
      Error: "Missing movie search query.",
    });
    return;
  }

  try {
    const omdbResponse = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`
    );
    const data = await omdbResponse.json();

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=86400");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      Response: "False",
      Error: "Unable to contact OMDb right now.",
    });
  }
};
