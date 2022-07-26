import { Box, Image, Text, Heading, Stack, Flex, Icon, AspectRatio, Link, textDecoration } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { Star } from "react-feather";
import '../../style/chakra-util.css';


export default function Item(props){

    return(
            <Box 
                m={1}
                flex={"1 1"}
                flexBasis={["47.5%", "47.5%", "350px"]}
                maxW={["47.5%", "47.5%", "350px"]}
            >
                <Link 
                    as={ReactLink} 
                    to={"/item/"+props.id}
                    _hover={{"textDecor":"none"}}
                    reloadDocument
                >

                    <Image
                        className="ratioSame"
                        w={"100%"}
                        fit={"contain"}
                        src= {props.img}
                        alt= {props.name} 
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
                            textColor={
                                !props.discount ? "black" : "orange.400"
                            }
                        >

                            {props.price}
                        
                        </Heading>
                        
                        
                            {
                                ((discount)=>{
                                    return discount > 0 ? 
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
                                            -{props.discount}%
                                        </Text>
                                    </Flex>: ""
                                })(props.discount)
                            }
                            

                        

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
                </Link>
            </Box>
        
    )
}