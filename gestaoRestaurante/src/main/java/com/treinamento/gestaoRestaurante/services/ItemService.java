package com.treinamento.gestaoRestaurante.services;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.treinamento.gestaoRestaurante.entities.Item;
import com.treinamento.gestaoRestaurante.repositories.ItemRepository;
import com.treinamento.gestaoRestaurante.services.exceptions.DatabaseException;
import com.treinamento.gestaoRestaurante.services.exceptions.ResourceNotFoundException;

@Service
public class ItemService {

	@Autowired
	private ItemRepository repository;
	
	public List<Item> findAll() {
		return repository.findAll();
	}
	
	public Item findById(Long id) {
		return repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(id));
	}	 
	
	public Item insert(Item obj) {
		return repository.save(obj);
	}
	
	public Item update(Long id, Item obj) {
		try {
			Item entity = repository.getOne(id);
			updateData(entity, obj);
			return repository.save(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
	}
	
	private void updateData(Item entity, Item obj) {
		entity.setName(obj.getName());
		entity.setPrice(obj.getPrice());
		
	}

	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException(id);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException(e.getMessage());
		}
		
	}
}
