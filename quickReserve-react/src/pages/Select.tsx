import { Box, Button, Center, Heading, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

/*export const Select = () => {
    const navigate = useNavigate();
  
    const handleNavigateClick = () => {
      navigate("/Cadastrar");
    };*/

export const Select = () => {
    const navigate = useNavigate();

    const handleNavigateClick = () => {
        navigate("/Cadastrar");
    };

    const handleNavigateClickRemove = () => {
        navigate("/Remover");
    };

    const handleNavigateClickRoom = () => {
        navigate("/Sala");
    };

    const handleNavigateClickUser = () => {
        navigate("/Usuario");
    };

    const handleNavigateClickReservation = () => {
        navigate("/Reserva");
    };

    return (
        <Center height="100vh" width="100vw">
            <Box maxW="xl" width="100%" maxWidth="500px" borderWidth="3px" borderRadius="lg" overflow="hidden" p={5}>
                <Heading mb={5}>Selecione uma das ações</Heading>
                <Stack spacing={5} direction="column" align="center">
                    <Button onClick={handleNavigateClick} colorScheme="teal" size="lg" width="100%">
                        Cadastrar reserva
                    </Button>
                    <Button onClick={handleNavigateClickRemove} colorScheme="teal" size="lg" width="100%">
                        Remover reserva
                    </Button>
                    <Button onClick={handleNavigateClickRoom} colorScheme="teal" size="lg" width="100%">
                        Consultar reserva de uma sala
                    </Button>
                    <Button onClick={handleNavigateClickUser} colorScheme="teal" size="lg" width="100%">
                        Consultar reserva do usuário
                    </Button>
                    <Button onClick={handleNavigateClickReservation} colorScheme="teal" size="lg" width="100%">
                        Consultar reserva
                    </Button>
                </Stack>
            </Box>
        </Center>
    );
};
