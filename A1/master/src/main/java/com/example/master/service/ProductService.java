package com.example.master.service;

import com.example.master.payload.ProductSumRequestDto;
import com.example.master.payload.ProductSumResponseDto;

public interface ProductService {
    ProductSumResponseDto productSum(ProductSumRequestDto requestDto);
}
