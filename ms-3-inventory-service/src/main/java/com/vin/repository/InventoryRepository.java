package com.vin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vin.entity.Inventory;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    Optional<Inventory> findByProductId(Long productId);
}