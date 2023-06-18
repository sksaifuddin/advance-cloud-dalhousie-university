package com.example.master.service;

import com.example.master.exception.InvalidInputException;
import com.example.master.exception.StoringFileException;
import com.example.master.payload.ProductSumRequestDto;
import com.example.master.payload.StoreFileRequestDTO;
import com.example.master.payload.StoreFileResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

@Service
public class StoreFileServiceImpl implements  StoreFileService{
    @Override
    public StoreFileResponseDto storeFile(StoreFileRequestDTO requestDto) {

        if(requestDto.getFile() == null || requestDto.getFile().isEmpty()) {
            throw new InvalidInputException(requestDto.getFile());
        }

        String filePath = "/shaik_PV_dir/";
        File file = new File(filePath.trim() + requestDto.getFile());
        try {
            FileWriter writer = new FileWriter(file, false);
            String[] lines = requestDto.getData().split("\\n");
            for (String line : lines) {
                writer.write(line.replaceAll("\\s", "").trim());
                writer.write("\n");
            }
            writer.close();
        } catch (IOException e) {
            throw new StoringFileException(requestDto.getFile());
        }
        return new StoreFileResponseDto(requestDto.getFile(), "cluster is updated with new changes");
    }
}
