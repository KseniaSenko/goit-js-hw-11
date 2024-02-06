export default function fetchImages(q) {
    const BASE_URL = 'https://pixabay.com/api/';
    const searchParams = new URLSearchParams({
        key: '42207552-ba5ee995b0c9caa99df8c1b23',
        q,
      image_type: 'photo',
        orientation: 'horizontal',
      safesearch: true,
    });
    const PARAMS = `?${searchParams}`;
    const url = BASE_URL + PARAMS;
    
    return fetch(url).then(response => {
        if (!response.ok) {
      throw new Error('Error fetching data');
    }
    return response.json();
    })
}