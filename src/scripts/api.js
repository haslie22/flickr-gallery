const getInfoFromAPI = async (apiData, extras, pageNum = 1)  => {
  const url = `https://www.flickr.com/services/rest/?method=${apiData.method}&api_key=${apiData.apiKey}&tags=${apiData.tags}&tag_mode=${apiData.tagMode}&orientation=${apiData.orientation}&content_type=${apiData.contentType}&per_page=${apiData.perPage}&page=${pageNum}&extras=${extras}&format=json&nojsoncallback=${apiData.nojsoncallback}`;
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

const getPictureName = async (apiData, photoID) => {
  const url = `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${apiData.apiKey}&photo_id=${photoID}&format=json&nojsoncallback=${apiData.nojsoncallback}`;
  const res = await fetch(url);
  const data = await res.json();

  return data;
}

export { getInfoFromAPI, getAuthorName, getPictureName };
