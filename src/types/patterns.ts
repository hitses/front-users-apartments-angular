// RegEx personalizado para validar los emails
export const EMAIL_PATTERN: RegExp = new RegExp(
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
);

// RegEx personalizado para validar las contraseñas
// Debe tener entre 8 y 20 caracteres, al menos una letra mayúscula, una letra minúscula y un número
// No puede contener espacios en blanco pero sí caracteres especiales
export const PASSWORD_PATTERN: RegExp = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d]|[^ ]){8,20}$/,
);
