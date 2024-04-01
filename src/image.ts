interface Image {
  results: {
    urls: {
      raw: string;
    }
  }[]
};

/**
 * @brief Generates a random image in the top ten images related to given search term.
 * @param search The topic to fetch image url for.
 */
export async function getLocationImage(search: string): Promise<string> {
  try {
    const index = Math.floor(Math.random() * 10);
    const response = await fetch(`https://api.unsplash.com/search/photos/?query=${search}&client_id=7d_E240U-3a_TluLgzSYks5wUrXR1JHX-fP2DtgNbTY`);
    const data: Image = await response.json();

    return data.results[index].urls.raw;
  }
  catch (error) {
    return Promise.reject(new Error('ERROR: Unable to fetch image url.'));
  }
};
