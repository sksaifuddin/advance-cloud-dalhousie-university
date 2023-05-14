package com.example.master.service;

import com.example.master.exception.FileNotFoundException;
import com.example.master.exception.InvalidInputException;
import com.example.master.payload.ProductSumRequestDto;
import com.example.master.payload.ProductSumResponseDto;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class ProductServiceImpl implements ProductService {

    @Override
    public ProductSumResponseDto productSum(ProductSumRequestDto requestDto) {
        if(requestDto.getFile() == null) {
            throw new InvalidInputException(requestDto.getFile());
        }

        if(!(new File( "./test.csv").isFile())) {
            throw new FileNotFoundException(requestDto.getFile());
        }
        return new ProductSumResponseDto(requestDto.getFile(), 22);
    }


}
