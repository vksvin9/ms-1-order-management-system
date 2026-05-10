package com.vin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vin.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}