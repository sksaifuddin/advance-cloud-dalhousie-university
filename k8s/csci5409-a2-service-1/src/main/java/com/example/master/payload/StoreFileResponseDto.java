package com.example.master.payload;

import lombok.Data;

@Data
public class StoreFileResponseDto {
    private String file;
    private String message;

    public StoreFileResponseDto(String file, String message) {
        this.file = file;
        this.message = message;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
