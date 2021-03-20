package com.treinamento.gestaoRestaurante.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name ="tb_order")
public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private Integer tableNumber;
	
	private Integer status = 1;
	
	@OneToMany(mappedBy = "id.order")
	private Set<OrderItem> items = new HashSet<>();
	
	public Order() {
		
	}
	
	public Order(Long id, Integer tableNumber) {
		this.id = id;
		this.tableNumber = tableNumber;
	}

	public Order(Long id, Double value, Integer tableNumber, STATUS status) {
		this.id = id;
		this.tableNumber = tableNumber;
		setStatus(status);
	}

	public Long getId() {
		return id;
	}

	public Integer getTableNumber() {
		return tableNumber;
	}

	public void setTableNumber(Integer tableNumber) {
		this.tableNumber = tableNumber;
	}

	public STATUS getStatus() {
		return STATUS.valueOf(status);
	}

	public void setStatus(STATUS status) {
		if (status != null) {
			this.status = status.getCode();
		}
	}
	
	public Set<OrderItem> getItems() {
		return items;
	}
	
	public Double getTotal() {
		double total = 0.0;
		for (OrderItem item : items) {
			total += item.getSubTotal();
		}
		return total;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Order other = (Order) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
	
}
