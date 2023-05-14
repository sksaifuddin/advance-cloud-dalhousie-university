package com.example.master.service;

import com.example.master.exception.InvalidInputException;
import com.example.master.payload.ProductSumRequestDto;
import com.example.master.payload.ProductSumResponseDto;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

    @Override
    public ProductSumResponseDto productSum(ProductSumRequestDto requestDto) {
        if(requestDto.getFile() == null) {
            throw new InvalidInputException(requestDto.getFile());
        }
        return new ProductSumResponseDto(requestDto.getFile(), 22);
    }
}
