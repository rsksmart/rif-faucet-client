import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import React, { useCallback } from "react";

const INPUT_COLOR_VARIANT = {
  'primary': {
    color: '#000000',
    fontWeight: 400,
  },
  'secondary': {
    color: '#6170F2',
    fontWeight: 600,
  },
}

export const TextInput = ({
  name,
  label,
  value,
  rightText,
  onRightTextClick = () => {},
  inputColorVariant = 'primary',
}) => {
  const onRightClick = useCallback(() => onRightTextClick(name), [name])
  
  return (
    <FormGroup style={styles.formGroup} className='TextInputFormGroup'>
      <FormLabel style={styles.label}>{label}</FormLabel>
      <div style={{ position: 'relative' }}>
        <FormControl type='input'  readOnly name={name} value={value} style={{ 
          ...styles.input,
          ...INPUT_COLOR_VARIANT[inputColorVariant]
        }} />
        <p onClick={onRightClick} style={styles.paragraph}>{rightText}</p>
      </div>
    </FormGroup>
  )
}

const styles = {
  formGroup: { marginBottom: 6, marginTop: 16 },
  label: { color: '#4B5CF0', fontFamily: 'Sora', fontWeight: 400, marginBottom: 4 },
  input: {
    paddingBottom: 26,
    paddingTop: 26,
    paddingLeft: 19,
    fontSize: 14,
    fontWeight: 400,
    backgroundColor: 'rgba(75, 92, 240, 0.05)',
  },
  paragraph: {
    position: 'absolute',
    top: 15,
    right: 12,
    fontFamily: 'DM Mono',
    fontWeight: 500,
    fontSize: 16,
    color: '#4B5CF0',
    cursor: 'pointer',
  },
}