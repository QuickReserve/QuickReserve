import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Stack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Form } from "react-router-dom";


export const RemoveReservation = () => {
    const toast = useToast()

    const [room, setRoom] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');



    const handleSubmit = (e: { preventDefault: () => void; }) => {
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

            toast({
                title: 'Reserva removida com sucesso.',
                description: "Removemos a sua reserva.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        }
        // Limpar campos após a submissão
        setRoom('');
        setDate('');
        setTime('');
    };



    return (
        <Center height="100vh" width="100vw">
            <Box maxW="xl" width="100%" maxWidth="500px" borderWidth="3px" borderRadius="lg" overflow="hidden" p={5}>
                <Heading mb={5}>Remova a sua reserva</Heading>
                <Stack spacing={5} direction="column" >
                    <Form onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel marginLeft="5px" >Sala</FormLabel>
                            <Input placeholder='ex: sala 302B' onChange={(e) => setRoom(e.target.value)} />
                            <FormLabel marginLeft="5px">Data da reserva </FormLabel>
                            <Input placeholder='ex: 30-07-2004' onChange={(e) => setDate(e.target.value)} />
                            <FormLabel marginLeft="5px">Horário da reserva </FormLabel>
                            <Input placeholder='ex: 15h' onChange={(e) => setTime(e.target.value)} />
                            <Button mt={4} colorScheme='teal' type='submit'>
                                Remover
                            </Button>
                        </FormControl>
                    </Form>
                </Stack>
            </Box>
        </Center>
    );
};