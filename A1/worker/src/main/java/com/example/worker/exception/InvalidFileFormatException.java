package com.example.worker.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class InvalidFileFormatException extends RuntimeException{
    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    private String file;
    private String error;

    public InvalidFileFormatException(String file) {
        this.file = file;
        this.error = "Input file not in CSV format.";
    }
}
