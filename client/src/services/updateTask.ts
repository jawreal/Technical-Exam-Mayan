/*
  * try/catch was outside this function 
  * UpdateFormData is at types/global.d.ts
*/

const updateTask = async (data: UpdateFormData) => {
  const response = await fetch("/api/update-task", {
    method: "PATCH",
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

export default updateTask;