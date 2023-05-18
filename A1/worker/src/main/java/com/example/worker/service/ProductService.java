package com.example.worker.service;

import com.example.worker.payload.ProductSumRequestDto;
import com.example.worker.payload.ProductSumResponseDto;

public interface ProductService {
    ProductSumResponseDto productSum(ProductSumRequestDto requestDto);
}
