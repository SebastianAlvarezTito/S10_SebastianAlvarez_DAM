// src/components/common/app-input.tsx

import {
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

import { colors } from '../../constants/colors';
import { theme } from '../../constants/theme';

type AppInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  multiline?: boolean; // <-- Agregado para el campo Motivo
};

export const AppInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  multiline = false, // <-- Por defecto es falso
}: AppInputProps) => {
  return (
    <>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        style={[
          styles.input,
          multiline && styles.inputMultiline // <-- Estilo condicional
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: theme.fontSize.body,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: theme.spacing.small,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: theme.radius.medium,
    padding: 14,
    marginBottom: theme.spacing.medium,
    color: colors.text,
  },

  // Estilo extra para cuando es multilínea
  inputMultiline: {
    height: 100,
    textAlignVertical: 'top',
  },
});