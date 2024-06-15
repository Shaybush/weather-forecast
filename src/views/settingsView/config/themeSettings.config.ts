import { ETheme } from "../../../redux/models/theme.model";
import { IThemeRadioButtonsModel } from "../model/themeRadionButtons.model";

export const radioButtonsConfig: IThemeRadioButtonsModel[] = [{
    text: 'Light Mode',
    value: ETheme.LIGHT,
    id: 'light'
},
{
    text: 'Dark Mode',
    value: ETheme.DARK,
    id: 'dark'
},{
    text: 'Lime Mode',
    value: ETheme.GREEN,
    id: 'green'
}]