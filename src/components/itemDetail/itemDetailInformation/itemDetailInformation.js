import { Stack, Box, Text, Flex, Heading, Divider, Button, useBoolean, Collapse} from "@chakra-ui/react";

export default function ItemDetailInformation(props){
    const [readMore, setReadMore] = useBoolean(false);

    return (
        <Box backgroundColor={"white"} overflowY={"hidden" }>
                <Stack p={"2"}>
                    <Heading size={"md"}>
                        Informasi Barang
                    </Heading>
                    <Stack spacing={"2px"}>
                        <Flex justify={"space-between"}>
                            <Box p={"2"}><Text>Kategori</Text></Box>
                            <Box p={"2"}><Text>{props.kategori}</Text></Box>
                        </Flex>
                        <Flex justify={"space-between"}>
                            <Box p={"2"}><Text>Stok</Text></Box>
                            <Box p={"2"}><Text>{props.stock}</Text></Box>
                        </Flex>
                        <Flex justify={"space-between"}>
                            <Box p={"2"}><Text>Terjual</Text></Box>
                            <Box p={"2"}><Text>{props.sold}</Text></Box>
                        </Flex>
                    </Stack>
                    <Divider />
                    <Collapse in={readMore} startingHeight={"200px"}>
                        <Box textAlign={"justify"}>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat non quam a consequat. Mauris fermentum mollis porta. Curabitur hendrerit metus at vehicula tincidunt. Sed elit libero, efficitur sed sem elementum, aliquet tempus lectus. Donec sed justo elit. Aliquam ante erat, sodales id porttitor eget, dapibus id enim. Suspendisse tincidunt, diam a convallis ullamcorper, elit magna suscipit neque, a eleifend dui sem sit amet nisl. Vivamus sit amet felis quis ipsum rutrum cursus eget sed velit. Cras dapibus auctor est.
                                <br/>
                                Nulla commodo arcu ut lorem tempor consectetur. Integer maximus eros elit, eget aliquet ex dictum in. Fusce vel posuere arcu. Sed vel tristique ligula. Vestibulum vel mi posuere, posuere nisl sed, ullamcorper lacus. Maecenas magna mi, laoreet in neque vitae, bibendum porttitor dui. Integer nec venenatis orci.
                                <br/>   
                                Vivamus laoreet urna ligula, sit amet euismod sapien ornare eu. Nam vel vehicula ante, id facilisis risus. Nunc molestie venenatis volutpat. Maecenas luctus justo dolor, quis eleifend risus dictum ac. Proin mollis ac arcu eget tristique. Pellentesque vitae convallis sem. Nunc a augue et tellus faucibus aliquet in ac lacus. Sed vestibulum neque metus, at iaculis velit convallis a. Vivamus iaculis finibus tellus vitae tincidunt. Maecenas imperdiet volutpat est, ac egestas magna gravida et. Nunc eget nunc sit amet felis pharetra iaculis sed sit amet mauris. Nunc congue, purus ac molestie vestibulum, nisi lacus sollicitudin ex, eget mollis tortor augue at purus. Vivamus accumsan ultrices eleifend. Suspendisse a risus neque. Nulla aliquam, justo vitae blandit volutpat, odio sapien rhoncus enim, non porttitor augue ligula quis tellus. Suspendisse vulputate ut nisl ac bibendum.
                                <br/>
                                Nunc in ornare odio. Nunc eleifend eu ipsum vel laoreet. Nullam nec faucibus eros, at egestas quam. Proin nec metus vel velit porta condimentum ac non urna. Quisque non ex ac ligula sodales consequat. Nullam in purus fermentum, ultrices tellus lobortis, ornare felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus enim a justo fringilla venenatis. Morbi vitae sodales lacus. Phasellus porta risus sed auctor pellentesque. Duis in est sed mauris placerat hendrerit. Morbi id dolor ullamcorper, varius justo ac, mattis nisl. Quisque mattis facilisis risus ac dignissim. In elementum ac urna ac maximus. Phasellus condimentum pulvinar fringilla.
                                <br/>
                                Morbi non hendrerit nunc. Nunc tristique vitae orci sit amet blandit. Nam orci turpis, scelerisque maximus elementum eu, rhoncus quis nisi. Vivamus pulvinar aliquam urna venenatis elementum. Nulla libero sem, ullamcorper quis enim quis, euismod egestas purus. Quisque nisi neque, convallis et ornare vitae, malesuada in urna. Nulla ornare, turpis sed faucibus volutpat, ligula mi mattis sapien, et feugiat eros massa sed metus. 
                            </Text>
                        </Box>
                    </Collapse>
                    <Button _active={{"bgColor": "transparent"}} _focus={{"bgColor": "transparent"}} p={"0"} backgroundColor={"transparent"} border={"none"} textColor={"blue"} onClick={setReadMore.toggle}>Show {readMore? "Less":"More"}</Button>
                    <Divider />
                    <Button _active={{"bgColor": "transparent"}} _focus={{"bgColor": "transparent"}} p={"0"} backgroundColor={"transparent"} border={"none"} textColor={"grey"}>Laporkan Barang</Button>
                </Stack>
            </Box>
    )
}