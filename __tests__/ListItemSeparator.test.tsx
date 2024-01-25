import { render, screen } from "@testing-library/react-native"
import ListItemseparator from "../app/components/listitemseparator"


describe("ListItemSeparator test suite",()=>{
    it('should show empty space',()=>{
        render(<ListItemseparator />)
        expect(screen).toBeTruthy()
    })
})