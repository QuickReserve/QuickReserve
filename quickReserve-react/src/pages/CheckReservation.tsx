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
        .then((res) => res.json())
        .then((res) => {
            return res;
        });
    return result;
}

export const CheckReservation = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [checkReservation, setCheckReservation] = useState('');
    const [aux, setAux] = useState<ReservaSala[]>([]);

    const navigate = useNavigate();

    const handleNavigateClick = () => {
        navigate("/");
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!checkReservation) {
            // Se o campo da sala não estiver preenchido, não abra o modal
            return;
        }

        // Se todos os campos estiverem preenchidos, abra o modal
        fetchApi(checkReservation).then((aux) => {
            setAux(aux);
            onOpen();
        });
    };
    return (
        <Center height="100vh" width="100vw">
            <Box maxW="xl" width="100%" maxWidth="500px" borderWidth="3px" borderRadius="lg" overflow="hidden" p={5}>
                <Stack flexDirection="row" justifyContent="space-between" >
                <Heading mb={5}>Consulte uma reserva</Heading>
                <IconButton onClick={handleNavigateClick}
                    isRound={true}
                    variant='solid'
                    colorScheme='teal'
                    aria-label='Done'
                    fontSize='20px'
                    icon={<ArrowBackIcon />}
                />
                </Stack>
                <Stack spacing={5} direction="column" >
                    <Form onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel marginLeft="5px" >Sala</FormLabel>
                            <Input placeholder='ex: sala 302B' />
                            <FormLabel marginLeft="5px">Data da reserva </FormLabel>
                            <Input placeholder='ex: 30-07-2004' />
                            <FormLabel marginLeft="5px">Horário da reserva </FormLabel>
                            <Input placeholder='ex: 15h' value={checkReservation} onChange={(e) => setCheckReservation(e.target.value)} />
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
                                    <ModalHeader>Consulte uma reserva</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <div>
                                        {aux.length > 0 ? (
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
                                        )}
                                        </div>
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