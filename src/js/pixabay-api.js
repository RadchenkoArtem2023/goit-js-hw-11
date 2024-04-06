const input = document.querySelector('input');
const query = input.value.trim();
const encodedQuery = encodeURIComponent(query);

export function fetchImages(query) {
  const searchParams = new URLSearchParams({
    key: '43264360-d9ed0f3b1b07f2ae565fe2846',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const url = `https://pixabay.com/api/?${searchParams}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
