import { Box, Badge, Image, Stack, Icon, Flex, Text, Heading, AspectRatio } from "@chakra-ui/react"
import { useState } from "react";
import { Star, Heart } from "react-feather";
import ActionIcon from "../../smallcomponent/icons/icon";

export default function ItemDetailHeader(props){
    const [fav, setFav] = useState(props.fav);
    const [favClicked, setFavClicked] = useState(false);

    const RenderStarRating = () =>{
        let starArray = [];

        for(let x = 0; x < 5; x++)
        {
            const color = x <= Math.ceil(parseInt(props.rating)) ? "gold" : "";
            starArray.push(<Icon key={x} as={Star} fill={color} />)
        }

        return starArray;
    }

    const handleFavClick = () => {
        if(!favClicked){
            setFavClicked(true);
            setFav(!fav);
            setTimeout(()=>{setFavClicked(false)}, 200);
        }
    }

    return(
        <Box backgroundColor={"white"} overflowY={"hidden"}>
                <Image
                    fit={"contain"}
                    maxW={["100%", "400px", "400px"]}
                    maxH={["100%", "400px", "400px"]}
                    w={"100vw"}
                    h={"100vw"}
                    src={props.img}
                />
                <Stack p={"2"} spacing={"4px"}>
                    <Box>
                        <Text fontWeight={"semibold"}>{props.price}</Text>
                        {props.discount?
                            (
                                <Stack direction={"row"}>
                                    <Text as='s' color={"gray.400"}>{props.originalPrice}</Text>
                                    <Badge
                                        alignSelf={"center"}
                                        backgroundColor={"red"}
                                        textColor={"white"}
                                        fontWeight={"bold"}
                                    >-{props.discount}%
                                    </Badge>
                                </Stack>
                            )
                            : ""
                        }
                        
                    </Box>
                    <Heading size={"md"}>
                        {props.name}
                    </Heading>
                        <Flex justify={"space-between"}>
                            <Stack direction={"row"} alignItems={"center"}>
                                <Stack direction={"row"} py={"1"} spacing={"0.5"} height={"fit-content"}>
                                    {RenderStarRating()}
                                </Stack>
                                <Text color={"gray.400"} height={"fit-content"}>
                                    {props.ulasan} ulasan
                                </Text>
                            </Stack>
                            <ActionIcon icon={<Heart fill=""/>} fill={fav? "red.500":"gray.300"} color={fav? "red.500":"gray.300"} onClick={handleFavClick} />
                        </Flex>
                </Stack>
            </Box>
    )
}