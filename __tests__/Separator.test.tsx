import { render, screen } from "@testing-library/react-native"
import { Seperator } from "../app/components/separator"


describe("Separator component test suite",()=>{
    it('should show empty space of amount of margin top provided',()=>{
        render(<Seperator marginTop={100} />)
        expect(screen).toBeTruthy()
    })
})