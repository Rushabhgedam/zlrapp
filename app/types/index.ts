export interface IProps {
    navigation: { 
        navigate: (screenName: string) => void,
        replace: (screenName: string) => void 
    }
}


export interface IContinent {
    "name": string,
    "code": string,
    "selected"?: boolean
}


export interface ICountryItem {
    name: string,
    emoji: string,
    continent: { name: string }
}