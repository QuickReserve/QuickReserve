import { Box, Button, Center, FormControl, FormLabel, Heading, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure, useToast } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { Form } from "react-router-dom";
import { ArrowBackIcon } from '@chakra-ui/icons'



const fetchApi = async (salaId: string, usuario: string, diaString: string, hora: number) => {
    const result = await fetch(`http://192.168.195.246:8080/sala/`, {
        method: "POST",
        body: JSON.stringify({
            salaId,
            usuario,
            diaString,
            hora,
        }),
        headers: {
            "Content-Type": "application/json",
        }
    })
    return result.ok;
}

export const ReservationRegistration = () => {

    const toast = useToast()


    const [room, setRoom] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState<number>();


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!room || !name || !date || !time) {
            toast({
                title: 'Erro',
                description: 'Por favor, preencha todos os campos.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        fetchApi(room, name, date, time).then( (res) =>
        {
            if(res)
                {
                    toast({
                        title: 'Reserva feita com sucesso.',
                        description: "Criamos sua reserva.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    });
                }else{
                    toast({
                        title: 'Erro',
                        description: 'Sem disponibilidade',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    });
                }
        });

        
        // Limpar campos após a submissão
        setRoom('');
        setName('');
        setDate('');
        setTime(0);
    };
    
    const { isOpen, onClose } = useDisclosure()

 
    
    return (
        <Center height="100vh" width="100vw">
            <Box maxW="xl" width="100%" maxWidth="500px" borderWidth="3px" borderRadius="lg" overflow="hidden" p={5}>
            <Stack flexDirection="row" justifyContent="space-between" >
                <Heading mb={5}>Reserve sua sala</Heading>
                <IconButton
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
                            <FormLabel marginLeft="5px" >Digite qual sala você deseja reservar</FormLabel>
                            <Input placeholder='ex: sala 302B' value={room} onChange={(e) => setRoom(e.target.value)} />
                            <FormLabel marginLeft="5px">Nome</FormLabel>
                            <Input placeholder='Digite seu nome' value={name} onChange={(e) => setName(e.target.value)} />
                            <FormLabel marginLeft="5px" >Data da reserva </FormLabel>
                            <Input placeholder='ex: 30-07-2004' value={date} onChange={(e) => setDate(e.target.value)} />
                            <FormLabel marginLeft="5px">Horário da reserva </FormLabel>
                            <Input placeholder='ex: 15h' value={time} onChange={(e) => setTime(Number(e.target.value))} />
                            <Button type='submit' mt={4} colorScheme='teal'  >
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
                                        <div>oi</div>
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
