package com.example.master.exception;

public class StoringFileException extends RuntimeException{
    private String file;
    private String error;

    public StoringFileException(String file) {
        this.file = file;
        this.error = "Error while storing the file to the storage.";
    }

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
}
