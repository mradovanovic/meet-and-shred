import { validateCredentials, isValidEmail, isValidPassword, PASSWORD_MIN_LENGTH } from './credentials';

describe('validateCredentials', () => {
  it('accepte un email bien formé et un mot de passe >= 8 caractères', () => {
    expect(validateCredentials('rider@example.com', 'motdepasse')).toEqual({
      emailValid: true,
      passwordValid: true,
      valid: true,
    });
  });

  it('rejette un mot de passe trop court (< 8)', () => {
    const r = validateCredentials('rider@example.com', '1234567');
    expect(r.passwordValid).toBe(false);
    expect(r.valid).toBe(false);
  });

  it('rejette un email mal formé', () => {
    const r = validateCredentials('pas-un-email', 'motdepasse');
    expect(r.emailValid).toBe(false);
    expect(r.valid).toBe(false);
  });

  it('rejette des champs vides', () => {
    expect(validateCredentials('', '')).toEqual({
      emailValid: false,
      passwordValid: false,
      valid: false,
    });
  });
});

describe('helpers', () => {
  it('isValidEmail : formats courants', () => {
    expect(isValidEmail('a@b.co')).toBe(true);
    expect(isValidEmail('a@b')).toBe(false);
    expect(isValidEmail('  spaced@mail.com  ')).toBe(true); // trim
    expect(isValidEmail('')).toBe(false);
  });

  it('isValidPassword : seuil exact', () => {
    expect(isValidPassword('x'.repeat(PASSWORD_MIN_LENGTH))).toBe(true);
    expect(isValidPassword('x'.repeat(PASSWORD_MIN_LENGTH - 1))).toBe(false);
  });
});
