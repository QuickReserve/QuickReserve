package br.ufrrj.models.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CriarSalaDto {

    private String salaId;
    private String usuario;
    private String diaString;
    private int hora;

    @Override
    public String toString() {
        return "CriarSalaDto [salaId=" + salaId + ", usuario=" + usuario + ", diaString=" + diaString + ", hora=" + hora
                + "]";
    }

    

}
