import { IconButton, Center } from '@chakra-ui/react'

export default function ActionIcon(props){
    return(
        <Center>
             <IconButton 
                _active={{"bgColor": "transparent"}}
                _focus={{"bgColor":"transparent"}}
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
     );
}
