package com.example.worker.service;

import com.example.worker.exception.InvalidFileFormatException;
import com.example.worker.payload.ProductSumRequestDto;
import com.example.worker.payload.ProductSumResponseDto;
import com.opencsv.CSVParser;
import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

@Service
public class ProductServiceImpl implements ProductService {

    /**
     * used examples from this page: https://www.geeksforgeeks.org/reading-csv-file-java-using-opencsv/ to
     * know how to use openCSV to read csv files.
     * @param requestDto
     */
    @Override
    public ProductSumResponseDto productSum(ProductSumRequestDto requestDto) {
        int sum = 0;
        // read the file from the volume and calculate sum
        // comment for commit
        try {
            CSVParser csvParser = new CSVParserBuilder().withSeparator(',').withIgnoreQuotations(true).build();
            String filePath = "/shaik_PV_dir/";
//            String filePath = "src/main/java/com/example/worker/service/";
            CSVReader csvReader = new CSVReaderBuilder(
                    new FileReader(filePath + requestDto.getFile())
            ).withCSVParser(csvParser).withSkipLines(0).build();

            String[] header = csvReader.readNext();
            String[] nextLine;

            if(header != null && header.length != 0  && header[1].equals("amount")) {
                while ((nextLine = csvReader.readNext()) != null) {
                    String currentProduct = nextLine[0];
                    int quantity = Integer.parseInt(nextLine[1]);

                    if (currentProduct.equals(requestDto.getProduct())) {
                        sum += quantity;
                    }
                }
            } else {
                throw new InvalidFileFormatException(requestDto.getFile());
            }

        } catch (Exception e) {
            throw new InvalidFileFormatException(requestDto.getFile());
        }


        return new ProductSumResponseDto(requestDto.getFile(), sum);
    }


}
