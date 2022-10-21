import { Th } from "@chakra-ui/react"

export default function ThEm({isNumeric, children}){
    return(
        <Th isNumeric={isNumeric} fontSize = {"1em"}>
            {children}
        </Th>
    )
}