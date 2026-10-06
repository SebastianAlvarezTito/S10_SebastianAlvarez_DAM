// src/utils/validators.ts

// Solo letras y espacios, mínimo 3 caracteres
export function validarNombre(nombre: string) {
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
  return regex.test(nombre.trim());
}

// Formato de correo electrónico real
export function validarCorreo(correo: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo.trim());
}

// Formato de fecha DD/MM/AAAA
export function validarFecha(fecha: string) {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  return regex.test(fecha.trim());
}

// Mínimo 10 caracteres para el motivo
export function validarMotivo(motivo: string) {
  return motivo.trim().length >= 10;
}