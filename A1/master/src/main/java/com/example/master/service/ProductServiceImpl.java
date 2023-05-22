package com.example.master.service;

import com.example.master.exception.FileNotFoundException;
import com.example.master.exception.InvalidFileFormatException;
import com.example.master.exception.InvalidInputException;
import com.example.master.payload.ProductSumRequestDto;
import com.example.master.payload.ProductSumResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
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
        ProductSumResponseDto productSumResponseDto = null;
        if(requestDto.getFile() == null || requestDto.getFile().isEmpty()) {
            throw new InvalidInputException(requestDto.getFile());
        }
        String filePath = "../../../app/";
//        String filePath = "src/main/java/com/example/master/service/";
        if(!(new File(filePath+ requestDto.getFile()).exists())) {
            throw new FileNotFoundException(requestDto.getFile());
        }

        String url = "http://worker:8081/calculate";
//        String url = "http://localhost:8081/calculate";
        try {
            URI uri = new URI(url);
            productSumResponseDto = restTemplate.postForObject(uri, requestDto, ProductSumResponseDto.class);
        } catch (HttpClientErrorException ex) {
            throw new InvalidFileFormatException(requestDto.getFile());
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }

        return productSumResponseDto;
    }


}
