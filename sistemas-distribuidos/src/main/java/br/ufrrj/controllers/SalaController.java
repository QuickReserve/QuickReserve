package br.ufrrj.controllers;

import br.ufrrj.models.dto.CriarSalaDto;
import br.ufrrj.services.SalaService;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;
import jakarta.ws.rs.core.Response.StatusType;

@Path("/sala")
public class SalaController {

    private SalaService salaService = SalaService.getInstance();

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response criarReserva(@Valid() CriarSalaDto criarSalaDto) {
        boolean sucesso = salaService.reservarSala(criarSalaDto.getSalaId(), criarSalaDto.getUsuario(),
                criarSalaDto.getDiaString(), criarSalaDto.getHora());

        if (!sucesso) {
            return Response.status(Status.CONFLICT).entity("Sala nesse horário e dia já foram reservados.").build();
        }

        return Response.ok("Sala reservada com sucesso.").build();
    }

    @DELETE
    @Path("{salaId}/{diaString}/{hora}")
    public Response removerReserva(@PathParam("salaId") String salaId,
            @PathParam("diaString") String diaString, @PathParam("hora") int hora) {
        boolean sucesso = salaService.removerReserva(salaId, diaString, hora);

        if (!sucesso) {
            return Response.status(Status.CONFLICT).entity("Não existe reserva com essas informações.").build();
        }

        return Response.ok("Operação efetuada com sucesso.").build();
    }

    @GET
    @Path("{salaId}/{diaString}/{hora}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response consultarReserva(@PathParam("salaId") String salaId,
            @PathParam("diaString") String diaString, @PathParam("hora") int hora) {
         var sucesso = salaService.consultarReserva(salaId, diaString, hora);
        
         if(sucesso == null)
         {
            return Response.status(Status.CONFLICT).entity("Não existe reserva com essas informações.").build();
         }
        return Response.ok(salaService.consultarReserva(salaId, diaString, hora)).build();
    }

    @GET
    @Path("consultar-reservas/{usuario}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response consultarReservasUsuario(@PathParam("usuario") String usuario) {
        return Response.ok(salaService.consultarReservasUsuario(usuario)).build();
    }

    @GET
    @Path("consultar-reservas-sala/{salaId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response consultarReservasSala(@PathParam("salaId") String salaId) {
        return Response.ok(salaService.consultarReservasSala(salaId)).build();
    }

}
