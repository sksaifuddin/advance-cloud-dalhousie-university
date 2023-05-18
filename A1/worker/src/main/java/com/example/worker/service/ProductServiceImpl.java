package com.example.worker.service;

import com.example.worker.payload.ProductSumRequestDto;
import com.example.worker.payload.ProductSumResponseDto;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

@Service
public class ProductServiceImpl implements ProductService {

    @Override
    public ProductSumResponseDto productSum(ProductSumRequestDto requestDto) {
        int sum = 0;
        // read the file from the volume and calculate sum
        try {
            CSVReader csvReader = new CSVReaderBuilder(
                    new FileReader("../../../app/"+ requestDto.getFile())
            ).withSkipLines(1).build();
            String[] nextLine;

            // we are going to read data line by line
            while ((nextLine = csvReader.readNext()) != null) {
                String currentProduct = nextLine[0];
                int quantity = Integer.parseInt(nextLine[1]);

                if (currentProduct.equalsIgnoreCase(requestDto.getProduct())) {
                    sum += quantity;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }


        return new ProductSumResponseDto(requestDto.getFile(), sum);
    }


}
