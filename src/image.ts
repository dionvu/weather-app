interface Image {
  results: {
    urls: {
      raw: string;
    }
  }[]
};

export async function getLocationImage(city: string): Promise<string> {
  try {
    const index = Math.floor(Math.random() * 10);
    const response = await fetch(`https://api.unsplash.com/search/photos/?query=${city}&client_id=7d_E240U-3a_TluLgzSYks5wUrXR1JHX-fP2DtgNbTY`);
    const data: Image = await response.json();

    console.table(data);

    console.log(data.results[index].urls.raw);
    return data.results[index].urls.raw;
  }
  catch (error) {
    return Promise.reject(new Error('ERROR: Unable to fetch image url.'));
  }
};
