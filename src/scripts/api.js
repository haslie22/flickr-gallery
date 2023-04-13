const getSources = async (callback, data) => {
  const newdata = await callback(data);
  return newdata;
}

const getInfoFromAPI = async apiData  => {
  console.log(apiData);
  const url = `https://www.flickr.com/services/rest/?method=${apiData.method}&api_key=${apiData.apiKey}&tags=${apiData.tags}&tag_mode=${apiData.tagMode}&orientation=${apiData.orientation}&content_type=${apiData.contentType}&per_page=${apiData.perPage.default}&extras=url_l&format=json&nojsoncallback=${apiData.nojsoncallback}`;
  const res = await fetch(url);
  const data = await res.json();

  return data;
}

const getAuthorName = async (apiData, authorID) => {
  const url = `https://www.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=${apiData.apiKey}&user_id=${authorID}&format=json&nojsoncallback=${apiData.nojsoncallback}`;
  const res = await fetch(url);
  const data = await res.json();

  return data;
}

export { getSources, getInfoFromAPI, getAuthorName };
