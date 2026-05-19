package com.mybudget.backend.DTOs;

import java.util.List;

public record SpentsDTO(int hobby, int streaming, int delivery, int essential, int occasional) {

    public SpentsDTO(List<Integer> data) {
        this(
                data.get(0),
                data.get(1),
                data.get(2),
                data.get(3),
                data.get(4)
        );
    }

}
