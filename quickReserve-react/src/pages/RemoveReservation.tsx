import { ArrowBackIcon } from "@chakra-ui/icons";
import { 
    Box, Button, Center, FormControl, FormLabel, Heading, IconButton, Input, 
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, 
    ModalOverlay, Stack, useDisclosure, useToast 
} from "@chakra-ui/react";
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

// Definindo os tipos dos parâmetros da função fetchApi
type FetchApiParams = {
    room: string;
    date: string;
    time: string;
};

const fetchApi = async ({ room, date, time }: FetchApiParams) => {
    const response = await fetch(`http://192.168.0.166:8080/sala/${room}/${date}/${time}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
};

export const RemoveReservation = () => {
    const toast = useToast();
    const { isOpen, onClose } = useDisclosure();

    const [room, setRoom] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const navigate = useNavigate();

    const handleNavigateClick = () =>{
        navigate("/");
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!room || !date || !time) {
            toast({
                title: 'Erro',
                description: 'Por favor, preencha todos os campos.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            return;
        } else {
            try {
                const response = await fetchApi({ room, date, time });

                if (response.ok) {
                    toast({
                        title: 'Reserva removida com sucesso.',
                        description: "Removemos a sua reserva.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    });
                } else {
                    toast({
                        title: 'Erro',
                        description: 'Houve um problema ao remover a reserva.',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    });
                }
            } catch (error) {
                toast({
                    title: 'Erro',
                    description: 'Não foi possível conectar ao servidor.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
        }
        // Limpar campos após a submissão
        setRoom('');
        setDate('');
        setTime('');
    };

    return (
        <Center height="100vh" width="100vw">
            <Box maxW="xl" width="100%" maxWidth="500px" borderWidth="3px" borderRadius="lg" overflow="hidden" p={5}>
            <Stack flexDirection="row" justifyContent="space-between" >
                <Heading mb={5}>Remova a sua reserva</Heading>
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
                            <FormLabel marginLeft="5px">Sala</FormLabel>
                            <Input placeholder='ex: sala 302B' value={room} onChange={(e) => setRoom(e.target.value)} />
                            <FormLabel marginLeft="5px">Data da reserva</FormLabel>
                            <Input placeholder='ex: 30-07-2004' value={date} onChange={(e) => setDate(e.target.value)} />
                            <FormLabel marginLeft="5px">Horário da reserva</FormLabel>
                            <Input placeholder='ex: 15h' value={time} onChange={(e) => setTime(e.target.value)} />
                            <Button mt={4} colorScheme='teal' type='submit'>
                                Remover
                            </Button>
                            <Modal
                                isCentered
                                onClose={onClose}
                                isOpen={isOpen}
                                motionPreset='slideInBottom'>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Reservas do usuário</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <div>oi</div>
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
