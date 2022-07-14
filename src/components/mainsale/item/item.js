import { Box, Image, Text, Heading, Stack, Flex, Icon } from "@chakra-ui/react";
import { Star } from "react-feather";


export default function Item(props){

    return(
        <Box 
            m={1}
            maxW={["46vw", "46vw", "350px"]} 
            border={"1px"} 
            borderColor={"gray.100"}
        >
            <Image 
                src= {props.img}
                alt="Estate" 
            />

            <Stack 
                p={"1.5"} 
                fontSize={"sm"}
            >

                <Text 
                    noOfLines={2}
                    fontWeight={"semibold"}  
                >
                    {props.name}
                </Text>

                <Heading
                    as={"h2"}
                    size={"md"} 
                    textColor={()=>{
                        if(props.originalPrice === ""){
                            return "black" 
                        }
                        return "orange.400"
                    }}
                >

                    {props.price}
                
                </Heading>
                
                <Flex align={"center"}>
                   
                    <Text 
                        as={"s"}
                    >
                        {props.originalPrice}
                    </Text>
                   
                    <Text
                        ml={"1.5"}
                        textColor={"orange.400"}
                    >
                        {props.discount}
                    </Text>

                </Flex>

                <Flex 
                    align={"center"}
                    fontSize={"smaller"}
                >
                    
                    <Icon
                        as={Star}
                        color={"gold"}
                        fill={"gold"} 
                    />
                    
                    <Text
                        ml={"1.5"}
                    >
                        {props.rating}
                    </Text>
                    
                    <Text
                        ml={"1.5"}
                        textColor={"gray.100"}
                    >
                        |
                    </Text>
                    
                    <Text
                        ml={"2.5"}
                    >
                        Terjual
                    </Text>
                    
                    <Text
                        ml={"1.5"}
                    >
                        {props.sold}
                    </Text>
                
                </Flex>
            
            </Stack>
        
        </Box>
    )
}