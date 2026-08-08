type ApiOptions<T = unknown> = Omit<RequestInit, "body"> & { 
  body?: T 
};

export async function apiClient<T = unknown>(
  url: string, 
  options: ApiOptions<T> = {}
): Promise<void> { 
  const { body, ...rest } = options;

  const response = await fetch(url, { 
    ...rest, 
    headers: { 
      "Content-Type": "application/json", 
      ...rest.headers, 
    }, 
    body: body ? JSON.stringify(body) : undefined, 
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) { 
    const message = data?.message || `Request failed with status ${response.status}`; 
    throw new Error(message); 
  } 
}