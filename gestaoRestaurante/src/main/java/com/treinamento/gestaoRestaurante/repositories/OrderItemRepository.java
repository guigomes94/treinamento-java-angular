package com.treinamento.gestaoRestaurante.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.treinamento.gestaoRestaurante.entities.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
