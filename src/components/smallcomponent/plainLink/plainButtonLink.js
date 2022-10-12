import { Button } from "@chakra-ui/react"

export default function PlainButtonLink(props) {
    return (
        <Button
            as={"a"}
            _hover={props.hover || { "bgColor": "transparent" }}
            _active={props.active ||{ "bgColor": "transparent" }}
            _focus={props.focus || { "bgColor": "transparent" }}
            w={props.width || "full"}
            p={props.padding || 0}
            fontSize={props.fontSize || "1.2em"}
            textAlign={props.textAlign || "left"}
            bgColor={props.bgColor || "transparent"}
            justifyContent={props.justifyContent || "flex-start"}
            fontWeight={props.fontWeight || "normal"}
            onClick={props.onClick}
        >
            {props.text || ""}
        </Button>
    )
}