export function emailToName(email) {
  const username = email.split('@')[0];

  if (username.includes('.')) {
    const [firstName, lastName] = username.split('.');

    //capitalize first letter of first name
    const formattedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

    //capitalize last name
    const formattedLastName = lastName.toUpperCase();

    //space between first and last name
    return `${formattedFirstName} ${formattedLastName}`;
  } else {
    //no dot return unformatted username
    return username;
  }
}
