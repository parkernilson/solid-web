import crypto from 'crypto';

export function generateRandomUrlSafeToken(length: number) {
    // Check if the crypto object is available
    if (crypto && crypto.getRandomValues) {
      // Character set for URL-safe tokens
      const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  
      // Calculate the number of characters needed from the character set
      const charsetLength = charset.length;
  
      // Create an array to store random values
      const randomValues = new Uint8Array(length);
  
      // Fill the array with random values
      crypto.getRandomValues(randomValues);

      // Create a string from the random values using the character set
      let token = '';
      for (let i = 0; i < length; i++) {
        token += charset.charAt(randomValues[i] % charsetLength);
      }
  
      return token;
    } else {
      throw new Error("The crypto object is not available.")
    }
  }