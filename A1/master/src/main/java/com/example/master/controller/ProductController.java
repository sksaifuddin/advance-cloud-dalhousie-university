package com.example.master.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    @PostMapping("calculate")
    public int calculateProductSum() {
        return 0;
    }
}
