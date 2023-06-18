package com.example.master.payload;

import lombok.Data;

@Data
public class ProductSumResponseDto {
    private String file;
    private String sum;

    public ProductSumResponseDto(String file, String sum) {
        this.file = file;
        this.sum = sum;
    }
}
