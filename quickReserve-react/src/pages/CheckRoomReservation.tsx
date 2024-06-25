import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody, Center, FormControl, FormLabel, Heading, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

type ReservaSala = {
    hora: number;
    salaId: string;
    usuario: string;
    diaString: string;
};

const fetchApi = async (value: string): Promise<ReservaSala[]> => {
    const result = await fetch(`http://192.168.0.166:8080/sala/consultar-reservas-sala/` + value)
        .then((res) => res.json());
    return result;
}

export const CheckRoomReservation = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [room, setRoom] = useState('');
    const [aux, setAux] = useState<ReservaSala[]>([]);

    const navigate = useNavigate();

    const handleNavigateClick = () => {
        navigate("/");
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!room) {
            return;
        }

        fetchApi(room).then((result) => {
            setAux(result);
            onOpen();
        });
    };

    return (
        <Center height="100vh" width="100vw">
            <Box maxW="xl" width="100%" maxWidth="500px" borderWidth="3px" borderRadius="lg" overflow="hidden" p={5}>
                <Stack flexDirection="row" justifyContent="space-between" >
                <Heading mb={5}>Consulte as reservas de uma sala</Heading>
                <IconButton onClick={handleNavigateClick}
                    isRound={true}
                    variant='solid'
                    colorScheme='teal'
                    aria-label='Done'
                    fontSize='20px'
                    icon={<ArrowBackIcon />}
                />
                </Stack>
                <Stack spacing={5} direction="column">
                    <Form onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel marginLeft="5px">Digite qual sala você deseja reservar</FormLabel>
                            <Input placeholder='ex: sala 302B' value={room} onChange={(e) => setRoom(e.target.value)} />
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
                                    <ModalHeader>Reservas da sala 
                                    </ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody >
                                    <Heading  display="flex" justifyContent="center">{room}</Heading>
                                    <div>   {aux.length > 0 ? (
                                            aux.map((x) => (
                                                <div>
                                                <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'  margin="0.5rem" >

                                                <Stack>
                                                    <CardBody>
                                                    <Heading size='md'><p>{x.usuario}</p></Heading>

                                                    <Text py='2'>
                                                    <p>Data: {x.diaString}</p>
                                                    <p>Horario reservado: {x.hora}h</p>
                                                    </Text>
                                                    </CardBody>

                                                </Stack>
                                                </Card>
                                                </div>
                                            ))
                                        ) : (
                                            <div>Nenhuma reserva encontrada.</div>
                                        )}</div>
                                    </ModalBody>
                                </ModalContent>
                            </Modal>
                        </FormControl>
                    </Form>
                </Stack>
            </Box>
        </Center>
    );
};
