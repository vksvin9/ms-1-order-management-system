package com.vin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vin.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByNameIgnoreCase(String name);

    boolean existsByNameIgnoreCase(String name);
}