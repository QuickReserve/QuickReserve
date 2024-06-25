package br.ufrrj.models;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReservaInfo {
    private String salaId;
    private String usuario;
    private String diaString;
    private int hora;
}