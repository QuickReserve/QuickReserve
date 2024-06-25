import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Card, CardBody, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { Box, Center, FormControl, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

const fetchApi = async (value: string) => {
    const result = await fetch(`http://192.168.0.166:8080/sala/consultar-reservas/` + value)// retorna texto plano
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

    const navigate = useNavigate();
    
    const handleNavigateClick = () => {
            navigate("/");
        };


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
                <Stack flexDirection="row" justifyContent="space-between" >
                <Heading mb={5}>Consulte reserva do usuário</Heading>
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
                                    <ModalHeader>Reservas do usuário</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Heading  display="flex" justifyContent="center">{user}</Heading>
                                        <div> {aux?.map((x) => {
                                            return (
                                                <>
                                                    <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'  margin="0.5rem" >

                                                    <Stack>
                                                        <CardBody>
                                                        <Text py='2'>
                                                        <p>Sala reservada: {x.salaId}</p>
                                                        <p>Data: {x.diaString}</p>
                                                        <p>Horário: {x.hora}h</p>
                                                        </Text>
                                                        </CardBody>

                                                    </Stack>
                                                    </Card>
                                                    
                                                </>
                                            );
                                        })} </div>
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