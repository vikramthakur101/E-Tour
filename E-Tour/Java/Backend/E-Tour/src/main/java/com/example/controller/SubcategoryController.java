package com.example.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.SubcategoryMaster;
import com.example.services.SubcategoryMasterServices;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/subcategory")
public class SubcategoryController {

    @Autowired
    private SubcategoryMasterServices service;

    // Get subcategories by categoryId
    @GetMapping("/{categoryId}")
    public ResponseEntity<List<SubcategoryMaster>> getAllSubcategories(@PathVariable Integer categoryId) {
        List<SubcategoryMaster> subcategories = service.getAllSubcategory(categoryId);
        if (subcategories.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
        return ResponseEntity.ok(subcategories);
    }
}
