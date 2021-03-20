package com.treinamento.gestaoRestaurante.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.treinamento.gestaoRestaurante.entities.Item;
import com.treinamento.gestaoRestaurante.entities.Order;
import com.treinamento.gestaoRestaurante.entities.OrderItem;
import com.treinamento.gestaoRestaurante.entities.User;
import com.treinamento.gestaoRestaurante.repositories.ItemRepository;
import com.treinamento.gestaoRestaurante.repositories.OrderItemRepository;
import com.treinamento.gestaoRestaurante.repositories.OrderRepository;
import com.treinamento.gestaoRestaurante.repositories.UserRepository;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner{
	
	@Autowired
	private UserRepository users;
	
	@Autowired
	private ItemRepository items;
	
	@Autowired
	private OrderRepository orders;
	
	@Autowired
	private OrderItemRepository orderItems;

	@Override
	public void run(String... args) throws Exception {
		
		User u0 = new User(null, "admin", "admin");
		User u1 = new User(null, "maria", "123456");
		User u2 = new User(null, "alex", "123456");
		
		users.saveAll(Arrays.asList(u0, u1, u2));
		
		Order o1 = new Order(null, 2);
		Order o2 = new Order(null, 4);
		
		orders.saveAll(Arrays.asList(o1, o2));
		
		Item i1 = new Item(null, "frango assado", 10.0);
		Item i2 = new Item(null, "coca zero", 3.5);

		items.saveAll(Arrays.asList(i1, i2));
		
		OrderItem oi1 = new OrderItem(o1, i1, 2, i1.getPrice());
		OrderItem oi2 = new OrderItem(o1, i2, 3, i2.getPrice());
		OrderItem oi3 = new OrderItem(o2, i1, 1, i1.getPrice());
		OrderItem oi4 = new OrderItem(o2, i2, 1, i2.getPrice()); 
		
		orderItems.saveAll(Arrays.asList(oi1, oi2, oi3, oi4));
		 
	}

}
