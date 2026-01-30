const fetchWithTimeout = async (
  url,
  options = {},
  timeLimit = 5000
) => {
  const controller = new AbortController();
  const timerId = setTimeout(
    () => controller.abort(),
    timeLimit
  );

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(res.status);
    }

    return await res.json();
  } finally {
    clearTimeout(timerId);
  }
};

fetchWithTimeout(
  'https://jsonplaceholder.typicode.com/todos/1',
  {},
  1000
)
  .then(console.log)
  .catch(console.error);
