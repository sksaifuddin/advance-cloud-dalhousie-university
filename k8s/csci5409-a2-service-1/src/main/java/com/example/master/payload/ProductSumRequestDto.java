package com.example.master.payload;

import lombok.Data;

@Data
public class ProductSumRequestDto {
    private String file;

    public ProductSumRequestDto(String file, String product) {
        this.file = file;
        this.product = product;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    private String product;
}
