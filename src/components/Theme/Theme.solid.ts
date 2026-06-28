import type { JSX } from 'solid-js';
import h from 'solid-js/h';
import type { ClassMap } from '../../core/classes.js';
import { cx } from '../../core/classes.js';
import { element, omit } from '../../core/solid.js';

export interface ThemeProps extends JSX.HTMLAttributes<HTMLDivElement> {
  classes?: ClassMap;
}

export type ThemeClassicProps = ThemeProps;

function createThemeComponent(themeClassName: string) {
  return function ThemeComponent(props: ThemeProps): JSX.Element {
    const rest = omit(props, new Set(['children', 'class', 'classes']));
    return element(
      h(
        'div',
        {
          ...rest,
          class: cx(props.classes, [themeClassName], props.class),
        },
        props.children,
      ),
    );
  };
}

export const ThemeClassic = createThemeComponent('ThemeClassic');
export const ThemeAiee = createThemeComponent('ThemeAiee');
export const ThemeAsh = createThemeComponent('ThemeAsh');
export const ThemeAzureOrange = createThemeComponent('ThemeAzureOrange');
export const ThemeBee = createThemeComponent('ThemeBee');
export const ThemeBlackAndWhite = createThemeComponent('ThemeBlackAndWhite');
export const ThemeBlue = createThemeComponent('ThemeBlue');
export const ThemeBrick = createThemeComponent('ThemeBrick');
export const ThemeCandy = createThemeComponent('ThemeCandy');
export const ThemeCherry = createThemeComponent('ThemeCherry');
export const ThemeColdGray = createThemeComponent('ThemeColdGray');
export const ThemeCounterStrike = createThemeComponent('ThemeCounterStrike');
export const ThemeDarkTeal = createThemeComponent('ThemeDarkTeal');
export const ThemeDenim = createThemeComponent('ThemeDenim');
export const ThemeEggplant = createThemeComponent('ThemeEggplant');
export const ThemeFxDev = createThemeComponent('ThemeFxDev');
export const ThemeHighContrast = createThemeComponent('ThemeHighContrast');
export const ThemeHoney = createThemeComponent('ThemeHoney');
export const ThemeHotChocolate = createThemeComponent('ThemeHotChocolate');
export const ThemeHotdogStand = createThemeComponent('ThemeHotdogStand');
export const ThemeLilac = createThemeComponent('ThemeLilac');
export const ThemeLilacRoseDark = createThemeComponent('ThemeLilacRoseDark');
export const ThemeMaple = createThemeComponent('ThemeMaple');
export const ThemeMarine = createThemeComponent('ThemeMarine');
export const ThemeMatrix = createThemeComponent('ThemeMatrix');
export const ThemeMillenium = createThemeComponent('ThemeMillenium');
export const ThemeModernDark = createThemeComponent('ThemeModernDark');
export const ThemeMolecule = createThemeComponent('ThemeMolecule');
export const ThemeNinjaTurtles = createThemeComponent('ThemeNinjaTurtles');
export const ThemeOlive = createThemeComponent('ThemeOlive');
export const ThemeOriginal = createThemeComponent('ThemeOriginal');
export const ThemePamelaAnderson = createThemeComponent('ThemePamelaAnderson');
export const ThemePeggysPastels = createThemeComponent('ThemePeggysPastels');
export const ThemePlum = createThemeComponent('ThemePlum');
export const ThemePolarized = createThemeComponent('ThemePolarized');
export const ThemePowerShell = createThemeComponent('ThemePowerShell');
export const ThemeRainyDay = createThemeComponent('ThemeRainyDay');
export const ThemeRaspberry = createThemeComponent('ThemeRaspberry');
export const ThemeRedWine = createThemeComponent('ThemeRedWine');
export const ThemeRose = createThemeComponent('ThemeRose');
export const ThemeSeawater = createThemeComponent('ThemeSeawater');
export const ThemeShelbiTeal = createThemeComponent('ThemeShelbiTeal');
export const ThemeSlate = createThemeComponent('ThemeSlate');
export const ThemeSolarizedDark = createThemeComponent('ThemeSolarizedDark');
export const ThemeSolarizedLight = createThemeComponent('ThemeSolarizedLight');
export const ThemeSpruce = createThemeComponent('ThemeSpruce');
export const ThemeStormClouds = createThemeComponent('ThemeStormClouds');
export const ThemeTheSixtiesUSA = createThemeComponent('ThemeTheSixtiesUSA');
export const ThemeTokyoDark = createThemeComponent('ThemeTokyoDark');
export const ThemeToner = createThemeComponent('ThemeToner');
export const ThemeTooSexy = createThemeComponent('ThemeTooSexy');
export const ThemeTravel = createThemeComponent('ThemeTravel');
export const ThemeVaporTeal = createThemeComponent('ThemeVaporTeal');
export const ThemeVermillion = createThemeComponent('ThemeVermillion');
export const ThemeVioletDark = createThemeComponent('ThemeVioletDark');
export const ThemeVistaesqueMidnight = createThemeComponent(
  'ThemeVistaesqueMidnight',
);
export const ThemeWater = createThemeComponent('ThemeWater');
export const ThemeWhite = createThemeComponent('ThemeWhite');
export const ThemeWindows1 = createThemeComponent('ThemeWindows1');
export const ThemeWmii = createThemeComponent('ThemeWmii');
