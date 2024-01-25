import { render, screen } from "@testing-library/react-native"
import Loader from "../app/components/loader"

describe("Loader test suite",()=>{
    it('should show activity indicator',()=>{
        render(<Loader />)
        expect(screen).toBeTruthy()
    })

})