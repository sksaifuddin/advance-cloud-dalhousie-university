package com.example.worker.exception;

import com.example.worker.payload.ExceptionDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(InvalidFileFormatException.class)
    public ResponseEntity<ExceptionDto> invalidFileFormatException(InvalidFileFormatException exception) {
        InvalidFileFormatException invalidInputException = new InvalidFileFormatException(exception.getFile());
        ExceptionDto exceptionDto = new ExceptionDto();
        exceptionDto.setFile(invalidInputException.getFile());
        exceptionDto.setError(invalidInputException.getError());
        return new ResponseEntity<ExceptionDto>(exceptionDto, HttpStatus.BAD_REQUEST);
    }
}
