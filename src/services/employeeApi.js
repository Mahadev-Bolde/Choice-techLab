const BASE_URL = "https://dummyjson.com/users";

export const fetchEmployees = async () => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error(`Http error! status: ${response.status}`);
  }

  return await response.json();
};

export const fetchEmployeesById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`Http error! status: ${response.status}`);
  }

  return await response.json();
};
