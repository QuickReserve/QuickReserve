import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { Box, Center, FormControl, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { Form } from "react-router-dom";

const fetchApi = async (value: string) => {
    const result = await fetch(`http://192.168.195.246:8080/sala/consultar-reservas/` + value)// retorna texto plano
        .then((res) => res.json())//transforma em um objeto javaScript
        .then((res) => {
            return res;
        });
    return result;
}



export const CheckUserReservation = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [user, setUser] = useState('');
    const [aux, setAux] = useState<any[] | null>(null);


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!user) {
            // Se o campo da sala não estiver preenchido, não abra o modal
            return;
        }

        // Se todos os campos estiverem preenchidos, abra o modal

        fetchApi(user).then((aux) => {
            setAux(aux);
            onOpen();
        });
    };
    return (
        <Center height="100vh" width="100vw">
            <Box maxW="xl" width="100%" maxWidth="500px" borderWidth="3px" borderRadius="lg" overflow="hidden" p={5}>
                <Heading mb={5}>Consulte a sua reserva</Heading>
                <Stack spacing={5} direction="column" >
                    <Form onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel marginLeft="5px">Nome</FormLabel>
                            <Input placeholder='Digite seu nome' value={user} onChange={(e) => setUser(e.target.value)} />
                            <Button mt={4} colorScheme='teal' type='submit' >
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
                                        <div> {aux?.map((x) => {
                                            return (
                                                <>
                                                    <h1>{x.salaId}</h1>
                                                    <h2>{x.usuario}</h2>
                                                </>
                                            );
                                        })} </div>
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