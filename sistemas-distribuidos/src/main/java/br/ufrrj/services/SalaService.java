package br.ufrrj.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import br.ufrrj.models.ReservaInfo;
import br.ufrrj.models.Sala;

public class SalaService {

    private static SalaService salaService = new SalaService();

    public static SalaService getInstance() {
        return salaService;
    }

    private Map<String, Sala> salaMap;

    public SalaService() {
        this.salaMap = new HashMap<>();
    }

    public boolean reservarSala(String salaId, String usuario, String diaString, int hora) {
        Sala sala = createSalaIfNotExist(salaId);
        return sala.criarReserva(usuario, diaString, hora);
    }

    public boolean removerReserva(String salaId, String diaString, int hora) {
        Sala sala = salaMap.get(salaId);

        if (sala == null)
            return false;

        return sala.removerReserva(diaString, hora);
    }

    public ReservaInfo consultarReserva(String salaId, String diaString, int hora) {
        Sala sala = salaMap.get(salaId);

        
        if (sala == null)
            return null;

        
        return sala.consultarReserva(diaString, hora);
    }

    public Sala createSalaIfNotExist(String salaId) {
        Sala sala = salaMap.get(salaId);

        if (sala == null) {
            sala = new Sala(salaId);
            salaMap.put(salaId, sala);
        }

        return sala;
    }

    public List<ReservaInfo> consultarReservasUsuario(String usuario) {
        return this.salaMap.values().stream().flatMap(sala -> sala.getReservas().stream())
                .filter(reservaInfo -> reservaInfo.getUsuario().equals(usuario)).collect(Collectors.toList());
    }

    public List<ReservaInfo> consultarReservasSala(String salaId) {
        if (!salaMap.containsKey(salaId)) return new ArrayList<>();

        return salaMap.get(salaId).getReservas();
    }
}
