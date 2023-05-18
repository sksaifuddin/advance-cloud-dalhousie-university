package com.example.master.service;

import com.example.master.exception.FileNotFoundException;
import com.example.master.exception.InvalidInputException;
import com.example.master.payload.ProductSumRequestDto;
import com.example.master.payload.ProductSumResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.net.URI;
import java.net.URISyntaxException;

@Service
public class ProductServiceImpl implements ProductService {
    private RestTemplate restTemplate;

    @Autowired
    public void MyService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }
    @Override
    public ProductSumResponseDto productSum(ProductSumRequestDto requestDto) {
        ProductSumResponseDto productSumResponseDto;
        if(requestDto.getFile() == null) {
            throw new InvalidInputException(requestDto.getFile());
        }

        if(!(new File("../../../app/" + requestDto.getFile()).isFile())) {
            throw new FileNotFoundException(requestDto.getFile());
        }

        String url = "http://worker:8081/calculate";
        try {
            URI uri = new URI(url);

            productSumResponseDto = restTemplate.postForObject(uri, requestDto, ProductSumResponseDto.class);

        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }

        // code to make api call to worker and get sum
        // replace the below line

        return productSumResponseDto;
    }


}
