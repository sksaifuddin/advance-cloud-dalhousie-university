package com.example.worker.payload;

import lombok.Data;

@Data
public class ProductSumResponseDto {
    private String file;
    private int sum;

    public ProductSumResponseDto(String file, int sum) {
        this.file = file;
        this.sum = sum;
    }
}
