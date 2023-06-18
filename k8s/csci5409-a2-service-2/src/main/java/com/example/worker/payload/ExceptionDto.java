package com.example.worker.payload;

import lombok.Data;

@Data
public class ExceptionDto {
    private String file;
    private String error;
}
