import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { Form } from "react-router-dom";

export const CheckReservation = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [room, setReservation] = useState('');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!room) {
            // Se o campo da sala não estiver preenchido, não abra o modal
            return;
        }

        // Se todos os campos estiverem preenchidos, abra o modal
        onOpen();
    };
    return (
        <Center height="100vh" width="100vw">
            <Box maxW="xl" width="100%" maxWidth="500px" borderWidth="3px" borderRadius="lg" overflow="hidden" p={5}>
                <Heading mb={5}>Consulte a sua reserva</Heading>
                <Stack spacing={5} direction="column" >
                    <Form onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel marginLeft="5px" >Sala</FormLabel>
                            <Input placeholder='ex: sala 302B' />
                            <FormLabel marginLeft="5px">Data da reserva </FormLabel>
                            <Input placeholder='ex: 30-07-2004' />
                            <FormLabel marginLeft="5px">Horário da reserva </FormLabel>
                            <Input placeholder='ex: 15h' value={room} onChange={(e) => setReservation(e.target.value)} />
                            <Button mt={4} colorScheme='teal' type='submit'>
                                Enviar
                            </Button>
                            <Modal
                                isCentered
                                onClose={onClose}
                                isOpen={isOpen}
                                motionPreset='slideInBottom'>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Modal Title</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <div>oi aaaaa</div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                                            Close
                                        </Button>
                                        <Button variant='ghost'>Secondary Action</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </FormControl>
                    </Form>
                </Stack>
            </Box>
        </Center>
    );
};