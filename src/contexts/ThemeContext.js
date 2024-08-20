import { createContext, useContext } from 'react'

export const ThemeContext = createContext({
   colorMode: "dark",
   toggleColorMode: () => {}
})

export const ThemeContextProvider = ThemeContext.Provider

export default function useTheme() {
   return useContext(ThemeContext)
}
