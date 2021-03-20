package com.treinamento.gestaoRestaurante.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.treinamento.gestaoRestaurante.entities.Item;

public interface ItemRepository extends JpaRepository<Item, Long>{

}
