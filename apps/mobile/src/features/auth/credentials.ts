// Validation des identifiants à l'inscription email (change auth-registration).
// Fonction pure — seam testé. Règles : email bien formé, mot de passe >= 8 caractères.

export const PASSWORD_MIN_LENGTH = 8;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type CredentialsValidation = {
  emailValid: boolean;
  passwordValid: boolean;
  valid: boolean;
};

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export function isValidPassword(password: string): boolean {
  return password.length >= PASSWORD_MIN_LENGTH;
}

export function validateCredentials(email: string, password: string): CredentialsValidation {
  const emailValid = isValidEmail(email);
  const passwordValid = isValidPassword(password);
  return { emailValid, passwordValid, valid: emailValid && passwordValid };
}
