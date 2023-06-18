package com.example.master.controller;

import com.example.master.payload.ProductSumRequestDto;
import com.example.master.payload.ProductSumResponseDto;
import com.example.master.payload.StoreFileRequestDTO;
import com.example.master.payload.StoreFileResponseDto;
import com.example.master.service.ProductService;
import com.example.master.service.StoreFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private StoreFileService storeFileService;

    @PostMapping("calculate")
    public ResponseEntity<ProductSumResponseDto> calculateProductSum(@RequestBody ProductSumRequestDto requestDto) {
        return new ResponseEntity<>(productService.productSum(requestDto), HttpStatus.CREATED);
    }

    @PostMapping("store-file")
    public ResponseEntity<StoreFileResponseDto> storeFile(@RequestBody StoreFileRequestDTO requestDto) {
        return new ResponseEntity<>(storeFileService.storeFile(requestDto), HttpStatus.CREATED);
    }
}
