export const COLORS = {
    primary: "#00b3b3",//#001F2D //#00b3b3 //old #3333cc
    secondary: "powderblue",//#4D626C
    white: "#FFF",
    gray: "#74858C",
    gray_ligth: '#ebebe0',
    warning: '#ff3300',
    green: '#33cc33',
    black: '#000000'
  };
  
  export const SIZES = {
    base: 8,
    small: 12,
    font: 14,
    medium: 16,
    large: 18,
    extraLarge: 24,
  };
  
  export const FONTS = {
    bold: "InterBold",
    semiBold: "InterSemiBold",
    medium: "InterMedium",
    regular: "InterRegular",
    light: "InterLight",
  };
  
  export const SHADOWS = {
    light: {
      shadowColor: COLORS.white,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
  
      elevation: 9,
    },
    medium: {
      shadowColor: COLORS.gray,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
  
      elevation: 7,
    },
    dark: {
      shadowColor: COLORS.gray,
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.41,
      shadowRadius: 9.11,
  
      elevation: 14,
    },
  };
  