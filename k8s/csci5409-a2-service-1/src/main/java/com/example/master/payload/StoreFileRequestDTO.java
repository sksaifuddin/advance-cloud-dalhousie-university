package com.example.master.payload;

import lombok.Data;

@Data
public class StoreFileRequestDTO {
    private String file;
    private String data;

    public StoreFileRequestDTO(String file, String data) {
        this.file = file;
        this.data = data;
    }

    public String getFile() {
        return file;
    }

    public String getData() {
        return data;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public void setData(String data) {
        this.data = data;
    }
}
