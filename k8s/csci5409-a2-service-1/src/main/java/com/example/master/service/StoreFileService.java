package com.example.master.service;

import com.example.master.payload.ProductSumRequestDto;
import com.example.master.payload.StoreFileRequestDTO;
import com.example.master.payload.StoreFileResponseDto;

public interface StoreFileService {
    StoreFileResponseDto storeFile(StoreFileRequestDTO requestDto);
}
