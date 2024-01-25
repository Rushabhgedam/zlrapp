import { render, screen } from "@testing-library/react-native"
import EmptyCountry from "../app/components/emptydata"

describe("EmptyCountry test suite",()=>{
    it('should show Select continent',()=>{
        const {getByText} = render(<EmptyCountry continent={{code:"", name:""}} loading={true} searchText="" />)
        const selectContinentText = getByText("Select Continent")
        expect(selectContinentText).toBeTruthy()
    })
    it('should show Select continent',()=>{
        const {getByTestId} = render(<EmptyCountry continent={{code:"AF", name:"Africa"}} loading={true} searchText="" />)
        const loader = getByTestId("loader")
        expect(loader).toBeTruthy()
    })
    it('should show Select continent',()=>{
        const {getByText} = render(<EmptyCountry continent={{code:"", name:""}} loading={false} searchText="conc" />)
        const loader = getByText("Not found results for conc")
        expect(loader).toBeTruthy()
    })

})