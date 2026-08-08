const updateTask = async (id: string) => {
  const response = await fetch("/api/delete-task", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id
    })
  });

  if (!response.ok) {
    // Parse the error 
    const errorData = await response.json().catch(() => null);
    
    const message = errorData?.message || `Request failed with status ${response.status}`;
    throw new Error(message); // This will be caught by the outer try/catch
  }
};

export default updateTask;