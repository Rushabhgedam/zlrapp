import { render } from "@testing-library/react-native"
import Input from "../app/components/input"


describe("Input test suite", () => {
    it('should render intial empty text input component & trigger the changes in input component', () => {
        const inputProps = {
            placeholder: "Search here...",
            searchText: "search value",
            setSearchText: () => jest.fn(),
            testID: "input-comp"
        }
        const { getByTestId } = render(<Input {...inputProps} />)
        const inputComp = getByTestId("input-comp")
        expect(inputComp.props.value).toBe("search value")
    })
})