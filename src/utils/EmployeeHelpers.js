export const getStatus = (user) => {
  /*
    ex - status is depends on user Credentials
    user id = 1
    user - firstname => mahadev(length = 7),  lastname = bolde (length = 5)

   calculation = (1 * 7 + 7 * 3 + 5 * 5) % 10
   calculation  =  (7 + 21 + 25) % 10
   result  = 53 % 10 ==> 3(Active)
  */
  const hash =
    (user.id * 7 + user.firstName.length * 3 + user.lastName.length * 5) % 10;
  if (hash < 6) return "Active";
  if (hash < 9) return "Inactive";
  return "On Leave";
};

export const getStatusBadgeClass = (status) => {
  // status comes and according to status returns the bg and text color
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800";
    case "Inactive":
      return "bg-red-100 text-red-800";
    case "On Leave":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
