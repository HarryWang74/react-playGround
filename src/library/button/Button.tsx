import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

export interface ButtonProps extends MuiButtonProps {
  label: string;
}

export function Button({ label, ...props }: ButtonProps) {
  return <MuiButton {...props}>{label}</MuiButton>;
}
