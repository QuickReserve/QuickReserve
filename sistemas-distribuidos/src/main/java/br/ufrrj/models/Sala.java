package br.ufrrj.models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

public class Sala {

    private String id;
    private Map<String, Map<Integer, String>> map;

    public Sala(String id) {
        this.id = id;
        this.map = new HashMap<>();
    }

    public boolean criarReserva(String usuario, String dia, int hora) {
        var mapaDoDia = this.map.get(dia); // pega o mapa do dia

        if (mapaDoDia == null) { // se o mapa do dia não existir, cria ele
            mapaDoDia = new HashMap<>();
            this.map.put(dia, mapaDoDia);
        }

        if (mapaDoDia.containsKey(hora))
            return false;

        mapaDoDia.put(hora, usuario);
        return true;
    }

    public String getId() {
        return id;
    }

    public boolean removerReserva(String diaString, int hora) {
        if (!this.map.containsKey(diaString))
            return false;

        if (!this.map.get(diaString).containsKey(hora))
            return false;

        this.map.get(diaString).remove(hora);
        return true;
    }

    public List<ReservaInfo> getReservas() {
        List<ReservaInfo> reservaInfos = new ArrayList<>();

        for (Entry<String, Map<Integer, String>> diaReservas : this.map.entrySet()) {
            for (Entry<Integer, String> reservas : diaReservas.getValue().entrySet()) {
                reservaInfos
                        .add(new ReservaInfo(this.id, reservas.getValue(), diaReservas.getKey(), reservas.getKey()));
            }
        }

        return reservaInfos;
    }

    public ReservaInfo consultarReserva(String diaString, int hora)
    {
        ReservaInfo reservaInfo = new ReservaInfo(this.id, this.map.get(diaString).get(hora), diaString, hora);

        return reservaInfo;
    }

}
