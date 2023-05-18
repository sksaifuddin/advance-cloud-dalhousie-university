package com.example.worker.controller;

import com.example.worker.payload.ProductSumRequestDto;
import com.example.worker.payload.ProductSumResponseDto;
import com.example.worker.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("calculate")
    public ResponseEntity<ProductSumResponseDto> calculateProductSum(@RequestBody ProductSumRequestDto requestDto) {
        return new ResponseEntity<>(productService.productSum(requestDto), HttpStatus.CREATED);
    }
}
