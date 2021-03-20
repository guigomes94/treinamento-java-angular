package com.treinamento.gestaoRestaurante.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.treinamento.gestaoRestaurante.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
