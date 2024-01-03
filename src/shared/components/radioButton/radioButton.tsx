import { ChangeEvent, FC } from "react";
import { ETheme } from "../../../redux/models/theme.model";
import styles from "./radioButton.module.css";

interface IRadioButtonModel {
  value: ETheme;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  text: string;
}

const RadioButton: FC<IRadioButtonModel> = ({
  name,
  onChange,
  text,
  value,
}) => {
  return (
    <label className={styles.Label}>
      <input
        className={styles.Input}
        type="radio"
        value={value}
        name={name}
        onChange={onChange}
      />
      <span>{text}</span>
    </label>
  );
};

export default RadioButton;
