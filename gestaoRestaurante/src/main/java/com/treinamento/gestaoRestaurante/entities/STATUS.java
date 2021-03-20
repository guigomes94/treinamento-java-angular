package com.treinamento.gestaoRestaurante.entities;

public enum STATUS {
	
	NEW(1),
	CANCELED(2),
	CLOSED(3),
	FINISHED(4);
	
	private int code;
	
	private STATUS(int code) {
		this.code = code;
	}
	
	public int getCode() {
		return code;
	}
	
	public static STATUS valueOf(int code) {
		for (STATUS value : STATUS.values()) {
			if (value.getCode() == code) {
				return value;
			}
		}
		
		throw new IllegalArgumentException("Invalid Code");
	}

}
