// Try catch was outside this function 
const addTask = async (data: TaskFormData) => {
  const response = await fetch("/api/add-task", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    // Try to parse the error from your API
    const errorData = await response.json().catch(() => null);
    
    const message = errorData?.message || `Request failed with status ${response.status}`;
    throw new Error(message); // This will be caught by the outer try/catch
  }
};

export default addTask;