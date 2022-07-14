import { IconButton, Center } from '@chakra-ui/react'

export default function Icon(props){
    return(
        <Center>
             <IconButton 
                fill={props.fill || ""}
                color={props.color || ""}
                size={props.size || "md"}
                bgColor={props.bgColor || "transparent"}
                border={props.border || "none"}
                aria-label={props.label} 
                icon={props.icon} 
                onClick={props.clickEvent || (()=>{return}) }
            />
        </Center>
     );
}
