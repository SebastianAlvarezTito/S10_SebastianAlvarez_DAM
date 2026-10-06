// src/app/index.tsx

import { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { AppInput } from '../components/common/app-input';
import { AppButton } from '../components/common/app-button';

import {
  validarNombre,
  validarCorreo,
  validarFecha,
  validarMotivo,
} from '../utils/validators';

export default function ReservaCita() {

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [fecha, setFecha] = useState('');
  const [motivo, setMotivo] = useState('');

  const [error, setError] = useState('');
  const [registrado, setRegistrado] = useState(false);

  // Validaciones individuales
  const nombreValido = validarNombre(nombre);
  const correoValido = validarCorreo(correo);
  const fechaValida = validarFecha(fecha);
  const motivoValido = validarMotivo(motivo);

  const validarFormulario = () => {

    setError('');
    setRegistrado(false);

    if (nombre.trim() === '') {
      setError('El nombre es obligatorio.');
      return;
    }
    if (!nombreValido) {
      setError('El nombre solo debe contener letras y tener al menos 3 caracteres.');
      return;
    }

    if (correo.trim() === '') {
      setError('El correo es obligatorio.');
      return;
    }
    if (!correoValido) {
      setError('Ingresa un correo electrónico válido (ejemplo@correo.com).');
      return;
    }

    if (fecha.trim() === '') {
      setError('La fecha de la cita es requerida.');
      return;
    }
    if (!fechaValida) {
      setError('La fecha debe tener el formato DD/MM/AAAA (ej: 25/12/2026).');
      return;
    }

    if (motivo.trim() === '') {
      setError('El motivo de la cita es obligatorio.');
      return;
    }
    if (!motivoValido) {
      setError('El motivo debe tener al menos 10 caracteres para una mejor atención.');
      return;
    }

    setRegistrado(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* ENCABEZADO */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>🦷</Text>
          </View>

          <View>
            <Text style={styles.overline}>
              CLÍNICA DENTAL SONRISA
            </Text>

            <Text style={styles.title}>
              Reserva tu Cita
            </Text>
          </View>
        </View>

        <Text style={styles.description}>
          Completa tus datos y agenda tu próxima consulta dental.
        </Text>

        {/* TARJETA DEL FORMULARIO */}
        <View style={styles.formCard}>

          <Text style={styles.sectionTitle}>
            Datos del Paciente
          </Text>

          <Text style={styles.sectionDescription}>
            Todos los campos son obligatorios.
          </Text>

          {/* NOMBRE */}
          <AppInput
            label="Nombre completo"
            placeholder="Ej: Juan Pérez"
            value={nombre}
            onChangeText={(value) => {
              setNombre(value);
              setError('');
              setRegistrado(false);
            }}
          />

          {nombre.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                nombreValido ? styles.validText : styles.invalidText,
              ]}
            >
              {nombreValido
                ? '✓ Nombre válido'
                : '○ Solo letras, mínimo 3 caracteres'}
            </Text>
          )}

          {/* CORREO */}
          <AppInput
            label="Correo electrónico"
            placeholder="paciente@correo.com"
            value={correo}
            onChangeText={(value) => {
              setCorreo(value);
              setError('');
              setRegistrado(false);
            }}
            keyboardType="email-address"
          />

          {correo.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                correoValido ? styles.validText : styles.invalidText,
              ]}
            >
              {correoValido
                ? '✓ Correo válido'
                : '○ Formato: ejemplo@correo.com'}
            </Text>
          )}

          {/* FECHA */}
          <AppInput
            label="Fecha de atención"
            placeholder="DD/MM/AAAA (Ej: 15/11/2026)"
            value={fecha}
            onChangeText={(value) => {
              setFecha(value);
              setError('');
              setRegistrado(false);
            }}
            keyboardType="numeric"
          />

          {fecha.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                fechaValida ? styles.validText : styles.invalidText,
              ]}
            >
              {fechaValida
                ? '✓ Fecha válida'
                : '○ Usa el formato DD/MM/AAAA'}
            </Text>
          )}

          {/* MOTIVO */}
          <AppInput
            label="Motivo de la consulta"
            placeholder="Ej: Dolor de muela, limpieza dental..."
            value={motivo}
            onChangeText={(value) => {
              setMotivo(value);
              setError('');
              setRegistrado(false);
            }}
            multiline={true}
          />

          {motivo.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                motivoValido ? styles.validText : styles.invalidText,
              ]}
            >
              {motivoValido
                ? '✓ Motivo registrado'
                : '○ Describe el motivo (mínimo 10 caracteres)'}
            </Text>
          )}

          {/* ERROR */}
          {error !== '' && (
            <View style={styles.errorBox}>
              <View style={styles.errorIcon}>
                <Text style={styles.errorIconText}>!</Text>
              </View>
              <View style={styles.messageContainer}>
                <Text style={styles.errorTitle}>No se pudo agendar</Text>
                <Text style={styles.errorMessage}>{error}</Text>
              </View>
            </View>
          )}

          {/* ÉXITO */}
          {registrado && (
            <View style={styles.successBox}>
              <View style={styles.successIcon}>
                <Text style={styles.successIconText}>✓</Text>
              </View>
              <View style={styles.messageContainer}>
                <Text style={styles.successTitle}>¡Cita agendada!</Text>
                <Text style={styles.successMessage}>
                  Te esperamos en la fecha indicada. 🦷
                </Text>
              </View>
            </View>
          )}

          {/* BOTÓN */}
          <AppButton
            title="Reservar Cita"
            onPress={validarFormulario}
          />

        </View>

        {/* VALIDACIONES */}
        <View style={styles.validationSection}>
          <View style={styles.validationHeader}>
            <View>
              <Text style={styles.validationTitle}>Validaciones</Text>
              <Text style={styles.validationSubtitle}>Reglas del formulario</Text>
            </View>
            <View style={styles.counter}>
              <Text style={styles.counterText}>
                {[nombreValido, correoValido, fechaValida, motivoValido].filter(Boolean).length}/4
              </Text>
            </View>
          </View>

          <ValidationRow
            title="Nombre válido"
            description="Solo letras, mínimo 3 caracteres."
            valid={nombreValido}
          />

          <ValidationRow
            title="Correo electrónico"
            description="Formato válido (ejemplo@correo.com)."
            valid={correoValido}
          />

          <ValidationRow
            title="Fecha de atención"
            description="Formato DD/MM/AAAA."
            valid={fechaValida}
          />

          <ValidationRow
            title="Motivo de consulta"
            description="Mínimo 10 caracteres."
            valid={motivoValido}
          />

        </View>

        <Text style={styles.footer}>
          Clínica Dental Sonrisa - Cuidamos tu salud bucal
        </Text>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* COMPONENTE PARA LAS VALIDACIONES */
type ValidationRowProps = {
  title: string;
  description: string;
  valid: boolean;
};

function ValidationRow({ title, description, valid }: ValidationRowProps) {
  return (
    <View style={styles.validationRow}>
      <View
        style={[
          styles.validationCircle,
          valid ? styles.validationCircleValid : styles.validationCirclePending,
        ]}
      >
        <Text
          style={[
            styles.validationIcon,
            valid ? styles.validationIconValid : styles.validationIconPending,
          ]}
        >
          {valid ? '✓' : '○'}
        </Text>
      </View>

      <View style={styles.validationInfo}>
        <Text style={styles.validationRowTitle}>{title}</Text>
        <Text style={styles.validationRowDescription}>{description}</Text>
      </View>

      <View
        style={[
          styles.statusBadge,
          valid ? styles.statusBadgeValid : styles.statusBadgePending,
        ]}
      >
        <Text
          style={[
            styles.statusBadgeText,
            valid ? styles.statusBadgeTextValid : styles.statusBadgeTextPending,
          ]}
        >
          {valid ? 'OK' : 'Pendiente'}
        </Text>
      </View>
    </View>
  );
}

/* ESTILOS */
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F0F9FF', // Fondo azul muy claro (tipo clínica)
  },

  scroll: {
    padding: 20,
    paddingTop: 45,
    paddingBottom: 35,
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  headerIcon: {
    width: 55,
    height: 55,
    borderRadius: 18,
    backgroundColor: '#0891B2', // Azul turquesa dental
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  headerIconText: {
    fontSize: 30,
  },

  overline: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0891B2',
    letterSpacing: 1.5,
    marginBottom: 3,
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#164E63',
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: '#64748B',
    marginBottom: 24,
  },

  /* FORMULARIO */
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E0F2FE',
    marginBottom: 20,
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#164E63',
    marginBottom: 4,
  },

  sectionDescription: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 22,
  },

  /* ESTADO DE CAMPOS */
  fieldStatus: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: -10,
    marginBottom: 14,
  },

  validText: {
    color: '#16A34A',
  },

  invalidText: {
    color: '#D97706',
  },

  /* ERROR */
  errorBox: {
    flexDirection: 'row',
    backgroundColor: '#FEF2F2',
    borderRadius: 14,
    padding: 13,
    marginBottom: 17,
    borderWidth: 1,
    borderColor: '#FECACA',
  },

  errorIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  errorIconText: {
    color: '#DC2626',
    fontSize: 17,
    fontWeight: '800',
  },

  messageContainer: {
    flex: 1,
  },

  errorTitle: {
    color: '#991B1B',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },

  errorMessage: {
    color: '#B42318',
    fontSize: 12,
    lineHeight: 17,
  },

  /* ÉXITO */
  successBox: {
    flexDirection: 'row',
    backgroundColor: '#F0FDF4',
    borderRadius: 14,
    padding: 13,
    marginBottom: 17,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },

  successIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  successIconText: {
    color: '#16A34A',
    fontSize: 17,
    fontWeight: '800',
  },

  successTitle: {
    color: '#166534',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },

  successMessage: {
    color: '#15803D',
    fontSize: 12,
  },

  /* VALIDACIONES */
  validationSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },

  validationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  validationTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#164E63',
    marginBottom: 3,
  },

  validationSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
  },

  counter: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: '#ECFEFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  counterText: {
    color: '#0891B2',
    fontSize: 14,
    fontWeight: '800',
  },

  /* FILAS */
  validationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },

  validationCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  validationCircleValid: {
    backgroundColor: '#DCFCE7',
  },

  validationCirclePending: {
    backgroundColor: '#F1F5F9',
  },

  validationIcon: {
    fontSize: 17,
    fontWeight: '800',
  },

  validationIconValid: {
    color: '#16A34A',
  },

  validationIconPending: {
    color: '#94A3B8',
  },

  validationInfo: {
    flex: 1,
  },

  validationRowTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 3,
  },

  validationRowDescription: {
    fontSize: 11,
    color: '#94A3B8',
    lineHeight: 16,
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 8,
  },

  statusBadgeValid: {
    backgroundColor: '#ECFDF3',
  },

  statusBadgePending: {
    backgroundColor: '#F2F4F7',
  },

  statusBadgeText: {
    fontSize: 9,
    fontWeight: '800',
  },

  statusBadgeTextValid: {
    color: '#027A48',
  },

  statusBadgeTextPending: {
    color: '#64748B',
  },

  /* FOOTER */
  footer: {
    textAlign: 'center',
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 22,
  },

});