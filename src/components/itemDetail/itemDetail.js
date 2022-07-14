import { Stack, Box, Image, Text, Flex, Badge, Center, Heading, Table, TableContainer, Tr, Tbody, Td, Button, useBoolean, Collapse, Icon} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Star, Heart } from "react-feather";

export default function ItemDetail(){

    const [readMore, setReadMore] = useBoolean(false);
    const [fav, setFav] = useState(false);
    const [favClicked, setFavClicked] = useState(false);

    const props = {
        img: "https://bit.ly/2Z4KKcF",
        name: "Teh Celub Sosro - MMI - 91",
        price: "Rp 25.000",
        originalPrice: "Rp 32.000",
        discount: "50%",
        rating: "4.7",
        ulasan: "25",
        sold: "140",
        kategori: "Banten",
        berat: "1kg",
        asal: "Rumah",
        stock: "49",
        fav: false
    }

    const RenderStarRating = () =>{
        let starArray = [];

        for(let x = 0; x < 5; x++)
        {
            const color = x <= Math.ceil(parseInt(props.rating)) ? "gold" : "";
            starArray.push(<Icon key={x} as={Star} fill={color} />)
        }

        return starArray;
    }


    return(
        <Stack minH={"100vh"} backgroundColor={"gray.100"} spacing={"18px"} >
            <Box backgroundColor={"white"}>
                <Image
                    src={props.img}
                />
                <Stack p={"2"} spacing={"1"}>
                    <Box>
                        <Text fontWeight={"semibold"}>{props.price}</Text>
                        <Stack direction={"row"}>
                            <Text as='s' color={"gray.400"}>{props.originalPrice}</Text>
                            <Badge
                                p={"1"}
                                alignSelf={"center"}
                                backgroundColor={"red"}
                                textColor={"white"}
                                fontWeight={"bold"}
                            >{props.discount}</Badge>
                        </Stack>
                    </Box>
                    <Heading size={"md"}>
                        {props.name}
                    </Heading>
                        <Flex justify={"space-between"}>
                            <Stack direction={"row"}>
                                <Stack direction={"row"} py={"1"} spacing={"0.5"}>
                                    {RenderStarRating()}
                                </Stack>
                                <Text color={"gray.400"}>
                                    {props.ulasan} Ulasan
                                </Text>
                            </Stack>
                            <Button boxSize={"24px"} backgroundColor={"transparent"} _focus={{bgColor: "transparent"}} onClick={()=>{
                                if(!favClicked){ // Added an setTimeout to prevent click from rapid firing and causing it to fire event multiple time
                                    setFavClicked(true);
                                    setFav(!fav);
                                    setTimeout(()=>{setFavClicked(false);}, 250);
                                }  
                            }}>
                                <Icon as={Heart} boxSize={"24px"} alignSelf={"center"} fill={fav? "red.400":"gray.300"} color={fav? "red.400":"gray.300"}/>
                            </Button>
                        </Flex>
                </Stack>
            </Box>

            <Box backgroundColor={"white"}>
                <Stack p={"2"}>
                    <Heading size={"md"}>
                        Spesifikasi
                    </Heading>
                    <Stack spacing={"0px"} border={"1px"} borderColor={"gray.200"}>
                        <Flex borderBottom={"1px"} borderColor={"gray.200"}>
                            <Box w={"35%"} p={"2"} backgroundColor={"gray.100"}><Text>Kategori</Text></Box>
                            <Box flexGrow={"1"} p={"2"}><Text>{props.kategori}</Text></Box>
                        </Flex>
                        <Flex borderBottom={"1px"} borderColor={"gray.200"}>
                            <Box w={"35%"} p={"2"} backgroundColor={"gray.100"}><Text>Berat</Text></Box>
                            <Box flexGrow={"1"} p={"2"}><Text>{props.berat}</Text></Box>
                        </Flex>
                        <Flex>
                            <Box w={"35%"} p={"2"} backgroundColor={"gray.100"}><Text>Asal Barang</Text></Box>
                            <Box flexGrow={"1"} p={"2"}><Text>{props.asal}</Text></Box>
                        </Flex>
                    </Stack>
                </Stack>
            </Box>

            <Box backgroundColor={"white"} overflowY={"hidden" }>
                <Stack p={"2"}>
                    <Heading size={"md"}>
                        Informasi Barang
                    </Heading>
                    <Stack borderBottom={"1px"} borderBottomColor={"gray.200"}>
                        <Flex justify={"space-between"}>
                            <Box p={"2"}><Text>Stok</Text></Box>
                            <Box p={"2"}><Text>{props.stock}</Text></Box>
                        </Flex>
                        <Flex justify={"space-between"}>
                            <Box p={"2"}><Text>Terjual</Text></Box>
                            <Box p={"2"}><Text>{props.sold}</Text></Box>
                        </Flex>
                    </Stack>
                    <Collapse in={readMore} startingHeight={"200px"}>
                        <Box textAlign={"justify"}>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat non quam a consequat. Mauris fermentum mollis porta. Curabitur hendrerit metus at vehicula tincidunt. Sed elit libero, efficitur sed sem elementum, aliquet tempus lectus. Donec sed justo elit. Aliquam ante erat, sodales id porttitor eget, dapibus id enim. Suspendisse tincidunt, diam a convallis ullamcorper, elit magna suscipit neque, a eleifend dui sem sit amet nisl. Vivamus sit amet felis quis ipsum rutrum cursus eget sed velit. Cras dapibus auctor est.
                            </Text>
                            <br/>
                            <Text>
                                Nulla commodo arcu ut lorem tempor consectetur. Integer maximus eros elit, eget aliquet ex dictum in. Fusce vel posuere arcu. Sed vel tristique ligula. Vestibulum vel mi posuere, posuere nisl sed, ullamcorper lacus. Maecenas magna mi, laoreet in neque vitae, bibendum porttitor dui. Integer nec venenatis orci.
                            </Text>
                            <br/>   
                            <Text> 
                                Vivamus laoreet urna ligula, sit amet euismod sapien ornare eu. Nam vel vehicula ante, id facilisis risus. Nunc molestie venenatis volutpat. Maecenas luctus justo dolor, quis eleifend risus dictum ac. Proin mollis ac arcu eget tristique. Pellentesque vitae convallis sem. Nunc a augue et tellus faucibus aliquet in ac lacus. Sed vestibulum neque metus, at iaculis velit convallis a. Vivamus iaculis finibus tellus vitae tincidunt. Maecenas imperdiet volutpat est, ac egestas magna gravida et. Nunc eget nunc sit amet felis pharetra iaculis sed sit amet mauris. Nunc congue, purus ac molestie vestibulum, nisi lacus sollicitudin ex, eget mollis tortor augue at purus. Vivamus accumsan ultrices eleifend. Suspendisse a risus neque. Nulla aliquam, justo vitae blandit volutpat, odio sapien rhoncus enim, non porttitor augue ligula quis tellus. Suspendisse vulputate ut nisl ac bibendum.
                            </Text>
                            <br/>
                            <Text>    
                                Nunc in ornare odio. Nunc eleifend eu ipsum vel laoreet. Nullam nec faucibus eros, at egestas quam. Proin nec metus vel velit porta condimentum ac non urna. Quisque non ex ac ligula sodales consequat. Nullam in purus fermentum, ultrices tellus lobortis, ornare felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus enim a justo fringilla venenatis. Morbi vitae sodales lacus. Phasellus porta risus sed auctor pellentesque. Duis in est sed mauris placerat hendrerit. Morbi id dolor ullamcorper, varius justo ac, mattis nisl. Quisque mattis facilisis risus ac dignissim. In elementum ac urna ac maximus. Phasellus condimentum pulvinar fringilla.
                            </Text>
                            <br/>
                            <Text>    
                                Morbi non hendrerit nunc. Nunc tristique vitae orci sit amet blandit. Nam orci turpis, scelerisque maximus elementum eu, rhoncus quis nisi. Vivamus pulvinar aliquam urna venenatis elementum. Nulla libero sem, ullamcorper quis enim quis, euismod egestas purus. Quisque nisi neque, convallis et ornare vitae, malesuada in urna. Nulla ornare, turpis sed faucibus volutpat, ligula mi mattis sapien, et feugiat eros massa sed metus. 
                            </Text>
                            <br/>
                        </Box>
                    </Collapse>
                    <Button _focus={{backgroundColor: "transparent"}} p={"0"} backgroundColor={"transparent"} border={"none"} textColor={"blue"} onClick={setReadMore.toggle}>Show {readMore? "Less":"More"}</Button>
                </Stack>
            </Box>
        </Stack>     
    );
}