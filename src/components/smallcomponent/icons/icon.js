import { IconButton, Center, Flex } from '@chakra-ui/react'

export default function ActionIcon(props) {
    return (
        <Flex
            p={"4px"}
            position={"relative"}
            h={"100%"}
            alignContent={"center"}
        >
            <Center>
                <IconButton
                    _hover={{ "bgColor": "transparent" }}
                    _active={{ "bgColor": "transparent" }}
                    _focus={{ "bgColor": "transparent" }}
                    fill={props.fill}
                    color={props.color}
                    size={props.size || "md"}
                    bgColor={props.bgColor || "transparent"}
                    border={props.border || "none"}
                    aria-label={props.label}
                    icon={props.icon}
                    onClick={props.onClick}
                />
            </Center>
        </Flex>
    );
}
