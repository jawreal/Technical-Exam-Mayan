interface QueryTaskInput {
  query: string;
  filter: FilterBy;
}

const getAllTasks = async ({ query, filter }: QueryTaskInput) => {
  const params = new URLSearchParams();
  params.append("filter", filter);
  if(query.trim()){
    params.append("query", query);
  } 
  
  const result = await fetch(`/api/get-tasks?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await result.json();
  return data;
};

export default getAllTasks;
