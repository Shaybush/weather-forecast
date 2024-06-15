import { ChangeEvent, FC } from "react";
import { ETheme } from "../../../redux/models/theme.model";
import styles from "./radioButton.module.css";

interface IRadioButtonModel {
  value: ETheme;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  text: string;
  checked: boolean;
}

const RadioButton: FC<IRadioButtonModel> = ({
  name,
  onChange,
  text,
  value,
  checked
}) => {
  return (
    <label className={styles.Label}>
      <input
        className={styles.Input}
        type="radio"
        value={value}
        name={name}
        onChange={onChange}
        checked={checked}
      />
      <span>{text}</span>
    </label>
  );
};

export default RadioButton;
