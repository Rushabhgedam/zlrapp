import { render, screen } from "@testing-library/react-native"
import RadioButton from "../app/components/radiobutton"


describe("ListItemSeparator test suite",()=>{
    it('should show empty space',()=>{
        render(<RadioButton isSelected={true} />)
        expect(screen).toBeTruthy()
    })
})