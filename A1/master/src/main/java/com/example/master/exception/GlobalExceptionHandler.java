package com.example.master.exception;

import com.example.master.payload.ExceptionDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(InvalidInputException.class)
    public ResponseEntity<ExceptionDto> invalidInputException(InvalidInputException exception) {
        InvalidInputException invalidInputException = new InvalidInputException(exception.getFile());
        ExceptionDto exceptionDto = new ExceptionDto();
        exceptionDto.setFile(invalidInputException.getFile());
        exceptionDto.setError(invalidInputException.getError());
        return new ResponseEntity<ExceptionDto>(exceptionDto, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(FileNotFoundException.class)
    public ResponseEntity<ExceptionDto> fileNotFoundException(FileNotFoundException exception) {
        FileNotFoundException fileNotFoundException = new FileNotFoundException(exception.getFile());
        ExceptionDto exceptionDto = new ExceptionDto();
        exceptionDto.setFile(fileNotFoundException.getFile());
        exceptionDto.setError(fileNotFoundException.getError());
        return new ResponseEntity<ExceptionDto>(exceptionDto, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidFileFormatException.class)
    public ResponseEntity<ExceptionDto> invalidFileFormatException(InvalidFileFormatException exception) {
        InvalidFileFormatException invalidInputException = new InvalidFileFormatException(exception.getFile());
        ExceptionDto exceptionDto = new ExceptionDto();
        exceptionDto.setFile(invalidInputException.getFile());
        exceptionDto.setError(invalidInputException.getError());
        return new ResponseEntity<ExceptionDto>(exceptionDto, HttpStatus.BAD_REQUEST);
    }
}
