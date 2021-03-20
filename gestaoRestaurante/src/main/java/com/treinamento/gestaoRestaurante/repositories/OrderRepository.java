package com.treinamento.gestaoRestaurante.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.treinamento.gestaoRestaurante.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{

}
