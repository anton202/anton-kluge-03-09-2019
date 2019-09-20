export interface Theme {
    name: string;
    properties: any;
}

export const light: Theme = {
    name: "light",
    properties: {
        "--background-primary": "#e0e0e0",
        "--background-secondery": "#fafafa",
        "--background-tertiary": "#f5f5f5",
        "--background-nav": "#0277bd",
        "--font-color":"black"
    }
}

export const dark: Theme = {
    name: "dark",
    properties: {
        "--background-primary": "#263238",
        "--background-secondery": "#4f5b62",
        "--background-tertiary": "#000a12",
        "--background-nav": "#000a12",
        "--font-color":"white"
    }
}