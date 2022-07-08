import { IconButton, Center } from '@chakra-ui/react'

export default function Icon(props){
    return(
        <Center>
             <IconButton 
                size={props.size || "md"}
                bgColor={props.color || "transparent"}
                border={props.border || "none"}
                aria-label={props.label} 
                icon={props.icon} 
                onClick={props.clickEvent || (()=>{return}) }
            />
        </Center>
     );
}
