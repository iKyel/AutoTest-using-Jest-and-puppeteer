// Function to generate a random email with the domain @gmail.com
export const generateRandomEmail = (): string => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let email = '';
    
    // Generate a random string for the email username (8 characters)
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      email += characters[randomIndex];
    }
    
    // Add the @gmail.com domain
    return `${email}@gmail.com`;
  };
  