package com.treinamento.gestaoRestaurante.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.treinamento.gestaoRestaurante.entities.Item;
import com.treinamento.gestaoRestaurante.entities.Order;
import com.treinamento.gestaoRestaurante.entities.OrderItem;
import com.treinamento.gestaoRestaurante.entities.OrderItemDTO;
import com.treinamento.gestaoRestaurante.repositories.ItemRepository;
import com.treinamento.gestaoRestaurante.repositories.OrderItemRepository;
import com.treinamento.gestaoRestaurante.repositories.OrderRepository;
import com.treinamento.gestaoRestaurante.services.exceptions.DatabaseException;
import com.treinamento.gestaoRestaurante.services.exceptions.ResourceNotFoundException;

@Service
public class OrderService {

	@Autowired
	private OrderRepository repository;
	
	@Autowired
	private OrderItemRepository orderItemsRepository;
	
	@Autowired
	private ItemRepository itemRepository;
	
	public List<Order> findAll() {
		return repository.findAll();
	}
	
	public Order findById(Long id) {
		return repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(id));
	}	 
	
	public Order insert(Order obj) {
		return repository.save(obj);
	}
	
	public Order update(Long id, Order obj) {
		try {
			Order entity = repository.getOne(id);
			updateData(entity, obj);
			return repository.save(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
	}
	
	private void updateData(Order entity, Order obj) {
		entity.setStatus(obj.getStatus());
		
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
	
	public void insertItem(OrderItemDTO item, Long orderId) {
		Order order = findById(orderId);
		Optional<Item> addItem = itemRepository.findById(item.getItemId());
		if (addItem.get() != null) {
				Item i = addItem.get();
				orderItemsRepository.save(new OrderItem(order, i, item.getQuantity(), i.getPrice()));
			} else {
				throw new ResourceNotFoundException(item.getItemId());
			}
		
	}
	
}
